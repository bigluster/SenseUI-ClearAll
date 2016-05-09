define([
	"qlik",
	"jquery",
	"qvangular",
	"css!./bootstrap.css",
	"css!./senseui-clearall.css",
], function(qlik, $, qvangular) {
'use strict';

	// Define properties
	var me = {
		initialProperties: {
			version: 1.0,
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 2,
					qHeight: 100
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				settings : {
					uses : "settings",
					items: {
						Chart: {
							type: "items",
							label: "Settings",
							items: {
								BgColor: {
									type: "string",
									label: "Background Color (HEX)",
									ref: "vars.bgColor",
									defaultValue: '#FFFFFF'
								},
								TxtColor: {
									type: "string",
									label: "Text Color (HEX)",
									ref: "vars.txtColor",
									defaultValue: '#000000'
								},
								text: {
									type: "string",
									label: "Button text",
									ref: "vars.text",
									defaultValue: 'CLEAR ALL'
								},
								Padding: {
									type: "string",
									label: "Button Padding",
									ref: "vars.padding",
									defaultValue: 10
								},
								borderWidth: {
									type: "string",
									label: "Border Width",
									ref: "vars.borderWidth",
									defaultValue: 1
								},
								borderRadius: {
									type: "string",
									label: "Border Radius",
									ref: "vars.borderRadius",
									defaultValue: 4
								},
							}
						}
					}
				}
			}
		}
	};
	
	// Get Engine API app for Selections
	me.app = qlik.currApp(this);

	// Alter properties on edit		
	me.paint = function($element,layout) {
		var vars = {
			id: layout.qInfo.qId,
			height: $element.height(),
			width: $element.width(),
			this: this,
			padding: (layout.vars.padding) ? layout.vars.padding : 10,
			bgColor: (layout.vars.bgColor) ? layout.vars.bgColor : '#ffffff',
			txtColor: (layout.vars.txtColor) ? layout.vars.txtColor : '#000000',
			text: (layout.vars.text) ? layout.vars.text : 'CLEAR ALL',
			borderWidth: (layout.vars.borderWidth) ? layout.vars.borderWidth : 1,
			borderRadius: (layout.vars.borderRadius) ? layout.vars.borderRadius : 4,
		}
		
		vars.template = '\
			<div qv-extension class="senseui-clearall" id="' + vars.id + '_senseui_clearall">\
				<button class="btn btn-default btn-block" type="button">\n\
					' + vars.text + '\n\
				</button>\n\
			</div>\n\
		';

		$element.html(vars.template);

		$( '#' + vars.id + '_senseui_clearall button' ).click(function(e) {
			me.app.clearAll();
		});

		// CSS
		$( '#' + vars.id + '_senseui_clearall button' ).css( "padding", vars.padding );
		$( '#' + vars.id + '_senseui_clearall .btn-default' ).css( "background-color", vars.bgColor );
		$( '#' + vars.id + '_senseui_clearall .btn-default' ).css( "border-width", vars.borderWidth );
		$( '#' + vars.id + '_senseui_clearall .btn-default' ).css( "border-radius", vars.borderRadius + 'px' );
	};

	// define HTML template	
	// me.template = '';

	// Controller for binding
	me.controller =['$scope', function($scope){
	}];

	return me;
});
