/*
 * jQuery FlexTable v1.0.0
 * https://www.github.com/covistefan/flextable
 *
 * Copyright 2018 COVI.DE
 * Date 2018-04-09
 * Free to use under the GPLv2 and later license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Contributing author: Stefan Händler (@covistefan)
 * 
 */

var $ = jQuery.noConflict();

function flexTable(tableData, dataOptions) {
    
    var docalc = false;
    var owidth = Math.ceil(tableData.outerWidth());
    var wwidth = $(window).innerWidth(); if (dataOptions.debug && dataOptions.bt=='window') { console.log('t_' + owidth + '::w_' + wwidth); }
    var pwidth = tableData.parent().innerWidth(); if (dataOptions.debug && dataOptions.bt=='parent') { console.log('t_' + owidth + '::p_' + pwidth); }
    
    // remove older instances of list
    $('#flextable-' + tableData.attr('id')).remove();
    
    if (dataOptions.bt=='parent' && pwidth<owidth) {
        docalc = true;
        tableData.css('display', 'none');
        }
    else if (dataOptions.bt=='window' && (wwidth<dataOptions.bw || wwidth<owidth)) {
        docalc = true;
        tableData.css('display', 'none');
        }
    else {
        docalc = false;
        tableData.css('display', dataOptions.display);
        }
    
    if (docalc) {
        
        var headData = new Array();
        // finding all header cells
        tableData.find('th').each (function() {
            $(this).parent().attr('flextable', 'header')
            headData.push(this.innerHTML);
        });
        // counting header cells 
        var headCount = headData.length;
        // if no heading cells were found
        if (headCount==0) {
            // search for defined heading cells
            if (dataOptions.pcell!=''){
                tableData.find(dataOptions.pcell).parent().attr('flextable', 'header');
                tableData.find(dataOptions.pcell).each (function() {
                    headData.push(this.innerHTML);
                    // adding attr to holding element to prevent later data usage
                });
            }
            // search for element holding heading cells
            else if (dataOptions.phead!='') {
                tableData.find(dataOptions.phead).children().each (function() {
                    // adding header data to array
                    headData.push(this.innerHTML);
                    // adding attr to holding element to prevent later data usage
                    tableData.find(dataOptions.phead).attr('flextable', 'header');
                });
            }
        }
        // recounting header cells
        var headCount = headData.length;
        if (dataOptions.debug) { console.log('header cell count: ' + headCount); }
        
        // running all rows (except the marked header cells
        cellData = new Array(); var cr = 0;
        tableData.find('tr').each (function(r) {
            if ($(this).attr('flextable')!='header') {
                cellData[cr] = new Array();
                $(this).children('td').each (function(c) {
                    cellData[cr].push(this.innerHTML);
                });
                cr++;
            }
        });
        
        // building final list
        var ul = $("<ul>");
        ul.attr('class', tableData.attr('class'));
        ul.addClass('flextable-list');
        ul.attr('id', 'flextable-'+tableData.attr('id'));
        for (var r = 0; r<cellData.length; r++) {
            for (var c = 0; c<cellData[r].length; c++) {
                if (dataOptions.header=='after') {
                    ul.append("<li class='flextable-data'>" + cellData[r][c] + "</li><li class='flextable-head'>" + headData[c] + "</li>");
                }
                else if (dataOptions.header=='none') {
                    ul.append("<li class='flextable-data'>" + cellData[r][c] + "</li>");
                }
                else {
                    ul.append("<li class='flextable-head'>" + headData[c] + "</li><li class='flextable-data'>" + cellData[r][c] + "</li>");
                }
            }
            
            
            
        }
        
        tableData.after(ul);
        
        console.log(ul);
        
    }	
}

(function($) {
    $.fn.flextable = function(options) {
    var opts = $.extend({}, $.fn.flextable.defaults, options);
    if (opts.debug) { console.log('debug mode'); }
    return this.each(function() {
        var $this = $(this);
        $this.each(function(index){
            opts.display = $(this).css('display');
            if (opts.cm=='auto' || opts.cm=='resize') {
                $(window).on('resize', function() {
                    flexTable($this, opts);
                    });
                }
            flexTable($this, opts);
        });
    });
    
}
    
$.fn.flextable.defaults = {
	debug: true, // debug mode
	bt: 'parent', // BreakType 'parent' » parent element width, 'window' » based on window width
	bw: 768, // BreakWidth int » only with bt: 'window', if window width is lower then bw
	cm: 'auto', // CalcMode 'auto' » onload and onresize, 'load' » only on load, 'resize' » only on resize
    phead: '', // selector of parent holding header cells to get tablehead if not defined by thead » used if thead not found AND pcell is empty 
    pcell: '', // selector of cells to get tablehead if not defined by thead » used if thead not found 
    header: 'before', // showing tablehead information 'before' » add li with header data before data cell, 'after' » add li with header data after data cell, 'none' » ignore header data
    };
})(jQuery)
