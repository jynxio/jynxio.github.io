const fs = require( "fs" );
const path = require( "path" );
const fontcaster = require( "font-caster" );
const ttf2woff2 = require( "ttf2woff2" );
const readlineSync = require( "readline-sync" );
const config = require( "./config" );

/**
 * （异步）询问html文件的路径并自动执行字体子集化，若路径指向单个html文件，则调用subsetBaseOnOneHtml，若路径指向一个文件夹，
 * 则调用subsetBaseOnMultipleHtml。
 * @returns { Promise } - Promise代表undefined。
 */
async function subset() {

    const question = `\nThe program will subset the default font files based on the html files, please enter a path to the html file (eg "./markwodn/test/test.html"), or a path to the folder where the html file is stored (eg "./markdown/test").\nPlease enter: `;
    const path = readlineSync.question( question );
    const stats = fs.statSync( path );

    if ( stats.isFile() ) {

        await subsetBaseOnOneHtml( path );

        return;

    }

    if ( stats.isDirectory() ) {

        await subsetBaseOnMultipleHtml( path );

        return;

    }

}

/**
 * （异步）基于一个html文件（来自path）和多个unicode.txt文件（来自UNICODE_X_X）来子集化预设的字体文件（来自ORIGIN_X_X），
 * 生成的字体文件将存储在预设路径下（指SUBSET_X_X），子集化的字符将以unicode数组的形式覆写入unicode.txt中，该函数不修改原始
 * 的字体文件，该函数仅供subset函数调用。
 * @param { string } path - 一个.html文件的url。
 * @returns { Promise } - Promise代表undefined。
 */
async function subsetBaseOnOneHtml( path ) {

    console.log( `\nThe program will subset the default font files based on the unicode.txt files and this html file "${ path }".` );

    /* Confirm */
    while ( true ) {

        const confirm = readlineSync.question( `Are you sure?\nPlease enter "y" or "n": ` );

        if ( confirm === "y" ) break;
        if ( confirm === "n" ) return;

    }

    /* en-400 */
    {

        const response = await subsetCore( path, config.unicode.en400, config.origin.en400, config.subset.en400, undefined );

        if ( ! response.success ) {

            console.error( "Error: ", response.error );

            return;

        }

        console.log( "Done: en-400" );

    }

    /* en-700 */
    {

        const response = await subsetCore( path, config.unicode.en700, config.origin.en700, config.subset.en700, [ "h1", "h2", "h3", "h4", "strong", "th" ] );

        if ( ! response.success ) {

            console.error( "Error: ", response.error );

            return;

        }

        console.log( "Done: en-700" );

    }

    /* code-400 */
    {

        const response = await subsetCore( path, config.unicode.code400, config.origin.code400, config.subset.code400, [ "code", "pre" ] );

        if ( ! response.success ) {

            console.error( "Error: ", response.error );

            return;

        }

        console.log( "Done: code-400" );

    }

    /* All done */
    console.log( "All done!" );

}

/**
 * （异步）基于多个html文件（来自path文件夹）来子集化预设的字体文件（来自ORIGIN_X_X），生成的字体文件将存储在预设路径下（只SUBSET_X_X），
 * 字符将以unicode数组的形式覆写入unicode.txt中（来自UNICODE_X_X），但unicode.txt的内容不会参与子集化，该函数不修改原子集化的始的字体
 * 文件，该函数仅供subset函数调用。
 * @param { string } path - 一个存储.html文件的文件夹的url。
 * @returns { Promise } - Promise代表undefined。
 */
async function subsetBaseOnMultipleHtml( path ) {

    console.log( `\nThe program will subset the default font files based on these html files in this folder: "${ path }".` );

    /* Confirm */
    while ( true ) {

        const confirm = readlineSync.question( `Are you sure?\nPlease enter "y" or "n": ` );

        if ( confirm === "y" ) break;
        if ( confirm === "n" ) return;

    }

    /* Clear all unicode.txt files */
    {

        let is_success = true;

        const responses = await Promise.all( [

            fontcaster.write( "", config.unicode.en400 ),
            fontcaster.write( "", config.unicode.en700 ),
            fontcaster.write( "", config.unicode.code400 ),

        ] );

        responses.forEach( response => {

            if ( response.success ) return;

            is_success = false;

            console.log( "Error: ", response.error );

        } );

        if ( ! is_success ) return;

    }

    /* en-400 */
    {

        const response = await subsetCore( path, config.unicode.en400, config.origin.en400, config.subset.en400, undefined );

        if ( ! response.success ) {

            console.error( "Error: ", response.error );

            return;

        }

        console.log( "Done: en-400" );

    }

    /* en-700 */
    {

        const response = await subsetCore( path, config.unicode.en700, config.origin.en700, config.subset.en700, [ "h1", "h2", "h3", "h4", "strong" ] );

        if ( ! response.success ) {

            console.error( "Error: ", response.error );

            return;

        }

        console.log( "Done: en-700" );

    }

    /* code-400 */
    {

        const response = await subsetCore( path, config.unicode.code400, config.origin.code400, config.subset.code400, [ "code", "pre" ] );

        if ( ! response.success ) {

            console.error( "Error: ", response.error );

            return;

        }

        console.log( "Done: code-400" );

    }

    /* All done */
    console.log( "All done!" );

}

/**
 * （异步）字体子集化，ttf字体会被自动转换为woff2字体，其余字体不会被转换。
 * @param { string } html_path - html文件的路径（如"./page/index.html"），或文件夹的路径（如"./page"）。若
 * 入参是html文件的路径，则将基于该html文件来进行字体子集化；若入参是文件夹的路径，则将基于该文件夹内的所有的html文件
 * 来进行字体子集化。
 * @param { undefined | string } unicode_path - txt文件的路径（如"./unicode.txt"），txt的内容必须是以逗号
 * 分隔的unicode，参考write API；若入参是txt文件的路径，则其中的unicode将一起参与字体子集化，若入参是undefined，
 * 则不影响字体子集化。
 * @param { string } origin_font_path - 原始的字体文件的路径（如"./origin.woff"），支持otf、ttf、woff格式。
 * @param { string } subset_font_path - 生成的字体文件的路径（如"./subset.woff"），生成的字体文件的格式必须等
 * 于原始的字体文件的格式。
 * @param { undefined | Array<string> } tagnames - 若入参是undefined，则会提取所有的html文件的所有的标签的
 * 内容来进行字体子集化；若入参是["p", "a"]，则会提取所有的html文件的所有的h1标签和a标签的内容来进行字体子集化，同理
 * 类推其他标签。注意：1.不能输入自闭合标签；2.不区分标签名的大小写。
 * @returns { Promise } - Promise代表是否执行成功，若失败，则返回{success: false, error}对象；若成功，则返回
 * {success, true, information}对象，参考subset API。
 */
async function subsetCore(

    html_path,

    unicode_path,

    origin_font_path,

    subset_font_path,

    tagnames,

) {

    let characters  = "";

    /* 提取txt文件的字符集。 */
    if ( unicode_path !== undefined ) {

        const response = await fontcaster.read( unicode_path, true );

        if ( ! response.success ) return { success: false, error: response.error };

        characters += fontcaster.convert( response.files[ 0 ].content );

    }

    /* 提取html文件的字符集。 */
    {

        const response = await fontcaster.read( html_path, false );

        if ( ! response.success ) return { success: false, error: response.error };

        for ( const file of response.files ) {

            const { name, type, content } = file;

            if ( type !== "html" ) continue;

            characters += fontcaster.deduplication( fontcaster.parseHtml( content, tagnames ) );

        }

        characters = fontcaster.deduplication( characters );

    }

    /* 存储字符。 */
    {

        const unicodes = fontcaster.convert( characters );
        const response = await fontcaster.write( unicodes, unicode_path );

        if ( ! response.success ) return { success: false, error: response.error };

    }

    /* 执行字体子集化。 */
    {

        const response = await fontcaster.subset( characters, origin_font_path, subset_font_path );

        if ( path.extname( subset_font_path ) === ".ttf" ) {

            // TODO 此处需要优化：操作冗余、缺少报错。
            fs.writeFileSync( subset_font_path.slice( 0, - 4 ) + ".woff2", ttf2woff2( fs.readFileSync( subset_font_path ) ) );

        }

        if ( ! response.success ) return { success: false, error: response.error };

        return { success: true, information: response.information };

    }

}

module.exports = { subset };
