"use strict";(self.webpackChunktabsdata_docs=self.webpackChunktabsdata_docs||[]).push([["363323"],{502139(e,t,n){n.r(t),n.d(t,{DEST_CODE:()=>u,metadata:()=>s,default:()=>m,toc:()=>p,SOURCE_CODE:()=>d,assets:()=>c,frontMatter:()=>r,contentTitle:()=>o});var s=JSON.parse('{"id":"guide/plugins","title":"Working with Plugins","description":"To connect with sources and destinations that are not currently supported natively in Tabsdata, you can use these connector plugins.","source":"@site/docs/guide/plugins.mdx","sourceDirName":"guide","slug":"/guide/plugins","permalink":"/guide/plugins","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Working with Plugins","sidebarTitle":"Working with Plugins","sidebar_class_name":"nav-icon-plugins sidebar-item-coming-soon"},"sidebar":"guideSidebar","previous":{"title":"User-defined Functions","permalink":"/guide/tables/user-defined-functions"},"next":{"title":"AI Agent (Tabby)","permalink":"/guide/platform/ai-agent"}}'),i=n(474848),a=n(28453),l=n(422601);let r={title:"Working with Plugins",sidebarTitle:"Working with Plugins",sidebar_class_name:"nav-icon-plugins sidebar-item-coming-soon"},o,c={},d=`import os
import polars as pl
import requests
import tabsdata as td

class PyPIPkgStatsSource(td.SourcePlugin):
    def __init__(self, package_name: str):
        self.package_name = package_name

    def chunk(self, working_dir: str) -> str:
        # Endpoint with the downloads information of the package
        base_endpoint = f"https://pypistats.org/api/packages/{self.package_name}"
        # Get the downloads by system
        downloads_by_system = requests.get(f"{base_endpoint}/system").json().get("data")

        # Store the information
        destination_file = "data.parquet"
        destination_path = os.path.join(working_dir, destination_file)
        pl.DataFrame(downloads_by_system).write_parquet(destination_path)
        return destination_file

@td.publisher(
    source=PyPIPkgStatsSource("polars"),
    tables="output",
)
def input_plugin_from_pypi(df: td.TableFrame):
    return df`,u=`import os
import tempfile
import polars as pl
from google.cloud import storage
import tabsdata as td

class GCPFileUpload(td.DestinationPlugin):
    def __init__(self, bucket_name: str, gcp_credentials_path: str):
        self.bucket_name = bucket_name
        self.gcp_credentials_path = gcp_credentials_path

    def stream(self, _: str, lf: pl.LazyFrame):
        # Set the GCP credentials path
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = self.gcp_credentials_path

        # Create a temporary file
        with tempfile.NamedTemporaryFile(suffix=".csv") as tmp_file:
            temp_file_path = tmp_file.name
            lf.sink_csv(temp_file_path)
            # Extract filename
            destination_file = os.path.basename(temp_file_path)
            # Upload the file to GCP Storage
            client = storage.Client()
            bucket = client.bucket(self.bucket_name)
            blob = bucket.blob(destination_file)
            blob.upload_from_filename(temp_file_path)

@td.subscriber(
    tables="data",
    destination=GCPFileUpload("<gcp-bucket-name>", "<path_to_gcp_credentials.json>"),
)
def subscriber(df: pl.DataFrame):
    return df`,p=[{value:"Source Plugin",id:"source-plugin",level:2},{value:"Destination Plugin",id:"destination-plugin",level:2}];function h(e){let t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"To connect with sources and destinations that are not currently supported natively in Tabsdata, you can use these connector plugins."}),"\n",(0,i.jsx)(t.h2,{id:"source-plugin",children:"Source Plugin"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"SourcePlugin"})," class enables reading from sources which do not have built-in support in Tabsdata. Click a numbered marker (or the legend beside it) to see what each part does."]}),"\n","\n",(0,i.jsx)(l.A,{filename:"source_plugin.py",lang:"python",code:d,regions:[{id:"class",title:"SourcePlugin subclass",from:6,to:8,description:(0,i.jsxs)(t.p,{children:["Inherit from ",(0,i.jsx)(t.code,{children:"td.SourcePlugin"})," and accept whatever configuration your source needs, which here is a PyPI package name."]})},{id:"chunk",title:"chunk()",from:10,to:18,description:(0,i.jsxs)(t.p,{children:["The one method you must implement. Fetch or generate the data, write it as a file inside ",(0,i.jsx)(t.code,{children:"working_dir"}),", and return that file's name. Tabsdata reads the file you return."]})},{id:"decorator",title:"Using the plugin",from:20,to:23,description:(0,i.jsxs)(t.p,{children:["Pass an instance of your plugin as the publisher's ",(0,i.jsx)(t.code,{children:"source"}),", exactly like a built-in connector."]})}]}),"\n",(0,i.jsx)(t.h2,{id:"destination-plugin",children:"Destination Plugin"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"DestinationPlugin"})," class enables writing to destinations which do not have built-in support in Tabsdata."]}),"\n","\n",(0,i.jsx)(l.A,{filename:"destination_plugin.py",lang:"python",code:u,regions:[{id:"class",title:"DestinationPlugin subclass",from:7,to:9,description:(0,i.jsxs)(t.p,{children:["Inherit from ",(0,i.jsx)(t.code,{children:"td.DestinationPlugin"})," and accept whatever configuration your destination needs, which here is a GCP bucket name and a credentials path."]})},{id:"stream",title:"stream()",from:11,to:24,description:(0,i.jsxs)(t.p,{children:["The one method you must implement. Receives the table as a Polars ",(0,i.jsx)(t.code,{children:"LazyFrame"})," and is responsible for getting it to the external system. Here that means writing a temp CSV and uploading it to GCS."]})},{id:"decorator",title:"Using the plugin",from:26,to:29,description:(0,i.jsxs)(t.p,{children:["Pass an instance of your plugin as the subscriber's ",(0,i.jsx)(t.code,{children:"destination"}),", exactly like a built-in connector."]})}]}),"\n",(0,i.jsx)(t.p,{children:"Where:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"<gcp-bucket-name>"})," is the name of your GCP bucket."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"<path_to_gcp_credentials.json>"})," is the full system path (typically starting with /users/user_name) to your gcp credentials file."]}),"\n"]})]})}function m(e={}){let{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},422601(e,t,n){n.d(t,{A:()=>h,C:()=>d});var s=n(474848),i=n(296540),a=n(634164);let l="fileDot_OHgz",r="fn_bUIJ",o="st_Cj7c",c="cm_ziLZ";function d(e,t){let n=e.split("\n")[t-1];return[n.indexOf("(")+1,n.lastIndexOf(")")]}function u({text:e}){let t,n=[],i=/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(@\w+)|\b(def|return|import|from|as|tuple|None|True|False)\b|\b(tdf|td|TableFrameSpec|TrxCtx|PostgresSrc|MySQLDest|S3Src|SalesforceSrc|publisher|transformer|subscriber)\b|(#[^\n]*)/g,a=0;for(;null!==(t=i.exec(e));)t.index>a&&n.push(e.slice(a,t.index)),t[1]?n.push((0,s.jsx)("span",{className:o,children:t[1]},n.length)):t[2]?n.push((0,s.jsx)("span",{className:"dec_mXXv",children:t[2]},n.length)):t[3]?n.push((0,s.jsx)("span",{className:"kw_OSN0",children:t[3]},n.length)):t[4]?n.push((0,s.jsx)("span",{className:r,children:t[4]},n.length)):t[5]&&n.push((0,s.jsx)("span",{className:c,children:t[5]},n.length)),a=t.index+t[0].length;return a<e.length&&n.push(e.slice(a)),(0,s.jsx)(s.Fragment,{children:n})}function p({text:e}){let t,n=[],i=/(^\s*[\w.-]+:)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(#[^\n]*)/g,a=0;for(;null!==(t=i.exec(e));)t.index>a&&n.push(e.slice(a,t.index)),t[1]?n.push((0,s.jsx)("span",{className:r,children:t[1]},n.length)):t[2]?n.push((0,s.jsx)("span",{className:o,children:t[2]},n.length)):t[3]&&n.push((0,s.jsx)("span",{className:c,children:t[3]},n.length)),a=t.index+t[0].length;return a<e.length&&n.push(e.slice(a)),(0,s.jsx)(s.Fragment,{children:n})}function h({filename:e,code:t,regions:n,lang:r="python"}){let[o,c]=(0,i.useState)(null),d=n.find(e=>e.id===o)??null,m=t.split("\n"),g="yaml"===r?p:u;return(0,s.jsx)("div",{className:"anatomy_UWQ1",children:(0,s.jsxs)("div",{className:"split_ZPhl",children:[(0,s.jsxs)("div",{className:"fileWindow_RTlC",children:[(0,s.jsxs)("div",{className:"fileTitleBar_vrbA",children:[(0,s.jsxs)("span",{className:"fileDots_GR1K",children:[(0,s.jsx)("span",{className:(0,a.A)(l,"fileDotRed_Zwxs")}),(0,s.jsx)("span",{className:(0,a.A)(l,"fileDotYellow_purg")}),(0,s.jsx)("span",{className:(0,a.A)(l,"fileDotGreen_DUNJ")})]}),(0,s.jsx)("span",{className:"fileTitleName_fdy9",children:e})]}),(0,s.jsx)("div",{className:"codeScroll_lv2v",children:(0,s.jsx)("pre",{className:"code_tcez",children:m.map((e,t)=>{let i=t+1,l=function(e,t){let n=null;for(let s of e)!s.cols&&t>=s.from&&t<=s.to&&(!n||s.to-s.from<n.to-n.from)&&(n=s);return n}(n,i),r=n.find(e=>e.cols&&e.from===i)??null,u=null!==d&&!d.cols&&i>=d.from&&i<=d.to,p=null!==d&&!(i>=d.from&&i<=d.to),h=n.filter(e=>e.from===i);return(0,s.jsxs)("div",{className:(0,a.A)("codeLine_ATb2",l&&"codeLineClickable_oycn",u&&"codeLineSelected_mata",p&&"codeLineDimmed_VOzf"),onClick:l?()=>c(l.id):void 0,role:l?"button":void 0,title:l?l.title:void 0,children:[(0,s.jsx)("span",{className:"gutter_Gc8K",children:h.length>0?h.map(e=>(0,s.jsx)("span",{className:(0,a.A)("gutterMarker_uIrI",o===e.id&&"gutterMarkerActive_uNA4"),children:n.indexOf(e)+1},e.id)):(0,s.jsx)("span",{className:"gutterNo_Afzd",children:i})}),(0,s.jsxs)("span",{className:"codeText_CI5k",children:[r?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(g,{text:e.slice(0,r.cols[0])}),(0,s.jsx)("span",{className:(0,a.A)("subSpan_SaHU",o===r.id&&"subSpanSelected_ITaG"),role:"button",title:r.title,onClick:e=>{e.stopPropagation(),c(r.id)},children:(0,s.jsx)(g,{text:e.slice(r.cols[0],r.cols[1])})}),(0,s.jsx)(g,{text:e.slice(r.cols[1])})]}):(0,s.jsx)(g,{text:e}),""===e?" ":""]})]},t)})})})]}),(0,s.jsx)("ul",{className:"legend_Pafd",children:n.filter(e=>!e.part).map(e=>{let t=n.filter(t=>t.part===e.id);return(0,s.jsxs)("li",{className:"legendGroup_wVxv",children:[f(e),t.length>0&&(0,s.jsx)("ul",{className:"legendChildren_NHEG",children:t.map(e=>(0,s.jsx)("li",{children:f(e)},e.id))})]},e.id)})})]})});function f(e){let t=e.id===o,i=n.indexOf(e)+1;return(0,s.jsxs)("div",{className:(0,a.A)("legendRow_qIxw",t&&"legendRowOpen_ve7Q"),children:[(0,s.jsxs)("button",{type:"button",className:"legendBtn_bfFI","aria-expanded":t,onClick:()=>c(t?null:e.id),children:[(0,s.jsx)("span",{className:(0,a.A)("legendNum_qvna",t&&"legendNumActive_Y63h"),children:i}),(0,s.jsx)("span",{className:"legendTitle_szW0",children:e.title})]}),(0,s.jsx)("div",{className:(0,a.A)("legendBody_yxcd",t&&"legendBodyOpen_Oocy"),children:(0,s.jsx)("div",{className:"legendBodyInner_whfr",children:e.description})})]})}}},28453(e,t,n){n.d(t,{R:()=>l,x:()=>r});var s=n(296540);let i={},a=s.createContext(i);function l(e){let t=s.useContext(a);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);