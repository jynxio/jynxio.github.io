
            <!DOCTYPE html>
            <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Sample Document</title>
                    <link rel="stylesheet" href="/style/resize.css">
                    <link rel="stylesheet" href="/style/font.css">
                    <link rel="stylesheet" href="/style/article-page.css">
                </head>
                <body>
                    <section id="sidebar">
                        <nav class="home-button">
                            <p>HOMEPAGE</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="3" viewBox="0 0 24 3" fill="none" stroke="currentColor" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="23.5 0.5, 0.5 0.5, 2.5 2.5"></polyline></svg>
                        </nav>
                        <nav class="catalog-content">
                            <p>IN THIS ARTICLE</p>
                            <p data-level="1"><a href="#2dbe0572-133c-4677-afa9-6224d8e1ab9a">数据类型</a></p><p data-level="1"><a href="#117272fc-3033-4f27-a387-828bdb35d75a">标准内置对象</a></p><p data-level="2"><a href="#a3399ea9-abe7-4d88-a3e1-f250851121f1">Array</a></p><p data-level="3"><a href="#692cdbba-a88f-4e1b-9f2d-82f7d9ff9db7">Array.prototype.splice</a></p><p data-level="4"><a href="#970eb2cf-0fc0-49e3-93ca-53ab2e6d5a95">Syntax</a></p><p data-level="5"><a href="#e5a3473a-17bb-4cb1-800a-38c297cc6a69">Parameters</a></p><p data-level="5"><a href="#015661c6-ed52-402d-9310-c4b7ae5421b9">Return value</a></p><p data-level="4"><a href="#5829ee84-4dec-498f-898e-e82a884f0fce">Example</a></p>
                        </nav>
                    </section>
                    <section id="topbar">
                        <nav class="home-button">
                            <button>HOMEPAGE</button>
                        </nav>
                    </section>
                    <article><h1>数据类型与标准内置对象</h1><p id="last-updated">Last Updated: 13/03/2022</p><h2 id="2dbe0572-133c-4677-afa9-6224d8e1ab9a">数据类型</h2><p><a href="https://tc39.es/ecma262/">ECMAScript</a> 规定了 8 种基本的数据类型，其中有 7 种是 <strong>原始类型</strong>，1 种是 <strong>引用类型</strong>。在这里，我们将对他们进行大体的介绍，在下一章中，我们将详细讨论它们。</p>
<p>下表罗列了所有的原始类型。</p>
<table>
<thead>
<tr>
<th>原始类型</th>
<th>示例</th>
</tr>
</thead>
<tbody><tr>
<td>Number</td>
<td><code>1</code></td>
</tr>
<tr>
<td>String</td>
<td><code>&quot;&quot;</code></td>
</tr>
<tr>
<td>Boolean</td>
<td><code>true</code></td>
</tr>
<tr>
<td>Null</td>
<td><code>null</code></td>
</tr>
<tr>
<td>Undefined</td>
<td><code>undefined</code></td>
</tr>
<tr>
<td>Symbol</td>
<td><code>Symbol( &quot;&quot; )</code></td>
</tr>
<tr>
<td>BigInt</td>
<td><code>9007199254740991n</code></td>
</tr>
</tbody></table>
<p>引用类型只有一种，那就是 <code>Object</code> 。</p>
<h2 id="117272fc-3033-4f27-a387-828bdb35d75a">标准内置对象</h2><blockquote>
<p>Excerpted from <a href="https://developer.mozilla.org/"><strong>MDN Web Docs</strong></a>.</p>
</blockquote>
<p>JavaScript 中有许多 <strong>标准内置对象</strong>，比如 <strong>可索引的集合对象</strong> 有：</p>
<ul>
<li>基本对象</li><li>数字和日期对象</li><li>可索引的集合对象<ul>
<li><code>Array</code></li><li><code>Int8Array</code></li><li><code>Unit8Array</code></li><li>......</li></ul>
</li><li>......</li></ul>
<h3 id="a3399ea9-abe7-4d88-a3e1-f250851121f1">Array</h3><p>JavaScript 的 <code>Array</code> 对象是用于构造数组的全局对象，数组是类似于列表的高阶对象。下列任务列表罗列的 <code>Array.prototype.at</code> 方法在 PC 浏览器中的兼容性情况。</p>
<ul>
<li class="check-li"><input id=53eb56b2-a99d-4f1c-a4d4-1824b12ca382 checked type="checkbox"><label for=53eb56b2-a99d-4f1c-a4d4-1824b12ca382><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></label>Chrome</li><li class="check-li"><input id=f898e44d-7f7b-46f3-87b7-540553e90e7f checked type="checkbox"><label for=f898e44d-7f7b-46f3-87b7-540553e90e7f><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></label>Edge</li><li class="check-li"><input id=65b5bc15-4ae5-498d-9c9a-ccf5ebc99932 checked type="checkbox"><label for=65b5bc15-4ae5-498d-9c9a-ccf5ebc99932><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></label>FireFox</li><li class="check-li"><input id=f66fcd40-e2a1-4425-a2d9-bfea5b933a1e  type="checkbox"><label for=f66fcd40-e2a1-4425-a2d9-bfea5b933a1e><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></label>Internet Explore</li><li class="check-li"><input id=6de5169f-1ec2-4a86-8bbb-06fcb4f099ae checked type="checkbox"><label for=6de5169f-1ec2-4a86-8bbb-06fcb4f099ae><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></label>Opera</li><li class="check-li"><input id=0d21ab00-3b82-4811-8fba-6f119b30eb62 checked type="checkbox"><label for=0d21ab00-3b82-4811-8fba-6f119b30eb62><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></label>Safari</li></ul>
<h4 id="692cdbba-a88f-4e1b-9f2d-82f7d9ff9db7">Array.prototype.splice</h4><p>The <code>splice()</code> method changes the contents of an array by removing or replacing existing elements and/or adding new elements <a href="https://en.wikipedia.org/wiki/In-place_algorithm">in place</a>. To access part of an array without modifying it, see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice">slice()</a>.</p>
<h5 id="970eb2cf-0fc0-49e3-93ca-53ab2e6d5a95">Syntax</h5><pre><code class="language-js">splice( start );
splice( start, deleteCount );
splice( start, deleteCount, item1 );
splice( start, deleteCount, item1, item2, itemN );
</code></pre>
<h6 id="e5a3473a-17bb-4cb1-800a-38c297cc6a69">Parameters</h6><ol>
<li><p><code>start</code></p>
<p>The index at which to start changing the array.</p>
<p>If greater than the length of the array, <code>start</code> will be set to the length of the array. In this case, no element will be deleted but the method will behave as an adding function, adding as many elements as items provided.</p>
<p>If negative, it will begin that many elements from the end of the array. (In this case, the origin <code>-1</code>, meaning <code>-n</code> is the index of the <code>n</code>th last element, and is therefore equivalent to the index of <code>array.length - n</code>.) If <code>start</code> is <code>negative infinity</code>, it will begin from index <code>0</code>.</p>
</li><li><p><code>deleteCount</code>(<strong>Optional</strong>)</p>
<p>An integer indicating the number of elements in the array to remove from <code>start</code>.</p>
<p>If <code>deleteCount</code> is omitted, or if its value is equal to or larger than <code>array.length - start</code> (that is, if it is equal to or greater than the number of elements left in the array, starting at <code>start</code>), then all the elements from <code>start</code> to the end of the array will be deleted. However, it must not be omitted if there is any <code>item1</code> parameter.</p>
<p>If <code>deleteCount</code> is <code>0</code> or negative, no elements are removed. In this case, you should specify at least one new element (see below).</p>
<ol>
<li>2.1</li><li>2.2</li><li>2.3<ol>
<li>2.3.1</li><li>2.3.2</li><li>2.3.3</li></ol>
</li></ol>
</li><li><p><code>item1, item2, ...</code>(<strong>Optional</strong>)</p>
<p>The elements to add to the array, beginning from <code>start</code>.</p>
<p>If you do not specify any elements, <code>splice()</code> will only remove elements from the array.</p>
</li></ol>
<h6 id="015661c6-ed52-402d-9310-c4b7ae5421b9">Return value</h6><p>An array containing the deleted elements.</p>
<p>If only one element is removed, an array of one element is returned.</p>
<p>If no elements are removed, an empty array is returned.</p>
<h5 id="5829ee84-4dec-498f-898e-e82a884f0fce">Example</h5><pre><code class="language-js">/* 插入新元素&quot;b&quot; */
const array = [ &quot;a&quot;, &quot;c&quot;, &quot;d&quot; ];
const removed = array.splice( 1, 0, &quot;b&quot; )

console.log( removed ); // output: []
console.log( array );   // output: [ &quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot; ]
</code></pre>
<p><img src="/static/page-image-hosting/squares.png" alt="example"></p>
<blockquote>
<p>Image from <a href="http://simpledesktops.com/">simpledesktops</a>.</p>
</blockquote>
</article>
                    <script src="/style/article-page.js"></script>
                </body>
            </html>
        