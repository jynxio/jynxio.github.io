const fs = require( "fs" );
const readlineSync = require( "readline-sync" );
const { marked } = require( "marked" );
const { v4: createUuid } = require( "uuid" );
const beautify = require( "js-beautify" ).html;
const configuration = require( "./config" );

/**
 * （异步）询问是否执行转译，确认后将根据config.js的配置来执行转译。
 * @returns { Promise } - Promise代表undefined。
 */
async function translate() {

    while ( true ) {

        const confirm = readlineSync.question( `Are you sure?\nPlease enter "y" or "n": ` );

        if ( confirm === "y" ) break;
        if ( confirm === "n" ) return;

    }

    const paths = [];

    configuration.forEach( folder => {

        folder.children.forEach( file => {

            const path = { input: file.mdPath, output: file.htmlPath };

            paths.push( path );

        } );

    } );

    let is_success = true;

    const responses = await Promise.all(
        paths.map( path => translateCore( path.input, path.output ) )
    );

    responses.forEach( ( response, index ) => {

        if ( response.success ) {

            console.log( "Done: " + paths[ index ].input );

            return;

        }

        is_success = false;

        console.log( "Error: ", response.error, "at " + paths[ index ].input );

    } );

    if ( ! is_success ) {

        console.log( "\nThere were some errors occurring!" );

        return;

    }

    console.log( "\nAll done!" );

}

/**
 * （异步）基于md文件来生成html文件，该函数不会修改md文件，该函数仅供translate函数调用。
 * @param { string } input_path - md文件的路径，比如"./index.md"。
 * @param { string } output_path - 生成的html文件的存储路径，比如"./index.html"。
 * @returns { Promise } - Promise代表是否执行成功，若失败，则返回{success: false, error}对象；若成功，则返回
 * {success: true, content}对象，content代表html的内容。
 */
function translateCore( input_path, output_path ) {

    let markdown_content = "";
    let catalog_content = "";
    let h1_content = "";

    return new Promise( resolve => {

        const reader = fs.createReadStream( input_path, { encoding: "utf8" } );

        reader.on( "data", chunk => markdown_content += chunk );
        reader.on( "end", onEnd );

        function onEnd() {

            marked.use( {
                headerIds: false,
                renderer: {
                    hr: parseHr,
                    heading: parseH123456,
                    checkbox: parseCheckboxInput,
                    listitem: parseLi,
                    blockquote: parseBlockquote,
                },
            } );
            const article_content = marked.parse( markdown_content );
            let html_content = `
                <!DOCTYPE html>
                <html lang="zh-CN">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${ h1_content }</title>
                    </head>
                    <body>
                        <header>
                            <button><a href="/catalogue.html"><strong>CATALOGUE</strong></a></button>
                        </header>
                        <aside>
                            <p>In this article</p>
                            ${ catalog_content }
                        </aside>
                        <article>${ article_content }</article>
                    </body>
                </html>
            `;

            html_content = beautify( html_content );
            fs.writeFile( output_path, html_content, _ => {} );
            markdown_content = catalog_content = h1_content = "";
            resolve( { success: true, content: html_content } );

        }

    } );


    function parseHr() {

        return "";

    }

    function parseH123456( content, level ) {

        /* 剔除Typora的图床地址。 */
        if ( content.search( /typora-root-url:/ ) > -1 ) return "";

        /* 处理<h1>。 */
        if ( level === 1 ) {

            const h = `<h1>${ content }</h1>`;

            h1_content = content;

            return ( h );

        }

        /* 处理<h2>~<h6>。 */
        const id = createUuid();
        const p = `<p data-target-id=${ id }>${ content }</p>`;
        const h = `<h${ level } id="${ id }">${ content }</h${ level }>`;

        /* catalogue收录<h2>。 */
        if ( level === 2 ) catalog_content += p;

        return h;

    }

    function parseCheckboxInput( is_checked ) {

        const id = createUuid();
        const checked_property = is_checked ? "checked" : "";
        const icon_circle = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
        const icon_square = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`;

        return `<input id=${ id } ${ checked_property } type="checkbox"><label for=${ id }>${ icon_square }</label>`;

    }

    function parseLi( content, is_checkbox, is_checked ) {

        const li = is_checkbox ? `<li class="check-li">${ content }</li>` : `<li>${ content }</li>`;

        return li;

    }

    function parseBlockquote( content ) {

        const title = `<p><strong>Note</strong></p>`;

        return `<blockquote>${ title }${ content }</blockquote>`;

    }

    /**
     * 获取当前时刻的日期。
     * @returns {string} - 当前时刻的日期字符串，格式为dd/mm/yyyy。
     */
    function getDate() {

        const date = new Date();

        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();

        const yyyy = y + "";
        const mm = ( m < 10 ? "0" : "" ) + m;
        const dd = ( d < 10 ? "0" : "" ) + d;

        return ( dd + "/" + mm + "/" + yyyy );

    }

}

module.exports = { translate };
