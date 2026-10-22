import csv,re,sys
from pathlib import Path
SCRIPT=Path(__file__).resolve()
REPO=SCRIPT.parent.parent
DEFAULT_CSV=REPO/"src"/"data"/"articles.csv"
P=Path(sys.argv[1]) if len(sys.argv)>1 else DEFAULT_CSV
SITE="https://www.vincentiantopology.com"
rows=list(csv.DictReader(open(P,encoding="utf-8-sig")))
CODE={"文森世界":"vwd","Vincentian View":"vwd","專題探討":"tpc","Special Topics":"tpc","關於我們":"abt","About Us":"abt","經典註解":"cls","Classic Commentary":"cls"}
RX=re.compile(r"^(vwd|tpc|abt|cls)_[a-z0-9]{8}$"); err=[]
by={r["uuid"]:r for r in rows}
if len(by)!=len(rows): err.append("duplicate uuids")
if len({r["id"] for r in rows})!=len(rows): err.append("duplicate ids")
def series(r):
    u=r["url"]
    m=re.search(r"/topics/(pyramid-myths(?:-en)?)/(\d+)/?$",u)
    if m: return (m.group(1),int(m.group(2)))
    m=re.search(r"/intro/0-(\d+)(?:-en)?/?$",u)
    if m: return ("intro-"+r["lang"],int(m.group(1)))
    return None
S={}
for r in rows:
    s=series(r)
    if s: S.setdefault(s[0],{})[s[1]]=r["uuid"]
for r in rows:
    u=r["uuid"]; en=r["lang"]=="en"
    if not RX.match(u): err.append(f"{u}: bad uuid format")
    elif CODE.get(r["section"])!=u.split("_")[0]: err.append(f"{u}: prefix/section mismatch")
    if r["lang"] not in("zh","en"): err.append(f"{u}: bad lang")
    if en!=("/en/" in r["url"]): err.append(f"{u}: url/lang mismatch")
    for k in ("id","section","title","url","description"):
        if not r[k].strip(): err.append(f"{u}: empty {k}")
    if not [k for k in r["keywords"].split("|") if k.strip()]: err.append(f"{u}: empty keywords")
    L=[x for x in r["link"].split("|") if x]
    if not 2<=len(L)<=4: err.append(f"{u}: link count {len(L)}")
    if len(set(L))!=len(L): err.append(f"{u}: duplicate links")
    for x in L:
        if x==u: err.append(f"{u}: self-link")
        elif x not in by: err.append(f"{u}: link {x} missing")
        elif by[x]["lang"]!=r["lang"]: err.append(f"{u}: link {x} other language")
    s=series(r)
    if s:
        parts=S[s[0]]; n=max(parts); k=s[1]; others=[p for p in parts if p!=k]
        if k==n:
            exp=[parts[p] for p in sorted(others,reverse=True)]
            if L[:len(exp)]!=exp: err.append(f"{u}: last part must link previous parts first, nearest first")
            if not [x for x in L[len(exp):] if x not in parts.values()]: err.append(f"{u}: last part needs an outside link")
        else:
            exp=[parts[p] for p in sorted(others,key=lambda p:(abs(p-k),p<k))]
            if len(others)>=2:
                if L!=exp: err.append(f"{u}: non-last part must link only series parts, nearest/next first; expected {exp}")
            elif L[:len(exp)]!=exp: err.append(f"{u}: series parts must come first")
    t=r["translation_of"]
    if t:
        if t==u: err.append(f"{u}: translation self")
        elif t not in by: err.append(f"{u}: translation {t} missing")
        elif by[t]["lang"]==r["lang"]: err.append(f"{u}: translation same language")
        elif by[t]["translation_of"]!=u: err.append(f"{u}: translation not mutual")

def _frontmatter(path):
    text=path.read_text(encoding="utf-8")
    if not text.startswith("---"): return {}
    end=text.find("\n---",3)
    if end<0: return {}
    data={}
    for line in text[3:end].splitlines():
        if ":" not in line: continue
        k,v=line.split(":",1)
        data[k.strip()]=v.strip().strip('"').strip("'")
    return data

def _is_draft(data):
    return data.get("draft","").lower() in ("true","1","yes")

def _content_pages(repo):
    root=repo/"src"/"content"
    out={}
    for coll in ("intro","view","topics","classics"):
        d=root/coll
        if not d.is_dir(): continue
        for md in sorted(d.glob("*.md")):
            data=_frontmatter(md)
            if _is_draft(data): continue
            lang=data.get("lang","zh-Hant")
            en=lang=="en"
            prefix="/en" if en else ""
            csv_lang="en" if en else "zh"
            if coll=="topics":
                series=data.get("series")
                ep=data.get("episode")
                if not series or not ep: continue
                cid=f"{series}/{int(ep)}"
                url=f"{SITE}{prefix}/topics/{series}/{int(ep)}"
            else:
                cid=md.stem
                url=f"{SITE}{prefix}/{coll}/{cid}"
            out[cid]=(url,csv_lang,str(md.relative_to(repo)))
    return out

published=_content_pages(REPO)
csv_ids={r["id"] for r in rows}
for cid,(url,csv_lang,rel) in published.items():
    row=next((r for r in rows if r["id"]==cid),None)
    if not row:
        err.append(f"content {rel}: published page id '{cid}' missing from CSV")
        continue
    if row["url"].rstrip("/")!=url.rstrip("/"):
        err.append(f"{row['uuid']}: url mismatch CSV={row['url']} content={url}")
    if row["lang"]!=csv_lang:
        err.append(f"{row['uuid']}: lang mismatch for content id {cid}")
for r in rows:
    if r["id"] not in published:
        err.append(f"{r['uuid']}: CSV id '{r['id']}' has no matching published content page")

print("OK" if not err else "\n".join(err)); sys.exit(1 if err else 0)
