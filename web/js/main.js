/**
 * Created by JetBrains PhpStorm.
 * User: a.kondratenko
 * Date: 09.12.11
 * Time: 12:31
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    var leftHeight = $('div#content-left').height(),
        mainHeight = $('div#content-main').height(),
        rightHeight = $('div#content-right').height();

    var maxHeight = Math.max(leftHeight, mainHeight, rightHeight);

    //$('div#content-left,div#content-main,div#content-right').height(maxHeight);
});
