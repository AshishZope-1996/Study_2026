
<!-- ==========================================================
     PREMIUM DOCUMENTATION TEMPLATE
     Author: Ashish Zope
=========================================================== -->

<style>
:root{
    --azure-primary:#0078D4;
    --azure-secondary:#00BCF2;
    --azure-dark:#004578;
    --azure-light:#F3F9FD;
    --text-dark:#323130;
    --shadow:0 8px 24px rgba(0,0,0,0.12);
}

/* ---------- GLOBAL ---------- */

body{
    font-family:'Segoe UI',sans-serif;
    color:var(--text-dark);
    line-height:1.7;
}

/* ---------- BACKGROUND WATERMARK ---------- */

body::before{
    content:"ASHISH ZOPE • LINKEDIN";
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%) rotate(-35deg);
    font-size:90px;
    font-weight:800;
    color:rgba(0,120,212,0.04);
    white-space:nowrap;
    pointer-events:none;
    z-index:-1;
}

/* ---------- HEADER ---------- */

.doc-header{
    position:relative;
    overflow:hidden;

    background:
    linear-gradient(
    135deg,
    #0078D4 0%,
    #005A9E 40%,
    #003B6D 100%);

    color:white;
    text-align:center;

    padding:45px;
    border-radius:20px;

    margin-bottom:40px;

    box-shadow:
    0 15px 40px rgba(0,120,212,0.30);
}

/* Moving Glow */

.doc-header::before{
    content:"";
    position:absolute;

    top:0;
    left:-100%;

    width:100%;
    height:100%;

    background:
    linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,.15),
    transparent);

    animation:shine 4s infinite;
}

@keyframes shine{
    100%{
        left:100%;
    }
}

.doc-title{
    font-size:3.2rem;
    font-weight:800;
    letter-spacing:2px;
    margin:0;
}

.doc-subtitle{
    font-size:1rem;
    opacity:.9;
    margin-top:10px;
    letter-spacing:1px;
}

.doc-tag{
    display:inline-block;

    margin-top:20px;
    padding:8px 20px;

    border-radius:30px;

    background:rgba(255,255,255,.15);

    backdrop-filter:blur(10px);

    font-size:14px;
    font-weight:600;
}

/* ---------- HEADINGS ---------- */

h1,h2,h3,h4{
    color:var(--azure-dark);
}

h2{
    border-left:6px solid var(--azure-primary);
    padding-left:15px;

    background:var(--azure-light);

    padding-top:10px;
    padding-bottom:10px;

    border-radius:8px;
}

/* ---------- CODE ---------- */

pre{
    border-left:5px solid var(--azure-primary);

    background:#0D1117;

    color:#E6EDF3;

    padding:20px;

    border-radius:12px;

    overflow-x:auto;
}

code{
    background:#EFF6FC;
    color:#005A9E;

    padding:2px 6px;

    border-radius:4px;
}

/* ---------- TABLE ---------- */

table{
    width:100%;
    border-collapse:collapse;

    margin-top:20px;
    margin-bottom:20px;

    overflow:hidden;
    border-radius:12px;

    box-shadow:var(--shadow);
}

th{
    background:linear-gradient(
    135deg,
    var(--azure-primary),
    var(--azure-dark));

    color:white;
}

th,td{
    padding:14px;
    border:1px solid #ddd;
}

tr:nth-child(even){
    background:#F9FBFD;
}

/* ---------- BLOCKQUOTE ---------- */

blockquote{
    border-left:5px solid var(--azure-secondary);

    background:#F5FBFF;

    padding:20px;

    border-radius:10px;

    font-style:italic;
}

/* ---------- FOOTER BRAND ---------- */

.doc-footer{
    margin-top:60px;

    text-align:center;

    color:#666;
    font-size:12px;
}
</style>

<!-- HEADER -->

<div class="doc-header">

<div class="doc-title">
Azure Data Factory
</div>

<div class="doc-subtitle">
Enterprise Cloud Data Integration Service
</div>

<div class="doc-tag">
Microsoft Azure Documentation
</div>

</div>

<!-- OPTIONAL FOOTER -->

<div class="doc-footer">
Created by Ashish Zope | LinkedIn @AshishZope
</div>
