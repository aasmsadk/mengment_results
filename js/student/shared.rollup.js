import{html,Polymer,Base,dom,useShadow,dashToCamelCase,DomIf,afterNextRender,Templatizer,OptionalMutableDataBehavior,animationFrame,microTask,idlePeriod,flush,Debouncer,enqueueDebouncer,matches,translate,beforeNextRender,templatize}from"chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";import{addWebUIListener,removeWebUIListener,addSingletonGetter,isIOS,isMac,sendWithPromise,isWindows,isAndroid}from"chrome://resources/js/cr.m.js";import{loadTimeData}from"chrome://resources/js/load_time_data.m.js";import"chrome://settings/strings.m.js";
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const template=html`<custom-style>
  <style is="custom-style" css-build="shadow">[hidden] {
  display: none !important;
}

</style>
</custom-style>
<custom-style>
  <style is="custom-style" css-build="shadow">html {
  --layout_-_display:  flex;;

      --layout-inline_-_display:  inline-flex;;

      --layout-horizontal_-_display:  var(--layout_-_display); --layout-horizontal_-_flex-direction:  row;;

      --layout-horizontal-reverse_-_display:  var(--layout_-_display); --layout-horizontal-reverse_-_flex-direction:  row-reverse;;

      --layout-vertical_-_display:  var(--layout_-_display); --layout-vertical_-_flex-direction:  column;;

      --layout-vertical-reverse_-_display:  var(--layout_-_display); --layout-vertical-reverse_-_flex-direction:  column-reverse;;

      --layout-wrap_-_flex-wrap:  wrap;;

      --layout-wrap-reverse_-_flex-wrap:  wrap-reverse;;

      --layout-flex-auto_-_flex:  1 1 auto;;

      --layout-flex-none_-_flex:  none;;

      --layout-flex_-_flex:  1; --layout-flex_-_flex-basis:  0.000000001px;;

      --layout-flex-2_-_flex:  2;;

      --layout-flex-3_-_flex:  3;;

      --layout-flex-4_-_flex:  4;;

      --layout-flex-5_-_flex:  5;;

      --layout-flex-6_-_flex:  6;;

      --layout-flex-7_-_flex:  7;;

      --layout-flex-8_-_flex:  8;;

      --layout-flex-9_-_flex:  9;;

      --layout-flex-10_-_flex:  10;;

      --layout-flex-11_-_flex:  11;;

      --layout-flex-12_-_flex:  12;;

      

      --layout-start_-_align-items:  flex-start;;

      --layout-center_-_align-items:  center;;

      --layout-end_-_align-items:  flex-end;;

      --layout-baseline_-_align-items:  baseline;;

      

      --layout-start-justified_-_justify-content:  flex-start;;

      --layout-center-justified_-_justify-content:  center;;

      --layout-end-justified_-_justify-content:  flex-end;;

      --layout-around-justified_-_justify-content:  space-around;;

      --layout-justified_-_justify-content:  space-between;;

      --layout-center-center_-_align-items:  var(--layout-center_-_align-items); --layout-center-center_-_justify-content:  var(--layout-center-justified_-_justify-content);;

      

      --layout-self-start_-_align-self:  flex-start;;

      --layout-self-center_-_align-self:  center;;

      --layout-self-end_-_align-self:  flex-end;;

      --layout-self-stretch_-_align-self:  stretch;;

      --layout-self-baseline_-_align-self:  baseline;;

      

      --layout-start-aligned_-_align-content:  flex-start;;

      --layout-end-aligned_-_align-content:  flex-end;;

      --layout-center-aligned_-_align-content:  center;;

      --layout-between-aligned_-_align-content:  space-between;;

      --layout-around-aligned_-_align-content:  space-around;;

      

      --layout-block_-_display:  block;;

      --layout-invisible_-_visibility:  hidden !important;;

      --layout-relative_-_position:  relative;;

      --layout-fit_-_position:  absolute; --layout-fit_-_top:  0; --layout-fit_-_right:  0; --layout-fit_-_bottom:  0; --layout-fit_-_left:  0;;

      --layout-scroll_-_-webkit-overflow-scrolling:  touch; --layout-scroll_-_overflow:  auto;;

      --layout-fullbleed_-_margin:  0; --layout-fullbleed_-_height:  100vh;;

      

      --layout-fixed-top_-_position:  fixed; --layout-fixed-top_-_top:  0; --layout-fixed-top_-_left:  0; --layout-fixed-top_-_right:  0;;

      --layout-fixed-right_-_position:  fixed; --layout-fixed-right_-_top:  0; --layout-fixed-right_-_right:  0; --layout-fixed-right_-_bottom:  0;;

      --layout-fixed-bottom_-_position:  fixed; --layout-fixed-bottom_-_right:  0; --layout-fixed-bottom_-_bottom:  0; --layout-fixed-bottom_-_left:  0;;

      --layout-fixed-left_-_position:  fixed; --layout-fixed-left_-_top:  0; --layout-fixed-left_-_bottom:  0; --layout-fixed-left_-_left:  0;;
}

</style>
</custom-style>`;template.setAttribute("style","display: none;");document.head.appendChild(template.content);var style=document.createElement("style");style.textContent="[hidden] { display: none !important; }";document.head.appendChild(style);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/class IronMeta{constructor(options){IronMeta[" "](options);this.type=options&&options.type||"default";this.key=options&&options.key;if(options&&"value"in options){this.value=options.value}}get value(){var type=this.type;var key=this.key;if(type&&key){return IronMeta.types[type]&&IronMeta.types[type][key]}}set value(value){var type=this.type;var key=this.key;if(type&&key){type=IronMeta.types[type]=IronMeta.types[type]||{};if(value==null){delete type[key]}else{type[key]=value}}}get list(){var type=this.type;if(type){var items=IronMeta.types[this.type];if(!items){return[]}return Object.keys(items).map((function(key){return metaDatas[this.type][key]}),this)}}byKey(key){this.key=key;return this.value}}IronMeta[" "]=function(){};IronMeta.types={};var metaDatas=IronMeta.types;Polymer({is:"iron-meta",properties:{type:{type:String,value:"default"},key:{type:String},value:{type:String,notify:true},self:{type:Boolean,observer:"_selfChanged"},__meta:{type:Boolean,computed:"__computeMeta(type, key, value)"}},hostAttributes:{hidden:true},__computeMeta:function(type,key,value){var meta=new IronMeta({type:type,key:key});if(value!==undefined&&value!==meta.value){meta.value=value}else if(this.value!==meta.value){this.value=meta.value}return meta},get list(){return this.__meta&&this.__meta.list},_selfChanged:function(self){if(self){this.value=this}},byKey:function(key){return new IronMeta({type:this.type,key:key}).value}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`<!--css-build:shadow--><style scope="iron-icon">:host {
  display: var(--layout-inline_-_display);
        align-items: var(--layout-center-center_-_align-items); justify-content: var(--layout-center-center_-_justify-content);
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
        ;
}

:host([hidden]) {
  display: none;
}

</style>
`,is:"iron-icon",properties:{icon:{type:String},theme:{type:String},src:{type:String},_meta:{value:Base.create("iron-meta",{type:"iconset"})}},observers:["_updateIcon(_meta, isAttached)","_updateIcon(theme, isAttached)","_srcChanged(src, isAttached)","_iconChanged(icon, isAttached)"],_DEFAULT_ICONSET:"icons",_iconChanged:function(icon){var parts=(icon||"").split(":");this._iconName=parts.pop();this._iconsetName=parts.pop()||this._DEFAULT_ICONSET;this._updateIcon()},_srcChanged:function(src){this._updateIcon()},_usesIconset:function(){return this.icon||!this.src},_updateIcon:function(){if(this._usesIconset()){if(this._img&&this._img.parentNode){dom(this.root).removeChild(this._img)}if(this._iconName===""){if(this._iconset){this._iconset.removeIcon(this)}}else if(this._iconsetName&&this._meta){this._iconset=this._meta.byKey(this._iconsetName);if(this._iconset){this._iconset.applyIcon(this,this._iconName,this.theme);this.unlisten(window,"iron-iconset-added","_updateIcon")}else{this.listen(window,"iron-iconset-added","_updateIcon")}}}else{if(this._iconset){this._iconset.removeIcon(this)}if(!this._img){this._img=document.createElement("img");this._img.style.width="100%";this._img.style.height="100%";this._img.draggable=false}this._img.src=this.src;dom(this.root).appendChild(this._img)}}});// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function assert(condition,opt_message){if(!condition){let message="Assertion failed";if(opt_message){message=message+": "+opt_message}const error=new Error(message);const global=function(){const thisOrSelf=this||self;thisOrSelf.traceAssertionsForTesting;return thisOrSelf}();if(global.traceAssertionsForTesting){console.warn(error.stack)}throw error}return condition}function assertNotReached(opt_message){assert(false,opt_message||"Unreachable code hit")}function assertInstanceof(value,type,opt_message){if(!(value instanceof type)){assertNotReached(opt_message||"Value "+value+" is not a[n] "+(type.name||typeof type))}return value}// Copyright (c) 2012 The Chromium Authors. All rights reserved.
function getDeepActiveElement(){let a=document.activeElement;while(a&&a.shadowRoot&&a.shadowRoot.activeElement){a=a.shadowRoot.activeElement}return a}function findAncestor(node,predicate,includeShadowHosts){while(node!==null){if(predicate(node)){break}node=includeShadowHosts&&node instanceof ShadowRoot?node.host:node.parentNode}return node}function isRTL(){return document.documentElement.dir==="rtl"}function listenOnce(target,eventNames,callback){if(!Array.isArray(eventNames)){eventNames=eventNames.split(/ +/)}const removeAllAndCallCallback=function(event){eventNames.forEach((function(eventName){target.removeEventListener(eventName,removeAllAndCallCallback,false)}));return callback(event)};eventNames.forEach((function(eventName){target.addEventListener(eventName,removeAllAndCallCallback,false)}))}function hasKeyModifiers(e){return!!(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)}function isTextInputElement(el){return el.tagName==="INPUT"||el.tagName==="TEXTAREA"}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const template$1=html`<custom-style>
  <style is="custom-style" css-build="shadow">html {
  --google-red-100-rgb: 244, 199, 195;  
      --google-red-100: rgb(var(--google-red-100-rgb));
      --google-red-300-rgb: 230, 124, 115;  
      --google-red-300: rgb(var(--google-red-300-rgb));
      --google-red-500-rgb: 219, 68, 55;  
      --google-red-500: rgb(var(--google-red-500-rgb));
      --google-red-700-rgb: 197, 57, 41;  
      --google-red-700: rgb(var(--google-red-700-rgb));

      --google-blue-100-rgb: 198, 218, 252;  
      --google-blue-100: rgb(var(--google-blue-100-rgb));
      --google-blue-300-rgb: 123, 170, 247;  
      --google-blue-300: rgb(var(--google-blue-300-rgb));
      --google-blue-500-rgb: 66, 133, 244;  
      --google-blue-500: rgb(var(--google-blue-500-rgb));
      --google-blue-700-rgb: 51, 103, 214;  
      --google-blue-700: rgb(var(--google-blue-700-rgb));

      --google-green-100-rgb: 183, 225, 205;  
      --google-green-100: rgb(var(--google-green-100-rgb));
      --google-green-300-rgb: 87, 187, 138;  
      --google-green-300: rgb(var(--google-green-300-rgb));
      --google-green-500-rgb: 15, 157, 88;  
      --google-green-500: rgb(var(--google-green-500-rgb));
      --google-green-700-rgb: 11, 128, 67;  
      --google-green-700: rgb(var(--google-green-700-rgb));

      --google-yellow-100-rgb: 252, 232, 178;  
      --google-yellow-100: rgb(var(--google-yellow-100-rgb));
      --google-yellow-300-rgb: 247, 203, 77;  
      --google-yellow-300: rgb(var(--google-yellow-300-rgb));
      --google-yellow-500-rgb: 244, 180, 0;  
      --google-yellow-500: rgb(var(--google-yellow-500-rgb));
      --google-yellow-700-rgb: 240, 147, 0;  
      --google-yellow-700: rgb(var(--google-yellow-700-rgb));

      --google-grey-100-rgb: 245, 245, 245;  
      --google-grey-100: rgb(var(--google-grey-100-rgb));
      --google-grey-300-rgb: 224, 224, 224;  
      --google-grey-300: rgb(var(--google-grey-300-rgb));
      --google-grey-500-rgb: 158, 158, 158;  
      --google-grey-500: rgb(var(--google-grey-500-rgb));
      --google-grey-700-rgb: 97, 97, 97;  
      --google-grey-700: rgb(var(--google-grey-700-rgb));

      

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; 
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; 
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;
}

</style>
</custom-style>
`;template$1.setAttribute("style","display: none;");document.head.appendChild(template$1.content);const $_documentContainer=document.createElement("template");$_documentContainer.innerHTML=`<custom-style>\n<style is="custom-style" css-build="shadow">html {\n  --google-blue-50-rgb: 232, 240, 254;  \n    --google-blue-50: rgb(var(--google-blue-50-rgb));\n    --google-blue-200-rgb: 174, 203, 250;  \n    --google-blue-200: rgb(var(--google-blue-200-rgb));\n    --google-blue-600-rgb: 26, 115, 232;  \n    --google-blue-600: rgb(var(--google-blue-600-rgb));\n\n    --google-grey-50-rgb: 248, 249, 250;  \n    --google-grey-50: rgb(var(--google-grey-50-rgb));\n    --google-grey-200-rgb: 232, 234, 237;  \n    --google-grey-200: rgb(var(--google-grey-200-rgb));\n    --google-grey-400-rgb: 189, 193, 198;  \n    --google-grey-400: rgb(var(--google-grey-400-rgb));\n    --google-grey-600-rgb: 128, 134, 139;  \n    --google-grey-600: rgb(var(--google-grey-600-rgb));\n    --google-grey-800-rgb: 60, 64, 67;  \n    --google-grey-800: rgb(var(--google-grey-800-rgb));\n    --google-grey-900-rgb: 32, 33, 36;  \n    --google-grey-900: rgb(var(--google-grey-900-rgb));\n    \n    --google-grey-900-white-4-percent: #292a2d;\n\n    --google-red-600-rgb: 217, 48, 37;  \n    --google-red-600: rgb(var(--google-red-600-rgb));\n\n    --google-yellow-50-rgb: 254, 247, 224;  \n    --google-yellow-50: rgb(var(--google-yellow-50-rgb));\n\n    \n    --google-blue-refresh-100-rgb: 210, 227, 252;  \n    --google-blue-refresh-100: rgb(var(--google-blue-refresh-100-rgb));\n    --google-blue-refresh-300-rgb: 138, 180, 248;  \n    --google-blue-refresh-300: rgb(var(--google-blue-refresh-300-rgb));\n    --google-blue-refresh-500-rgb: 66, 133, 244;  \n    --google-blue-refresh-500: rgb(var(--google-blue-refresh-500-rgb));\n    --google-blue-refresh-700-rgb: 25, 103, 210;  \n    --google-blue-refresh-700: rgb(var(--google-blue-refresh-700-rgb));\n\n    --google-green-refresh-300-rgb: 129, 201, 149;  \n    --google-green-refresh-300: rgb(var(--google-green-refresh-300-rgb));\n    --google-green-refresh-700-rgb: 24, 128, 56;  \n    --google-green-refresh-700: rgb(var(--google-green-refresh-700-rgb));\n\n    --google-grey-refresh-100-rgb: 241, 243, 244;  \n    --google-grey-refresh-100: rgb(var(--google-grey-refresh-100-rgb));\n    --google-grey-refresh-300-rgb: 218, 220, 224;  \n    --google-grey-refresh-300: rgb(var(--google-grey-refresh-300-rgb));\n    --google-grey-refresh-500-rgb: 154, 160, 166;  \n    --google-grey-refresh-500: rgb(var(--google-grey-refresh-500-rgb));\n    --google-grey-refresh-700-rgb: 95, 99, 104;  \n    --google-grey-refresh-700: rgb(var(--google-grey-refresh-700-rgb));\n\n    --google-red-refresh-300-rgb: 242, 139, 130;  \n    --google-red-refresh-300: rgb(var(--google-red-refresh-300-rgb));\n    --google-red-refresh-500-rgb: 234, 67, 53;  \n    --google-red-refresh-500: rgb(var(--google-red-refresh-500-rgb));\n\n    --google-yellow-refresh-300-rgb: 253, 214, 51;  \n    --google-yellow-refresh-300: rgb(var(--google-yellow-refresh-300-rgb));\n\n    --cr-primary-text-color: var(--google-grey-900);\n    --cr-secondary-text-color: var(--google-grey-refresh-700);\n\n    --cr-card-background-color: white;\n    --cr-card-shadow-color-rgb: var(--google-grey-800-rgb);\n\n    --cr-elevation-1: rgba(var(--cr-card-shadow-color-rgb), .3) 0 1px 2px 0,\n                      rgba(var(--cr-card-shadow-color-rgb), .15) 0 1px 3px 1px;\n    --cr-elevation-2: rgba(var(--cr-card-shadow-color-rgb), .3) 0 1px 2px 0,\n                      rgba(var(--cr-card-shadow-color-rgb), .15) 0 2px 6px 2px;\n    --cr-elevation-3: rgba(var(--cr-card-shadow-color-rgb), .3) 0 1px 3px 0,\n                      rgba(var(--cr-card-shadow-color-rgb), .15) 0 4px 8px 3px;\n    --cr-elevation-4: rgba(var(--cr-card-shadow-color-rgb), .3) 0 2px 3px 0,\n                      rgba(var(--cr-card-shadow-color-rgb), .15) 0 6px 10px 4px;\n    --cr-elevation-5: rgba(var(--cr-card-shadow-color-rgb), .3) 0 4px 4px 0,\n                      rgba(var(--cr-card-shadow-color-rgb), .15) 0 8px 12px 6px;\n\n    --cr-card-shadow: var(--cr-elevation-1);\n\n    --cr-checked-color: var(--google-blue-600);\n    --cr-focused-item-color: var(--google-grey-300);\n    --cr-form-field-label-color: var(--google-grey-refresh-700);\n    --cr-hairline-rgb: 0, 0, 0;\n    --cr-link-color: var(--google-blue-700);\n    --cr-menu-background-color: white;\n    --cr-menu-background-focus-color: var(--google-grey-400);\n    --cr-menu-shadow: 0 2px 6px var(--paper-grey-500);\n    --cr-separator-color: rgba(0, 0, 0, .06);\n    --cr-title-text-color: rgb(90, 90, 90);\n    --cr-toggle-color: var(--google-blue-500);\n    --cr-toolbar-background-color: var(--google-blue-700);\n}\n\n@media (prefers-color-scheme: dark) {\nhtml {\n  --cr-primary-text-color: var(--google-grey-200);\n      --cr-secondary-text-color: var(--google-grey-refresh-500);\n\n      --cr-card-background-color: var(--google-grey-900-white-4-percent);\n      --cr-card-shadow-color-rgb: 0, 0, 0;\n\n      --cr-checked-color: var(--google-blue-refresh-300);\n      --cr-form-field-label-color: var(--dark-secondary-color);\n      --cr-hairline-rgb: 255, 255, 255;\n      --cr-link-color: var(--google-blue-refresh-300);\n      --cr-menu-background-color: var(--google-grey-900);\n      --cr-menu-background-focus-color: var(--google-grey-refresh-700);\n      --cr-menu-background-sheen: rgba(255, 255, 255, .06);  \n      --cr-menu-shadow: rgba(0, 0, 0, .3) 0 1px 2px 0,\n                        rgba(0, 0, 0, .15) 0 3px 6px 2px;\n      --cr-separator-color: rgba(255, 255, 255, .1);\n      \n      --cr-title-text-color: var(--cr-primary-text-color);\n      --cr-toolbar-background-color: var(--google-grey-900-white-4-percent);\n}\n\n}\n\nhtml {\n  --cr-button-edge-spacing: 12px;\n    --cr-button-height: 32px;\n\n    \n    --cr-controlled-by-spacing: 24px;\n\n    \n    --cr-default-input-max-width: 264px;\n\n    \n    --cr-icon-ripple-size: 36px;\n    --cr-icon-ripple-padding: 8px;\n\n    --cr-icon-size: 20px;\n\n    --cr-icon-button-margin-start: 16px;\n\n    \n    --cr-icon-ripple-margin: calc(var(--cr-icon-ripple-padding) * -1);\n\n    \n    \n    --cr-section-min-height: 48px;\n    --cr-section-two-line-min-height: 64px;\n\n    --cr-section-padding: 20px;\n    --cr-section-vertical-padding: 12px;\n    --cr-section-indent-width: 40px;\n    --cr-section-indent-padding: calc(\n        var(--cr-section-padding) + var(--cr-section-indent-width));\n\n    --cr-section-vertical-margin: 21px;\n\n    --cr-centered-card-max-width: 680px;\n    --cr-centered-card-width-percentage: 0.96;\n\n    --cr-hairline: 1px solid rgba(var(--cr-hairline-rgb), .14);\n\n    --cr-separator-height: 1px;\n    --cr-separator-line: var(--cr-separator-height) solid\n        var(--cr-separator-color);\n\n    --cr-toolbar-overlay-animation-duration: 150ms;\n    --cr-toolbar-height: 56px;\n\n    --cr-container-shadow-height: 6px;\n    --cr-container-shadow-margin: calc(-1 * var(--cr-container-shadow-height));\n\n    --cr-container-shadow-max-opacity: 1;\n\n    \n    --cr-card-border-radius: 4px;\n    --cr-disabled-opacity: .38;\n    --cr-form-field-bottom-spacing: 16px;\n    --cr-form-field-label-font-size: .625rem;\n    --cr-form-field-label-height: 1em;\n    --cr-form-field-label-line-height: 1em;\n}\n\n</style>\n</custom-style>\n`;document.head.appendChild($_documentContainer.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var KEY_IDENTIFIER={"U+0008":"backspace","U+0009":"tab","U+001B":"esc","U+0020":"space","U+007F":"del"};var KEY_CODE={8:"backspace",9:"tab",13:"enter",27:"esc",33:"pageup",34:"pagedown",35:"end",36:"home",32:"space",37:"left",38:"up",39:"right",40:"down",46:"del",106:"*"};var MODIFIER_KEYS={shift:"shiftKey",ctrl:"ctrlKey",alt:"altKey",meta:"metaKey"};var KEY_CHAR=/[a-z0-9*]/;var IDENT_CHAR=/U\+/;var ARROW_KEY=/^arrow/;var SPACE_KEY=/^space(bar)?/;var ESC_KEY=/^escape$/;function transformKey(key,noSpecialChars){var validKey="";if(key){var lKey=key.toLowerCase();if(lKey===" "||SPACE_KEY.test(lKey)){validKey="space"}else if(ESC_KEY.test(lKey)){validKey="esc"}else if(lKey.length==1){if(!noSpecialChars||KEY_CHAR.test(lKey)){validKey=lKey}}else if(ARROW_KEY.test(lKey)){validKey=lKey.replace("arrow","")}else if(lKey=="multiply"){validKey="*"}else{validKey=lKey}}return validKey}function transformKeyIdentifier(keyIdent){var validKey="";if(keyIdent){if(keyIdent in KEY_IDENTIFIER){validKey=KEY_IDENTIFIER[keyIdent]}else if(IDENT_CHAR.test(keyIdent)){keyIdent=parseInt(keyIdent.replace("U+","0x"),16);validKey=String.fromCharCode(keyIdent).toLowerCase()}else{validKey=keyIdent.toLowerCase()}}return validKey}function transformKeyCode(keyCode){var validKey="";if(Number(keyCode)){if(keyCode>=65&&keyCode<=90){validKey=String.fromCharCode(32+keyCode)}else if(keyCode>=112&&keyCode<=123){validKey="f"+(keyCode-112+1)}else if(keyCode>=48&&keyCode<=57){validKey=String(keyCode-48)}else if(keyCode>=96&&keyCode<=105){validKey=String(keyCode-96)}else{validKey=KEY_CODE[keyCode]}}return validKey}function normalizedKeyForEvent(keyEvent,noSpecialChars){if(keyEvent.key){return transformKey(keyEvent.key,noSpecialChars)}if(keyEvent.detail&&keyEvent.detail.key){return transformKey(keyEvent.detail.key,noSpecialChars)}return transformKeyIdentifier(keyEvent.keyIdentifier)||transformKeyCode(keyEvent.keyCode)||""}function keyComboMatchesEvent(keyCombo,event){var keyEvent=normalizedKeyForEvent(event,keyCombo.hasModifiers);return keyEvent===keyCombo.key&&(!keyCombo.hasModifiers||!!event.shiftKey===!!keyCombo.shiftKey&&!!event.ctrlKey===!!keyCombo.ctrlKey&&!!event.altKey===!!keyCombo.altKey&&!!event.metaKey===!!keyCombo.metaKey)}function parseKeyComboString(keyComboString){if(keyComboString.length===1){return{combo:keyComboString,key:keyComboString,event:"keydown"}}return keyComboString.split("+").reduce((function(parsedKeyCombo,keyComboPart){var eventParts=keyComboPart.split(":");var keyName=eventParts[0];var event=eventParts[1];if(keyName in MODIFIER_KEYS){parsedKeyCombo[MODIFIER_KEYS[keyName]]=true;parsedKeyCombo.hasModifiers=true}else{parsedKeyCombo.key=keyName;parsedKeyCombo.event=event||"keydown"}return parsedKeyCombo}),{combo:keyComboString.split(":").shift()})}function parseEventString(eventString){return eventString.trim().split(" ").map((function(keyComboString){return parseKeyComboString(keyComboString)}))}const IronA11yKeysBehavior={properties:{keyEventTarget:{type:Object,value:function(){return this}},stopKeyboardEventPropagation:{type:Boolean,value:false},_boundKeyHandlers:{type:Array,value:function(){return[]}},_imperativeKeyBindings:{type:Object,value:function(){return{}}}},observers:["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],keyBindings:{},registered:function(){this._prepKeyBindings()},attached:function(){this._listenKeyEventListeners()},detached:function(){this._unlistenKeyEventListeners()},addOwnKeyBinding:function(eventString,handlerName){this._imperativeKeyBindings[eventString]=handlerName;this._prepKeyBindings();this._resetKeyEventListeners()},removeOwnKeyBindings:function(){this._imperativeKeyBindings={};this._prepKeyBindings();this._resetKeyEventListeners()},keyboardEventMatchesKeys:function(event,eventString){var keyCombos=parseEventString(eventString);for(var i=0;i<keyCombos.length;++i){if(keyComboMatchesEvent(keyCombos[i],event)){return true}}return false},_collectKeyBindings:function(){var keyBindings=this.behaviors.map((function(behavior){return behavior.keyBindings}));if(keyBindings.indexOf(this.keyBindings)===-1){keyBindings.push(this.keyBindings)}return keyBindings},_prepKeyBindings:function(){this._keyBindings={};this._collectKeyBindings().forEach((function(keyBindings){for(var eventString in keyBindings){this._addKeyBinding(eventString,keyBindings[eventString])}}),this);for(var eventString in this._imperativeKeyBindings){this._addKeyBinding(eventString,this._imperativeKeyBindings[eventString])}for(var eventName in this._keyBindings){this._keyBindings[eventName].sort((function(kb1,kb2){var b1=kb1[0].hasModifiers;var b2=kb2[0].hasModifiers;return b1===b2?0:b1?-1:1}))}},_addKeyBinding:function(eventString,handlerName){parseEventString(eventString).forEach((function(keyCombo){this._keyBindings[keyCombo.event]=this._keyBindings[keyCombo.event]||[];this._keyBindings[keyCombo.event].push([keyCombo,handlerName])}),this)},_resetKeyEventListeners:function(){this._unlistenKeyEventListeners();if(this.isAttached){this._listenKeyEventListeners()}},_listenKeyEventListeners:function(){if(!this.keyEventTarget){return}Object.keys(this._keyBindings).forEach((function(eventName){var keyBindings=this._keyBindings[eventName];var boundKeyHandler=this._onKeyBindingEvent.bind(this,keyBindings);this._boundKeyHandlers.push([this.keyEventTarget,eventName,boundKeyHandler]);this.keyEventTarget.addEventListener(eventName,boundKeyHandler)}),this)},_unlistenKeyEventListeners:function(){var keyHandlerTuple;var keyEventTarget;var eventName;var boundKeyHandler;while(this._boundKeyHandlers.length){keyHandlerTuple=this._boundKeyHandlers.pop();keyEventTarget=keyHandlerTuple[0];eventName=keyHandlerTuple[1];boundKeyHandler=keyHandlerTuple[2];keyEventTarget.removeEventListener(eventName,boundKeyHandler)}},_onKeyBindingEvent:function(keyBindings,event){if(this.stopKeyboardEventPropagation){event.stopPropagation()}if(event.defaultPrevented){return}for(var i=0;i<keyBindings.length;i++){var keyCombo=keyBindings[i][0];var handlerName=keyBindings[i][1];if(keyComboMatchesEvent(keyCombo,event)){this._triggerKeyHandler(keyCombo,handlerName,event);if(event.defaultPrevented){return}}}},_triggerKeyHandler:function(keyCombo,handlerName,keyboardEvent){var detail=Object.create(keyCombo);detail.keyboardEvent=keyboardEvent;var event=new CustomEvent(keyCombo.event,{detail:detail,cancelable:true});this[handlerName].call(this,event);if(event.defaultPrevented){keyboardEvent.preventDefault()}}};var MAX_RADIUS_PX=300;var MIN_DURATION_MS=800;var distance=function(x1,y1,x2,y2){var xDelta=x1-x2;var yDelta=y1-y2;return Math.sqrt(xDelta*xDelta+yDelta*yDelta)};Polymer({_template:html`<!--css-build:shadow--><style scope="paper-ripple">:host {
  border-radius: inherit;
        bottom: 0;
        display: block;
        left: 0;
        overflow: hidden;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        
        transform: translate3d(0, 0, 0);
}

.ripple {
  background-color: currentcolor;
        left: 0;
        opacity: var(--paper-ripple-opacity, 0.25);
        pointer-events: none;
        position: absolute;
        will-change: height, transform, width;
}

.ripple, :host(.circle) {
  border-radius: 50%;
}

</style>
`,is:"paper-ripple",behaviors:[IronA11yKeysBehavior],properties:{center:{type:Boolean,value:false},holdDown:{type:Boolean,value:false,observer:"_holdDownChanged"},recenters:{type:Boolean,value:false},noink:{type:Boolean,value:false}},keyBindings:{"enter:keydown":"_onEnterKeydown","space:keydown":"_onSpaceKeydown","space:keyup":"_onSpaceKeyup"},created:function(){this.ripples=[]},attached:function(){this.keyEventTarget=this.parentNode.nodeType==11?dom(this).getOwnerRoot().host:this.parentNode;this.keyEventTarget=this.keyEventTarget;this.listen(this.keyEventTarget,"up","uiUpAction");this.listen(this.keyEventTarget,"down","uiDownAction")},detached:function(){this.unlisten(this.keyEventTarget,"up","uiUpAction");this.unlisten(this.keyEventTarget,"down","uiDownAction");this.keyEventTarget=null},simulatedRipple:function(){this.downAction();this.async(function(){this.upAction()}.bind(this),1)},uiDownAction:function(e){if(!this.noink)this.downAction(e)},downAction:function(e){if(this.ripples.length&&this.holdDown)return;this.debounce("show ripple",(function(){this.__showRipple(e)}),1)},clear:function(){this.__hideRipple();this.holdDown=false},showAndHoldDown:function(){this.ripples.forEach((ripple=>{ripple.remove()}));this.ripples=[];this.holdDown=true},__showRipple:function(e){var rect=this.getBoundingClientRect();var roundedCenterX=function(){return Math.round(rect.width/2)};var roundedCenterY=function(){return Math.round(rect.height/2)};var centered=!e||this.center;if(centered){var x=roundedCenterX();var y=roundedCenterY()}else{var sourceEvent=e.detail.sourceEvent;var x=Math.round(sourceEvent.clientX-rect.left);var y=Math.round(sourceEvent.clientY-rect.top)}var corners=[{x:0,y:0},{x:rect.width,y:0},{x:0,y:rect.height},{x:rect.width,y:rect.height}];var cornerDistances=corners.map((function(corner){return Math.round(distance(x,y,corner.x,corner.y))}));var radius=Math.min(MAX_RADIUS_PX,Math.max.apply(Math,cornerDistances));var startTranslate=x-radius+"px, "+(y-radius)+"px";if(this.recenters&&!centered){var endTranslate=roundedCenterX()-radius+"px, "+(roundedCenterY()-radius)+"px"}else{var endTranslate=startTranslate}var ripple=document.createElement("div");ripple.classList.add("ripple");ripple.style.height=ripple.style.width=2*radius+"px";this.ripples.push(ripple);this.shadowRoot.appendChild(ripple);ripple.animate({transform:["translate("+startTranslate+") scale(0)","translate("+endTranslate+") scale(1)"]},{duration:Math.max(MIN_DURATION_MS,Math.log(radius)*radius)||0,easing:"cubic-bezier(.2, .9, .1, .9)",fill:"forwards"})},uiUpAction:function(e){if(!this.noink)this.upAction()},upAction:function(e){if(!this.holdDown)this.debounce("hide ripple",(function(){this.__hideRipple()}),1)},__hideRipple:function(){Promise.all(this.ripples.map((function(ripple){return new Promise((function(resolve){var removeRipple=function(){ripple.remove();resolve()};var opacity=getComputedStyle(ripple).opacity;if(!opacity.length){removeRipple()}else{var animation=ripple.animate({opacity:[opacity,0]},{duration:150,fill:"forwards"});animation.addEventListener("finish",removeRipple);animation.addEventListener("cancel",removeRipple)}}))}))).then(function(){this.fire("transitionend")}.bind(this));this.ripples=[]},_onEnterKeydown:function(){this.uiDownAction();this.async(this.uiUpAction,1)},_onSpaceKeydown:function(){this.uiDownAction()},_onSpaceKeyup:function(){this.uiUpAction()},_holdDownChanged:function(newHoldDown,oldHoldDown){if(oldHoldDown===undefined)return;if(newHoldDown)this.downAction();else this.upAction()}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronButtonStateImpl={properties:{pressed:{type:Boolean,readOnly:true,value:false,reflectToAttribute:true,observer:"_pressedChanged"},toggles:{type:Boolean,value:false,reflectToAttribute:true},active:{type:Boolean,value:false,notify:true,reflectToAttribute:true},pointerDown:{type:Boolean,readOnly:true,value:false},receivedFocusFromKeyboard:{type:Boolean,readOnly:true},ariaActiveAttribute:{type:String,value:"aria-pressed",observer:"_ariaActiveAttributeChanged"}},listeners:{down:"_downHandler",up:"_upHandler",tap:"_tapHandler"},observers:["_focusChanged(focused)","_activeChanged(active, ariaActiveAttribute)"],keyBindings:{"enter:keydown":"_asyncClick","space:keydown":"_spaceKeyDownHandler","space:keyup":"_spaceKeyUpHandler"},_mouseEventRe:/^mouse/,_tapHandler:function(){if(this.toggles){this._userActivate(!this.active)}else{this.active=false}},_focusChanged:function(focused){this._detectKeyboardFocus(focused);if(!focused){this._setPressed(false)}},_detectKeyboardFocus:function(focused){this._setReceivedFocusFromKeyboard(!this.pointerDown&&focused)},_userActivate:function(active){if(this.active!==active){this.active=active;this.fire("change")}},_downHandler:function(event){this._setPointerDown(true);this._setPressed(true);this._setReceivedFocusFromKeyboard(false)},_upHandler:function(){this._setPointerDown(false);this._setPressed(false)},_spaceKeyDownHandler:function(event){var keyboardEvent=event.detail.keyboardEvent;var target=dom(keyboardEvent).localTarget;if(this.isLightDescendant(target))return;keyboardEvent.preventDefault();keyboardEvent.stopImmediatePropagation();this._setPressed(true)},_spaceKeyUpHandler:function(event){var keyboardEvent=event.detail.keyboardEvent;var target=dom(keyboardEvent).localTarget;if(this.isLightDescendant(target))return;if(this.pressed){this._asyncClick()}this._setPressed(false)},_asyncClick:function(){this.async((function(){this.click()}),1)},_pressedChanged:function(pressed){this._changedButtonState()},_ariaActiveAttributeChanged:function(value,oldValue){if(oldValue&&oldValue!=value&&this.hasAttribute(oldValue)){this.removeAttribute(oldValue)}},_activeChanged:function(active,ariaActiveAttribute){if(this.toggles){this.setAttribute(this.ariaActiveAttribute,active?"true":"false")}else{this.removeAttribute(this.ariaActiveAttribute)}this._changedButtonState()},_controlStateChanged:function(){if(this.disabled){this._setPressed(false)}else{this._changedButtonState()}},_changedButtonState:function(){if(this._buttonStateChanged){this._buttonStateChanged()}}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const PaperRippleBehavior={properties:{noink:{type:Boolean,observer:"_noinkChanged"},_rippleContainer:{type:Object}},_buttonStateChanged:function(){if(this.focused){this.ensureRipple()}},_downHandler:function(event){IronButtonStateImpl._downHandler.call(this,event);if(this.pressed){this.ensureRipple(event)}},ensureRipple:function(optTriggeringEvent){if(!this.hasRipple()){this._ripple=this._createRipple();this._ripple.noink=this.noink;var rippleContainer=this._rippleContainer||this.root;if(rippleContainer){dom(rippleContainer).appendChild(this._ripple)}if(optTriggeringEvent){var domContainer=dom(this._rippleContainer||this);var target=dom(optTriggeringEvent).rootTarget;if(domContainer.deepContains(target)){this._ripple.uiDownAction(optTriggeringEvent)}}}},getRipple:function(){this.ensureRipple();return this._ripple},hasRipple:function(){return Boolean(this._ripple)},_createRipple:function(){var element=document.createElement("paper-ripple");return element},_noinkChanged:function(noink){if(this.hasRipple()){this._ripple.noink=noink}}};// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-icon-button">:host {
  --cr-icon-button-fill-color: var(--google-grey-refresh-700);
        --cr-icon-button-icon-start-offset: 0;
        --cr-icon-button-icon-size: 20px;
        --cr-icon-button-size: 36px;
        --cr-icon-button-height: var(--cr-icon-button-size);
        --cr-icon-button-transition: 150ms ease-in-out;
        --cr-icon-button-width: var(--cr-icon-button-size);
        
        -webkit-tap-highlight-color: transparent;
        border-radius: 4px;
        color: var(--cr-icon-button-stroke-color,
            var(--cr-icon-button-fill-color));
        cursor: pointer;
        display: inline-flex;
        flex-shrink: 0;
        height: var(--cr-icon-button-height);
        margin-inline-end: var(--cr-icon-button-margin-end,
            var(--cr-icon-ripple-margin));
        margin-inline-start: var(--cr-icon-button-margin-start);
        outline: none;
        user-select: none;
        vertical-align: middle;
        width: var(--cr-icon-button-width);
}

:host([disabled]) {
  cursor: initial;
        opacity: var(--cr-disabled-opacity);
        pointer-events: none;
}

:host(.no-overlap) {
  --cr-icon-button-margin-end: 0;
        --cr-icon-button-margin-start: 0;
}

:host-context([dir=rtl]):host(:not([dir=ltr]):not([multiple-icons_])) {
  transform: scaleX(-1);
}

:host-context([dir=rtl]):host(:not([dir=ltr])[multiple-icons_]) iron-icon {
  transform: scaleX(-1);
}

:host(:not([iron-icon])) #maskedImage {
  -webkit-mask-image: var(--cr-icon-image);
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: var(--cr-icon-button-icon-size);
        -webkit-transform: var(--cr-icon-image-transform, none);
        background-color: var(--cr-icon-button-fill-color);
        height: 100%;
        transition: background-color var(--cr-icon-button-transition);
        width: 100%;
}

#icon {
  align-items: center;
        border-radius: 4px;
        display: flex;
        height: 100%;
        justify-content: center;
        padding-inline-start: var(--cr-icon-button-icon-start-offset);
        
        position: relative;
        width: 100%;
}

iron-icon {
  --iron-icon-fill-color: var(--cr-icon-button-fill-color);
        --iron-icon-stroke-color: var(--cr-icon-button-stroke-color, none);
        --iron-icon-height: var(--cr-icon-button-icon-size);
        --iron-icon-width: var(--cr-icon-button-icon-size);
        transition: fill var(--cr-icon-button-transition),
            stroke var(--cr-icon-button-transition);
}

paper-ripple {
  --paper-ripple-opacity: var(--cr-icon-button-ripple-opacity, .21);
}

@media (prefers-color-scheme: dark) {
:host {
  --cr-icon-button-fill-color: var(--google-grey-refresh-500);
}

paper-ripple {
  --paper-ripple-opacity: var(--cr-icon-button-ripple-opacity, .4);
}

}

</style>
    <div id="icon">
      <div id="maskedImage"></div>
    </div>
<!--_html_template_end_-->`,is:"cr-icon-button",behaviors:[PaperRippleBehavior],properties:{disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"},customTabIndex:{type:Number,observer:"applyTabIndex_"},ironIcon:{type:String,observer:"onIronIconChanged_",reflectToAttribute:true},noRippleOnFocus:{type:Boolean,value:false},multipleIcons_:{type:Boolean,reflectToAttribute:true},rippleShowing_:{type:Boolean,value:false,reflectToAttribute:true}},hostAttributes:{"aria-disabled":"false",role:"button",tabindex:0},listeners:{blur:"onBlur_",click:"onClick_",down:"showRipple_",focus:"onFocus_",keydown:"onKeyDown_",keyup:"onKeyUp_",pointerdown:"ensureRipple",up:"hideRipple_"},spaceKeyDown_:false,hideRipple_(){if(this.hasRipple()){this.getRipple().clear();this.rippleShowing_=false}},showRipple_(){if(!this.noink&&!this.disabled){this.getRipple().showAndHoldDown();this.rippleShowing_=true}},disabledChanged_(newValue,oldValue){if(!newValue&&oldValue===undefined){return}if(this.disabled){this.blur()}this.setAttribute("aria-disabled",this.disabled?"true":"false");this.applyTabIndex_()},applyTabIndex_(){let value=this.customTabIndex;if(value===undefined){value=this.disabled?-1:0}this.setAttribute("tabindex",value)},onFocus_(){if(!this.noRippleOnFocus){this.showRipple_()}},onBlur_(){this.spaceKeyDown_=false;if(!this.noRippleOnFocus){this.hideRipple_()}},onClick_(e){if(this.disabled){e.stopImmediatePropagation()}},onIronIconChanged_(){this.shadowRoot.querySelectorAll("iron-icon").forEach((el=>el.remove()));if(!this.ironIcon){return}const icons=(this.ironIcon||"").split(",");this.multipleIcons_=icons.length>1;icons.forEach((icon=>{const ironIcon=document.createElement("iron-icon");ironIcon.icon=icon;this.$.icon.appendChild(ironIcon);if(ironIcon.shadowRoot){ironIcon.shadowRoot.querySelectorAll("svg","img").forEach((child=>child.setAttribute("role","none")))}}));if(!this.hasRipple()){return}if(icons.length>1){this.getRipple().classList.remove("circle")}else{this.getRipple().classList.add("circle")}},onKeyDown_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.repeat){return}if(e.key==="Enter"){this.click()}else if(e.key===" "){this.spaceKeyDown_=true}},onKeyUp_(e){if(e.key===" "||e.key==="Enter"){e.preventDefault();e.stopPropagation()}if(this.spaceKeyDown_&&e.key===" "){this.spaceKeyDown_=false;this.click()}},_createRipple(){this._rippleContainer=this.$.icon;const ripple=PaperRippleBehavior._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");if(!(this.ironIcon||"").includes(",")){ripple.classList.add("circle")}return ripple}});const template$2=document.createElement("template");template$2.innerHTML=`<dom-module id="cr-icons" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-icons">.icon-arrow-back {\n  --cr-icon-image: url(../images/icon_arrow_back.svg);\n}\n\n.icon-arrow-dropdown {\n  --cr-icon-image: url(../images/icon_arrow_dropdown.svg);\n}\n\n.icon-cancel {\n  --cr-icon-image: url(../images/icon_cancel.svg);\n}\n\n.icon-clear {\n  --cr-icon-image: url(../images/icon_clear.svg);\n}\n\n.icon-copy-content {\n  --cr-icon-image: url(../images/icon_copy_content.svg);\n}\n\n.icon-delete-gray {\n  --cr-icon-image: url(../images/icon_delete_gray.svg);\n}\n\n.icon-edit {\n  --cr-icon-image: url(../images/icon_edit.svg);\n}\n\n.icon-picture-delete {\n  --cr-icon-image: url(../images/icon_picture_delete.svg);\n}\n\n.icon-expand-less {\n  --cr-icon-image: url(../images/icon_expand_less.svg);\n}\n\n.icon-expand-more {\n  --cr-icon-image: url(../images/icon_expand_more.svg);\n}\n\n.icon-external {\n  --cr-icon-image: url(../images/open_in_new.svg);\n}\n\n.icon-more-vert {\n  --cr-icon-image: url(../images/icon_more_vert.svg);\n}\n\n.icon-refresh {\n  --cr-icon-image: url(../images/icon_refresh.svg);\n}\n\n.icon-search {\n  --cr-icon-image: url(../images/icon_search.svg);\n}\n\n.icon-settings {\n  --cr-icon-image: url(../images/icon_settings.svg);\n}\n\n.icon-visibility {\n  --cr-icon-image: url(../images/icon_visibility.svg);\n}\n\n.icon-visibility-off {\n  --cr-icon-image: url(../images/icon_visibility_off.svg);\n}\n\n.subpage-arrow {\n  --cr-icon-image: url(../images/arrow_right.svg);\n}\n\n.cr-icon {\n  -webkit-mask-image: var(--cr-icon-image);\n        -webkit-mask-position: center;\n        -webkit-mask-repeat: no-repeat;\n        -webkit-mask-size: var(--cr-icon-size);\n        background-color: var(--google-grey-refresh-700);\n        flex-shrink: 0;\n        height: var(--cr-icon-ripple-size);\n        margin-inline-end: var(--cr-icon-ripple-margin);\n        margin-inline-start: var(--cr-icon-button-margin-start);\n        user-select: none;\n        width: var(--cr-icon-ripple-size);\n}\n\n:host-context([dir=rtl]) .cr-icon {\n  transform: scaleX(-1);\n}\n\n.cr-icon.no-overlap {\n  margin-inline-end: 0;\n        margin-inline-start: 0;\n}\n\n@media (prefers-color-scheme: dark) {\n.cr-icon {\n  background-color: var(--google-grey-refresh-500);\n}\n\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$2.content.cloneNode(true));// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const CrSearchFieldBehavior={properties:{label:{type:String,value:""},clearLabel:{type:String,value:""},hasSearchText:{type:Boolean,reflectToAttribute:true,value:false}},effectiveValue_:"",searchDelayTimer_:-1,getSearchInput(){},getValue(){return this.getSearchInput().value},setValue(value,opt_noEvent){const updated=this.updateEffectiveValue_(value);this.getSearchInput().value=this.effectiveValue_;if(!updated){if(value===""&&this.hasSearchText){this.hasSearchText=false}return}this.onSearchTermInput();if(!opt_noEvent){this.fire("search-changed",this.effectiveValue_)}},scheduleSearch_(){if(this.searchDelayTimer_>=0){clearTimeout(this.searchDelayTimer_)}const length=this.getValue().length;const timeoutMs=length>0?500-100*(Math.min(length,4)-1):0;this.searchDelayTimer_=setTimeout((()=>{this.getSearchInput().dispatchEvent(new CustomEvent("search",{composed:true,detail:this.getValue()}));this.searchDelayTimer_=-1}),timeoutMs)},onSearchTermSearch(){this.onValueChanged_(this.getValue(),false)},onSearchTermInput(){this.hasSearchText=this.$.searchInput.value!=="";this.scheduleSearch_()},onValueChanged_(newValue,noEvent){const updated=this.updateEffectiveValue_(newValue);if(updated&&!noEvent){this.fire("search-changed",this.effectiveValue_)}},updateEffectiveValue_(value){const effectiveValue=value.replace(/\s+/g," ").replace(/^\s/,"");if(effectiveValue===this.effectiveValue_){return false}this.effectiveValue_=effectiveValue;return true}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({is:"iron-iconset-svg",properties:{name:{type:String,observer:"_nameChanged"},size:{type:Number,value:24},rtlMirroring:{type:Boolean,value:false},useGlobalRtlAttribute:{type:Boolean,value:false}},created:function(){this._meta=new IronMeta({type:"iconset",key:null,value:null})},attached:function(){this.style.display="none"},getIconNames:function(){this._icons=this._createIconMap();return Object.keys(this._icons).map((function(n){return this.name+":"+n}),this)},applyIcon:function(element,iconName){this.removeIcon(element);var svg=this._cloneIcon(iconName,this.rtlMirroring&&this._targetIsRTL(element));if(svg){var pde=dom(element.root||element);pde.insertBefore(svg,pde.childNodes[0]);return element._svgIcon=svg}return null},createIcon:function(iconName,targetIsRTL){return this._cloneIcon(iconName,this.rtlMirroring&&targetIsRTL)},removeIcon:function(element){if(element._svgIcon){dom(element.root||element).removeChild(element._svgIcon);element._svgIcon=null}},_targetIsRTL:function(target){if(this.__targetIsRTL==null){if(this.useGlobalRtlAttribute){var globalElement=document.body&&document.body.hasAttribute("dir")?document.body:document.documentElement;this.__targetIsRTL=globalElement.getAttribute("dir")==="rtl"}else{if(target&&target.nodeType!==Node.ELEMENT_NODE){target=target.host}this.__targetIsRTL=target&&window.getComputedStyle(target)["direction"]==="rtl"}}return this.__targetIsRTL},_nameChanged:function(){this._meta.value=null;this._meta.key=this.name;this._meta.value=this;this.async((function(){this.fire("iron-iconset-added",this,{node:window})}))},_createIconMap:function(){var icons=Object.create(null);dom(this).querySelectorAll("[id]").forEach((function(icon){icons[icon.id]=icon}));return icons},_cloneIcon:function(id,mirrorAllowed){this._icons=this._icons||this._createIconMap();return this._prepareSvgClone(this._icons[id],this.size,mirrorAllowed)},_prepareSvgClone:function(sourceSvg,size,mirrorAllowed){if(sourceSvg){var content=sourceSvg.cloneNode(true),svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),viewBox=content.getAttribute("viewBox")||"0 0 "+size+" "+size,cssText="pointer-events: none; display: block; width: 100%; height: 100%;";if(mirrorAllowed&&content.hasAttribute("mirror-in-rtl")){cssText+="-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;"}svg.setAttribute("viewBox",viewBox);svg.setAttribute("preserveAspectRatio","xMidYMid meet");svg.setAttribute("focusable","false");svg.style.cssText=cssText;svg.appendChild(content).removeAttribute("id");return svg}return null}});const template$3=html`<iron-iconset-svg name="cr20" size="20">
  <svg>
    <defs>
      <!--
      Keep these in sorted order by id="". See also http://goo.gl/Y1OdAq
      -->
      <g id="domain">
        <path d="M2,3 L2,17 L11.8267655,17 L13.7904799,17 L18,17 L18,7 L12,7 L12,3 L2,3 Z M8,13 L10,13 L10,15 L8,15 L8,13 Z M4,13 L6,13 L6,15 L4,15 L4,13 Z M8,9 L10,9 L10,11 L8,11 L8,9 Z M4,9 L6,9 L6,11 L4,11 L4,9 Z M12,9 L16,9 L16,15 L12,15 L12,9 Z M12,11 L14,11 L14,13 L12,13 L12,11 Z M8,5 L10,5 L10,7 L8,7 L8,5 Z M4,5 L6,5 L6,7 L4,7 L4,5 Z">
        </path>
      </g>
      <g id="kite">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.6327 8.00094L10.3199 2L16 8.00094L10.1848 16.8673C10.0995 16.9873 10.0071 17.1074 9.90047 17.2199C9.42417 17.7225 8.79147 18 8.11611 18C7.44076 18 6.80806 17.7225 6.33175 17.2199C5.85545 16.7173 5.59242 16.0497 5.59242 15.3371C5.59242 14.977 5.46445 14.647 5.22275 14.3919C4.98104 14.1369 4.66825 14.0019 4.32701 14.0019H4V12.6667H4.32701C5.00237 12.6667 5.63507 12.9442 6.11137 13.4468C6.58768 13.9494 6.85071 14.617 6.85071 15.3296C6.85071 15.6896 6.97867 16.0197 7.22038 16.2747C7.46209 16.5298 7.77488 16.6648 8.11611 16.6648C8.45735 16.6648 8.77014 16.5223 9.01185 16.2747C9.02396 16.2601 9.03607 16.246 9.04808 16.2319C9.08541 16.1883 9.12176 16.1458 9.15403 16.0947L9.55213 15.4946L4.6327 8.00094ZM10.3199 13.9371L6.53802 8.17116L10.3199 4.1814L14.0963 8.17103L10.3199 13.9371Z">
        </path>
      </g>
      <g id="menu">
        <path d="M2 4h16v2H2zM2 9h16v2H2zM2 14h16v2H2z"></path>
      </g>
      
  </defs></svg>
</iron-iconset-svg>
<iron-iconset-svg name="cr" size="24">
  <svg>
    <defs>
      <!--
      These icons are copied from Polymer's iron-icons and kept in sorted order.
      See http://goo.gl/Y1OdAq for instructions on adding additional icons.
      -->
      <g id="account-child-invert" viewBox="0 0 48 48">
        <path d="M24 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"></path>
        <path fill="none" d="M0 0h48v48H0V0z"></path>
        <circle fill="none" cx="24" cy="26" r="4"></circle>
        <path d="M24 18c-6.16 0-13 3.12-13 7.23v11.54c0 2.32 2.19 4.33 5.2 5.63 2.32 1 5.12 1.59 7.8 1.59.66 0 1.33-.06 2-.14v-5.2c-.67.08-1.34.14-2 .14-2.63 0-5.39-.57-7.68-1.55.67-2.12 4.34-3.65 7.68-3.65.86 0 1.75.11 2.6.29 2.79.62 5.2 2.15 5.2 4.04v4.47c3.01-1.31 5.2-3.31 5.2-5.63V25.23C37 21.12 30.16 18 24 18zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z">
        </path>
      </g>
      <g id="add">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
      </g>
      <g id="arrow-back">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
      </g>
      <g id="arrow-drop-up">
        <path d="M7 14l5-5 5 5z">
      </path></g>
      <g id="arrow-drop-down">
        <path d="M7 10l5 5 5-5z"></path>
      </g>
      <g id="arrow-forward">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
      </g>
      <g id="arrow-right">
        <path d="M10 7l5 5-5 5z"></path>
      </g>
      
      <g id="cancel">
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z">
        </path>
      </g>
      <g id="check">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
      </g>
      <g id="check-circle">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
        </path>
      </g>
      <g id="chevron-left">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
      </g>
      <g id="chevron-right">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
      </g>
      <g id="clear">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
        </path>
      </g>
      <g id="close">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
        </path>
      </g>
      <g id="computer">
        <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z">
        </path>
      </g>
      <g id="delete">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
      </g>
      <g id="domain">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z">
        </path>
      </g>
      <g id="error">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z">
        </path>
      </g>
      <g id="error-outline">
        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z">
        </path>
      </g>
      <g id="expand-less">
        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
      </g>
      <g id="expand-more">
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
      </g>
      <g id="extension">
        <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z">
        </path>
      </g>
      <g id="file-download">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
      </g>
      
      <g id="fullscreen">
        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
      </g>
      <g id="group">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z">
        </path>
      </g>
      <g id="help-outline">
        <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z">
        </path>
      </g>
      <g id="info">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
        </path>
      </g>
      <g id="info-outline">
        <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z">
        </path>
      </g>
      <g id="insert-drive-file">
        <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z">
        </path>
      </g>
      <g id="location-on">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z">
        </path>
      </g>
      <g id="mic">
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z">
        </path>
      </g>
      <g id="more-vert">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
        </path>
      </g>
      <g id="open-in-new">
        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z">
        </path>
      </g>
      <g id="person">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
        </path>
      </g>
      <g id="print">
        <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z">
        </path>
      </g>
      <g id="search">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
        </path>
      </g>
      <g id="security">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z">
        </path>
      </g>
      
      <!-- The <g> IDs are exposed as global variables in Vulcanized mode, which
        conflicts with the "settings" namespace of MD Settings. Using an "_icon"
        suffix prevents the naming conflict. -->
      <g id="settings_icon">
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z">
        </path>
      </g>
      <g id="star">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
      </g>
      <g id="sync">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z">
        </path>
      </g>
      <g id="videocam">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z">
        </path>
      </g>
      <g id="warning">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg>
`;document.head.appendChild(template$3.content);const template$4=document.createElement("template");template$4.innerHTML=`<dom-module id="cr-hidden-style" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-hidden-style">[hidden], :host([hidden]) {\n  display: none !important;\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$4.content.cloneNode(true));const template$5=document.createElement("template");template$5.innerHTML=`<dom-module id="cr-shared-style" assetpath="chrome://resources/">\n  <template>\n    <style include="cr-hidden-style cr-icons" scope="cr-shared-style">html, :host {\n  --scrollable-border-color: var(--google-grey-refresh-300);\n}\n\n@media (prefers-color-scheme: dark) {\nhtml, :host {\n  --scrollable-border-color: var(--google-grey-refresh-700);\n}\n\n}\n\n[actionable] {\n  cursor: pointer;\n}\n\n.hr {\n  border-top: var(--cr-separator-line);\n}\n\niron-list.cr-separators > *:not([first]) {\n  border-top: var(--cr-separator-line);\n}\n\n[scrollable] {\n  border-color: transparent;\n        border-style: solid;\n        border-width: 1px 0;\n        overflow-y: auto;\n}\n\n[scrollable].is-scrolled {\n  border-top-color: var(--scrollable-border-color);\n}\n\n[scrollable].can-scroll:not(.scrolled-to-bottom) {\n  border-bottom-color: var(--scrollable-border-color);\n}\n\n[scrollable] iron-list > :not(.no-outline):focus, [selectable]:focus, [selectable] > :focus {\n  background-color: var(--cr-focused-item-color);\n        outline: none;\n}\n\n.scroll-container {\n  display: flex;\n        flex-direction: column;\n        min-height: 1px;\n}\n\n[selectable] > * {\n  cursor: pointer;\n}\n\n.cr-centered-card-container {\n  box-sizing: border-box;\n        display: block;\n        height: inherit;\n        margin: 0 auto;\n        max-width: var(--cr-centered-card-max-width);\n        min-width: 550px;\n        position: relative;\n        width: calc(100% * var(--cr-centered-card-width-percentage));\n}\n\n.cr-container-shadow {\n  box-shadow: inset 0 5px 6px -3px rgba(0, 0, 0, .4);\n        height: var(--cr-container-shadow-height);\n        left: 0;\n        margin: 0 0 var(--cr-container-shadow-margin);\n        opacity: 0;\n        pointer-events: none;\n        position: relative;\n        right: 0;\n        top: 0;\n        transition: opacity 500ms;\n        z-index: 1;\n}\n\n#cr-container-shadow-bottom {\n  margin-bottom: 0;\n        margin-top: var(--cr-container-shadow-margin);\n        transform: scaleY(-1);\n}\n\n#cr-container-shadow-top.has-shadow, #cr-container-shadow-bottom.has-shadow {\n  opacity: var(--cr-container-shadow-max-opacity);\n}\n\n.cr-row {\n  align-items: center;\n        border-top: var(--cr-separator-line);\n        display: flex;\n        min-height: var(--cr-section-min-height);\n        padding: 0 var(--cr-section-padding);\n}\n\n.cr-row.first, .cr-row.continuation {\n  border-top: none;\n}\n\n.cr-row-gap {\n  padding-inline-start: 16px;\n}\n\n.cr-button-gap {\n  margin-inline-start: 8px;\n}\n\npaper-tooltip {\n  --paper-tooltip_-_font-size:  92.31%; --paper-tooltip_-_font-weight:  500; --paper-tooltip_-_max-width:  330px; --paper-tooltip_-_min-width:  var(--paper-tooltip-min-width, 200px); --paper-tooltip_-_padding:  var(--paper-tooltip-padding, 10px 8px);\n}\n\n.cr-padded-text {\n  padding-block-end: var(--cr-section-vertical-padding);\n        padding-block-start: var(--cr-section-vertical-padding);\n}\n\n.cr-title-text {\n  color: var(--cr-title-text-color);\n        font-size: 107.6923%; \n        font-weight: 500;\n}\n\n.cr-secondary-text {\n  color: var(--cr-secondary-text-color);\n        font-weight: 400;\n}\n\n.cr-form-field-label {\n  color: var(--cr-form-field-label-color);\n        display: block;\n        font-size: var(--cr-form-field-label-font-size);\n        font-weight: 500;\n        letter-spacing: .4px;\n        line-height: var(--cr-form-field-label-line-height);\n        margin-bottom: 8px;\n}\n\n.cr-vertical-tab {\n  align-items: center;\n        display: flex;\n}\n\n.cr-vertical-tab::before {\n  border-radius: 0 3px 3px 0;\n        content: '';\n        display: block;\n        flex-shrink: 0;\n        height: var(--cr-vertical-tab-height, 100%);\n        width: 4px;\n}\n\n.cr-vertical-tab.selected::before {\n  background: var(--cr-vertical-tab-selected-color, var(--cr-checked-color));\n}\n\n:host-context([dir=rtl]) .cr-vertical-tab::before {\n  transform: scaleX(-1);\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$5.content.cloneNode(true));
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const $_documentContainer$1=document.createElement("template");$_documentContainer$1.setAttribute("style","display: none;");$_documentContainer$1.innerHTML=`<dom-module id="paper-spinner-styles">\n  <template>\n    <style scope="paper-spinner-styles">:host {\n  display: inline-block;\n        position: relative;\n        width: 28px;\n        height: 28px;\n\n        \n        --paper-spinner-container-rotation-duration: 1568ms;\n\n        \n        --paper-spinner-expand-contract-duration: 1333ms;\n\n        \n        --paper-spinner-full-cycle-duration: 5332ms;\n\n        \n        --paper-spinner-cooldown-duration: 400ms;\n}\n\n#spinnerContainer {\n  width: 100%;\n        height: 100%;\n\n        \n        direction: ltr;\n}\n\n#spinnerContainer.active {\n  animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;\n}\n\n@-webkit-keyframes container-rotate {\nto {\n  -webkit-transform: rotate(360deg)\n}\n\n}\n\n@keyframes container-rotate {\nto {\n  transform: rotate(360deg)\n}\n\n}\n\n.spinner-layer {\n  position: absolute;\n        width: 100%;\n        height: 100%;\n        opacity: 0;\n        white-space: nowrap;\n        color: var(--paper-spinner-color, var(--google-blue-500));\n}\n\n.layer-1 {\n  color: var(--paper-spinner-layer-1-color, var(--google-blue-500));\n}\n\n.layer-2 {\n  color: var(--paper-spinner-layer-2-color, var(--google-red-500));\n}\n\n.layer-3 {\n  color: var(--paper-spinner-layer-3-color, var(--google-yellow-500));\n}\n\n.layer-4 {\n  color: var(--paper-spinner-layer-4-color, var(--google-green-500));\n}\n\n.active .spinner-layer {\n  animation-name: fill-unfill-rotate;\n        animation-duration: var(--paper-spinner-full-cycle-duration);\n        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        animation-iteration-count: infinite;\n        opacity: 1;\n}\n\n.active .spinner-layer.layer-1 {\n  animation-name: fill-unfill-rotate, layer-1-fade-in-out;\n}\n\n.active .spinner-layer.layer-2 {\n  animation-name: fill-unfill-rotate, layer-2-fade-in-out;\n}\n\n.active .spinner-layer.layer-3 {\n  animation-name: fill-unfill-rotate, layer-3-fade-in-out;\n}\n\n.active .spinner-layer.layer-4 {\n  animation-name: fill-unfill-rotate, layer-4-fade-in-out;\n}\n\n@-webkit-keyframes fill-unfill-rotate {\n12.5% {\n  -webkit-transform: rotate(135deg)\n}\n\n25% {\n  -webkit-transform: rotate(270deg)\n}\n\n37.5% {\n  -webkit-transform: rotate(405deg)\n}\n\n50% {\n  -webkit-transform: rotate(540deg)\n}\n\n62.5% {\n  -webkit-transform: rotate(675deg)\n}\n\n75% {\n  -webkit-transform: rotate(810deg)\n}\n\n87.5% {\n  -webkit-transform: rotate(945deg)\n}\n\nto {\n  -webkit-transform: rotate(1080deg)\n}\n\n}\n\n@keyframes fill-unfill-rotate {\n12.5% {\n  transform: rotate(135deg)\n}\n\n25% {\n  transform: rotate(270deg)\n}\n\n37.5% {\n  transform: rotate(405deg)\n}\n\n50% {\n  transform: rotate(540deg)\n}\n\n62.5% {\n  transform: rotate(675deg)\n}\n\n75% {\n  transform: rotate(810deg)\n}\n\n87.5% {\n  transform: rotate(945deg)\n}\n\nto {\n  transform: rotate(1080deg)\n}\n\n}\n\n@-webkit-keyframes layer-1-fade-in-out {\n0% {\n  opacity: 1\n}\n\n25% {\n  opacity: 1\n}\n\n26% {\n  opacity: 0\n}\n\n89% {\n  opacity: 0\n}\n\n90% {\n  opacity: 1\n}\n\nto {\n  opacity: 1\n}\n\n}\n\n@keyframes layer-1-fade-in-out {\n0% {\n  opacity: 1\n}\n\n25% {\n  opacity: 1\n}\n\n26% {\n  opacity: 0\n}\n\n89% {\n  opacity: 0\n}\n\n90% {\n  opacity: 1\n}\n\nto {\n  opacity: 1\n}\n\n}\n\n@-webkit-keyframes layer-2-fade-in-out {\n0% {\n  opacity: 0\n}\n\n15% {\n  opacity: 0\n}\n\n25% {\n  opacity: 1\n}\n\n50% {\n  opacity: 1\n}\n\n51% {\n  opacity: 0\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@keyframes layer-2-fade-in-out {\n0% {\n  opacity: 0\n}\n\n15% {\n  opacity: 0\n}\n\n25% {\n  opacity: 1\n}\n\n50% {\n  opacity: 1\n}\n\n51% {\n  opacity: 0\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@-webkit-keyframes layer-3-fade-in-out {\n0% {\n  opacity: 0\n}\n\n40% {\n  opacity: 0\n}\n\n50% {\n  opacity: 1\n}\n\n75% {\n  opacity: 1\n}\n\n76% {\n  opacity: 0\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@keyframes layer-3-fade-in-out {\n0% {\n  opacity: 0\n}\n\n40% {\n  opacity: 0\n}\n\n50% {\n  opacity: 1\n}\n\n75% {\n  opacity: 1\n}\n\n76% {\n  opacity: 0\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@-webkit-keyframes layer-4-fade-in-out {\n0% {\n  opacity: 0\n}\n\n65% {\n  opacity: 0\n}\n\n75% {\n  opacity: 1\n}\n\n90% {\n  opacity: 1\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@keyframes layer-4-fade-in-out {\n0% {\n  opacity: 0\n}\n\n65% {\n  opacity: 0\n}\n\n75% {\n  opacity: 1\n}\n\n90% {\n  opacity: 1\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n.circle-clipper {\n  display: inline-block;\n        position: relative;\n        width: 50%;\n        height: 100%;\n        overflow: hidden;\n}\n\n.spinner-layer::after {\n  content: '';\n        left: 45%;\n        width: 10%;\n        border-top-style: solid;\n}\n\n.spinner-layer::after, .circle-clipper .circle {\n  box-sizing: border-box;\n        position: absolute;\n        top: 0;\n        border-width: var(--paper-spinner-stroke-width, 3px);\n        border-radius: 50%;\n}\n\n.circle-clipper .circle {\n  bottom: 0;\n        width: 200%;\n        border-style: solid;\n        border-bottom-color: transparent !important;\n}\n\n.circle-clipper.left .circle {\n  left: 0;\n        border-right-color: transparent !important;\n        transform: rotate(129deg);\n}\n\n.circle-clipper.right .circle {\n  left: -100%;\n        border-left-color: transparent !important;\n        transform: rotate(-129deg);\n}\n\n.active .gap-patch::after, .active .circle-clipper .circle {\n  animation-duration: var(--paper-spinner-expand-contract-duration);\n        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        animation-iteration-count: infinite;\n}\n\n.active .circle-clipper.left .circle {\n  animation-name: left-spin;\n}\n\n.active .circle-clipper.right .circle {\n  animation-name: right-spin;\n}\n\n@-webkit-keyframes left-spin {\n0% {\n  -webkit-transform: rotate(130deg)\n}\n\n50% {\n  -webkit-transform: rotate(-5deg)\n}\n\nto {\n  -webkit-transform: rotate(130deg)\n}\n\n}\n\n@keyframes left-spin {\n0% {\n  transform: rotate(130deg)\n}\n\n50% {\n  transform: rotate(-5deg)\n}\n\nto {\n  transform: rotate(130deg)\n}\n\n}\n\n@-webkit-keyframes right-spin {\n0% {\n  -webkit-transform: rotate(-130deg)\n}\n\n50% {\n  -webkit-transform: rotate(5deg)\n}\n\nto {\n  -webkit-transform: rotate(-130deg)\n}\n\n}\n\n@keyframes right-spin {\n0% {\n  transform: rotate(-130deg)\n}\n\n50% {\n  transform: rotate(5deg)\n}\n\nto {\n  transform: rotate(-130deg)\n}\n\n}\n\n#spinnerContainer.cooldown {\n  animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);\n}\n\n@-webkit-keyframes fade-out {\n0% {\n  opacity: 1\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@keyframes fade-out {\n0% {\n  opacity: 1\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n</style>\n  </template>\n</dom-module>`;document.head.appendChild($_documentContainer$1.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const PaperSpinnerBehavior={properties:{active:{type:Boolean,value:false,reflectToAttribute:true,observer:"__activeChanged"},alt:{type:String,value:"loading",observer:"__altChanged"},__coolingDown:{type:Boolean,value:false}},__computeContainerClasses:function(active,coolingDown){return[active||coolingDown?"active":"",coolingDown?"cooldown":""].join(" ")},__activeChanged:function(active,old){this.__setAriaHidden(!active);this.__coolingDown=!active&&old},__altChanged:function(alt){if(alt==="loading"){this.alt=this.getAttribute("aria-label")||alt}else{this.__setAriaHidden(alt==="");this.setAttribute("aria-label",alt)}},__setAriaHidden:function(hidden){var attr="aria-hidden";if(hidden){this.setAttribute(attr,"true")}else{this.removeAttribute(attr)}},__reset:function(){this.active=false;this.__coolingDown=false}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const template$6=html`<style include="paper-spinner-styles"></style>

  <div id="spinnerContainer" class-name="[[__computeContainerClasses(active, __coolingDown)]]" on-animationend="__reset" on-webkit-animation-end="__reset">
    <div class="spinner-layer">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
`;template$6.setAttribute("strip-whitespace","");Polymer({_template:template$6,is:"paper-spinner-lite",behaviors:[PaperSpinnerBehavior]});const template$7=html`<iron-iconset-svg name="settings20" size="20">
  <svg>
    <defs>
      <g id="credit-card"><path d="M16.4,4 L3.6,4 C2.716,4 2.008,4.7271875 2.008,5.625 L2,15.375 C2,16.2728125 2.716,17 3.6,17 L16.4,17 C17.284,17 18,16.2728125 18,15.375 L18,5.625 C18,4.7271875 17.284,4 16.4,4 Z M16.5,15 L3.5,15 L3.5,10 L16.5,10 L16.5,15 Z M16.5,7 L3.5,7 L3.5,5.5 L16.5,5.5 L16.5,7 Z"></path></g>
      <g id="data"><path d="M0 0h20v20H0z" fill="none" fill-rule="evenodd"></path><path d="M6.5 7v9H4V7h2.5zm5-3v12H9V4h2.5zm5 7v5H14v-5h2.5z"></path></g>
      <g id="experiment"><path d="M17.2667 14.7583L12.5 8.18332V4.23332H14.1667V2.56665H5.83332V4.23332H7.49998V8.17498L2.61665 14.9166C2.24998 15.425 2.19998 16.0917 2.48332 16.65C2.76665 17.2083 3.34165 17.5583 3.96665 17.5583H16.05C16.9667 17.5583 17.7167 16.8083 17.7167 15.8917C17.7167 15.4583 17.5416 15.0583 17.2667 14.7583Z" fill="#5F6368"></path></g>
      <g id="googleg"><path d="M16.58 8H9v2.75h4.47c-.24 1.2-1.42 3.27-4.47 3.27-2.72 0-4.93-2.25-4.93-5.02S6.28 3.98 9 3.98c1.54 0 2.57.66 3.17 1.22l2.19-2.12C12.97 1.79 11.16 1 9 1 4.58 1 1 4.58 1 9s3.58 8 8 8c4.62 0 7.68-3.25 7.68-7.82 0-.46-.04-.83-.1-1.18z"></path></g>
      <g id="incognito" fill="#5F6368"><circle cx="6.8" cy="12.964" r="1.764"></circle><path d="M10 0C4.473 0 0 4.473 0 10s4.473 10 10 10 10-4.473 10-10S15.527 0 10 0zM7.619 4.1a.696.696 0 0 1 .881-.419l1.473.492 1.463-.492a.716.716 0 0 1 .883.419l1.608 4.291H6.02l1.6-4.291zm5.517 11.328a2.463 2.463 0 0 1-2.445-2.256c-.682-.436-1.237-.162-1.455-.017a2.45 2.45 0 0 1-2.445 2.263 2.471 2.471 0 0 1-2.464-2.463 2.47 2.47 0 0 1 2.463-2.464c1.165 0 2.138.809 2.391 1.9a1.934 1.934 0 0 1 1.546.009 2.462 2.462 0 0 1 2.392-1.909 2.47 2.47 0 0 1 2.462 2.463 2.435 2.435 0 0 1-2.445 2.474zM16.31 9.8H3.637v-.709H16.31V9.8h-.001z"></path><circle cx="13.136" cy="12.964" r="1.764"></circle></g>
      <g id="location-on"><path d="M10,2 C6.95928571,2 4.5,4.504 4.5,7.6 C4.5,11.8 10,18 10,18 C10,18 15.5,11.8 15.5,7.6 C15.5,4.504 13.0407143,2 10,2 Z M10,9.5 C8.896,9.5 8,8.604 8,7.5 C8,6.396 8.896,5.5 10,5.5 C11.104,5.5 12,6.396 12,7.5 C12,8.604 11.104,9.5 10,9.5 Z"></path></g>
      <g id="vpn-key"><path d="M10.4727273,8 C9.87272727,6.2525 8.26181818,5 6.36363636,5 C3.95272727,5 2,7.01375 2,9.5 C2,11.98625 3.95272727,14 6.36363636,14 C8.26181818,14 9.87272727,12.7475 10.4727273,11 L13.6363636,11 L13.6363636,14 L16.5454545,14 L16.5454545,11 L18,11 L18,8 L10.4727273,8 Z M6.36363636,11 C5.56,11 4.90909091,10.32875 4.90909091,9.5 C4.90909091,8.67125 5.56,8 6.36363636,8 C7.16727273,8 7.81818182,8.67125 7.81818182,9.5 C7.81818182,10.32875 7.16727273,11 6.36363636,11 Z"></path></g>
      <g id="cloud-off"><path d="M16.4732571,13.3443682 C16.8002856,12.9882746 17,12.5134184 17,11.9922 C17,10.8882 16.104,9.9922 15,9.9922 L13.494,9.9922 L13.494,9.0002 C13.494,7.0672 11.927,5.5002 9.994,5.5002 C9.5847901,5.5002 9.1930204,5.57089988 8.82954884,5.70065995 L7.33083687,4.20194798 C8.11843435,3.75577808 9.02717677,3.5002 10,3.5002 C12.71,3.5002 14.957,5.4612 15.411,8.0412 C17.424,8.2502 19,9.9312 19,12.0002 C19,13.0718701 18.5784721,14.0451601 17.8921876,14.7632987 L16.4732571,13.3443682 Z M17.8711111,17 L16.8711111,18 L14.8713111,16.0002 L6,16.0002 C3.239,16.0002 1,13.7622 1,11.0002 C1,8.58475294 2.71868905,6.59044755 4.99627833,6.12516722 L2,3.12888889 L3,2.12888889 L17.8711111,17 Z M6.86331111,7.9922 L6,7.9922 C4.343,7.9922 3,9.3352 3,10.9922 C3,12.6492 4.343,13.9922 6,13.9922 L12.8633111,13.9922 L6.86331111,7.9922 Z"></path></g>
      <!-- The polygon ("+" shape) within this icon will always be filled with
           the color #4285F4. Any color fills specified programmatically will
           only be applied to the outer layer. -->
      <g id="printer-add"><path d="M17.8734304,8.29826826 C17.2839707,8.10470383 16.6542128,8 16,8 C13.3875623,8 11.1650842,9.66961525 10.3414114,12 L7,12 L7,15 L10.0829584,15 C10.2034032,15.7179235 10.4513404,16.3926158 10.8026932,17 L5,17 L5,14 L2,14 L2,9 C2,7.8954305 2.8954305,7 4,7 L5,7 L5,3 L15,3 L15,7 L16,7 C16.8576527,7 17.5892179,7.53984453 17.8734304,8.29826826 Z M7,5 L7,7 L13,7 L13,5 L7,5 Z"></path><polygon fill="#4285F4" points="17 13 19 13 19 15 17 15 17 17 15 17 15 15 13 15 13 13 15 13 15 11 17 11"></polygon></g>
      <g id="safety-check"><path d="M10,1 L18,4.27272727 L18,9.18181818 C18,13.7227273 14.5866667,17.9690909 10,19 C5.41333333,17.9690909 2,13.7227273 2,9.18181818 L2,9.18181818 L2,4.27272727 L10,1 Z M13.57,6.38363636 L8.44444444,11.7754545 L6.43,9.66454545 L5.33333333,10.8181818 L8.44444444,14.0909091 L14.6666667,7.54545455 L13.57,6.38363636z"></path></g>
    </defs>
  </svg>
</iron-iconset-svg>
<iron-iconset-svg name="settings" size="24">
  <svg>
    <defs>
      <!-- Ads icon in the Content Settings -->
      <g id="ads">
        <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H5V8h14v10z"></path>
      </g>

      <!-- Cookie SVG obtained from rolfe@ -->
      <g id="cookie">
        <path d="M15.5 7.5V7c0-.98-.5-1.5-1.5-1.5h-.5c-.276 0-.5-.224-.5-.5V3c0-.98-1-1-1-1C6.3 2 1.712 6.77 2.014 12.54c.265 5.046 4.4 9.18 9.448 9.446C17.23 22.288 22 17.7 22 12v-1c0-.553-.447-1-1-1h-1.998c-.277 0-.502-.225-.502-.502V9c0-.938-.48-1.48-1.5-1.5h-1.5zm-9.706 4.972c-1.057.2-1.966-.71-1.766-1.766.112-.587.592-1.067 1.18-1.178 1.055-.2 1.965.71 1.764 1.765-.11.588-.59 1.068-1.178 1.18zm1.734-5.178c-.2-1.057.71-1.966 1.766-1.766.587.11 1.067.59 1.178 1.178.2 1.057-.708 1.966-1.765 1.766-.587-.11-1.068-.59-1.18-1.178zm3.766 12.178c-1.057.2-1.966-.71-1.766-1.766.112-.587.592-1.067 1.18-1.178 1.056-.2 1.965.71 1.764 1.766-.11.587-.59 1.067-1.178 1.178zM11.5 14c-.828 0-1.5-.67-1.5-1.5s.672-1.5 1.5-1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zm5 2c-.828 0-1.5-.67-1.5-1.5s.672-1.5 1.5-1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" fill-rule="evenodd"></path>
      </g>

      <!-- Cookies Settings SVG -->
      <g id="block"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></g>

      <!-- The Google "G" icon in the Clear Browsing Data dialog. -->
      <g id="googleg">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
        <path fill="none" d="M1 1h22v22H1z"></path>
      </g>

      <!-- Permissions & Content Settings SVG -->
      <g id="permissions">
        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
      </g>

      <!-- Protected Content SVG -->
      <g id="protected-content">
        <path d="M10,15 L6,11.1783439 L7.41,9.83121019 L10,12.2961783 L16.59,6 L18,7.3566879 L10,15 Z M21,3 L3,3 C1.89,3 1,3.89 1,5 L1,17 C1,18.1 1.89,19 3,19 L8,19 L8,21 L16,21 L16,19 L21,19 C22.1,19 22.99,18.1 22.99,17 L23,5 C23,3.89 22.1,3 21,3 Z M21,17 L3,17 L3,5 L21,5 L21,17 Z"></path>
      </g>

      <!-- Safebrowsing SVG -->
      <g id="public"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></g>
      <g id="web"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"></path></g>

      <!-- vr-headset SVG obtained from amyroberts@ -->
      <g id="vr-headset"><path d="M20.907 6.678A2.54 2.54 0 0019.16 6H4.9c-.659 0-1.28.24-1.747.678a2.229 2.229 0 00-.723 1.637v7.37c0 .618.256 1.2.723 1.637A2.54 2.54 0 004.9 18h3.424c.448 0 .884-.114 1.268-.33.384-.216.697-.522.908-.893l.967-1.68a.572.572 0 01.16-.74.67.67 0 01.806 0c.235.18.302.49.16.74l.967 1.68c.21.365.524.677.908.893.384.216.82.33 1.268.33h3.424c.659 0 1.28-.24 1.747-.678.467-.437.723-1.02.723-1.637v-7.37c0-.618-.256-1.2-.723-1.637zM7.83 13.8c-1.328 0-2.4-1.08-2.4-2.4 0-1.32 1.08-2.4 2.4-2.4 1.32 0 2.4 1.08 2.4 2.4 0 1.32-1.072 2.4-2.4 2.4zm8.4 0c-1.328 0-2.4-1.08-2.4-2.4 0-1.32 1.08-2.4 2.4-2.4 1.32 0 2.4 1.08 2.4 2.4 0 1.32-1.072 2.4-2.4 2.4z"></path></g>

      <!--
      These icons are copied from Polymer's iron-icons and kept in sorted order.
      See http://goo.gl/Y1OdAq for instructions on adding additional icons.
      -->
      <g id="accessibility"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g>
      <g id="apps"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g>
      <g id="assignment"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></g>

      <g id="build"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></g>

      <g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
      <g id="clipboard"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></g>
      <g id="cloud"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></g>
      <g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
      <g id="content-copy"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>
      <g id="exit-to-app"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
      <g id="hid-device"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
      <g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>
      <g id="midi"><path d="M21,19.1H3V5h18V19.1z M21,3H3C1.9,3,1,3.9,1,5v14c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V5C23,3.9,22.1,3,21,3z"></path><path fill="none" d="M21,19.1H3V5h18V19.1z M21,3H3C1.9,3,1,3.9,1,5v14c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V5C23,3.9,22.1,3,21,3z"></path><path d="M14,5h3v8h-3V5z"></path><path d="M15,12h1v8h-1V12z"></path><path fill="none" d="M0,0h24v24H0V0z"></path><rect x="7" y="5" width="3" height="8"></rect><rect x="8" y="12" width="1" height="8"></rect></g>
      <g id="music-note"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path></g>
      <g id="notifications"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></g>
      <g id="pdf"><path d="M7 11.5h1v-1H7v1zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5c0 .83-.67 1.5-1.5 1.5H7v2H5.5V9H8c.83 0 1.5.67 1.5 1.5v1zm10-1H17v1h1.5V13H17v2h-1.5V9h4v1.5zm-5 3c0 .83-.67 1.5-1.5 1.5h-2.5V9H13c.83 0 1.5.67 1.5 1.5v3zm-2.5 0h1v-3h-1v3z"></path><path fill="none" d="M0 0h24v24H0z"></path></g>
      <g id="palette"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
      <g id="payment-handler"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
      <g id="insecure-content"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
      <g id="person"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></g>
      <g id="photo"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></g>
      <g id="power-settings-new"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></g>
      <g id="protocol-handler"><path d="M21.72 11.33l-6.644-7.035a.97.97 0 0 0-1.38-.01l-1.67 1.72-1.617-1.712a.97.97 0 0 0-1.38-.01l-6.737 6.935c-.187.191-.29.447-.292.719-.002.272.099.529.28.722l6.644 7.034a.949.949 0 0 0 1.38.011l1.671-1.718 1.615 1.71a.949.949 0 0 0 1.381.01l6.74-6.935a1.054 1.054 0 0 0 .01-1.44zM6.947 12.464l3.657 3.785-.974.98-5.273-5.456 5.349-5.378.929.962-3.677 3.7a.998.998 0 0 0-.292.702 1 1 0 0 0 .28.705zm7.35 4.768l-.931-.963 3.68-3.7a1.012 1.012 0 0 0 .007-1.407l-3.656-3.784.974-.98 5.273 5.456-5.348 5.378z"></path></g>
      <g id="refresh"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></g>
      <g id="restore"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
      <g id="rotate-right"><path d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"></path></g>
      <g id="save-original"><path d="M11 17H6V4h5v4h4v2h2V7l-5-5H6c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h5v-2zm9 5h-8v-2h8v2zm0-7l-4 4-4-4h3v-3h2v3h3z"></path></g>
      <g id="sensors"><path d="M10 8.5c-0.8 0-1.5 0.7-1.5 1.5s0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5S10.8 8.5 10 8.5z M7.6 5.8 C6.2 6.7 5.2 8.2 5.2 10c0 1.8 1 3.4 2.4 4.2l0.8-1.4c-1-0.6-1.6-1.6-1.6-2.8c0-1.2 0.6-2.2 1.6-2.8L7.6 5.8z M14.8 10 c0-1.8-1-3.4-2.4-4.2l-0.8 1.4c0.9 0.6 1.6 1.6 1.6 2.8c0 1.2-0.6 2.2-1.6 2.8l0.8 1.4C13.8 13.4 14.8 11.8 14.8 10z M6 3 c-2.4 1.4-4 4-4 7c0 3 1.6 5.6 4 7l0.8-1.4c-1.9-1.1-3.2-3.2-3.2-5.6c0-2.4 1.3-4.5 3.2-5.6L6 3z M13.2 4.4 c1.9 1.1 3.2 3.2 3.2 5.6c0 2.4-1.3 4.5-3.2 5.6L14 17c2.4-1.4 4-4 4-7c0-3-1.6-5.6-4-7L13.2 4.4z"></path></g>
      <g id="serial-port"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zM6 7h5v5H6zm6 4h4v6h-4z"></path></g>
      <g id="sync-disabled"><path d="M10 6.35V4.26c-.8.21-1.55.54-2.23.96l1.46 1.46c.25-.12.5-.24.77-.33zm-7.14-.94l2.36 2.36C4.45 8.99 4 10.44 4 12c0 2.21.91 4.2 2.36 5.64L4 20h6v-6l-2.24 2.24C6.68 15.15 6 13.66 6 12c0-1 .25-1.94.68-2.77l8.08 8.08c-.25.13-.5.25-.77.34v2.09c.8-.21 1.55-.54 2.23-.96l2.36 2.36 1.27-1.27L4.14 4.14 2.86 5.41zM20 4h-6v6l2.24-2.24C17.32 8.85 18 10.34 18 12c0 1-.25 1.94-.68 2.77l1.46 1.46C19.55 15.01 20 13.56 20 12c0-2.21-.91-4.2-2.36-5.64L20 4z"></path></g>
      <g id="sync-problem"><path d="M3 12c0 2.21.91 4.2 2.36 5.64L3 20h6v-6l-2.24 2.24C5.68 15.15 5 13.66 5 12c0-2.61 1.67-4.83 4-5.65V4.26C5.55 5.15 3 8.27 3 12zm8 5h2v-2h-2v2zM21 4h-6v6l2.24-2.24C18.32 8.85 19 10.34 19 12c0 2.61-1.67 4.83-4 5.65v2.09c3.45-.89 6-4.01 6-7.74 0-2.21-.91-4.2-2.36-5.64L21 4zm-10 9h2V7h-2v6z"></path></g>
      <g id="usb"><path d="M15 7v4h1v2h-3V5h2l-3-4-3 4h2v8H8v-2.07c.7-.37 1.2-1.08 1.2-1.93 0-1.21-.99-2.2-2.2-2.2-1.21 0-2.2.99-2.2 2.2 0 .85.5 1.56 1.2 1.93V13c0 1.11.89 2 2 2h3v3.05c-.71.37-1.2 1.1-1.2 1.95 0 1.22.99 2.2 2.2 2.2 1.21 0 2.2-.98 2.2-2.2 0-.85-.49-1.58-1.2-1.95V15h3c1.11 0 2-.89 2-2v-2h1V7h-4z"></path></g>
      <g id="volume-up"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g>
      <g id="bluetooth-scanning"><path d="M14.24 12.01l2.32 2.32c.28-.72.44-1.51.44-2.33 0-.82-.16-1.59-.43-2.31l-2.33 2.32zm5.29-5.3l-1.26 1.26c.63 1.21.98 2.57.98 4.02s-.36 2.82-.98 4.02l1.2 1.2a9.936 9.936 0 0 0 1.54-5.31c-.01-1.89-.55-3.67-1.48-5.19zm-3.82 1L10 2H9v7.59L4.41 5 3 6.41 8.59 12 3 17.59 4.41 19 9 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM11 5.83l1.88 1.88L11 9.59V5.83zm1.88 10.46L11 18.17v-3.76l1.88 1.88z"></path></g>
      <g id="bluetooth"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"></path></g>

      <g id="web"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"></path></g>

      <g id="window-placement"><path d="M21 1H8c-1.1 0-2 .9-2 2v6H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2v-6h3c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-5 20H3v-8h13v8zm5-8h-3v-2c0-1.1-.9-2-2-2H8V5h13v8z"></path></g>
      <g id="zoom-in"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
      <g id="font-access"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM10.69 6h2.6l4.51 12h-2.5l-1.01-2.87H9.7L8.7 18H6.2l4.49-12zm2.87 7.06l-1.06-3.02-.43-1.44h-.13l-.44 1.44-1.07 3.02h3.13z"></path></g>
    </defs>
  </svg>
</iron-iconset-svg>
`;document.head.appendChild(template$7.content);// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const parseHtmlSubset=function(){const allowAttribute=(node,value)=>true;const allowedAttributes=new Map([["href",(node,value)=>node.tagName==="A"&&(value.startsWith("chrome://")||value.startsWith("https://"))],["target",(node,value)=>node.tagName==="A"&&value==="_blank"]]);const allowedOptionalAttributes=new Map([["class",allowAttribute],["id",allowAttribute],["is",(node,value)=>value==="action-link"||value===""],["role",(node,value)=>value==="link"],["src",(node,value)=>node.tagName==="IMG"&&value.startsWith("chrome://")],["tabindex",allowAttribute]]);const allowedTags=new Set(["A","B","BR","DIV","P","PRE","SPAN","STRONG"]);const allowedOptionalTags=new Set(["IMG"]);let unsanitizedPolicy;function mergeTags(optTags){const clone=new Set(allowedTags);optTags.forEach((str=>{const tag=str.toUpperCase();if(allowedOptionalTags.has(tag)){clone.add(tag)}}));return clone}function mergeAttrs(optAttrs){const clone=new Map([...allowedAttributes]);optAttrs.forEach((key=>{if(allowedOptionalAttributes.has(key)){clone.set(key,allowedOptionalAttributes.get(key))}}));return clone}function walk(n,f){f(n);for(let i=0;i<n.childNodes.length;i++){walk(n.childNodes[i],f)}}function assertElement(tags,node){if(!tags.has(node.tagName)){throw Error(node.tagName+" is not supported")}}function assertAttribute(attrs,attrNode,node){const n=attrNode.nodeName;const v=attrNode.nodeValue;if(!attrs.has(n)||!attrs.get(n)(node,v)){throw Error(node.tagName+"["+n+'="'+v+'"] is not supported')}}return function(s,opt_extraTags,opt_extraAttrs){const tags=opt_extraTags?mergeTags(opt_extraTags):allowedTags;const attrs=opt_extraAttrs?mergeAttrs(opt_extraAttrs):allowedAttributes;const doc=document.implementation.createHTMLDocument("");const r=doc.createRange();r.selectNode(doc.body);if(window.trustedTypes){if(!unsanitizedPolicy){unsanitizedPolicy=trustedTypes.createPolicy("parse-html-subset",{createHTML:untrustedHTML=>untrustedHTML})}s=unsanitizedPolicy.createHTML(s)}const df=r.createContextualFragment(s);walk(df,(function(node){switch(node.nodeType){case Node.ELEMENT_NODE:assertElement(tags,node);const nodeAttrs=node.attributes;for(let i=0;i<nodeAttrs.length;++i){assertAttribute(attrs,nodeAttrs[i],node)}break;case Node.COMMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:case Node.TEXT_NODE:break;default:throw Error("Node type "+node.nodeType+" is not supported")}}));return df}}();// Copyright 2015 The Chromium Authors. All rights reserved.
const I18nBehavior={i18nRaw_(id,var_args){return arguments.length===1?loadTimeData.getString(id):loadTimeData.getStringF.apply(loadTimeData,arguments)},i18n(id,var_args){const rawString=this.i18nRaw_.apply(this,arguments);return parseHtmlSubset("<b>"+rawString+"</b>").firstChild.textContent},i18nAdvanced(id,opts){opts=opts||{};const args=[id].concat(opts.substitutions||[]);const rawString=this.i18nRaw_.apply(this,args);return loadTimeData.sanitizeInnerHtml(rawString,opts)},i18nDynamic(locale,id,var_args){return this.i18n.apply(this,Array.prototype.slice.call(arguments,1))},i18nRecursive(locale,id,var_args){let args=Array.prototype.slice.call(arguments,2);if(args.length>0){const self=this;args=args.map((function(str){return self.i18nExists(str)?loadTimeData.getString(str):str}))}return this.i18nDynamic.apply(this,[locale,id].concat(args))},i18nExists(id){return loadTimeData.valueExists(id)}};// Copyright 2016 The Chromium Authors. All rights reserved.
var WebUIListenerBehavior={properties:{webUIListeners_:{type:Array,value(){return[]}}},addWebUIListener(eventName,callback){this.webUIListeners_.push(addWebUIListener(eventName,callback))},detached(){while(this.webUIListeners_.length>0){removeWebUIListener(this.webUIListeners_.pop())}}};// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const CrSettingsPrefs=function(){const CrSettingsPrefsInternal={setInitialized(){CrSettingsPrefsInternal.isInitialized=true;CrSettingsPrefsInternal.resolve_()},resetForTesting(){CrSettingsPrefsInternal.setup_()},deferInitialization:false,setup_(){CrSettingsPrefsInternal.isInitialized=false;CrSettingsPrefsInternal.initialized=new Promise((function(resolve){CrSettingsPrefsInternal.resolve_=resolve}))}};CrSettingsPrefsInternal.setup_();return CrSettingsPrefsInternal}();
/* Copyright 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file. */function deepEqual(val1,val2){if(val1===val2){return true}if(Array.isArray(val1)||Array.isArray(val2)){if(!Array.isArray(val1)||!Array.isArray(val2)){return false}return arraysEqual(val1,val2)}if(val1 instanceof Object&&val2 instanceof Object){return objectsEqual(val1,val2)}return false}function arraysEqual(arr1,arr2){if(arr1.length!==arr2.length){return false}for(let i=0;i<arr1.length;i++){if(!deepEqual(arr1[i],arr2[i])){return false}}return true}function objectsEqual(obj1,obj2){const keys1=Object.keys(obj1);const keys2=Object.keys(obj2);if(keys1.length!==keys2.length){return false}for(let i=0;i<keys1.length;i++){const key=keys1[i];if(!deepEqual(obj1[key],obj2[key])){return false}}return true}function deepCopy(val){if(!(val instanceof Object)){return val}return Array.isArray(val)?deepCopyArray(val):deepCopyObject(val)}function deepCopyArray(arr){const copy=[];for(let i=0;i<arr.length;i++){copy.push(deepCopy(arr[i]))}return copy}function deepCopyObject(obj){const copy={};const keys=Object.keys(obj);for(let i=0;i<keys.length;i++){const key=keys[i];copy[key]=deepCopy(obj[key])}return copy}Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><!--_html_template_end_-->`,is:"settings-prefs",properties:{prefs:{type:Object,notify:true},lastPrefValues_:{type:Object,value(){return{}}}},observers:["prefsChanged_(prefs.*)"],settingsApi_:chrome.settingsPrivate,created(){if(!CrSettingsPrefs.deferInitialization){this.initialize()}},detached(){CrSettingsPrefs.resetForTesting()},initialize(opt_settingsApi){if(this.initialized_){return}this.initialized_=true;if(opt_settingsApi){this.settingsApi_=opt_settingsApi}this.boundPrefsChanged_=this.onSettingsPrivatePrefsChanged_.bind(this);this.settingsApi_.onPrefsChanged.addListener(this.boundPrefsChanged_);this.settingsApi_.getAllPrefs(this.onSettingsPrivatePrefsFetched_.bind(this))},prefsChanged_(e){if(!CrSettingsPrefs.isInitialized||e.path==="prefs"){return}const key=this.getPrefKeyFromPath_(e.path);const prefStoreValue=this.lastPrefValues_[key];const prefObj=this.get(key,this.prefs);if(!deepEqual(prefStoreValue,prefObj.value)){this.settingsApi_.setPref(key,prefObj.value,"",this.setPrefCallback_.bind(this,key))}},onSettingsPrivatePrefsChanged_(prefs){if(CrSettingsPrefs.isInitialized){this.updatePrefs_(prefs)}},onSettingsPrivatePrefsFetched_(prefs){this.updatePrefs_(prefs);CrSettingsPrefs.setInitialized()},setPrefCallback_(key,success){if(!success){this.refresh(key)}},refresh(key){this.settingsApi_.getPref(key,(pref=>{this.updatePrefs_([pref])}))},updatePrefPath_(path,value,prefsObject){const parts=path.split(".");let cur=prefsObject;for(let part;parts.length&&(part=parts.shift());){if(!parts.length){cur[part]=value}else if(part in cur){cur=cur[part]}else{cur=cur[part]={}}}},updatePrefs_(newPrefs){const prefs=this.prefs||{};newPrefs.forEach((function(newPrefObj){this.lastPrefValues_[newPrefObj.key]=deepCopy(newPrefObj.value);if(!deepEqual(this.get(newPrefObj.key,prefs),newPrefObj)){this.updatePrefPath_(newPrefObj.key,newPrefObj,prefs);if(prefs===this.prefs){this.notifyPath("prefs."+newPrefObj.key,newPrefObj)}}}),this);if(!this.prefs){this.prefs=prefs}},getPrefKeyFromPath_(path){const parts=path.split(".");assert(parts.shift()==="prefs","Path doesn't begin with 'prefs'");for(let i=1;i<=parts.length;i++){const key=parts.slice(0,i).join(".");if(this.lastPrefValues_.hasOwnProperty(key)){return key}}return""},resetForTesting(){if(!this.initialized_){return}this.prefs=undefined;this.lastPrefValues_={};this.initialized_=false;this.settingsApi_.onPrefsChanged.removeListener(this.boundPrefsChanged_);this.settingsApi_=chrome.settingsPrivate}});const template$8=document.createElement("template");template$8.innerHTML=`<dom-module id="search-highlight-style" assetpath="chrome://resources/">\n  <template>\n    <style scope="search-highlight-style">.search-bubble {\n  --search-bubble-color: var(--paper-yellow-500);\n        position: absolute;\n        z-index: 1;\n}\n\n.search-bubble-innards {\n  align-items: center;\n        background-color: var(--search-bubble-color);\n        border-radius: 2px;\n        color: var(--google-grey-900);\n        max-width: 100px;\n        min-width: 64px;\n        overflow: hidden;\n        padding: 4px 10px;\n        text-align: center;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n}\n\n.search-bubble-innards::after {\n  background-color: var(--search-bubble-color);\n        content: '';\n        height: 10px;\n        left: calc(50% - 5px);\n        position: absolute;\n        top: -5px;\n        transform: rotate(-45deg);\n        width: 10px;\n        z-index: -1;\n}\n\n.search-bubble-innards.above::after {\n  bottom: -5px;\n        top: auto;\n        transform: rotate(-135deg);\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$8.content.cloneNode(true));const $_documentContainer$2=document.createElement("template");$_documentContainer$2.innerHTML=`<custom-style>\n<style css-build="shadow">html {\n  --settings-disabled-opacity: .65;\n    --settings-error-color: var(--google-red-700);\n\n    \n    --settings-nav-item-color: var(--google-grey-refresh-700);\n\n    --settings-row-min-height: var(--cr-section-min-height);\n    --settings-row-two-line-min-height: var(--cr-section-two-line-min-height);\n\n    \n    --settings-control-label-spacing: 20px;\n\n    \n    --settings-controlled-by-spacing: var(--cr-controlled-by-spacing);\n\n    --settings-input-max-width: var(--cr-default-input-max-width);\n\n    --iron-icon-fill-color: var(--google-grey-refresh-700);\n    --iron-icon-height: var(--cr-icon-size);\n    --iron-icon-width: var(--cr-icon-size);\n\n    --cr-radio-group-item-padding: 0;\n}\n\n@media (prefers-color-scheme: dark) {\nhtml {\n  --iron-icon-fill-color: var(--google-grey-refresh-500);\n      --settings-error-color: var(--google-red-refresh-300);\n      --settings-nav-icon-color: var(--google-grey-refresh-500);\n      --settings-nav-item-color: var(--cr-primary-text-color);\n}\n\n}\n\n</style>\n</custom-style>\n`;document.head.appendChild($_documentContainer$2.content);const template$9=document.createElement("template");template$9.innerHTML=`<dom-module id="settings-shared" assetpath="chrome://resources/">\n  <template>\n    <style include="cr-shared-style search-highlight-style\n\n    " scope="settings-shared">a[is=action-link] {\n  user-select: none;\n}\n\nh2 {\n  align-items: center;\n        align-self: flex-start;\n        color: var(--cr-secondary-text-color);\n        display: flex;\n        font-size: inherit;\n        font-weight: 500;\n        margin: 0;\n        padding-bottom: 12px;\n        padding-top: 32px;\n}\n\niron-icon {\n  flex-shrink: 0;\n}\n\niron-icon.policy {\n  margin-inline-end: var(--cr-controlled-by-spacing);\n}\n\niron-list {\n  --iron-list-items-container_-_user-select:  none;\n}\n\niron-list[risk-selection] {\n  --iron-list-items-container_-_user-select:  text;\n}\n\n.separator + cr-icon-button {\n  margin-inline-start: var(--cr-icon-ripple-margin);\n}\n\n.settings-box settings-toggle-button cr-button:last-of-type {\n  margin-inline-end: 16px;\n}\n\n.settings-box cr-button + cr-button, .settings-box cr-button + controlled-button, .settings-box controlled-button + controlled-button, .settings-box controlled-button + cr-button {\n  margin-inline-start: 8px;\n}\n\nspan ~ a {\n  margin-inline-start: var(--cr-subsequent-anchors-of-span-margin, 4px);\n}\n\na[href] {\n  color: var(--cr-link-color);\n        text-decoration: none;\n}\n\n.inherit-color {\n  color: inherit !important;\n}\n\n.primary-toggle {\n  color: var(--cr-secondary-text-color);\n        font-weight: 500;\n}\n\n.primary-toggle[checked] {\n  color: var(--google-blue-500);\n}\n\ncollapse-radio-button, controlled-radio-button, cr-radio-button {\n  min-height: var(--settings-row-min-height);\n}\n\ncr-radio-group {\n  width: 100%;\n}\n\ncr-radio-group:focus {\n  background-color: var(--google-grey-300);\n        outline: none;\n}\n\n@media (prefers-color-scheme: dark) {\ncr-radio-group:focus {\n  background-color: var(--google-grey-800);\n}\n\n}\n\n.text-elide {\n  overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n}\n\n.no-min-width {\n  min-width: 0;\n}\n\n.header-aligned-button {\n  margin-top: 12px;\n}\n\n.link-wrapper {\n  align-items: center;\n        display: flex;\n        flex-grow: 1;\n}\n\n.list-frame {\n  display: block;\n        padding-block-end: 0;\n        padding-block-start: 0;\n        padding-inline-end: var(--cr-section-padding);\n        padding-inline-start: var(--cr-section-indent-padding);\n}\n\n.list-item {\n  align-items: center;\n        display: flex;\n        min-height: var(--settings-row-min-height);\n        padding: 0;\n}\n\n.list-item.underbar {\n  border-bottom: var(--cr-separator-line);\n}\n\n.list-item.selected {\n  font-weight: 500;\n}\n\n.list-item .middle {\n  flex: 1;\n        margin: 8px 16px;\n}\n\n.list-item > .start {\n  flex: 1;\n}\n\n.list-item > label span[disabled] {\n  opacity: var(--settings-disabled-opacity);\n}\n\n.list-button[is='action-link'] {\n  align-items: center;\n        display: flex;\n        flex: 1;\n        font-weight: 500;\n        min-height: inherit;\n}\n\n:host-context(html:not(.focus-outline-visible)) .list-button[is='action-link'] {\n  outline: none;\n}\n\n.two-line {\n  min-height: var(--settings-row-two-line-min-height);\n}\n\n.settings-box {\n  align-items: center;\n        border-top: var(--cr-separator-line);\n        display: flex;\n        min-height: var(--cr-section-min-height);\n        padding: 0 var(--cr-section-padding);\n}\n\n.settings-box.no-padding {\n  padding: 0;\n}\n\n.settings-box.no-padding .margin-matches-padding {\n  margin: 0 var(--cr-section-padding);\n}\n\n.settings-box.no-padding > .link-wrapper {\n  padding: 0 var(--cr-section-padding);\n}\n\n.settings-box.two-line {\n  min-height: var(--settings-row-two-line-min-height);\n}\n\n.settings-box-text {\n  box-sizing: border-box;\n        padding-bottom: var(--cr-section-vertical-padding);\n        padding-top: var(--cr-section-vertical-padding);\n}\n\n.settings-box.first, .settings-box.continuation {\n  border-top: none;\n}\n\nh2.first {\n  padding-top: 0;\n}\n\n.settings-box.block {\n  display: block;\n}\n\n.single-column {\n  align-items: flex-start;\n        flex-direction: column;\n        justify-content: center;\n}\n\n.settings-box.line-only {\n  min-height: 0;\n}\n\n.settings-box.embedded {\n  padding-inline-start: var(--cr-section-indent-padding);\n}\n\n.secondary {\n  color: var(--cr-secondary-text-color);\n        font-weight: 400;\n}\n\n.secondary:empty {\n  margin: 0;\n}\n\n.settings-box .middle {\n  align-items: center;\n        flex: auto;\n        padding-inline-start: 16px;\n}\n\n.settings-box .middle.two-line, .settings-box .start.two-line {\n  display: flex;\n}\n\n.settings-box .start {\n  align-items: center;\n        flex: auto;\n}\n\n.settings-row {\n  align-items: center;\n        display: flex;\n        flex-direction: row;\n        max-width: 100%;\n        min-width: 0;\n}\n\n.no-outline {\n  background: none;\n        outline: none;\n}\n\n[scrollable], iron-list, .list-item {\n  --cr-icon-button-margin-end: 0;\n}\n\n.vertical-list > *:not(:first-of-type) {\n  border-top: var(--cr-separator-line);\n}\n\n.separator {\n  border-inline-start: var(--cr-separator-line);\n        flex-shrink: 0;\n        \n        height: 32px;\n        margin: 0 16px;\n}\n\n.settings-box.no-padding > .link-wrapper ~ .separator {\n  margin: 0;\n}\n\n.column-header {\n  color: var(--cr-secondary-text-color);\n        font-size: inherit;\n        font-weight: 400;\n}\n\n.error-message {\n  color: white;\n        font: 13px;\n        padding-bottom: 15px;\n        padding-top: 15px;\n        text-align: center;\n        white-space: normal;\n}\n\n.url-directionality {\n  direction: ltr;\n        unicode-bidi: embed;\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$9.content.cloneNode(true));// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const CLASS_NAME="focus-outline-visible";const docsToManager=new Map;class FocusOutlineManager{constructor(doc){this.focusByKeyboard_=true;this.classList_=doc.documentElement.classList;const onEvent=function(focusByKeyboard,e){if(this.focusByKeyboard_===focusByKeyboard){return}this.focusByKeyboard_=focusByKeyboard;this.updateVisibility()};doc.addEventListener("keydown",onEvent.bind(this,true),true);doc.addEventListener("mousedown",onEvent.bind(this,false),true);this.updateVisibility()}updateVisibility(){this.visible=this.focusByKeyboard_}set visible(visible){this.classList_.toggle(CLASS_NAME,visible)}get visible(){return this.classList_.contains(CLASS_NAME)}static forDocument(doc){let manager=docsToManager.get(doc);if(!manager){manager=new FocusOutlineManager(doc);docsToManager.set(doc,manager)}return manager}}// Copyright 2019 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="cr-button">:host {
  --active-shadow-rgb: var(--google-grey-800-rgb);
        --active-shadow-action-rgb: var(--google-blue-refresh-500-rgb);
        --bg-action: var(--google-blue-600);
        --border-color: var(--google-grey-refresh-300);
        --disabled-bg-action: var(--google-grey-refresh-100);
        --disabled-bg: white;
        --disabled-border-color: var(--google-grey-refresh-100);
        --focus-shadow-color: rgba(var(--google-blue-600-rgb), .4);
        --hover-bg-action: rgba(var(--google-blue-600-rgb), .9);
        --hover-bg-color: rgba(var(--google-blue-refresh-500-rgb), .04);
        --hover-border-color: var(--google-blue-refresh-100);
        --hover-shadow-action-rgb: var(--google-blue-refresh-500-rgb);
        --ink-color-action: white;
        
        --ink-color: var(--google-blue-600);
        --ripple-opacity-action: .32;
        --ripple-opacity: .1;
        --text-color-action: white;
        --text-color: var(--google-blue-600);
}

@media (prefers-color-scheme: dark) {
:host {
  --active-bg: black linear-gradient(rgba(255, 255, 255, .06),
                                             rgba(255, 255, 255, .06));
          --active-shadow-rgb: 0, 0, 0;
          --active-shadow-action-rgb: var(--google-blue-refresh-500-rgb);
          --bg-action: var(--google-blue-refresh-300);
          --border-color: var(--google-grey-refresh-700);
          --disabled-bg-action: var(--google-grey-800);
          
          --disabled-bg: transparent;
          --disabled-border-color: var(--google-grey-800);
          --focus-shadow-color: rgba(var(--google-blue-refresh-300-rgb), .5);
          --hover-bg-action: var(--bg-action)
              linear-gradient(rgba(0, 0, 0, .08), rgba(0, 0, 0, .08));
          --hover-bg-color: rgba(var(--google-blue-refresh-300-rgb), .08);
          --ink-color-action: black;
          --ink-color: var(--google-blue-refresh-300);
          --ripple-opacity-action: .16;
          --ripple-opacity: .16;
          --text-color-action: var(--google-grey-900);
          --text-color: var(--google-blue-refresh-300);
}

}

:host {
  --paper-ripple-opacity: var(--ripple-opacity);
        -webkit-tap-highlight-color: transparent;
        align-items: center;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        box-sizing: border-box;
        color: var(--text-color);
        cursor: pointer;
        display: inline-flex;
        flex-shrink: 0;
        font-weight: 500;
        height: var(--cr-button-height);
        justify-content: center;
        min-width: 5.14em;
        outline-width: 0;
        padding: 8px 16px;
        position: relative;
        user-select: none;
}

:host-context(.focus-outline-visible):host(:focus) {
  box-shadow: 0 0 0 2px var(--focus-shadow-color);
}

:host(:active) {
  background: var(--active-bg);
        box-shadow:
            0 1px 2px 0 rgba(var(--active-shadow-rgb), .3),
            0 3px 6px 2px rgba(var(--active-shadow-rgb), .15);
}

:host(:hover) {
  background-color: var(--hover-bg-color);
}

@media (prefers-color-scheme: light) {
:host(:hover) {
  border-color: var(--hover-border-color);
}

}

:host(.action-button) {
  --ink-color: var(--ink-color-action);
        --paper-ripple-opacity: var(--ripple-opacity-action);
        background-color: var(--bg-action);
        border: none;
        color: var(--text-color-action);
}

:host(.action-button:active) {
  box-shadow:
            0 1px 2px 0 rgba(var(--active-shadow-action-rgb), .3),
            0 3px 6px 2px rgba(var(--active-shadow-action-rgb), .15);
}

:host(.action-button:hover) {
  background: var(--hover-bg-action);
}

@media (prefers-color-scheme: light) {
:host(.action-button:not(:active):hover) {
  box-shadow:
              0 1px 2px 0 rgba(var(--hover-shadow-action-rgb), .3),
              0 1px 3px 1px rgba(var(--hover-shadow-action-rgb), .15);
}

}

:host([disabled]) {
  background-color: var(--disabled-bg);
        border-color: var(--disabled-border-color);
        color: var(--google-grey-600);
        cursor: auto;
        pointer-events: none;
}

:host(.action-button[disabled]) {
  background-color: var(--disabled-bg-action);
        border-color: transparent;
}

:host(.cancel-button) {
  margin-inline-end: 8px;
}

:host(.action-button), :host(.cancel-button) {
  line-height: 154%;
}

paper-ripple {
  color: var(--ink-color);
        height: var(--paper-ripple-height);
        width: var(--paper-ripple-width);
        
        left: var(--paper-ripple-left, 0);
        top: var(--paper-ripple-top, 0);
}

</style>
    <slot></slot>
<!--_html_template_end_-->`,is:"cr-button",behaviors:[PaperRippleBehavior],properties:{disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"},customTabIndex:{type:Number,observer:"applyTabIndex_"},circleRipple:{type:Boolean,value:false}},hostAttributes:{"aria-disabled":"false",role:"button",tabindex:0},listeners:{blur:"onBlur_",click:"onClick_",keydown:"onKeyDown_",keyup:"onKeyUp_",pointerdown:"onPointerDown_"},spaceKeyDown_:false,timeoutIds_:null,ready(){FocusOutlineManager.forDocument(document);this.timeoutIds_=new Set},detached(){this.timeoutIds_.forEach(clearTimeout);this.timeoutIds_.clear()},setTimeout_(fn,delay){if(!this.isConnected){return}const id=setTimeout((()=>{this.timeoutIds_.delete(id);fn()}),delay);this.timeoutIds_.add(id)},disabledChanged_(newValue,oldValue){if(!newValue&&oldValue===undefined){return}if(this.disabled){this.blur()}this.setAttribute("aria-disabled",Boolean(this.disabled));this.applyTabIndex_()},applyTabIndex_(){let value=this.customTabIndex;if(value===undefined){value=this.disabled?-1:0}this.setAttribute("tabindex",value)},onBlur_(){this.spaceKeyDown_=false},onClick_(e){if(this.disabled){e.stopImmediatePropagation()}},onKeyDown_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.repeat){this.lastKeyDownKey_=null;return}this.getRipple().uiDownAction();if(e.key==="Enter"){this.click();this.setTimeout_((()=>this.getRipple().uiUpAction()),100)}else if(e.key===" "){this.spaceKeyDown_=true}},onKeyUp_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(this.spaceKeyDown_&&e.key===" "){this.spaceKeyDown_=false;this.click();this.getRipple().uiUpAction()}},onPointerDown_(){this.ensureRipple()},_createRipple(){const ripple=PaperRippleBehavior._createRipple();if(this.circleRipple){ripple.setAttribute("center","");ripple.classList.add("circle")}return ripple}});// Copyright 2017 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style cr-hidden-style" scope="cr-link-row">:host {
  align-items: center;
        align-self: stretch;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        flex: 1;
        font-family: inherit;
        font-size: 100%;  
        line-height: 154%;  
        margin: 0;
        min-height: var(--cr-section-min-height);
        outline: none;
        padding: 0;
}

:host(:not([embedded])) {
  padding: 0 var(--cr-section-padding);
}

:host([disabled]) {
  color: var(--paper-grey-500);
        cursor: auto;
        pointer-events: none;
}

#startIcon {
  --iron-icon-fill-color: var(--cr-link-row-start-icon-color,
            var(--google-grey-refresh-700));
        display: flex;
        flex-shrink: 0;
        padding-inline-end: var(--cr-icon-button-margin-start);
        width: var(--cr-link-row-icon-width, var(--cr-icon-size));
}

@media (prefers-color-scheme: dark) {
#startIcon {
  --iron-icon-fill-color: var(--cr-link-row-start-icon-color,
              var(--google-grey-refresh-500));
}

}

#labelWrapper {
  flex: 1;
        flex-basis: 0.000000001px;
        padding-bottom: var(--cr-section-vertical-padding);
        padding-top: var(--cr-section-vertical-padding);
        text-align: start;
}

#label, #subLabel {
  display: flex;
}

</style>
    <iron-icon id="startIcon" icon="[[startIcon]]" hidden="[[!startIcon]]" aria-hidden="true">
    </iron-icon>
    <div id="labelWrapper" hidden="[[hideLabelWrapper_]]">
      <div id="label" aria-hidden="true">
        [[label]]
        <slot name="label"></slot>
      </div>
      <div id="subLabel" class="cr-secondary-text" aria-hidden="true">
        [[subLabel]]
        <slot name="sub-label"></slot>
      </div>
    </div>
    <slot></slot>
    <cr-icon-button id="icon" iron-icon="[[getIcon_(external)]]" role="link" aria-roledescription$="[[roleDescription]]" aria-labelledby="label subLabel" disabled="[[disabled]]">
    </cr-icon-button>
<!--_html_template_end_-->`,is:"cr-link-row",properties:{startIcon:{type:String,value:""},label:{type:String,value:""},subLabel:{type:String,value:""},disabled:{type:Boolean,reflectToAttribute:true},external:{type:Boolean,value:false},usingSlottedLabel:{type:Boolean,value:false},roleDescription:String,hideLabelWrapper_:{type:Boolean,computed:"computeHideLabelWrapper_(label, usingSlottedLabel)"}},get noink(){return this.$.icon.noink},set noink(value){this.$.icon.noink=value},focus(){this.$.icon.focus()},computeHideLabelWrapper_(){return!(this.label||this.usingSlottedLabel)},getIcon_(){return this.external?"cr:open-in-new":"cr:arrow-right"}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const template$a=html`/* Most common used flex styles*/
<dom-module id="iron-flex">
  <template>
    <style scope="iron-flex">.layout.horizontal, .layout.vertical {
  display: flex;
}

.layout.inline {
  display: inline-flex;
}

.layout.horizontal {
  flex-direction: row;
}

.layout.vertical {
  flex-direction: column;
}

.layout.wrap {
  flex-wrap: wrap;
}

.layout.no-wrap {
  flex-wrap: nowrap;
}

.layout.center, .layout.center-center {
  align-items: center;
}

.layout.center-justified, .layout.center-center {
  justify-content: center;
}

.flex {
  flex: 1;
        flex-basis: 0.000000001px;
}

.flex-auto {
  flex: 1 1 auto;
}

.flex-none {
  flex: none;
}

</style>
  </template>
</dom-module>
/* Basic flexbox reverse styles */
<dom-module id="iron-flex-reverse">
  <template>
    <style scope="iron-flex-reverse">.layout.horizontal-reverse, .layout.vertical-reverse {
  display: flex;
}

.layout.horizontal-reverse {
  flex-direction: row-reverse;
}

.layout.vertical-reverse {
  flex-direction: column-reverse;
}

.layout.wrap-reverse {
  flex-wrap: wrap-reverse;
}

</style>
  </template>
</dom-module>
/* Flexbox alignment */
<dom-module id="iron-flex-alignment">
  <template>
    <style scope="iron-flex-alignment">.layout.start {
  align-items: flex-start;
}

.layout.center, .layout.center-center {
  align-items: center;
}

.layout.end {
  align-items: flex-end;
}

.layout.baseline {
  align-items: baseline;
}

.layout.start-justified {
  justify-content: flex-start;
}

.layout.center-justified, .layout.center-center {
  justify-content: center;
}

.layout.end-justified {
  justify-content: flex-end;
}

.layout.around-justified {
  justify-content: space-around;
}

.layout.justified {
  justify-content: space-between;
}

.self-start {
  align-self: flex-start;
}

.self-center {
  align-self: center;
}

.self-end {
  align-self: flex-end;
}

.self-stretch {
  align-self: stretch;
}

.self-baseline {
  align-self: baseline;
}

.layout.start-aligned {
  align-content: flex-start;
}

.layout.end-aligned {
  align-content: flex-end;
}

.layout.center-aligned {
  align-content: center;
}

.layout.between-aligned {
  align-content: space-between;
}

.layout.around-aligned {
  align-content: space-around;
}

</style>
  </template>
</dom-module>
/* Non-flexbox positioning helper styles */
<dom-module id="iron-flex-factors">
  <template>
    <style scope="iron-flex-factors">.flex, .flex-1 {
  flex: 1;
        flex-basis: 0.000000001px;
}

.flex-2 {
  flex: 2;
}

.flex-3 {
  flex: 3;
}

.flex-4 {
  flex: 4;
}

.flex-5 {
  flex: 5;
}

.flex-6 {
  flex: 6;
}

.flex-7 {
  flex: 7;
}

.flex-8 {
  flex: 8;
}

.flex-9 {
  flex: 9;
}

.flex-10 {
  flex: 10;
}

.flex-11 {
  flex: 11;
}

.flex-12 {
  flex: 12;
}

</style>
  </template>
</dom-module>
<dom-module id="iron-positioning">
  <template>
    <style scope="iron-positioning">.block {
  display: block;
}

[hidden] {
  display: none !important;
}

.invisible {
  visibility: hidden !important;
}

.relative {
  position: relative;
}

.fit {
  position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
}

body.fullbleed {
  margin: 0;
        height: 100vh;
}

.scroll {
  -webkit-overflow-scrolling: touch;
        overflow: auto;
}

.fixed-bottom, .fixed-left, .fixed-right, .fixed-top {
  position: fixed;
}

.fixed-top {
  top: 0;
        left: 0;
        right: 0;
}

.fixed-right {
  top: 0;
        right: 0;
        bottom: 0;
}

.fixed-bottom {
  right: 0;
        bottom: 0;
        left: 0;
}

.fixed-left {
  top: 0;
        bottom: 0;
        left: 0;
}

</style>
  </template>
</dom-module>
`;template$a.setAttribute("style","display: none;");document.head.appendChild(template$a.content);// Copyright 2016 The Chromium Authors. All rights reserved.
class LifetimeBrowserProxy{restart(){}relaunch(){}}class LifetimeBrowserProxyImpl{restart(){chrome.send("restart")}relaunch(){chrome.send("relaunch")}}addSingletonGetter(LifetimeBrowserProxyImpl);// Copyright 2019 The Chromium Authors. All rights reserved.
class Route{constructor(path){this.path=path;this.parent=null;this.depth=0;this.isNavigableDialog=false;this.section=""}createChild(path){assert(path);const newUrl=path[0]==="/"?path:`${this.path}/${path}`;const route=new Route(newUrl);route.parent=this;route.section=this.section;route.depth=this.depth+1;return route}createSection(path,section){const route=this.createChild(path);route.section=section;return route}getAbsolutePath(){return window.location.origin+this.path}contains(route){for(let r=route;r!=null;r=r.parent){if(this===r){return true}}return false}isSubpage(){return!!this.parent&&!!this.section&&this.parent.section===this.section}}const CANONICAL_PATH_REGEX=/(^\/)([\/-\w]+)(\/$)/;let routerInstance=null;class Router{static getInstance(){return assert(routerInstance)}static setInstance(instance){assert(!routerInstance);routerInstance=instance}static resetInstanceForTesting(instance){if(routerInstance){instance.routeObservers_=routerInstance.routeObservers_}routerInstance=instance}constructor(availableRoutes){this.routes_=availableRoutes;this.currentRoute=this.routes_.BASIC;this.currentQueryParameters_=new URLSearchParams;this.wasLastRouteChangePopstate_=false;this.initializeRouteFromUrlCalled_=false;this.routeObservers_=new Set}addObserver(observer){assert(!this.routeObservers_.has(observer));this.routeObservers_.add(observer)}removeObserver(observer){assert(this.routeObservers_.delete(observer))}getRoute(routeName){return this.routes_[routeName]}getRoutes(){return this.routes_}setCurrentRoute(route,queryParameters,isPopstate){this.recordMetrics(route.path);const oldRoute=this.currentRoute;this.currentRoute=route;this.currentQueryParameters_=queryParameters;this.wasLastRouteChangePopstate_=isPopstate;new Set(this.routeObservers_).forEach((observer=>{observer.currentRouteChanged(this.currentRoute,oldRoute)}))}getCurrentRoute(){return this.currentRoute}getQueryParameters(){return new URLSearchParams(this.currentQueryParameters_)}lastRouteChangeWasPopstate(){return this.wasLastRouteChangePopstate_}getRouteForPath(path){const canonicalPath=path.replace(CANONICAL_PATH_REGEX,"$1$2");const matchingKey=Object.keys(this.routes_).find((key=>this.routes_[key].path===canonicalPath));return matchingKey?this.routes_[matchingKey]:null}navigateTo(route,opt_dynamicParameters,opt_removeSearch){if(route===this.routes_.ADVANCED){route=this.routes_.BASIC}const params=opt_dynamicParameters||new URLSearchParams;const removeSearch=!!opt_removeSearch;const oldSearchParam=this.getQueryParameters().get("search")||"";const newSearchParam=params.get("search")||"";if(!removeSearch&&oldSearchParam&&!newSearchParam){params.append("search",oldSearchParam)}let url=route.path;const queryString=params.toString();if(queryString){url+="?"+queryString}window.history.pushState(this.currentRoute.path,"",url);this.setCurrentRoute(route,params,false)}navigateToPreviousRoute(){const previousRoute=window.history.state&&assert(this.getRouteForPath(window.history.state));if(previousRoute&&previousRoute.depth<=this.currentRoute.depth){window.history.back()}else{this.navigateTo(this.currentRoute.parent||this.routes_.BASIC)}}initializeRouteFromUrl(){assert(!this.initializeRouteFromUrlCalled_);this.initializeRouteFromUrlCalled_=true;const route=this.getRouteForPath(window.location.pathname);this.recordMetrics(route?route.path:this.routes_.BASIC.path);if(route&&route!==this.routes_.ADVANCED){this.currentRoute=route;this.currentQueryParameters_=new URLSearchParams(window.location.search)}else{window.history.replaceState(undefined,"",this.routes_.BASIC.path)}}recordMetrics(urlPath){assert(!urlPath.startsWith("chrome://"));assert(!urlPath.startsWith("settings"));assert(urlPath.startsWith("/"));assert(!urlPath.match(/\?/g));const metricName=loadTimeData.valueExists("isOSSettings")&&loadTimeData.getBoolean("isOSSettings")?"ChromeOS.Settings.PathVisited":"WebUI.Settings.PathVisited";chrome.metricsPrivate.recordSparseHashable(metricName,urlPath)}resetRouteForTesting(){this.initializeRouteFromUrlCalled_=false;this.wasLastRouteChangePopstate_=false;this.currentRoute=this.routes_.BASIC;this.currentQueryParameters_=new URLSearchParams}}const RouteObserverBehavior={attached(){routerInstance.addObserver(this);this.currentRouteChanged(routerInstance.currentRoute,undefined)},detached(){routerInstance.removeObserver(this)},currentRouteChanged(opt_newRoute,opt_oldRoute){assertNotReached()}};const template$b=document.createElement("template");template$b.innerHTML=`<dom-module id="md-select" assetpath="chrome://resources/">\n  <template>\n    <style scope="md-select">.md-select {\n  --md-arrow-width: 10px;\n        --md-select-bg-color: var(--google-grey-refresh-100);\n        --md-select-focus-shadow-color: rgba(var(--google-blue-600-rgb), .4);\n        --md-select-option-bg-color: white;\n        --md-select-side-padding: 8px;\n        --md-select-text-color: var(--google-grey-900);\n\n        -webkit-appearance: none;\n        background: url(chrome://resources/images/arrow_down.svg)\n            calc(100% - var(--md-select-side-padding))\n            center no-repeat;\n        background-color: var(--md-select-bg-color);\n        background-size: var(--md-arrow-width);\n        border: none;\n        border-radius: 4px;\n        color: var(--md-select-text-color);\n        cursor: pointer;\n        font-family: inherit;\n        font-size: inherit;\n        line-height: inherit;\n        max-width: 100%;\n        outline: none;\n        padding-bottom: 6px;\n        \n        padding-inline-end: calc(var(--md-select-side-padding) +\n            var(--md-arrow-width) + 3px);\n        padding-inline-start: var(--md-select-side-padding);\n        padding-top: 6px;\n        width: var(--md-select-width, 200px);\n}\n\n@media (prefers-color-scheme: dark) {\n.md-select {\n  --md-select-bg-color: rgba(0, 0, 0, .3);\n          --md-select-focus-shadow-color:\n              rgba(var(--google-blue-refresh-300-rgb), .5);\n          --md-select-option-bg-color: var(--google-grey-900-white-4-percent);\n          --md-select-text-color: var(--cr-primary-text-color);\n          background-image: url(chrome://resources/images/dark/arrow_down.svg);\n}\n\n}\n\n.md-select :-webkit-any(option, optgroup) {\n  background-color: var(--md-select-option-bg-color);\n}\n\n.md-select[disabled] {\n  opacity: var(--cr-disabled-opacity);\n        pointer-events: none;\n}\n\n.md-select:focus {\n  box-shadow: 0 0 0 2px var(--md-select-focus-shadow-color);\n}\n\n.md-select:active {\n  box-shadow: none;\n}\n\n:host-context([dir=rtl]) .md-select {\n  background-position-x: var(--md-select-side-padding);\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$b.content.cloneNode(true));// Copyright 2018 The Chromium Authors. All rights reserved.
const CrRadioButtonBehaviorImpl={properties:{checked:{type:Boolean,value:false,reflectToAttribute:true},disabled:{type:Boolean,value:false,reflectToAttribute:true,notify:true},focusable:{type:Boolean,value:false,observer:"onFocusableChanged_"},label:{type:String,value:""},name:{type:String,notify:true,reflectToAttribute:true},buttonTabIndex_:{type:Number,computed:"getTabIndex_(focusable)"}},listeners:{blur:"hideRipple_",focus:"onFocus_",up:"hideRipple_"},focus(){this.$.button.focus()},onFocusableChanged_(){const links=this.querySelectorAll("a");links.forEach((link=>{link.tabIndex=this.checked?0:-1}))},onFocus_(){this.getRipple().showAndHoldDown()},hideRipple_(){this.getRipple().clear()},getAriaChecked_(){return this.checked?"true":"false"},getAriaDisabled_(){return this.disabled?"true":"false"},getTabIndex_(){return this.focusable?0:-1},onInputKeydown_(e){if(e.shiftKey&&e.key==="Tab"){this.focus()}},_createRipple(){this._rippleContainer=this.$$(".disc-wrapper");const ripple=PaperRippleBehavior._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");ripple.classList.add("circle","toggle-ink");return ripple}};const CrRadioButtonBehavior=[PaperRippleBehavior,CrRadioButtonBehaviorImpl];const template$c=document.createElement("template");template$c.innerHTML=`<dom-module id="cr-radio-button-style" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-radio-button-style">:host {\n  --cr-radio-button-checked-color: var(--google-blue-600);\n        --cr-radio-button-checked-ripple-color:\n            rgba(var(--google-blue-600-rgb), .2);\n        --cr-radio-button-ink-size: 40px;\n        --cr-radio-button-size: 16px;\n        --cr-radio-button-unchecked-color: var(--google-grey-refresh-700);\n        --cr-radio-button-unchecked-ripple-color:\n            rgba(var(--google-grey-600-rgb), .15);\n\n        --ink-to-circle: calc((var(--cr-radio-button-ink-size) -\n                               var(--cr-radio-button-size)) / 2);\n        align-items: center;\n        display: flex;\n        flex-shrink: 0;\n        outline: none;\n}\n\n@media (prefers-color-scheme: dark) {\n:host {\n  --cr-radio-button-checked-color: var(--google-blue-refresh-300);\n          --cr-radio-button-checked-ripple-color:\n              rgba(var(--google-blue-refresh-300-rgb), .4);\n          --cr-radio-button-unchecked-color: var(--google-grey-refresh-500);\n          --cr-radio-button-unchecked-ripple-color:\n              rgba(var(--google-grey-refresh-300-rgb), .4);\n}\n\n}\n\n:host([disabled]) {\n  opacity: var(--cr-disabled-opacity);\n        \n        pointer-events: none;\n}\n\n:host(:not([disabled])) {\n  cursor: pointer;\n}\n\n#labelWrapper {\n  flex: 1;\n        margin-inline-start: var(--cr-radio-button-label-spacing, 20px);\n}\n\n#label {\n  color: inherit;\n}\n\n.disc-border, .disc, .disc-wrapper, paper-ripple {\n  border-radius: 50%;\n}\n\n.disc-wrapper {\n  height: var(--cr-radio-button-size);\n        margin-block-start: var(--cr-radio-button-disc-margin-block-start, 0);\n        position: relative;\n        width: var(--cr-radio-button-size);\n}\n\n.disc-border, .disc {\n  box-sizing: border-box;\n        height: var(--cr-radio-button-size);\n        width: var(--cr-radio-button-size);\n}\n\n.disc-border {\n  border: 2px solid var(--cr-radio-button-unchecked-color);\n}\n\n:host([checked]) .disc-border {\n  border-color: var(--cr-radio-button-checked-color);\n}\n\n#button:focus {\n  outline: none;\n}\n\n.disc {\n  background-color: transparent;\n        position: absolute;\n        top: 0;\n        transform: scale(0);\n        transition: border-color 200ms, transform 200ms;\n}\n\n:host([checked]) .disc {\n  background-color: var(--cr-radio-button-checked-color);\n        transform: scale(0.5);\n}\n\npaper-ripple {\n  --paper-ripple-opacity: 1;  \n        color: var(--cr-radio-button-unchecked-ripple-color);\n        height: var(--cr-radio-button-ink-size);\n        left: calc(-1 * var(--ink-to-circle));\n        pointer-events: none;\n        position: absolute;\n        top: calc(-1 * var(--ink-to-circle));\n        transition: color linear 80ms;\n        width: var(--cr-radio-button-ink-size);\n}\n\n:host-context([dir=rtl]) paper-ripple {\n  left: auto;\n        right: calc(-1 * var(--ink-to-circle));\n}\n\n:host([checked]) paper-ripple {\n  color: var(--cr-radio-button-checked-ripple-color);\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$c.content.cloneNode(true));// Copyright 2015 The Chromium Authors. All rights reserved.
var CrPolicyStrings;const CrPolicyIndicatorType={DEVICE_POLICY:"devicePolicy",EXTENSION:"extension",NONE:"none",OWNER:"owner",PRIMARY_USER:"primary_user",RECOMMENDED:"recommended",USER_POLICY:"userPolicy",PARENT:"parent",CHILD_RESTRICTION:"childRestriction"};const CrPolicyIndicatorBehavior={properties:{indicatorType:{type:String,value:CrPolicyIndicatorType.NONE},indicatorSourceName:{type:String,value:""},indicatorVisible:{type:Boolean,computed:"getIndicatorVisible_(indicatorType)"},indicatorIcon:{type:String,computed:"getIndicatorIcon_(indicatorType)"}},getIndicatorVisible_(type){return type!==CrPolicyIndicatorType.NONE},getIndicatorIcon_(type){switch(type){case CrPolicyIndicatorType.EXTENSION:return"cr:extension";case CrPolicyIndicatorType.NONE:return"";case CrPolicyIndicatorType.PRIMARY_USER:return"cr:group";case CrPolicyIndicatorType.OWNER:return"cr:person";case CrPolicyIndicatorType.USER_POLICY:case CrPolicyIndicatorType.DEVICE_POLICY:case CrPolicyIndicatorType.RECOMMENDED:return"cr20:domain";case CrPolicyIndicatorType.PARENT:case CrPolicyIndicatorType.CHILD_RESTRICTION:return"cr20:kite";default:assertNotReached()}},getIndicatorTooltip(type,name,opt_matches){if(!window["CrPolicyStrings"]){return""}CrPolicyStrings=window["CrPolicyStrings"];switch(type){case CrPolicyIndicatorType.EXTENSION:return name.length>0?CrPolicyStrings.controlledSettingExtension.replace("$1",name):CrPolicyStrings.controlledSettingExtensionWithoutName;case CrPolicyIndicatorType.PRIMARY_USER:return CrPolicyStrings.controlledSettingShared.replace("$1",name);case CrPolicyIndicatorType.OWNER:return name.length>0?CrPolicyStrings.controlledSettingWithOwner.replace("$1",name):CrPolicyStrings.controlledSettingNoOwner;case CrPolicyIndicatorType.USER_POLICY:case CrPolicyIndicatorType.DEVICE_POLICY:return CrPolicyStrings.controlledSettingPolicy;case CrPolicyIndicatorType.RECOMMENDED:return opt_matches?CrPolicyStrings.controlledSettingRecommendedMatches:CrPolicyStrings.controlledSettingRecommendedDiffers;case CrPolicyIndicatorType.PARENT:return CrPolicyStrings.controlledSettingParent;case CrPolicyIndicatorType.CHILD_RESTRICTION:return CrPolicyStrings.controlledSettingChildRestriction}return""}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`<!--css-build:shadow--><style scope="paper-tooltip">:host {
  display: block;
        position: absolute;
        outline: none;
        z-index: 1002;
        user-select: none;
        cursor: default;
}

#tooltip {
  display: block;
        outline: none;
        ;
        font-size: 10px;
        line-height: 1;
        background-color: var(--paper-tooltip-background, #616161);
        color: var(--paper-tooltip-text-color, white);
        padding: 8px;
        border-radius: 2px;
        font-size: var(--paper-tooltip_-_font-size, 10px); font-weight: var(--paper-tooltip_-_font-weight); max-width: var(--paper-tooltip_-_max-width); min-width: var(--paper-tooltip_-_min-width); padding: var(--paper-tooltip_-_padding, 8px);
}

@keyframes keyFrameScaleUp {
0% {
  transform: scale(0.0);
}

100% {
  transform: scale(1.0);
}

}

@keyframes keyFrameScaleDown {
0% {
  transform: scale(1.0);
}

100% {
  transform: scale(0.0);
}

}

@keyframes keyFrameFadeInOpacity {
0% {
  opacity: 0;
}

100% {
  opacity: var(--paper-tooltip-opacity, 0.9);
}

}

@keyframes keyFrameFadeOutOpacity {
0% {
  opacity: var(--paper-tooltip-opacity, 0.9);
}

100% {
  opacity: 0;
}

}

@keyframes keyFrameSlideDownIn {
0% {
  transform: translateY(-2000px);
          opacity: 0;
}

10% {
  opacity: 0.2;
}

100% {
  transform: translateY(0);
          opacity: var(--paper-tooltip-opacity, 0.9);
}

}

@keyframes keyFrameSlideDownOut {
0% {
  transform: translateY(0);
          opacity: var(--paper-tooltip-opacity, 0.9);
}

10% {
  opacity: 0.2;
}

100% {
  transform: translateY(-2000px);
          opacity: 0;
}

}

.fade-in-animation {
  opacity: 0;
        animation-delay: var(--paper-tooltip-delay-in, 500ms);
        animation-name: keyFrameFadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-in, 500ms);
        animation-fill-mode: forwards;
        ;
}

.fade-out-animation {
  opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 0ms);
        animation-name: keyFrameFadeOutOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
        ;
}

.scale-up-animation {
  transform: scale(0);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-in, 500ms);
        animation-name: keyFrameScaleUp;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-in, 500ms);
        animation-fill-mode: forwards;
        ;
}

.scale-down-animation {
  transform: scale(1);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameScaleDown;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
        ;
}

.slide-down-animation {
  transform: translateY(-2000px);
        opacity: 0;
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameSlideDownIn;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
        ;
}

.slide-down-animation-out {
  transform: translateY(0);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameSlideDownOut;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
        ;
}

.cancel-animation {
  animation-delay: -30s !important;
}

.hidden {
  display: none !important;
}

</style>

    <div id="tooltip" class="hidden">
      <slot></slot>
    </div>
`,is:"paper-tooltip",hostAttributes:{role:"tooltip",tabindex:-1},properties:{for:{type:String,observer:"_findTarget"},manualMode:{type:Boolean,value:false,observer:"_manualModeChanged"},position:{type:String,value:"bottom"},fitToVisibleBounds:{type:Boolean,value:false},offset:{type:Number,value:14},marginTop:{type:Number,value:14},animationDelay:{type:Number,value:500,observer:"_delayChange"},animationEntry:{type:String,value:""},animationExit:{type:String,value:""},animationConfig:{type:Object,value:function(){return{entry:[{name:"fade-in-animation",node:this,timing:{delay:0}}],exit:[{name:"fade-out-animation",node:this}]}}},_showing:{type:Boolean,value:false}},listeners:{webkitAnimationEnd:"_onAnimationEnd"},get target(){if(this._manualTarget)return this._manualTarget;var parentNode=dom(this).parentNode;var ownerRoot=dom(this).getOwnerRoot();var target;if(this.for){target=dom(ownerRoot).querySelector("#"+this.for)}else{target=parentNode.nodeType==Node.DOCUMENT_FRAGMENT_NODE?ownerRoot.host:parentNode}return target},set target(target){this._manualTarget=target;this._findTarget()},attached:function(){this._findTarget()},detached:function(){if(!this.manualMode)this._removeListeners()},playAnimation:function(type){if(type==="entry"){this.show()}else if(type==="exit"){this.hide()}},cancelAnimation:function(){this.$.tooltip.classList.add("cancel-animation")},show:function(){if(this._showing)return;if(dom(this).textContent.trim()===""){var allChildrenEmpty=true;var effectiveChildren=dom(this).getEffectiveChildNodes();for(var i=0;i<effectiveChildren.length;i++){if(effectiveChildren[i].textContent.trim()!==""){allChildrenEmpty=false;break}}if(allChildrenEmpty){return}}this._showing=true;this.$.tooltip.classList.remove("hidden");this.$.tooltip.classList.remove("cancel-animation");this.$.tooltip.classList.remove(this._getAnimationType("exit"));this.updatePosition();this._animationPlaying=true;this.$.tooltip.classList.add(this._getAnimationType("entry"))},hide:function(){if(!this._showing){return}if(this._animationPlaying){this._showing=false;this._cancelAnimation();return}else{this._onAnimationFinish()}this._showing=false;this._animationPlaying=true},updatePosition:function(){if(!this._target||!this.offsetParent)return;var offset=this.offset;if(this.marginTop!=14&&this.offset==14)offset=this.marginTop;var parentRect=this.offsetParent.getBoundingClientRect();var targetRect=this._target.getBoundingClientRect();var thisRect=this.getBoundingClientRect();var horizontalCenterOffset=(targetRect.width-thisRect.width)/2;var verticalCenterOffset=(targetRect.height-thisRect.height)/2;var targetLeft=targetRect.left-parentRect.left;var targetTop=targetRect.top-parentRect.top;var tooltipLeft,tooltipTop;switch(this.position){case"top":tooltipLeft=targetLeft+horizontalCenterOffset;tooltipTop=targetTop-thisRect.height-offset;break;case"bottom":tooltipLeft=targetLeft+horizontalCenterOffset;tooltipTop=targetTop+targetRect.height+offset;break;case"left":tooltipLeft=targetLeft-thisRect.width-offset;tooltipTop=targetTop+verticalCenterOffset;break;case"right":tooltipLeft=targetLeft+targetRect.width+offset;tooltipTop=targetTop+verticalCenterOffset;break}if(this.fitToVisibleBounds){if(parentRect.left+tooltipLeft+thisRect.width>window.innerWidth){this.style.right="0px";this.style.left="auto"}else{this.style.left=Math.max(0,tooltipLeft)+"px";this.style.right="auto"}if(parentRect.top+tooltipTop+thisRect.height>window.innerHeight){this.style.bottom=parentRect.height-targetTop+offset+"px";this.style.top="auto"}else{this.style.top=Math.max(-parentRect.top,tooltipTop)+"px";this.style.bottom="auto"}}else{this.style.left=tooltipLeft+"px";this.style.top=tooltipTop+"px"}},_addListeners:function(){if(this._target){this.listen(this._target,"mouseenter","show");this.listen(this._target,"focus","show");this.listen(this._target,"mouseleave","hide");this.listen(this._target,"blur","hide");this.listen(this._target,"tap","hide")}this.listen(this.$.tooltip,"animationend","_onAnimationEnd");this.listen(this,"mouseenter","hide")},_findTarget:function(){if(!this.manualMode)this._removeListeners();this._target=this.target;if(!this.manualMode)this._addListeners()},_delayChange:function(newValue){if(newValue!==500){this.updateStyles({"--paper-tooltip-delay-in":newValue+"ms"})}},_manualModeChanged:function(){if(this.manualMode)this._removeListeners();else this._addListeners()},_cancelAnimation:function(){this.$.tooltip.classList.remove(this._getAnimationType("entry"));this.$.tooltip.classList.remove(this._getAnimationType("exit"));this.$.tooltip.classList.remove("cancel-animation");this.$.tooltip.classList.add("hidden")},_onAnimationFinish:function(){if(this._showing){this.$.tooltip.classList.remove(this._getAnimationType("entry"));this.$.tooltip.classList.remove("cancel-animation");this.$.tooltip.classList.add(this._getAnimationType("exit"))}},_onAnimationEnd:function(){this._animationPlaying=false;if(!this._showing){this.$.tooltip.classList.remove(this._getAnimationType("exit"));this.$.tooltip.classList.add("hidden")}},_getAnimationType:function(type){if(type==="entry"&&this.animationEntry!==""){return this.animationEntry}if(type==="exit"&&this.animationExit!==""){return this.animationExit}if(this.animationConfig[type]&&typeof this.animationConfig[type][0].name==="string"){if(this.animationConfig[type][0].timing&&this.animationConfig[type][0].timing.delay&&this.animationConfig[type][0].timing.delay!==0){var timingDelay=this.animationConfig[type][0].timing.delay;if(type==="entry"){this.updateStyles({"--paper-tooltip-delay-in":timingDelay+"ms"})}else if(type==="exit"){this.updateStyles({"--paper-tooltip-delay-out":timingDelay+"ms"})}}return this.animationConfig[type][0].name}},_removeListeners:function(){if(this._target){this.unlisten(this._target,"mouseenter","show");this.unlisten(this._target,"focus","show");this.unlisten(this._target,"mouseleave","hide");this.unlisten(this._target,"blur","hide");this.unlisten(this._target,"tap","hide")}this.unlisten(this.$.tooltip,"animationend","_onAnimationEnd");this.unlisten(this,"mouseenter","hide")}});// Copyright 2017 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style" scope="cr-tooltip-icon">:host {
  display: flex;
}

iron-icon {
  --iron-icon-width: var(--cr-icon-size);
        --iron-icon-height: var(--cr-icon-size);
}

</style>
    <iron-icon id="indicator" tabindex="0" aria-label$="[[iconAriaLabel]]" aria-describedby="tooltip" icon="[[iconClass]]"></iron-icon>
    <paper-tooltip id="tooltip" for="indicator" position="[[tooltipPosition]]" fit-to-visible-bounds="" part="tooltip">
      [[tooltipText]]
    </paper-tooltip>
<!--_html_template_end_-->`,is:"cr-tooltip-icon",properties:{iconAriaLabel:String,iconClass:String,tooltipText:String,tooltipPosition:{type:String,value:"top"}},getFocusableElement(){return this.$.indicator}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="cr-policy-pref-indicator"></style>
    <cr-tooltip-icon hidden$="[[!indicatorVisible]]" tooltip-text="[[indicatorTooltip_]]" icon-class="[[indicatorIcon]]" icon-aria-label="[[iconAriaLabel]]" exportparts="tooltip">
    </cr-tooltip-icon>
<!--_html_template_end_-->`,is:"cr-policy-pref-indicator",behaviors:[CrPolicyIndicatorBehavior],properties:{iconAriaLabel:String,indicatorType:{type:String,value:CrPolicyIndicatorType.NONE,computed:"getIndicatorTypeForPref_(pref.*, associatedValue)"},indicatorTooltip_:{type:String,computed:"getIndicatorTooltipForPref_(indicatorType, pref.*)"},pref:Object,associatedValue:Object},getIndicatorTypeForPref_(){const{enforcement:enforcement,userSelectableValues:userSelectableValues,controlledBy:controlledBy,recommendedValue:recommendedValue}=this.pref;if(enforcement===chrome.settingsPrivate.Enforcement.RECOMMENDED){if(this.associatedValue!==undefined&&this.associatedValue!==recommendedValue){return CrPolicyIndicatorType.NONE}return CrPolicyIndicatorType.RECOMMENDED}if(enforcement===chrome.settingsPrivate.Enforcement.ENFORCED){if(userSelectableValues!==undefined){if(recommendedValue&&this.associatedValue===recommendedValue){return CrPolicyIndicatorType.RECOMMENDED}else if(userSelectableValues.includes(this.associatedValue)){return CrPolicyIndicatorType.NONE}}switch(controlledBy){case chrome.settingsPrivate.ControlledBy.EXTENSION:return CrPolicyIndicatorType.EXTENSION;case chrome.settingsPrivate.ControlledBy.PRIMARY_USER:return CrPolicyIndicatorType.PRIMARY_USER;case chrome.settingsPrivate.ControlledBy.OWNER:return CrPolicyIndicatorType.OWNER;case chrome.settingsPrivate.ControlledBy.USER_POLICY:return CrPolicyIndicatorType.USER_POLICY;case chrome.settingsPrivate.ControlledBy.DEVICE_POLICY:return CrPolicyIndicatorType.DEVICE_POLICY;case chrome.settingsPrivate.ControlledBy.PARENT:return CrPolicyIndicatorType.PARENT;case chrome.settingsPrivate.ControlledBy.CHILD_RESTRICTION:return CrPolicyIndicatorType.CHILD_RESTRICTION}}if(enforcement===chrome.settingsPrivate.Enforcement.PARENT_SUPERVISED){return CrPolicyIndicatorType.PARENT}return CrPolicyIndicatorType.NONE},getIndicatorTooltipForPref_(){if(!this.pref){return""}const matches=this.pref&&this.pref.value===this.pref.recommendedValue;return this.getIndicatorTooltip(this.indicatorType,this.pref.controlledByName||"",matches)},getFocusableElement(){return this.$$("cr-tooltip-icon").getFocusableElement()}});// Copyright 2016 The Chromium Authors. All rights reserved.
const PrefControlBehavior={properties:{pref:{type:Object,notify:true,observer:"validatePref_"}},ready(){this.validatePref_()},validatePref_(){CrSettingsPrefs.initialized.then((()=>{if(this.pref===undefined){let error="Pref not found for element "+this.tagName;if(this.id){error+="#"+this.id}error+=" in "+this.getRootNode().host.tagName;console.error(error)}else if(this.pref.enforcement===chrome.settingsPrivate.Enforcement.PARENT_SUPERVISED){console.error("PARENT_SUPERVISED is not enforced by pref controls")}}))}};// Copyright 2015 The Chromium Authors. All rights reserved.
function stringToPrefValue(value,pref){switch(pref.type){case chrome.settingsPrivate.PrefType.BOOLEAN:return value==="true";case chrome.settingsPrivate.PrefType.NUMBER:const n=parseFloat(value);if(isNaN(n)){console.error("Argument to stringToPrefValue for number pref "+"was unparsable: "+value);return undefined}return n;case chrome.settingsPrivate.PrefType.STRING:case chrome.settingsPrivate.PrefType.URL:return value;default:assertNotReached("No conversion from string to "+pref.type+" pref")}}function prefToString(pref){switch(pref.type){case chrome.settingsPrivate.PrefType.BOOLEAN:case chrome.settingsPrivate.PrefType.NUMBER:return pref.value.toString();case chrome.settingsPrivate.PrefType.STRING:case chrome.settingsPrivate.PrefType.URL:return pref.value;default:assertNotReached("No conversion from "+pref.type+" pref to string")}}// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared cr-radio-button-style" scope="controlled-radio-button">:host([disabled]) {
  opacity: 1;
}

:host([disabled]) .disc-wrapper, :host([disabled]) #labelWrapper {
  opacity: var(--cr-disabled-opacity);
}

cr-policy-pref-indicator {
  margin-inline-start: var(--settings-controlled-by-spacing);
        
        pointer-events: all;
}

</style>

    <div aria-checked$="[[getAriaChecked_(checked)]]" aria-describedby="slotted-content" aria-disabled$="[[getAriaDisabled_(disabled)]]" aria-labelledby="label" class="disc-wrapper" id="button" role="radio" tabindex$="[[buttonTabIndex_]]" on-keydown="onInputKeydown_">
      <div class="disc-border"></div>
      <div class="disc"></div>
    </div>

    <div id="labelWrapper">
      <span id="label" hidden$="[[!label]]">[[label]]</span>
      <span id="slotted-content">
        <slot></slot>
      </span>
    </div>

    <template is="dom-if" if="[[showIndicator_(disabled, name, pref.*)]]">
      <cr-policy-pref-indicator pref="[[pref]]" on-click="onIndicatorTap_" icon-aria-label="[[label]]">
      </cr-policy-pref-indicator>
    </template>

<!--_html_template_end_-->`,is:"controlled-radio-button",behaviors:[PrefControlBehavior,CrRadioButtonBehavior],observers:["updateDisabled_(pref.enforcement)"],updateDisabled_(){this.disabled=this.pref.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED},showIndicator_(){return this.disabled&&this.name===prefToString(assert(this.pref))},onIndicatorTap_(e){e.preventDefault();e.stopPropagation()}});// Copyright 2016 The Chromium Authors. All rights reserved.
class ExtensionControlBrowserProxyImpl{disableExtension(extensionId){chrome.send("disableExtension",[extensionId])}manageExtension(extensionId){window.open("chrome://extensions?id="+extensionId)}}addSingletonGetter(ExtensionControlBrowserProxyImpl);// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="extension-controlled-indicator">:host {
  align-items: center;
        display: flex;
        margin-inline-start: 36px;
        min-height: var(--settings-row-min-height);
}

img {
  margin-inline-end: 16px;
}

:host > span {
  flex: 1;
        margin-inline-end: 8px;
}

</style>
    <img role="presentation" src="chrome://extension-icon/[[extensionId]]/20/1">
    <span inner-h-t-m-l="[[getLabel_(extensionId, extensionName)]]"></span>
    <template is="dom-if" if="[[extensionCanBeDisabled]]" restamp="">
      <cr-button on-click="onDisableTap_">إيقاف</cr-button>
    </template>
<!--_html_template_end_-->`,is:"extension-controlled-indicator",behaviors:[I18nBehavior],properties:{extensionCanBeDisabled:Boolean,extensionId:String,extensionName:String},getLabel_(extensionId,extensionName){if(this.extensionId===undefined||this.extensionName===undefined){return""}const manageUrl="chrome://extensions/?id="+this.extensionId;return this.i18nAdvanced("controlledByExtension",{substitutions:['<a href="'+manageUrl+'" target="_blank">'+this.extensionName+"</a>"]})},onDisableTap_(){assert(this.extensionCanBeDisabled);ExtensionControlBrowserProxyImpl.getInstance().disableExtension(assert(this.extensionId));this.fire("extension-disable")}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-radio-button-style cr-hidden-style" scope="cr-radio-button"></style>

    <div aria-checked$="[[getAriaChecked_(checked)]]" aria-describedby="slotted-content" aria-disabled$="[[getAriaDisabled_(disabled)]]" aria-labelledby="label" class="disc-wrapper" id="button" role="radio" tabindex$="[[buttonTabIndex_]]" on-keydown="onInputKeydown_">
      <div class="disc-border"></div>
      <div class="disc"></div>
    </div>

    <div id="labelWrapper">
      <span id="label" hidden$="[[!label]]" aria-hidden="true">[[label]]</span>
      <span id="slotted-content">
        <slot></slot>
      </span>
    </div>
<!--_html_template_end_-->`,is:"cr-radio-button",behaviors:[CrRadioButtonBehavior]});// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var EventTracker=class{constructor(){this.listeners_=[]}add(target,eventType,listener,opt_capture){const capture=!!opt_capture;const h={target:target,eventType:eventType,listener:listener,capture:capture};this.listeners_.push(h);target.addEventListener(eventType,listener,capture)}remove(target,eventType){this.listeners_=this.listeners_.filter((listener=>{if(listener.target===target&&(!eventType||listener.eventType===eventType)){EventTracker.removeEventListener(listener);return false}return true}))}removeAll(){this.listeners_.forEach((listener=>EventTracker.removeEventListener(listener)));this.listeners_=[]}static removeEventListener(entry){entry.target.removeEventListener(entry.eventType,entry.listener,entry.capture)}};// Copyright 2018 The Chromium Authors. All rights reserved.
function isEnabled(radio){return radio.matches(":not([disabled]):not([hidden])")&&radio.style.display!=="none"&&radio.style.visibility!=="hidden"}Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-radio-group">:host {
  display: inline-block;
}

:host ::slotted(*) {
  padding: var(--cr-radio-group-item-padding, 12px);
}

:host([disabled]) {
  cursor: initial;
        pointer-events: none;
        user-select: none;
}

:host([disabled]) ::slotted(*) {
  opacity: var(--cr-disabled-opacity);
}

</style>
    <slot></slot>
<!--_html_template_end_-->`,is:"cr-radio-group",properties:{disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"update_"},selected:{type:String,notify:true,observer:"update_"},selectableElements:{type:String,value:"cr-radio-button, cr-card-radio-button, controlled-radio-button"},selectableRegExp_:{value:Object,computed:"computeSelectableRegExp_(selectableElements)"}},listeners:{keydown:"onKeyDown_",click:"onClick_"},hostAttributes:{"aria-disabled":"false",role:"radiogroup"},buttons_:null,buttonEventTracker_:null,deltaKeyMap_:null,isRtl_:false,observer_:null,populateBound_:null,attached(){this.isRtl_=this.matches(":host-context([dir=rtl]) cr-radio-group");this.deltaKeyMap_=new Map([["ArrowDown",1],["ArrowLeft",this.isRtl_?1:-1],["ArrowRight",this.isRtl_?-1:1],["ArrowUp",-1],["PageDown",1],["PageUp",-1]]);this.buttonEventTracker_=new EventTracker;this.populateBound_=()=>this.populate_();if(Polymer.DomIf){this.$$("slot").addEventListener("slotchange",this.populateBound_)}else{this.observer_=dom(this).observeNodes(this.populateBound_)}this.populate_()},detached(){if(Polymer.DomIf){this.$$("slot").removeEventListener("slotchange",this.populateBound_)}else if(this.observer_){dom(this).unobserveNodes(this.observer_)}this.buttonEventTracker_.removeAll()},focus(){if(this.disabled||!this.buttons_){return}const radio=this.buttons_.find((radio=>this.isButtonEnabledAndSelected_(radio)));if(radio){radio.focus()}},onKeyDown_(event){if(this.disabled){return}if(event.ctrlKey||event.shiftKey||event.metaKey||event.altKey){return}const targetElement=event.target;if(!this.buttons_.includes(targetElement)){return}if(event.key===" "||event.key==="Enter"){event.preventDefault();this.select_(event.target);return}const enabledRadios=this.buttons_.filter(isEnabled);if(enabledRadios.length===0){return}let selectedIndex;const max=enabledRadios.length-1;if(event.key==="Home"){selectedIndex=0}else if(event.key==="End"){selectedIndex=max}else if(this.deltaKeyMap_.has(event.key)){const delta=this.deltaKeyMap_.get(event.key);const lastSelection=enabledRadios.findIndex((radio=>radio.checked));selectedIndex=Math.max(0,lastSelection)+delta;if(selectedIndex>max){selectedIndex=0}else if(selectedIndex<0){selectedIndex=max}}else{return}const radio=enabledRadios[selectedIndex];const name=`${radio.name}`;if(this.selected!==name){event.preventDefault();this.selected=name;radio.focus()}},computeSelectableRegExp_(){const tags=this.selectableElements.split(", ").join("|");return new RegExp(`^(${tags})$`,"i")},onClick_(event){const path=event.composedPath();if(path.some((target=>/^a$/i.test(target.tagName)))){return}const target=path.find((n=>this.selectableRegExp_.test(n.tagName)));if(target&&this.buttons_.includes(target)){this.select_(target)}},populate_(){this.buttons_=Polymer.DomIf?this.$$("slot").assignedNodes({flatten:true}).filter((n=>this.selectableRegExp_.test(n.tagName))):this.queryAllEffectiveChildren(this.selectableElements);this.buttonEventTracker_.removeAll();this.buttons_.forEach((el=>{this.buttonEventTracker_.add(el,"disabled-changed",(()=>this.populate_()));this.buttonEventTracker_.add(el,"name-changed",(()=>this.populate_()))}));this.update_()},select_(button){if(!isEnabled(button)){return}const name=`${button.name}`;if(this.selected!==name){this.selected=name}},isButtonEnabledAndSelected_(button){return!this.disabled&&button.checked&&isEnabled(button)},update_(){if(!this.buttons_){return}let noneMadeFocusable=true;this.buttons_.forEach((radio=>{radio.checked=this.selected!==undefined&&`${radio.name}`===`${this.selected}`;const disabled=this.disabled||!isEnabled(radio);const canBeFocused=radio.checked&&!disabled;if(canBeFocused){radio.focusable=true;noneMadeFocusable=false}else{radio.focusable=false}radio.setAttribute("aria-disabled",`${disabled}`)}));this.setAttribute("aria-disabled",`${this.disabled}`);if(noneMadeFocusable&&!this.disabled){const radio=this.buttons_.find(isEnabled);if(radio){radio.focusable=true}}}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-radio-group"></style>
    <cr-radio-group selected="[[selected]]" on-selected-changed="onSelectedChanged_" aria-label$="[[groupAriaLabel]]" selectable-elements="[[selectableElements]]">
      <slot></slot>
    </cr-radio-group>
<!--_html_template_end_-->`,is:"settings-radio-group",behaviors:[PrefControlBehavior],properties:{groupAriaLabel:String,noSetPref:{type:Boolean,value:false},selected:String,selectableElements:{type:String,value:["cr-radio-button","controlled-radio-button"].join(", ")}},hostAttributes:{role:"none"},observers:["resetToPrefValue(pref.*)"],focus(){this.$$("cr-radio-group").focus()},resetToPrefValue(){const pref=this.pref;this.selected=prefToString(pref)},sendPrefChange(){if(!this.pref){return}this.set("pref.value",stringToPrefValue(this.selected,this.pref))},onSelectedChanged_(){this.selected=this.$$("cr-radio-group").selected;if(!this.noSetPref){this.sendPrefChange()}this.fire("change")}});// Copyright 2017 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-toggle">:host {
  --cr-toggle-checked-bar-color: var(--google-blue-600);
        --cr-toggle-checked-button-color: var(--google-blue-600);
        --cr-toggle-checked-ripple-color:
            rgba(var(--google-blue-600-rgb), .2);
        --cr-toggle-unchecked-bar-color: var(--google-grey-400);
        --cr-toggle-unchecked-button-color: white;
        --cr-toggle-unchecked-ripple-color:
            rgba(var(--google-grey-600-rgb), .15);
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        display: block;
        min-width: 34px;
        outline: none;
        position: relative;
        width: 34px;
}

@media (prefers-color-scheme: dark) {
:host {
  --cr-toggle-checked-bar-color: var(--google-blue-refresh-300);
          --cr-toggle-checked-button-color: var(--google-blue-refresh-300);
          --cr-toggle-checked-ripple-color:
              rgba(var(--google-blue-refresh-300-rgb), .4);
          --cr-toggle-unchecked-bar-color: var(--google-grey-refresh-500);
          --cr-toggle-unchecked-button-color: var(--google-grey-refresh-300);
          --cr-toggle-unchecked-ripple-color:
              rgba(var(--google-grey-refresh-300-rgb), .4);
}

}

:host([dark]) {
  --cr-toggle-checked-bar-color: var(--google-blue-refresh-300);
        --cr-toggle-checked-button-color: var(--google-blue-refresh-300);
        --cr-toggle-checked-ripple-color:
            rgba(var(--google-blue-refresh-300-rgb), .4);
        --cr-toggle-unchecked-bar-color: var(--google-grey-refresh-500);
        --cr-toggle-unchecked-button-color: var(--google-grey-refresh-300);
        --cr-toggle-unchecked-ripple-color:
            rgba(var(--google-grey-refresh-300-rgb), .4);
}

:host([disabled]) {
  cursor: initial;
        opacity: var(--cr-disabled-opacity);
        pointer-events: none;
}

#bar {
  background-color: var(--cr-toggle-unchecked-bar-color);
        border-radius: 8px;
        height: 12px;
        left: 3px;
        position: absolute;
        top: 2px;
        transition: background-color linear 80ms;
        width: 28px;
        z-index: 0;
}

:host([checked]) #bar {
  background-color: var(--cr-toggle-checked-bar-color);
        opacity: 0.5;
}

#knob {
  background-color: var(--cr-toggle-unchecked-button-color);
        border-radius: 50%;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .4);
        display: block;
        height: 16px;
        position: relative;
        transition: transform linear 80ms, background-color linear 80ms;
        width: 16px;
        z-index: 1;
}

:host([checked]) #knob {
  background-color: var(--cr-toggle-checked-button-color);
        transform: translate3d(18px, 0, 0);
}

:host-context([dir=rtl]):host([checked]) #knob {
  transform: translate3d(-18px, 0, 0);
}

paper-ripple {
  --paper-ripple-opacity: 1;
        color: var(--cr-toggle-unchecked-ripple-color);
        height: 40px;
        left: -12px;
        pointer-events: none;
        top: -12px;
        transition: color linear 80ms;
        width: 40px;
}

:host([checked]) paper-ripple {
  color: var(--cr-toggle-checked-ripple-color);
}

:host-context([dir=rtl]) paper-ripple {
  left: auto;
        right: -12px;
}

</style>
    <span id="bar"></span>
    <span id="knob"></span>
<!--_html_template_end_-->`,is:"cr-toggle",behaviors:[PaperRippleBehavior],properties:{checked:{type:Boolean,value:false,reflectToAttribute:true,observer:"checkedChanged_",notify:true},dark:{type:Boolean,value:false,reflectToAttribute:true},disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"}},hostAttributes:{"aria-disabled":"false","aria-pressed":"false",role:"button",tabindex:0},listeners:{blur:"hideRipple_",click:"onClick_",focus:"onFocus_",keydown:"onKeyDown_",keyup:"onKeyUp_",pointerdown:"onPointerDown_",pointerup:"onPointerUp_"},boundPointerMove_:null,MOVE_THRESHOLD_PX:5,handledInPointerMove_:false,attached(){const direction=this.matches(":host-context([dir=rtl]) cr-toggle")?-1:1;this.boundPointerMove_=e=>{e.preventDefault();const diff=e.clientX-this.pointerDownX_;if(Math.abs(diff)<this.MOVE_THRESHOLD_PX){return}this.handledInPointerMove_=true;const shouldToggle=diff*direction<0&&this.checked||diff*direction>0&&!this.checked;if(shouldToggle){this.toggleState_(false)}}},checkedChanged_(){this.setAttribute("aria-pressed",this.checked?"true":"false")},disabledChanged_(){this.setAttribute("tabindex",this.disabled?-1:0);this.setAttribute("aria-disabled",this.disabled?"true":"false")},onFocus_(){this.getRipple().showAndHoldDown()},hideRipple_(){this.getRipple().clear()},onPointerUp_(){this.removeEventListener("pointermove",this.boundPointerMove_);this.hideRipple_()},onPointerDown_(e){if(e.button!==0){return}this.setPointerCapture(e.pointerId);this.pointerDownX_=e.clientX;this.handledInPointerMove_=false;this.addEventListener("pointermove",this.boundPointerMove_)},onClick_(e){e.stopPropagation();e.preventDefault();if(this.handledInPointerMove_){return}this.toggleState_(false)},toggleState_(fromKeyboard){if(this.disabled){return}if(!fromKeyboard){this.hideRipple_()}this.checked=!this.checked;this.fire("change",this.checked)},onKeyDown_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.repeat){return}if(e.key==="Enter"){this.toggleState_(true)}},onKeyUp_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.key===" "){this.toggleState_(true)}},_createRipple(){this._rippleContainer=this.$.knob;const ripple=PaperRippleBehavior._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");ripple.classList.add("circle","toggle-ink");return ripple}});// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const CrPolicyPrefBehavior={properties:{noExtensionIndicator:Boolean},isPrefEnforced(){return!!this.pref&&this.pref.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED},hasPrefPolicyIndicator(){if(!this.pref){return false}if(this.noExtensionIndicator&&this.pref.controlledBy===chrome.settingsPrivate.ControlledBy.EXTENSION){return false}return this.isPrefEnforced()||this.pref.enforcement===chrome.settingsPrivate.Enforcement.RECOMMENDED}};// Copyright 2016 The Chromium Authors. All rights reserved.
const SettingsBooleanControlBehaviorImpl={properties:{inverted:{type:Boolean,value:false},checked:{type:Boolean,value:false,notify:true,reflectToAttribute:true},disabled:{type:Boolean,value:false,notify:true,reflectToAttribute:true},noSetPref:{type:Boolean,value:false},label:{type:String,value:""},subLabel:{type:String,value:""},numericUncheckedValue:{type:Number,value:0}},observers:["prefValueChanged_(pref.value)"],notifyChangedByUserInteraction(){this.fire("settings-boolean-control-change");if(!this.pref||this.noSetPref){return}this.sendPrefChange()},resetToPrefValue(){this.checked=this.getNewValue_(this.pref.value)},sendPrefChange(){if(this.pref.type===chrome.settingsPrivate.PrefType.NUMBER){assert(!this.inverted);this.set("pref.value",this.checked?1:this.numericUncheckedValue);return}this.set("pref.value",this.inverted?!this.checked:this.checked)},prefValueChanged_(prefValue){this.checked=this.getNewValue_(prefValue)},getNewValue_(value){if(this.pref.type===chrome.settingsPrivate.PrefType.NUMBER){assert(!this.inverted);return value!==this.numericUncheckedValue}return this.inverted?!value:!!value},controlDisabled(){return this.disabled||this.isPrefEnforced()||!!(this.pref&&this.pref.userControlDisabled)}};const SettingsBooleanControlBehavior=[CrPolicyPrefBehavior,PrefControlBehavior,SettingsBooleanControlBehaviorImpl];// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared iron-flex" scope="settings-toggle-button">:host {
  align-items: center;
        display: flex;
        padding: 0 var(--cr-section-padding);
}

:host([elide-label]), :host([elide-label]) #outerRow, :host([elide-label]) #outerRow > div.flex {
  min-width: 0;
}

:host([elide-label]) .label {
  overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
}

#outerRow {
  align-items: center;
        display: flex;
        min-height: var(--settings-row-two-line-min-height);
        width: 100%;
}

#outerRow[noSubLabel] {
  min-height: var(--settings-row-min-height);
}

#labelWrapper {
  padding: var(--cr-section-vertical-padding) 0;
}

#labelWrapper, ::slotted([slot='more-actions']) {
  margin-inline-end: var(--settings-control-label-spacing) !important;
}

cr-policy-pref-indicator {
  margin-inline-end: var(--settings-controlled-by-spacing);
}

</style>
    <div id="outerRow" nosublabel$="[[!subLabel]]">
      <div class="flex" id="labelWrapper" hidden$="[[!label]]">
        <div class="label" aria-hidden="true">[[label]]</div>
        <div class="secondary label" id="sub-label">
          <span id="sub-label-text" aria-hidden="true">
            [[subLabel]]
          </span>
          <template is="dom-if" if="[[learnMoreUrl]]">
            <a id="learn-more" href="[[learnMoreUrl]]" target="_blank" aria-labeledby="sub-label-text learn-more" on-click="onLearnMoreClicked_">
              مزيد من المعلومات
            </a>
          </template>
        </div>
      </div>
      <slot name="more-actions"></slot>
      <template is="dom-if" if="[[hasPrefPolicyIndicator(pref.*)]]">
        <cr-policy-pref-indicator pref="[[pref]]" icon-aria-label="[[label]]">
        </cr-policy-pref-indicator>
      </template>
      <cr-toggle id="control" checked="{{checked}}" on-change="onChange_" aria-label$="[[getAriaLabel_(label, ariaLabel)]]" aria-describedby="sub-label-text" disabled="[[controlDisabled(disabled, pref)]]">
      </cr-toggle>
    </div>
<!--_html_template_end_-->`,is:"settings-toggle-button",behaviors:[SettingsBooleanControlBehavior],properties:{ariaLabel:{type:String,reflectToAttribute:false,observer:"onAriaLabelSet_",value:""},elideLabel:{type:Boolean,reflectToAttribute:true},learnMoreUrl:{type:String,reflectToAttribute:true}},listeners:{click:"onHostTap_"},observers:["onDisableOrPrefChange_(disabled, pref.*)"],focus(){this.$.control.focus()},onAriaLabelSet_(){if(this.hasAttribute("aria-label")){const ariaLabel=this.ariaLabel;this.removeAttribute("aria-label");this.ariaLabel=ariaLabel}},getAriaLabel_(){return this.label||this.ariaLabel},onDisableOrPrefChange_(){if(this.controlDisabled()){this.removeAttribute("actionable")}else{this.setAttribute("actionable","")}},onHostTap_(e){e.stopPropagation();if(this.controlDisabled()){return}this.checked=!this.checked;this.notifyChangedByUserInteraction();this.fire("change")},onLearnMoreClicked_(e){e.stopPropagation();this.fire("learn-more-clicked")},onChange_(e){this.checked=e.detail;this.notifyChangedByUserInteraction()}});// Copyright 2017 The Chromium Authors. All rights reserved.
let hideInk=false;assert(!isIOS,"pointerdown doesn't work on iOS");document.addEventListener("pointerdown",(function(){hideInk=true}),true);document.addEventListener("keydown",(function(){hideInk=false}),true);const focusWithoutInk=function(toFocus){if(!("noink"in toFocus)||!hideInk){toFocus.focus();return}assert(document===toFocus.ownerDocument);const{noink:noink}=toFocus;toFocus.noink=true;toFocus.focus();toFocus.noink=noink};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var ORPHANS=new Set;const IronResizableBehavior={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:false}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[];this._boundNotifyResize=this.notifyResize.bind(this);this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){if(this._parentResizable){this._parentResizable.stopResizeNotificationsFor(this)}else{ORPHANS.delete(this);window.removeEventListener("resize",this._boundNotifyResize)}this._parentResizable=null},notifyResize:function(){if(!this.isAttached){return}this._interestedResizables.forEach((function(resizable){if(this.resizerShouldNotify(resizable)){this._notifyDescendant(resizable)}}),this);this._fireResize()},assignParentResizable:function(parentResizable){if(this._parentResizable){this._parentResizable.stopResizeNotificationsFor(this)}this._parentResizable=parentResizable;if(parentResizable&&parentResizable._interestedResizables.indexOf(this)===-1){parentResizable._interestedResizables.push(this);parentResizable._subscribeIronResize(this)}},stopResizeNotificationsFor:function(target){var index=this._interestedResizables.indexOf(target);if(index>-1){this._interestedResizables.splice(index,1);this._unsubscribeIronResize(target)}},_subscribeIronResize:function(target){target.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(target){target.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(element){return true},_onDescendantIronResize:function(event){if(this._notifyingDescendant){event.stopPropagation();return}if(!useShadow){this._fireResize()}},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:false})},_onIronRequestResizeNotifications:function(event){var target=dom(event).rootTarget;if(target===this){return}target.assignParentResizable(this);this._notifyDescendant(target);event.stopPropagation()},_parentResizableChanged:function(parentResizable){if(parentResizable){window.removeEventListener("resize",this._boundNotifyResize)}},_notifyDescendant:function(descendant){if(!this.isAttached){return}this._notifyingDescendant=true;descendant.notifyResize();this._notifyingDescendant=false},_requestResizeNotifications:function(){if(!this.isAttached){return}if(document.readyState==="loading"){var _requestResizeNotifications=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",(function readystatechanged(){document.removeEventListener("readystatechange",readystatechanged);_requestResizeNotifications()}))}else{this._findParent();if(!this._parentResizable){ORPHANS.forEach((function(orphan){if(orphan!==this){orphan._findParent()}}),this);window.addEventListener("resize",this._boundNotifyResize);this.notifyResize()}else{this._parentResizable._interestedResizables.forEach((function(resizable){if(resizable!==this){resizable._findParent()}}),this)}}},_findParent:function(){this.assignParentResizable(null);this.fire("iron-request-resize-notifications",null,{node:this,bubbles:true,cancelable:true});if(!this._parentResizable){ORPHANS.add(this)}else{ORPHANS.delete(this)}}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/class IronSelection{constructor(selectCallback){this.selection=[];this.selectCallback=selectCallback}get(){return this.multi?this.selection.slice():this.selection[0]}clear(excludes){this.selection.slice().forEach((function(item){if(!excludes||excludes.indexOf(item)<0){this.setItemSelected(item,false)}}),this)}isSelected(item){return this.selection.indexOf(item)>=0}setItemSelected(item,isSelected){if(item!=null){if(isSelected!==this.isSelected(item)){if(isSelected){this.selection.push(item)}else{var i=this.selection.indexOf(item);if(i>=0){this.selection.splice(i,1)}}if(this.selectCallback){this.selectCallback(item,isSelected)}}}}select(item){if(this.multi){this.toggle(item)}else if(this.get()!==item){this.setItemSelected(this.get(),false);this.setItemSelected(item,true)}}toggle(item){this.setItemSelected(item,!this.isSelected(item))}}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronSelectableBehavior={properties:{attrForSelected:{type:String,value:null},selected:{type:String,notify:true},selectedItem:{type:Object,readOnly:true,notify:true},activateEvent:{type:String,value:"tap",observer:"_activateEventChanged"},selectable:String,selectedClass:{type:String,value:"iron-selected"},selectedAttribute:{type:String,value:null},fallbackSelection:{type:String,value:null},items:{type:Array,readOnly:true,notify:true,value:function(){return[]}},_excludedLocalNames:{type:Object,value:function(){return{template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1}}}},observers:["_updateAttrForSelected(attrForSelected)","_updateSelected(selected)","_checkFallback(fallbackSelection)"],created:function(){this._bindFilterItem=this._filterItem.bind(this);this._selection=new IronSelection(this._applySelection.bind(this))},attached:function(){this._observer=this._observeItems(this);this._addListener(this.activateEvent)},detached:function(){if(this._observer){dom(this).unobserveNodes(this._observer)}this._removeListener(this.activateEvent)},indexOf:function(item){return this.items?this.items.indexOf(item):-1},select:function(value){this.selected=value},selectPrevious:function(){var length=this.items.length;var index=length-1;if(this.selected!==undefined){index=(Number(this._valueToIndex(this.selected))-1+length)%length}this.selected=this._indexToValue(index)},selectNext:function(){var index=0;if(this.selected!==undefined){index=(Number(this._valueToIndex(this.selected))+1)%this.items.length}this.selected=this._indexToValue(index)},selectIndex:function(index){this.select(this._indexToValue(index))},forceSynchronousItemUpdate:function(){if(this._observer&&typeof this._observer.flush==="function"){this._observer.flush()}else{this._updateItems()}},get _shouldUpdateSelection(){return this.selected!=null},_checkFallback:function(){this._updateSelected()},_addListener:function(eventName){this.listen(this,eventName,"_activateHandler")},_removeListener:function(eventName){this.unlisten(this,eventName,"_activateHandler")},_activateEventChanged:function(eventName,old){this._removeListener(old);this._addListener(eventName)},_updateItems:function(){var nodes=dom(this).queryDistributedElements(this.selectable||"*");nodes=Array.prototype.filter.call(nodes,this._bindFilterItem);this._setItems(nodes)},_updateAttrForSelected:function(){if(this.selectedItem){this.selected=this._valueForItem(this.selectedItem)}},_updateSelected:function(){this._selectSelected(this.selected)},_selectSelected:function(selected){if(!this.items){return}var item=this._valueToItem(this.selected);if(item){this._selection.select(item)}else{this._selection.clear()}if(this.fallbackSelection&&this.items.length&&this._selection.get()===undefined){this.selected=this.fallbackSelection}},_filterItem:function(node){return!this._excludedLocalNames[node.localName]},_valueToItem:function(value){return value==null?null:this.items[this._valueToIndex(value)]},_valueToIndex:function(value){if(this.attrForSelected){for(var i=0,item;item=this.items[i];i++){if(this._valueForItem(item)==value){return i}}}else{return Number(value)}},_indexToValue:function(index){if(this.attrForSelected){var item=this.items[index];if(item){return this._valueForItem(item)}}else{return index}},_valueForItem:function(item){if(!item){return null}if(!this.attrForSelected){var i=this.indexOf(item);return i===-1?null:i}var propValue=item[dashToCamelCase(this.attrForSelected)];return propValue!=undefined?propValue:item.getAttribute(this.attrForSelected)},_applySelection:function(item,isSelected){if(this.selectedClass){this.toggleClass(this.selectedClass,isSelected,item)}if(this.selectedAttribute){this.toggleAttribute(this.selectedAttribute,isSelected,item)}this._selectionChange();this.fire("iron-"+(isSelected?"select":"deselect"),{item:item})},_selectionChange:function(){this._setSelectedItem(this._selection.get())},_observeItems:function(node){return dom(node).observeNodes((function(mutation){this._updateItems();this._updateSelected();this.fire("iron-items-changed",mutation,{bubbles:false,cancelable:false})}))},_activateHandler:function(e){var t=e.target;var items=this.items;while(t&&t!=this){var i=items.indexOf(t);if(i>=0){var value=this._indexToValue(i);this._itemActivate(value,t);return}t=t.parentNode}},_itemActivate:function(value,item){if(!this.fire("iron-activate",{selected:value,item:item},{cancelable:true}).defaultPrevented){this.select(value)}}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`<!--css-build:shadow--><style scope="iron-pages">:host {
  display: block;
}

:host > ::slotted(:not(slot):not(.iron-selected)) {
  display: none !important;
}

</style>

    <slot></slot>
`,is:"iron-pages",behaviors:[IronResizableBehavior,IronSelectableBehavior],properties:{activateEvent:{type:String,value:null}},observers:["_selectedPageChanged(selected)"],_selectedPageChanged:function(selected,old){this.async(this.notifyResize)}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><iron-pages id="animatedPages" attr-for-selected="route-path" on-iron-select="onIronSelect_">
      <slot></slot>
    </iron-pages>
<!--_html_template_end_-->`,is:"settings-animated-pages",behaviors:[RouteObserverBehavior],properties:{section:String,focusConfig:Object},previousRoute_:null,created(){this.lightDomObserver_=dom(this).observeNodes(this.lightDomChanged_.bind(this))},onIronSelect_(e){if(e.target!==this.$.animatedPages){return}if(this.previousRoute_&&!Router.getInstance().lastRouteChangeWasPopstate()){const subpage=this.querySelector("settings-subpage.iron-selected");if(subpage){subpage.focusBackButton();return}}if(!Router.getInstance().lastRouteChangeWasPopstate()){return}if(!this.focusConfig||!this.previousRoute_){return}assert(this.focusConfig instanceof Map);const currentRoute=Router.getInstance().getCurrentRoute();const fromToKey=`${this.previousRoute_.path}_${currentRoute.path}`;let pathConfig=this.focusConfig.get(fromToKey)||this.focusConfig.get(this.previousRoute_.path);if(pathConfig){let handler;if(typeof pathConfig==="function"){handler=pathConfig}else{handler=()=>{if(typeof pathConfig==="string"){pathConfig=assert(this.querySelector(pathConfig))}focusWithoutInk(pathConfig)}}handler()}},lightDomChanged_(){if(this.lightDomReady_){return}this.lightDomReady_=true;dom(this).unobserveNodes(this.lightDomObserver_);this.runQueuedRouteChange_()},runQueuedRouteChange_(){if(!this.queuedRouteChange_){return}this.async(this.currentRouteChanged.bind(this,this.queuedRouteChange_.newRoute,this.queuedRouteChange_.oldRoute))},currentRouteChanged(newRoute,oldRoute){this.previousRoute_=oldRoute;if(newRoute.section===this.section&&newRoute.isSubpage()){this.switchToSubpage_(newRoute,oldRoute)}else{this.$.animatedPages.selected="default"}},switchToSubpage_(newRoute,oldRoute){if(!this.lightDomReady_){this.queuedRouteChange_=this.queuedRouteChange_||{oldRoute:oldRoute};this.queuedRouteChange_.newRoute=newRoute;return}this.ensureSubpageInstance_();this.$.animatedPages.selected=newRoute.path},ensureSubpageInstance_(){const routePath=Router.getInstance().getCurrentRoute().path;const domIf=this.querySelector(`dom-if[route-path='${routePath}']`);if(!domIf||domIf.if){return}const content=DomIf._contentForTemplate(domIf.firstElementChild);const subpage=content.querySelector("settings-subpage");subpage.setAttribute("route-path",routePath);if(domIf.hasAttribute("no-search")||domIf.noSearch){subpage.setAttribute("no-search","")}domIf.if=true;domIf.render()}});const template$d=document.createElement("template");template$d.innerHTML=`<dom-module id="cr-input-style" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-input-style">:host {\n  --cr-input-background-color: var(--google-grey-refresh-100);\n        --cr-input-color: var(--cr-primary-text-color);\n        --cr-input-error-color: var(--google-red-600);\n        --cr-input-focus-color: var(--google-blue-600);\n        --cr-input-placeholder-color: var(--cr-secondary-text-color);\n        display: block;\n        \n        outline: none;\n}\n\n@media (prefers-color-scheme: dark) {\n:host {\n  --cr-input-background-color: rgba(0, 0, 0, .3);\n          --cr-input-error-color: var(--google-red-refresh-300);\n          --cr-input-focus-color: var(--google-blue-refresh-300);\n}\n\n}\n\n:host([focused_]:not([readonly]):not([invalid])) #label {\n  color: var(--cr-input-focus-color);\n}\n\n#input-container {\n  border-radius: var(--cr-input-border-radius, 4px);\n        overflow: hidden;\n        position: relative;\n        width: var(--cr-input-width, 100%);\n}\n\n#inner-input-container {\n  background-color: var(--cr-input-background-color);\n        box-sizing: border-box;\n        padding: 0;\n}\n\n#input {\n  -webkit-appearance: none;\n        \n        background-color: transparent;\n        border: none;\n        box-sizing: border-box;\n        caret-color: var(--cr-input-focus-color);\n        color: var(--cr-input-color);\n        font-family: inherit;\n        font-size: inherit;\n        font-weight: inherit;\n        line-height: inherit;\n        min-height: var(--cr-input-min-height, auto);\n        outline: none;\n\n        \n        padding-bottom: var(--cr-input-padding-bottom, 6px);\n        padding-inline-end: var(--cr-input-padding-end, 8px);\n        padding-inline-start: var(--cr-input-padding-start, 8px);\n        padding-top: var(--cr-input-padding-top, 6px);\n\n        text-align: inherit;\n        text-overflow: ellipsis;\n        width: 100%;\n}\n\n#underline {\n  border-bottom: 2px solid var(--cr-input-focus-color);\n        border-radius: var(--cr-input-underline-border-radius, 0);\n        bottom: 0;\n        box-sizing: border-box;\n        height: var(--cr-input-underline-height, 0);\n        left: 0;\n        margin: auto;\n        opacity: 0;\n        position: absolute;\n        right: 0;\n        transition: opacity 120ms ease-out, width 0s linear 180ms;\n        width: 0;\n}\n\n:host([invalid]) #underline, :host([force-underline]) #underline, :host([focused_]) #underline {\n  opacity: 1;\n        transition: opacity 120ms ease-in, width 180ms ease-out;\n        width: 100%;\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$d.content.cloneNode(true));// Copyright 2018 The Chromium Authors. All rights reserved.
const SUPPORTED_INPUT_TYPES=new Set(["number","password","search","text","url"]);Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style cr-input-style cr-shared-style" scope="cr-input">:host([disabled]) :-webkit-any(#label, #error, #input-container) {
  opacity: var(--cr-disabled-opacity);
        pointer-events: none;
}

:host ::slotted(cr-button[slot=suffix]) {
  margin-inline-start: var(--cr-button-edge-spacing) !important;
}

:host([invalid]) #label {
  color: var(--cr-input-error-color);
}

#input {
  border-bottom: var(--cr-input-border-bottom, none);
        letter-spacing: var(--cr-input-letter-spacing);
}

#input::placeholder {
  color: var(--cr-input-placeholder-color);
        letter-spacing: var(--cr-input-placeholder-letter-spacing);
}

:host([invalid]) #input {
  caret-color: var(--cr-input-error-color);
}

:host([readonly]) #input {
  opacity: 0.6;
}

:host([invalid]) #underline {
  border-color: var(--cr-input-error-color);
}

#error {
  color: var(--cr-input-error-color);
        display: var(--cr-input-error-display, block);
        font-size: var(--cr-form-field-label-font-size);
        height: var(--cr-form-field-label-height);
        line-height: var(--cr-form-field-label-line-height);
        margin: 8px 0;
        visibility: hidden;
}

:host([invalid]) #error {
  visibility: visible;
}

#row-container, #inner-input-container {
  align-items: center;
        display: flex;
        
        justify-content: space-between;
        position: relative;
}

#input[type='search']::-webkit-search-cancel-button {
  display: none;
}

:host-context([dir=rtl]) #input[type=url] {
  text-align: right;
}

#input[type=url] {
  direction: ltr;
}

</style>
    <div id="label" class="cr-form-field-label" hidden="[[!label]]" aria-hidden="true">
      [[label]]
    </div>
    <div id="row-container" part="row-container">
      <div id="input-container">
        <div id="inner-input-container">
          <slot name="inline-prefix"></slot>
          <!-- Only attributes that are named inconsistently between html and js
              need to use attr$="", such as |tabindex| vs .tabIndex and
              |readonly| vs .readOnly. -->
          <input id="input" disabled="[[disabled]]" autofocus="[[autofocus]]" value="{{value::input}}" tabindex$="[[tabindex]]" type="[[type]]" readonly$="[[readonly]]" maxlength$="[[maxlength]]" pattern$="[[pattern]]" required="[[required]]" minlength$="[[minlength]]" inputmode$="[[inputmode]]" aria-label$="[[getAriaLabel_(ariaLabel, label, placeholder)]]" aria-invalid$="[[getAriaInvalid_(invalid)]]" max="[[max]]" min="[[min]]" on-focus="onInputFocus_" on-blur="onInputBlur_" on-change="onInputChange_" on-keydown="onInputKeydown_" part="input" autocomplete="off">
          <slot name="inline-suffix"></slot>
        </div>
        <div id="underline"></div>
      </div>
      <slot name="suffix"></slot>
    </div>
    <div id="error">[[displayErrorMessage_]]</div>
<!--_html_template_end_-->`,is:"cr-input",properties:{ariaLabel:{type:String,value:""},autofocus:{type:Boolean,value:false,reflectToAttribute:true},autoValidate:Boolean,disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"},errorMessage:{type:String,value:"",observer:"onInvalidOrErrorMessageChanged_"},displayErrorMessage_:{type:String,value:""},focused_:{type:Boolean,value:false,reflectToAttribute:true},invalid:{type:Boolean,value:false,notify:true,reflectToAttribute:true,observer:"onInvalidOrErrorMessageChanged_"},max:{type:Number,reflectToAttribute:true},min:{type:Number,reflectToAttribute:true},maxlength:{type:Number,reflectToAttribute:true},minlength:{type:Number,reflectToAttribute:true},pattern:{type:String,reflectToAttribute:true},inputmode:String,label:{type:String,value:""},placeholder:{type:String,value:null,observer:"placeholderChanged_"},readonly:{type:Boolean,reflectToAttribute:true},required:{type:Boolean,reflectToAttribute:true},tabindex:{type:Number,value:0,reflectToAttribute:true},type:{type:String,value:"text",observer:"onTypeChanged_"},value:{type:String,value:"",notify:true,observer:"onValueChanged_"}},hostAttributes:{"aria-disabled":"false"},listeners:{focus:"onFocus_",pointerdown:"onPointerDown_"},originalTabIndex_:null,attached(){if(this.disabled){this.reconcileTabindex_()}},onTypeChanged_(){assert(SUPPORTED_INPUT_TYPES.has(this.type))},get inputElement(){return this.$.input},getAriaLabel_(ariaLabel,label,placeholder){return ariaLabel||label||placeholder},getAriaInvalid_(invalid){return invalid?"true":"false"},disabledChanged_(current,previous){this.setAttribute("aria-disabled",this.disabled?"true":"false");this.focused_=false;if(previous!==undefined){this.reconcileTabindex_()}},onInvalidOrErrorMessageChanged_(){this.displayErrorMessage_=this.invalid?this.errorMessage:"";const ERROR_ID="error";const errorElement=this.$$(`#${ERROR_ID}`);if(this.invalid){errorElement.setAttribute("role","alert");this.inputElement.setAttribute("aria-errormessage",ERROR_ID)}else{errorElement.removeAttribute("role");this.inputElement.removeAttribute("aria-errormessage")}},reconcileTabindex_(){if(this.disabled){this.recordAndUnsetTabIndex_()}else{this.restoreTabIndex_()}},placeholderChanged_(){if(this.placeholder||this.placeholder===""){this.inputElement.setAttribute("placeholder",this.placeholder)}else{this.inputElement.removeAttribute("placeholder")}},onFocus_(){if(!this.focusInput()){return}this.inputElement.select()},focusInput(){if(this.shadowRoot.activeElement===this.inputElement){return false}this.inputElement.focus();return true},recordAndUnsetTabIndex_(){if(this.originalTabIndex_===null){this.originalTabIndex_=this.tabindex}this.tabindex=null},restoreTabIndex_(){this.tabindex=this.originalTabIndex_;this.originalTabIndex_=null},onPointerDown_(e){if(this.disabled){return}if(e.path[0].tagName!=="INPUT"){this.recordAndUnsetTabIndex_();setTimeout((()=>{if(!this.disabled){this.restoreTabIndex_()}}),0)}},onInputKeydown_(e){if(e.shiftKey&&e.key==="Tab"){this.focus()}},onValueChanged_(newValue,oldValue){if(!newValue&&!oldValue){return}if(this.autoValidate){this.validate()}},onInputChange_(e){this.fire("change",{sourceEvent:e})},onInputFocus_(){this.focused_=true},onInputBlur_(){this.focused_=false},select(start,end){this.focusInput();if(start!==undefined&&end!==undefined){this.inputElement.setSelectionRange(start,end)}else{assert(start===undefined&&end===undefined);this.inputElement.select()}},validate(){this.invalid=!this.inputElement.checkValidity();return!this.invalid}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style" scope="cr-search-field">:host {
  display: flex;
        user-select: none;
        --cr-search-field-clear-icon-fill: var(--google-grey-refresh-700);
        --cr-search-field-input-border-bottom: 1px solid var(--cr-secondary-text-color);
}

#searchIcon {
  align-self: center;
        display: var(--cr-search-field-search-icon-display, inherit);
        height: 16px;
        padding: 4px;
        vertical-align: middle;
        width: 16px;
}

#searchIconInline {
  --iron-icon-fill-color: var(--cr-search-field-search-icon-fill, inherit);
        display: var(--cr-search-field-search-icon-inline-display, none);
        margin-inline-start: var(--cr-search-field-search-icon-inline-margin-start, 0);
}

#searchInput {
  --cr-input-background-color: transparent;
        --cr-input-border-bottom: var(--cr-search-field-input-border-bottom);
        --cr-input-border-radius: 0;
        --cr-input-error-display: none;
        --cr-input-min-height: var(--cr-search-field-input-min-height, 24px);
        --cr-input-padding-end: 0;
        --cr-input-padding-start: var(--cr-search-field-input-padding-start, 0);
        --cr-input-padding-bottom: var(--cr-search-field-input-padding-bottom, 2px);
        --cr-input-padding-top: var(--cr-search-field-input-padding-top, 2px);
        --cr-input-underline-border-radius: var(--cr-search-field-input-underline-border-radius, 0);
        --cr-input-underline-height: var(--cr-search-field-input-underline-height, 0);
        align-self: stretch;
        color: var(--cr-primary-text-color);
        display: block;
        font-size: 92.3076923%;  
        width: var(--cr-search-field-input-width, 160px);
}

:host([has-search-text]) #searchInput {
  --cr-input-padding-end: 20px;
}

#clearSearch {
  --cr-icon-button-fill-color: var(--cr-search-field-clear-icon-fill);
        
        --cr-icon-button-icon-size: var(--cr-search-field-clear-icon-size, 16px);
        --cr-icon-button-size: 24px;
        margin-inline-end: var(--cr-search-field-clear-icon-margin-end, -4px);
        margin-inline-start: 4px;
        position: absolute;
        right: 0;
}

:host-context([dir='rtl']) #clearSearch {
  left: 0;
        right: auto;
}

</style>
    <iron-icon id="searchIcon" icon="cr:search"></iron-icon>
    <cr-input id="searchInput" on-search="onSearchTermSearch" on-input="onSearchTermInput" aria-label$="[[label]]" type="search" autofocus="[[autofocus]]" placeholder="[[label]]" spellcheck="false">
      <iron-icon id="searchIconInline" slot="inline-prefix" icon="cr:search"></iron-icon>
      <cr-icon-button id="clearSearch" class="icon-cancel" hidden$="[[!hasSearchText]]" slot="suffix" on-click="onTapClear_" title="[[clearLabel]]">
      </cr-icon-button>
    </cr-input>
<!--_html_template_end_-->`,is:"cr-search-field",behaviors:[CrSearchFieldBehavior],properties:{autofocus:{type:Boolean,value:false}},getSearchInput(){return this.$.searchInput},onTapClear_(){this.setValue("");setTimeout((()=>{this.$.searchInput.focus()}))}});// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class KeyboardShortcut{constructor(shortcut){this.useKeyCode_=false;this.mods_={};this.key_=null;this.keyCode_=null;shortcut.split("|").forEach((part=>{const partLc=part.toLowerCase();switch(partLc){case"alt":case"ctrl":case"meta":case"shift":this.mods_[partLc+"Key"]=true;break;default:if(this.key_){throw Error("Invalid shortcut")}this.key_=part;if(part.match(/^[a-z]$/)){this.useKeyCode_=true;this.keyCode_=part.toUpperCase().charCodeAt(0)}}}))}matchesEvent(e){if(this.useKeyCode_&&e.keyCode===this.keyCode_||e.key===this.key_){const mods=this.mods_;return["altKey","ctrlKey","metaKey","shiftKey"].every((function(k){return e[k]===!!mods[k]}))}return false}}class KeyboardShortcutList{constructor(shortcuts){this.shortcuts_=shortcuts.split(/\s+/).map((function(shortcut){return new KeyboardShortcut(shortcut)}))}matchesEvent(e){return this.shortcuts_.some((function(keyboardShortcut){return keyboardShortcut.matchesEvent(e)}))}}// Copyright 2018 The Chromium Authors. All rights reserved.
const FindShortcutManager=(()=>{const listeners=[];let modalContextOpen=false;const shortcutCtrlF=new KeyboardShortcutList(isMac?"meta|f":"ctrl|f");const shortcutSlash=new KeyboardShortcutList("/");window.addEventListener("keydown",(e=>{if(e.defaultPrevented||listeners.length===0){return}if(!shortcutCtrlF.matchesEvent(e)&&(isTextInputElement(e.path[0])||!shortcutSlash.matchesEvent(e))){return}const focusIndex=listeners.findIndex((listener=>listener.searchInputHasFocus()));const index=focusIndex<=0?listeners.length-1:focusIndex-1;if(listeners[index].handleFindShortcut(modalContextOpen)){e.preventDefault()}}));window.addEventListener("cr-dialog-open",(()=>{modalContextOpen=true}));window.addEventListener("cr-drawer-opened",(()=>{modalContextOpen=true}));window.addEventListener("close",(e=>{if(["CR-DIALOG","CR-DRAWER"].includes(e.composedPath()[0].nodeName)){modalContextOpen=false}}));return Object.freeze({listeners:listeners})})();const FindShortcutBehavior={findShortcutListenOnAttach:true,attached(){if(this.findShortcutListenOnAttach){this.becomeActiveFindShortcutListener()}},detached(){if(this.findShortcutListenOnAttach){this.removeSelfAsFindShortcutListener()}},becomeActiveFindShortcutListener(){const listeners=FindShortcutManager.listeners;assert(!listeners.includes(this),"Already listening for find shortcuts.");listeners.push(this)},handleFindShortcut(modalContextOpen){assertNotReached()},removeSelfAsFindShortcutListener(){const listeners=FindShortcutManager.listeners;const index=listeners.indexOf(this);assert(listeners.includes(this),"Find shortcut listener not found.");listeners.splice(index,1)},searchInputHasFocus(){assertNotReached()}};// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared" scope="settings-subpage">:host {
  background-color: var(--cr-card-background-color);
        box-shadow: var(--cr-card-shadow);
        box-sizing: border-box;
        display: block;
        left: 0;
        min-height: calc(100vh - var(--cr-toolbar-height));
        padding-bottom: 60px;
        position: absolute;
        right: 0;
        top: 0;
}

#headerLine {
  min-height: 40px;
        padding-bottom: 24px;
        padding-top: 8px;
}

#learnMore {
  align-items: center;
        display: flex;
        height: var(--cr-icon-ripple-size);
        justify-content: center;
        margin-inline-end: var(--cr-icon-ripple-margin);
        margin-inline-start: var(--cr-icon-button-margin-start);
        position: relative;  
        width: var(--cr-icon-ripple-size);
}

#title-icon {
  height: 36px;
        margin-inline-end: 12px;
        margin-inline-start: 2px;
        width: 36px;
}

cr-icon-button {
  margin-inline-end: 10px;
        margin-inline-start: -10px;
}

paper-spinner-lite {
  height: var(--cr-icon-size);
        width: var(--cr-icon-size);
}

h1 {
  flex: 1;
}

cr-search-field {
  margin-inline-start: 16px;
}

</style>
    <div class="cr-row first" id="headerLine">
      <cr-icon-button class="icon-arrow-back" id="closeButton" hidden="[[hideCloseButton]]" on-click="onTapBack_" aria-label$="[[getBackButtonAriaLabel_(pageTitle)]]" aria-roledescription$="[[getBackButtonAriaRoleDescription_(pageTitle)]]">
      </cr-icon-button>
      <template is="dom-if" if="[[titleIcon]]">
        <img id="title-icon" src="[[titleIcon]]" aria-hidden="true">
      </template>
      <h1 class="cr-title-text">[[pageTitle]]</h1>
      <slot name="subpage-title-extra"></slot>
      <template is="dom-if" if="[[learnMoreUrl]]">
        <a id="learnMore" aria-label="مزيد من المعلومات" href="[[learnMoreUrl]]" target="_blank">
          <iron-icon icon="cr:help-outline"></iron-icon>
          <paper-ripple class="circle" center=""></paper-ripple>
        </a>
      </template>
      <template is="dom-if" if="[[searchLabel]]">
        <cr-search-field label="[[searchLabel]]" on-search-changed="onSearchChanged_" clear-label="محو البحث">
        </cr-search-field>
      </template>
      <template is="dom-if" if="[[showSpinner]]">
        <paper-spinner-lite active="" title$="[[spinnerTitle]]">
        </paper-spinner-lite>
      </template>
    </div>
    <slot></slot>
<!--_html_template_end_-->`,is:"settings-subpage",behaviors:[FindShortcutBehavior,I18nBehavior,IronResizableBehavior,RouteObserverBehavior],properties:{pageTitle:String,titleIcon:String,learnMoreUrl:String,searchLabel:String,searchTerm:{type:String,notify:true,value:""},showSpinner:{type:Boolean,value:false},spinnerTitle:{type:String,value:""},hideCloseButton:{type:Boolean,value:false},associatedControl:{type:Object,value:null},preserveSearchTerm:{type:Boolean,value:false},active_:{type:Boolean,value:false,observer:"onActiveChanged_"}},lastActiveValue_:false,findShortcutListenOnAttach:false,attached(){if(this.searchLabel){this.listen(this,"clear-subpage-search","onClearSubpageSearch_")}},detached(){if(this.searchLabel){this.unlisten(this,"clear-subpage-search","onClearSubpageSearch_")}},getSearchField_(){let searchField=this.$$("cr-search-field");if(searchField){return Promise.resolve(searchField)}return new Promise((resolve=>{listenOnce(this,"dom-change",(()=>{searchField=this.$$("cr-search-field");resolve(assert(searchField))}))}))},restoreSearchInput_(){const searchField=this.$$("cr-search-field");if(assert(searchField)){const urlSearchQuery=Router.getInstance().getQueryParameters().get("searchSubpage")||"";this.searchTerm=urlSearchQuery;searchField.setValue(urlSearchQuery)}},preserveSearchInput_(){const query=this.searchTerm;const searchParams=query.length>0?new URLSearchParams("searchSubpage="+encodeURIComponent(query)):undefined;const currentRoute=Router.getInstance().getCurrentRoute();Router.getInstance().navigateTo(currentRoute,searchParams)},focusBackButton(){if(this.hideCloseButton){return}afterNextRender(this,(()=>focusWithoutInk(this.$.closeButton)))},currentRouteChanged(newRoute,oldRoute){this.active_=this.getAttribute("route-path")===newRoute.path;if(this.active_&&this.searchLabel&&this.preserveSearchTerm){this.getSearchField_().then((()=>this.restoreSearchInput_()))}},onActiveChanged_(){if(this.lastActiveValue_===this.active_){return}this.lastActiveValue_=this.active_;if(this.active_&&this.pageTitle){document.title=loadTimeData.getStringF("settingsAltPageTitle",this.pageTitle)}if(!this.searchLabel){return}const searchField=this.$$("cr-search-field");if(searchField){searchField.setValue("")}if(this.active_){this.becomeActiveFindShortcutListener()}else{this.removeSelfAsFindShortcutListener()}},onClearSubpageSearch_(e){e.stopPropagation();this.$$("cr-search-field").setValue("")},onTapBack_(){Router.getInstance().navigateToPreviousRoute()},onSearchChanged_(e){if(this.searchTerm===e.detail){return}this.searchTerm=e.detail;if(this.preserveSearchTerm&&this.active_){this.preserveSearchInput_()}},getBackButtonAriaLabel_(){return this.i18n("subpageBackButtonAriaLabel",this.pageTitle)},getBackButtonAriaRoleDescription_(){return this.i18n("subpageBackButtonAriaRoleDescription",this.pageTitle)},handleFindShortcut(modalContextOpen){if(modalContextOpen){return false}this.$$("cr-search-field").getSearchInput().focus();return true},searchInputHasFocus(){const field=this.$$("cr-search-field");return field.getSearchInput()===field.shadowRoot.activeElement}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared md-select" scope="settings-dropdown-menu">:host {
  align-items: center;
        display: inline-flex;
}

cr-policy-pref-indicator {
  height: var(--iron-icon-width, 24px);
        margin: 0 var(--settings-controlled-by-spacing);
        order: var(--settings-dropdown-menu-policy-order, 0);
        width: var(--iron-icon-width, 24px);
}

option:disabled {
  display: none;
}

</style>
    <template is="dom-if" if="[[pref.controlledBy]]" restamp="">
      <cr-policy-pref-indicator pref="[[pref]]"></cr-policy-pref-indicator>
    </template>
    <select class="md-select" id="dropdownMenu" on-change="onChange_" aria-label$="[[label]]" disabled="[[shouldDisableMenu_(disabled, menuOptions.*, pref.*)]]">
      <template is="dom-repeat" items="[[menuOptions]]">
        <option value="[[item.value]]">[[item.name]]</option>
      </template>
      <option value="[[notFoundValue_]]" disabled="[[!showNotFoundValue_(menuOptions, pref.value)]]">
        مخصص
      </option>
    </select>
<!--_html_template_end_-->`,is:"settings-dropdown-menu",behaviors:[CrPolicyPrefBehavior,PrefControlBehavior],properties:{menuOptions:Array,disabled:{type:Boolean,reflectToAttribute:true,value:false},prefKey:{type:String,value:null},notFoundValue_:{type:String,value:"SETTINGS_DROPDOWN_NOT_FOUND_ITEM",readOnly:true},label:String},observers:["updateSelected_(menuOptions, pref.value.*, prefKey)"],focus(){this.$.dropdownMenu.focus()},onChange_(){const selected=this.$.dropdownMenu.value;if(selected===this.notFoundValue_){return}if(this.prefKey){assert(this.pref);this.set(`pref.value.${this.prefKey}`,selected)}else{const prefValue=stringToPrefValue(selected,assert(this.pref));if(prefValue!==undefined){this.set("pref.value",prefValue)}}this.fire("settings-control-change")},updateSelected_(){if(this.menuOptions===undefined||this.pref===undefined||this.prefKey===undefined){return}if(!this.menuOptions.length){return}const prefValue=this.prefStringValue_();const option=this.menuOptions.find((function(menuItem){return menuItem.value.toString()===prefValue}));this.async((()=>{this.$.dropdownMenu.value=option===undefined?this.notFoundValue_:prefValue}))},prefStringValue_(){if(this.prefKey){return this.pref.value[this.prefKey]}else{return prefToString(assert(this.pref))}},showNotFoundValue_(menuOptions,prefValue){if(menuOptions===undefined||prefValue===undefined){return false}if(menuOptions===null||menuOptions.length===0){return false}const option=menuOptions.find((menuItem=>menuItem.value.toString()===this.prefStringValue_()));return!option},shouldDisableMenu_(){return this.disabled||this.isPrefEnforced()||this.menuOptions===undefined||this.menuOptions.length===0}});// Copyright 2016 The Chromium Authors. All rights reserved.
let pageVisibility;if(loadTimeData.getBoolean("isGuest")){pageVisibility={autofill:false,people:false,privacy:false,onStartup:false,reset:false,safetyCheck:false,appearance:false,defaultBrowser:false,advancedSettings:false,extensions:false,languages:false}}function setPageVisibilityForTesting(testVisibility){pageVisibility=testVisibility}// Copyright 2016 The Chromium Authors. All rights reserved.
function addPrivacyChildRoutes(r){r.SITE_SETTINGS=r.PRIVACY.createChild("/content");r.COOKIES=r.PRIVACY.createChild("/cookies");r.SECURITY=r.PRIVACY.createChild("/security");if(loadTimeData.getBoolean("enableSecurityKeysSubpage")){r.SECURITY_KEYS=r.SECURITY.createChild("/securityKeys")}r.SITE_SETTINGS_ALL=r.SITE_SETTINGS.createChild("all");r.SITE_SETTINGS_SITE_DETAILS=r.SITE_SETTINGS_ALL.createChild("/content/siteDetails");r.SITE_SETTINGS_HANDLERS=r.SITE_SETTINGS.createChild("/handlers");r.SITE_SETTINGS_ADS=r.SITE_SETTINGS.createChild("ads");r.SITE_SETTINGS_AR=r.SITE_SETTINGS.createChild("ar");r.SITE_SETTINGS_AUTOMATIC_DOWNLOADS=r.SITE_SETTINGS.createChild("automaticDownloads");r.SITE_SETTINGS_BACKGROUND_SYNC=r.SITE_SETTINGS.createChild("backgroundSync");r.SITE_SETTINGS_CAMERA=r.SITE_SETTINGS.createChild("camera");r.SITE_SETTINGS_CLIPBOARD=r.SITE_SETTINGS.createChild("clipboard");r.SITE_SETTINGS_SITE_DATA=r.COOKIES.createChild("/siteData");r.SITE_SETTINGS_DATA_DETAILS=r.SITE_SETTINGS_SITE_DATA.createChild("/cookies/detail");r.SITE_SETTINGS_IDLE_DETECTION=r.SITE_SETTINGS.createChild("idleDetection");r.SITE_SETTINGS_IMAGES=r.SITE_SETTINGS.createChild("images");r.SITE_SETTINGS_MIXEDSCRIPT=r.SITE_SETTINGS.createChild("insecureContent");r.SITE_SETTINGS_JAVASCRIPT=r.SITE_SETTINGS.createChild("javascript");r.SITE_SETTINGS_SOUND=r.SITE_SETTINGS.createChild("sound");r.SITE_SETTINGS_SENSORS=r.SITE_SETTINGS.createChild("sensors");r.SITE_SETTINGS_LOCATION=r.SITE_SETTINGS.createChild("location");r.SITE_SETTINGS_MICROPHONE=r.SITE_SETTINGS.createChild("microphone");r.SITE_SETTINGS_NOTIFICATIONS=r.SITE_SETTINGS.createChild("notifications");r.SITE_SETTINGS_POPUPS=r.SITE_SETTINGS.createChild("popups");r.SITE_SETTINGS_MIDI_DEVICES=r.SITE_SETTINGS.createChild("midiDevices");r.SITE_SETTINGS_USB_DEVICES=r.SITE_SETTINGS.createChild("usbDevices");r.SITE_SETTINGS_HID_DEVICES=r.SITE_SETTINGS.createChild("hidDevices");r.SITE_SETTINGS_SERIAL_PORTS=r.SITE_SETTINGS.createChild("serialPorts");if(loadTimeData.getBoolean("enableWebBluetoothNewPermissionsBackend")){r.SITE_SETTINGS_BLUETOOTH_DEVICES=r.SITE_SETTINGS.createChild("bluetoothDevices")}r.SITE_SETTINGS_ZOOM_LEVELS=r.SITE_SETTINGS.createChild("zoomLevels");r.SITE_SETTINGS_PDF_DOCUMENTS=r.SITE_SETTINGS.createChild("pdfDocuments");r.SITE_SETTINGS_PROTECTED_CONTENT=r.SITE_SETTINGS.createChild("protectedContent");if(loadTimeData.getBoolean("enablePaymentHandlerContentSetting")){r.SITE_SETTINGS_PAYMENT_HANDLER=r.SITE_SETTINGS.createChild("paymentHandler")}r.SITE_SETTINGS_VR=r.SITE_SETTINGS.createChild("vr");if(loadTimeData.getBoolean("enableExperimentalWebPlatformFeatures")){r.SITE_SETTINGS_BLUETOOTH_SCANNING=r.SITE_SETTINGS.createChild("bluetoothScanning");r.SITE_SETTINGS_WINDOW_PLACEMENT=r.SITE_SETTINGS.createChild("windowPlacement")}r.SITE_SETTINGS_FILE_SYSTEM_WRITE=r.SITE_SETTINGS.createChild("filesystem");if(loadTimeData.getBoolean("enableFontAccessContentSetting")){r.SITE_SETTINGS_FONT_ACCESS=r.SITE_SETTINGS.createChild("fontAccess")}}function createBrowserSettingsRoutes(){const r={};r.BASIC=new Route("/");r.ABOUT=new Route("/help");r.SIGN_OUT=r.BASIC.createChild("/signOut");r.SIGN_OUT.isNavigableDialog=true;r.SEARCH=r.BASIC.createSection("/search","search");if(!loadTimeData.getBoolean("isGuest")){r.PEOPLE=r.BASIC.createSection("/people","people");r.SYNC=r.PEOPLE.createChild("/syncSetup");r.SYNC_ADVANCED=r.SYNC.createChild("/syncSetup/advanced")}const visibility=pageVisibility||{};r.IMPORT_DATA=r.BASIC.createChild("/importData");r.IMPORT_DATA.isNavigableDialog=true;if(visibility.people!==false){r.MANAGE_PROFILE=r.PEOPLE.createChild("/manageProfile")}if(visibility.appearance!==false){r.APPEARANCE=r.BASIC.createSection("/appearance","appearance");r.FONTS=r.APPEARANCE.createChild("/fonts")}if(visibility.autofill!==false){r.AUTOFILL=r.BASIC.createSection("/autofill","autofill");r.PASSWORDS=r.AUTOFILL.createChild("/passwords");r.CHECK_PASSWORDS=r.PASSWORDS.createChild("check");if(loadTimeData.getBoolean("enableAccountStorage")){r.DEVICE_PASSWORDS=r.PASSWORDS.createChild("device")}r.PAYMENTS=r.AUTOFILL.createChild("/payments");r.ADDRESSES=r.AUTOFILL.createChild("/addresses")}r.CLEAR_BROWSER_DATA=r.BASIC.createChild("/clearBrowserData");r.CLEAR_BROWSER_DATA.isNavigableDialog=true;if(visibility.privacy!==false){r.PRIVACY=r.BASIC.createSection("/privacy","privacy");addPrivacyChildRoutes(r);r.SAFETY_CHECK=r.BASIC.createSection("/safetyCheck","safetyCheck")}if(visibility.defaultBrowser!==false){r.DEFAULT_BROWSER=r.BASIC.createSection("/defaultBrowser","defaultBrowser")}r.SEARCH_ENGINES=r.SEARCH.createChild("/searchEngines");if(visibility.onStartup!==false){r.ON_STARTUP=r.BASIC.createSection("/onStartup","onStartup");r.STARTUP_PAGES=r.ON_STARTUP.createChild("/startupPages")}if(visibility.advancedSettings!==false){r.ADVANCED=new Route("/advanced");r.LANGUAGES=r.ADVANCED.createSection("/languages","languages");r.EDIT_DICTIONARY=r.LANGUAGES.createChild("/editDictionary");if(visibility.downloads!==false){r.DOWNLOADS=r.ADVANCED.createSection("/downloads","downloads")}r.ACCESSIBILITY=r.ADVANCED.createSection("/accessibility","a11y");if(!loadTimeData.getBoolean("isWindows10OrNewer")){r.CAPTIONS=r.ACCESSIBILITY.createChild("/captions")}r.SYSTEM=r.ADVANCED.createSection("/system","system");if(visibility.reset!==false){r.RESET=r.ADVANCED.createSection("/reset","reset");r.RESET_DIALOG=r.ADVANCED.createChild("/resetProfileSettings");r.RESET_DIALOG.isNavigableDialog=true;r.TRIGGERED_RESET_DIALOG=r.ADVANCED.createChild("/triggeredResetProfileSettings");r.TRIGGERED_RESET_DIALOG.isNavigableDialog=true;r.CHROME_CLEANUP=r.RESET.createChild("/cleanup");if(loadTimeData.getBoolean("showIncompatibleApplications")){r.INCOMPATIBLE_APPLICATIONS=r.RESET.createChild("/incompatibleApplications")}}}return r}function buildRouter(){return new Router(createBrowserSettingsRoutes())}Router.setInstance(buildRouter());window.addEventListener("popstate",(function(event){const routerInstance=Router.getInstance();routerInstance.setCurrentRoute(routerInstance.getRouteForPath(window.location.pathname)||routerInstance.getRoutes().BASIC,new URLSearchParams(window.location.search),true)}));const routes=Router.getInstance().getRoutes();// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-expand-button">:host {
  align-items: center;
        cursor: pointer;
        display: flex;
        outline: none;
}

:host([disabled]) {
  opacity: 0.65;
        pointer-events: none;
}

:host([disabled]) cr-icon-button {
  display: var(--cr-expand-button-disabled-display, initial);
}

#label {
  flex: 1;
        padding: var(--cr-section-vertical-padding) 0;
}

cr-icon-button {
  --cr-icon-button-size: var(--cr-expand-button-size, 36px);
}

</style>

    <div id="label" aria-hidden="true"><slot></slot></div>
    <cr-icon-button id="icon" aria-labelledby="label" disabled="[[disabled]]" tabindex="[[tabIndex]]"></cr-icon-button>
<!--_html_template_end_-->`,is:"cr-expand-button",properties:{expanded:{type:Boolean,value:false,notify:true,observer:"onExpandedChange_"},disabled:{type:Boolean,value:false,reflectToAttribute:true},alt:{type:String,observer:"onAltChange_"},tabIndex:{type:Number,value:0}},observers:["updateAriaExpanded_(disabled, expanded)"],listeners:{click:"toggleExpand_"},get noink(){return this.$.icon.noink},set noink(value){this.$.icon.noink=value},focus(){this.$.icon.focus()},onAltChange_(){if(this.alt){this.$.icon.removeAttribute("aria-labelledby");this.$.icon.setAttribute("aria-label",this.alt)}else{this.$.icon.removeAttribute("aria-label");this.$.icon.setAttribute("aria-labelledby","label")}},onExpandedChange_(){this.$.icon.ironIcon=this.expanded?"cr:expand-less":"cr:expand-more"},toggleExpand_(event){event.stopPropagation();event.preventDefault();this.scrollIntoViewIfNeeded();this.expanded=!this.expanded;focusWithoutInk(this.$.icon)},updateAriaExpanded_(){if(this.disabled){this.$.icon.removeAttribute("aria-expanded")}else{this.$.icon.setAttribute("aria-expanded",this.expanded)}}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`<!--css-build:shadow--><style scope="iron-collapse">:host {
  display: block;
        transition-duration: var(--iron-collapse-transition-duration, 300ms);
        
        overflow: visible;
}

:host(.iron-collapse-closed) {
  display: none;
}

:host(:not(.iron-collapse-opened)) {
  overflow: hidden;
}

</style>

    <slot></slot>
`,is:"iron-collapse",behaviors:[IronResizableBehavior],properties:{horizontal:{type:Boolean,value:false,observer:"_horizontalChanged"},opened:{type:Boolean,value:false,notify:true,observer:"_openedChanged"},transitioning:{type:Boolean,notify:true,readOnly:true},noAnimation:{type:Boolean},_desiredSize:{type:String,value:""}},get dimension(){return this.horizontal?"width":"height"},get _dimensionMax(){return this.horizontal?"maxWidth":"maxHeight"},get _dimensionMaxCss(){return this.horizontal?"max-width":"max-height"},hostAttributes:{role:"group","aria-hidden":"true"},listeners:{transitionend:"_onTransitionEnd"},toggle:function(){this.opened=!this.opened},show:function(){this.opened=true},hide:function(){this.opened=false},updateSize:function(size,animated){size=size==="auto"?"":size;var willAnimate=animated&&!this.noAnimation&&this.isAttached&&this._desiredSize!==size;this._desiredSize=size;this._updateTransition(false);if(willAnimate){var startSize=this._calcSize();if(size===""){this.style[this._dimensionMax]="";size=this._calcSize()}this.style[this._dimensionMax]=startSize;this.scrollTop=this.scrollTop;this._updateTransition(true);willAnimate=size!==startSize}this.style[this._dimensionMax]=size;if(!willAnimate){this._transitionEnd()}},enableTransition:function(enabled){Base._warn("`enableTransition()` is deprecated, use `noAnimation` instead.");this.noAnimation=!enabled},_updateTransition:function(enabled){this.style.transitionDuration=enabled&&!this.noAnimation?"":"0s"},_horizontalChanged:function(){this.style.transitionProperty=this._dimensionMaxCss;var otherDimension=this._dimensionMax==="maxWidth"?"maxHeight":"maxWidth";this.style[otherDimension]="";this.updateSize(this.opened?"auto":"0px",false)},_openedChanged:function(){this.setAttribute("aria-hidden",!this.opened);this._setTransitioning(true);this.toggleClass("iron-collapse-closed",false);this.toggleClass("iron-collapse-opened",false);this.updateSize(this.opened?"auto":"0px",true);if(this.opened){this.focus()}},_transitionEnd:function(){this.style[this._dimensionMax]=this._desiredSize;this.toggleClass("iron-collapse-closed",!this.opened);this.toggleClass("iron-collapse-opened",this.opened);this._updateTransition(false);this.notifyResize();this._setTransitioning(false)},_onTransitionEnd:function(event){if(dom(event).rootTarget===this){this._transitionEnd()}},_calcSize:function(){return this.getBoundingClientRect()[this.dimension]+"px"}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-collapse-radio-button",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared cr-radio-button-style" scope="settings-collapse-radio-button">:host {
  display: block;
}

:host([disabled]) {
  opacity: 1;
}

cr-policy-pref-indicator, :host([disabled]) cr-expand-button {
  pointer-events: auto;
}

:host([disabled]) .disc-wrapper {
  opacity: var(--cr-disabled-opacity);
}

iron-collapse {
  margin-inline-end: 0;
        margin-inline-start: calc(var(--cr-radio-button-label-spacing, 20px)
            + var(--cr-radio-button-size));
}

.disc-wrapper {
  margin-inline-end: var(--cr-radio-button-label-spacing, 20px);
}

.separator {
  margin-inline-end: 0;
        min-height: calc(var(--settings-collapse-toggle-min-height, 48px) / 2);
}

#borderWrapper {
  align-items: center;
        border-top: var(--settings-collapse-separator-line);
        display: flex;
        min-height: var(--settings-collapse-toggle-min-height);
        width: 100%;
}

#buttonIcon {
  padding-inline-end: 6px;
}

#labelWrapper {
  --cr-radio-button-label-spacing: 0;
}

#radioCollapse {
  align-items: center;
        display: flex;
}

slot[name='noSelectionCollapse'] {
  cursor: auto;
}

</style>
    <div id="radioCollapse">
      <div aria-checked$="[[getAriaChecked_(checked)]]" aria-disabled$="[[getAriaDisabled_(disabled)]]" aria-labelledby="label" class="disc-wrapper" id="button" role="radio" tabindex$="[[buttonTabIndex_]]" on-keydown="onInputKeydown_">
        <div class="disc-border"></div>
        <div class="disc"></div>
      </div>
      <div id="borderWrapper">
        <iron-icon id="buttonIcon" icon="[[icon]]" hidden$="[[!icon]]"></iron-icon>
        <div id="labelWrapper" class="cr-padded-text">
          <div id="label" aria-hidden="true">
            [[label]]
            <slot name="label"></slot>
          </div>
          <div hidden$="[[!subLabel]]" class="secondary">
            [[subLabel]]
            <slot name="sub-label"></slot>
          </div>
        </div>
        <template is="dom-if" if="[[pref]]">
          <cr-policy-pref-indicator pref="[[pref]]" icon-aria-label="[[label]]" associated-value="[[name]]">
          </cr-policy-pref-indicator>
        </template>
        <div hidden$="[[noCollapse]]" class="separator"></div>
        <cr-expand-button hidden$="[[noCollapse]]" expanded="{{expanded}}" on-click="onExpandClicked_">
        </cr-expand-button>
      </div>
    </div>

    <iron-collapse opened="[[expanded]]">
      <slot name="collapse"></slot>
      <slot name="noSelectionCollapse"></slot>
    </iron-collapse>

<!--_html_template_end_-->`,behaviors:[CrRadioButtonBehavior],properties:{expanded:{type:Boolean,notify:true,value:false},noAutomaticCollapse:{type:Boolean,value:false},noCollapse:Boolean,label:String,icon:{type:String,value:null},pref:Object,disabled:{type:Boolean,value:false,reflectToAttribute:true},subLabel:{type:String,value:""}},observers:["onCheckedChanged_(checked)","onPrefChanged_(pref.*)"],pendingUpdateCollapsed_:false,updateCollapsed(){if(this.pendingUpdateCollapsed_){this.pendingUpdateCollapsed_=false;this.expanded=this.checked}},onCheckedChanged_(){this.pendingUpdateCollapsed_=true;if(!this.noAutomaticCollapse){this.updateCollapsed()}},onPrefChanged_(){this.disabled=!!this.pref&&this.pref.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED&&!(!!this.pref.userSelectableValues&&this.pref.userSelectableValues.includes(this.name))},onExpandClicked_(){this.fire("expand-clicked")}});// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const ContentSettingsTypes={ADS:"ads",AR:"ar",AUTOMATIC_DOWNLOADS:"multiple-automatic-downloads",BACKGROUND_SYNC:"background-sync",BLUETOOTH_DEVICES:"bluetooth-devices",BLUETOOTH_SCANNING:"bluetooth-scanning",CAMERA:"media-stream-camera",CLIPBOARD:"clipboard",COOKIES:"cookies",FILE_SYSTEM_WRITE:"file-system-write",FONT_ACCESS:"font-access",GEOLOCATION:"location",HID_DEVICES:"hid-devices",IDLE_DETECTION:"idle-detection",IMAGES:"images",JAVASCRIPT:"javascript",MIC:"media-stream-mic",MIDI_DEVICES:"midi-sysex",MIXEDSCRIPT:"mixed-script",NOTIFICATIONS:"notifications",PAYMENT_HANDLER:"payment-handler",POPUPS:"popups",PROTECTED_CONTENT:"protected-content",PROTOCOL_HANDLERS:"register-protocol-handler",SENSORS:"sensors",SERIAL_PORTS:"serial-ports",SOUND:"sound",USB_DEVICES:"usb-devices",VR:"vr",WINDOW_PLACEMENT:"window-placement",ZOOM_LEVELS:"zoom-levels"};const ContentSetting={DEFAULT:"default",ALLOW:"allow",BLOCK:"block",ASK:"ask",SESSION_ONLY:"session_only",IMPORTANT_CONTENT:"detect_important_content"};const ChooserType={NONE:"",USB_DEVICES:"usb-devices-data",SERIAL_PORTS:"serial-ports-data",HID_DEVICES:"hid-devices-data",BLUETOOTH_DEVICES:"bluetooth-devices-data"};const CookieControlsMode={OFF:0,BLOCK_THIRD_PARTY:1,INCOGNITO_ONLY:2};const SiteSettingSource={ALLOWLIST:"allowlist",ADS_FILTER_BLACKLIST:"ads-filter-blacklist",DEFAULT:"default",DRM_DISABLED:"drm-disabled",EMBARGO:"embargo",EXTENSION:"extension",INSECURE_ORIGIN:"insecure-origin",KILL_SWITCH:"kill-switch",POLICY:"policy",PREFERENCE:"preference"};const NotificationSetting={ASK:0,QUIETER_MESSAGING:1,BLOCK:2};const INVALID_CATEGORY_SUBTYPE="";const AllSitesAction2={LOAD_PAGE:0,RESET_SITE_GROUP_PERMISSIONS:1,RESET_ORIGIN_PERMISSIONS:2,CLEAR_ALL_DATA:3,CLEAR_SITE_GROUP_DATA:4,CLEAR_ORIGIN_DATA:5,ENTER_SITE_DETAILS:6};const SortMethod={NAME:"name",MOST_VISITED:"most-visited",STORAGE:"data-stored"};const ALL_SITES_DIALOG={CLEAR_DATA:"ClearData",RESET_PERMISSIONS:"ResetPermissions"};const SITE_EXCEPTION_WILDCARD="*";// Copyright 2016 The Chromium Authors. All rights reserved.
const ContentSettingProvider={POLICY:"policy",SUPERVISED_USER:"supervised_user",EXTENSION:"extension",INSTALLED_WEBAPP_PROVIDER:"installed_webapp_provider",NOTIFICATION_ANDROID:"notification_android",EPHEMERAL:"ephemeral",PREFERENCE:"preference",DEFAULT:"default",TESTS:"tests",TESTS_OTHER:"tests_other"};let SiteGroup;let RawSiteException;let SiteException;let RecentSitePermissions;let RawChooserException;let DefaultContentSetting;let ZoomLevelEntry;class SiteSettingsPrefsBrowserProxy{setDefaultValueForContentType(contentType,defaultValue){}getDefaultValueForContentType(contentType){}getAllSites(contentTypes){}getCookieSettingDescription(){}getRecentSitePermissions(contentTypes,numSources){}getChooserExceptionList(chooserType){}getFormattedBytes(numBytes){}getExceptionList(contentType){}getOriginPermissions(origin,contentTypes){}setOriginPermissions(origin,contentTypes,blanketSetting){}resetCategoryPermissionForPattern(primaryPattern,secondaryPattern,contentType,incognito){}resetChooserExceptionForSite(chooserType,origin,embeddingOrigin,exception){}setCategoryPermissionForPattern(primaryPattern,secondaryPattern,contentType,value,incognito){}isOriginValid(origin){}isPatternValidForType(pattern,category){}getDefaultCaptureDevices(type){}setDefaultCaptureDevice(type,defaultValue){}observeProtocolHandlers(){}observeProtocolHandlersEnabledState(){}setProtocolHandlerDefault(enabled){}setProtocolDefault(protocol,url){}removeProtocolHandler(protocol,url){}updateIncognitoStatus(){}fetchZoomLevels(){}removeZoomLevel(host){}fetchBlockAutoplayStatus(){}clearEtldPlus1DataAndCookies(etldPlus1){}clearOriginDataAndCookies(origin){}recordAction(action){}}class SiteSettingsPrefsBrowserProxyImpl{setDefaultValueForContentType(contentType,defaultValue){chrome.send("setDefaultValueForContentType",[contentType,defaultValue])}getDefaultValueForContentType(contentType){return sendWithPromise("getDefaultValueForContentType",contentType)}getAllSites(contentTypes){return sendWithPromise("getAllSites",contentTypes)}getCookieSettingDescription(){return sendWithPromise("getCookieSettingDescription")}getRecentSitePermissions(contentTypes,numSources){return sendWithPromise("getRecentSitePermissions",contentTypes,numSources)}getChooserExceptionList(chooserType){return sendWithPromise("getChooserExceptionList",chooserType)}getFormattedBytes(numBytes){return sendWithPromise("getFormattedBytes",numBytes)}getExceptionList(contentType){return sendWithPromise("getExceptionList",contentType)}getOriginPermissions(origin,contentTypes){return sendWithPromise("getOriginPermissions",origin,contentTypes)}setOriginPermissions(origin,contentTypes,blanketSetting){chrome.send("setOriginPermissions",[origin,contentTypes,blanketSetting])}resetCategoryPermissionForPattern(primaryPattern,secondaryPattern,contentType,incognito){chrome.send("resetCategoryPermissionForPattern",[primaryPattern,secondaryPattern,contentType,incognito])}resetChooserExceptionForSite(chooserType,origin,embeddingOrigin,exception){chrome.send("resetChooserExceptionForSite",[chooserType,origin,embeddingOrigin,exception])}setCategoryPermissionForPattern(primaryPattern,secondaryPattern,contentType,value,incognito){chrome.send("setCategoryPermissionForPattern",[primaryPattern,secondaryPattern,contentType,value,incognito])}isOriginValid(origin){return sendWithPromise("isOriginValid",origin)}isPatternValidForType(pattern,category){return sendWithPromise("isPatternValidForType",pattern,category)}getDefaultCaptureDevices(type){chrome.send("getDefaultCaptureDevices",[type])}setDefaultCaptureDevice(type,defaultValue){chrome.send("setDefaultCaptureDevice",[type,defaultValue])}observeProtocolHandlers(){chrome.send("observeProtocolHandlers")}observeProtocolHandlersEnabledState(){chrome.send("observeProtocolHandlersEnabledState")}setProtocolHandlerDefault(enabled){chrome.send("setHandlersEnabled",[enabled])}setProtocolDefault(protocol,url){chrome.send("setDefault",[protocol,url])}removeProtocolHandler(protocol,url){chrome.send("removeHandler",[protocol,url])}updateIncognitoStatus(){chrome.send("updateIncognitoStatus")}fetchZoomLevels(){chrome.send("fetchZoomLevels")}removeZoomLevel(host){chrome.send("removeZoomLevel",[host])}fetchBlockAutoplayStatus(){chrome.send("fetchBlockAutoplayStatus")}clearEtldPlus1DataAndCookies(etldPlus1){chrome.send("clearEtldPlus1DataAndCookies",[etldPlus1])}clearOriginDataAndCookies(origin){chrome.send("clearUsage",[origin])}recordAction(action){chrome.send("recordAction",[action])}}addSingletonGetter(SiteSettingsPrefsBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
const kControlledByLookup={extension:chrome.settingsPrivate.ControlledBy.EXTENSION,HostedApp:chrome.settingsPrivate.ControlledBy.EXTENSION,platform_app:chrome.settingsPrivate.ControlledBy.EXTENSION,policy:chrome.settingsPrivate.ControlledBy.USER_POLICY};const SiteSettingsBehaviorImpl={properties:{category:String,contentTypes_:{type:Array,value:[]},browserProxy:Object},created(){this.browserProxy=SiteSettingsPrefsBrowserProxyImpl.getInstance()},ready(){this.ContentSetting=ContentSetting},ensureUrlHasScheme(url){if(url.length===0){return url}return url.includes("://")?url:"http://"+url},sanitizePort(url){const urlWithScheme=this.ensureUrlHasScheme(url);if(urlWithScheme.startsWith("https://")&&urlWithScheme.endsWith(":443")){return url.slice(0,-4)}if(urlWithScheme.startsWith("http://")&&urlWithScheme.endsWith(":80")){return url.slice(0,-3)}return url},computeIsSettingEnabled(setting){return setting!==ContentSetting.BLOCK},toUrl(originOrPattern){if(originOrPattern.length===0){return null}originOrPattern=originOrPattern.replace("*://","");originOrPattern=originOrPattern.replace("[*.]","");return new URL(this.ensureUrlHasScheme(originOrPattern))},originRepresentation(origin){try{const url=this.toUrl(origin);return url?url.host||url.origin:""}catch(error){return""}},expandSiteException(exception){const origin=exception.origin;const embeddingOrigin=exception.embeddingOrigin;let enforcement=null;if(exception.source==="extension"||exception.source==="HostedApp"||exception.source==="platform_app"||exception.source==="policy"){enforcement=chrome.settingsPrivate.Enforcement.ENFORCED}const controlledBy=kControlledByLookup[exception.source]||chrome.settingsPrivate.ControlledBy.PRIMARY_USER;return{category:this.category,embeddingOrigin:embeddingOrigin,incognito:exception.incognito,isEmbargoed:exception.isEmbargoed,origin:origin,displayName:exception.displayName,setting:exception.setting,enforcement:enforcement,controlledBy:controlledBy}},getCategoryList(){if(this.contentTypes_.length===0){for(const typeName in ContentSettingsTypes){const contentType=ContentSettingsTypes[typeName];if(contentType===ContentSettingsTypes.PROTECTED_CONTENT){continue}if(contentType===ContentSettingsTypes.COOKIES||contentType===ContentSettingsTypes.PROTOCOL_HANDLERS||contentType===ContentSettingsTypes.ZOOM_LEVELS){continue}this.contentTypes_.push(contentType)}}const addOrRemoveSettingWithFlag=(type,flag)=>{if(loadTimeData.getBoolean(flag)){if(!this.contentTypes_.includes(type)){this.contentTypes_.push(type)}}else{if(this.contentTypes_.includes(type)){this.contentTypes_.splice(this.contentTypes_.indexOf(type),1)}}};addOrRemoveSettingWithFlag(ContentSettingsTypes.BLUETOOTH_SCANNING,"enableExperimentalWebPlatformFeatures");addOrRemoveSettingWithFlag(ContentSettingsTypes.ADS,"enableSafeBrowsingSubresourceFilter");addOrRemoveSettingWithFlag(ContentSettingsTypes.PAYMENT_HANDLER,"enablePaymentHandlerContentSetting");addOrRemoveSettingWithFlag(ContentSettingsTypes.BLUETOOTH_DEVICES,"enableWebBluetoothNewPermissionsBackend");addOrRemoveSettingWithFlag(ContentSettingsTypes.WINDOW_PLACEMENT,"enableExperimentalWebPlatformFeatures");addOrRemoveSettingWithFlag(ContentSettingsTypes.FONT_ACCESS,"enableFontAccessContentSetting");return this.contentTypes_.slice(0)}};const SiteSettingsBehavior=[SiteSettingsBehaviorImpl];// Copyright 2020 The Chromium Authors. All rights reserved.
const SiteContentRadioSetting={DISABLED:0,ENABLED:1};Polymer({is:"settings-category-default-radio-group",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-category-default-radio-group">#radioSection {
  padding: 0 var(--cr-section-padding);
}

#radioGroupSubLabel {
  padding-bottom: 10px;
}

settings-collapse-radio-button {
  --settings-collapse-toggle-min-height: var(--settings-row-min-height);
}

settings-collapse-radio-button.two-line {
  --settings-collapse-toggle-min-height:
        var(--settings-row-two-line-min-height);
}

settings-collapse-radio-button:not(:first-of-type) {
  --settings-collapse-separator-line: var(--cr-separator-line);
}

</style>
<div id="radioSection">
  <h2>الإعداد التلقائي</h2>
  <div id="radioGroupSubLabel" class="secondary">
    ستتبع المواقع الإلكترونية هذا الإعداد تلقائيًا عند زيارتك لها.
  </div>
  <settings-radio-group id="settingsCategoryDefaultRadioGroup" pref="{{pref_}}" selectable-elements="settings-collapse-radio-button" on-change="onSelectedChanged_">
    <settings-collapse-radio-button id="enabledRadioOption" class$="[[getEnabledButtonClass_(allowOptionSubLabel)]]" name="[[siteContentRadioSettingEnum_.ENABLED]]" pref="[[pref_]]" label="[[allowOptionLabel]]" sub-label="[[allowOptionSubLabel]]" disabled$="[[isRadioGroupDisabled_(category)]]" icon="[[allowOptionIcon]]" no-collapse="">
    </settings-collapse-radio-button>
    <settings-collapse-radio-button id="disabledRadioOption" class$="[[getDisabledButtonClass_(blockOptionSubLabel)]]" name="[[siteContentRadioSettingEnum_.DISABLED]]" pref="[[pref_]]" label="[[blockOptionLabel]]" sub-label="[[blockOptionSubLabel]]" disabled$="[[isRadioGroupDisabled_(category)]]" icon="[[blockOptionIcon]]" no-collapse="">
    </settings-collapse-radio-button>
  </settings-radio-group>
</div>
<!--_html_template_end_-->`,behaviors:[SiteSettingsBehavior,WebUIListenerBehavior],properties:{allowOptionLabel:String,allowOptionSubLabel:String,allowOptionIcon:String,blockOptionLabel:String,blockOptionSubLabel:String,blockOptionIcon:String,siteContentRadioSettingEnum_:{type:Object,value:SiteContentRadioSetting},pref_:{type:Object,value(){return{type:chrome.settingsPrivate.PrefType.NUMBER,value:-1}}}},observers:["onCategoryChanged_(category)"],ready(){this.addWebUIListener("contentSettingCategoryChanged",this.onCategoryChanged_.bind(this))},getAllowOptionForCategory_(){switch(this.category){case ContentSettingsTypes.ADS:case ContentSettingsTypes.BACKGROUND_SYNC:case ContentSettingsTypes.IMAGES:case ContentSettingsTypes.JAVASCRIPT:case ContentSettingsTypes.MIXEDSCRIPT:case ContentSettingsTypes.SOUND:case ContentSettingsTypes.SENSORS:case ContentSettingsTypes.PAYMENT_HANDLER:case ContentSettingsTypes.POPUPS:case ContentSettingsTypes.PROTOCOL_HANDLERS:return ContentSetting.ALLOW;case ContentSettingsTypes.AUTOMATIC_DOWNLOADS:case ContentSettingsTypes.CAMERA:case ContentSettingsTypes.CLIPBOARD:case ContentSettingsTypes.GEOLOCATION:case ContentSettingsTypes.MIC:case ContentSettingsTypes.NOTIFICATIONS:case ContentSettingsTypes.MIDI_DEVICES:case ContentSettingsTypes.USB_DEVICES:case ContentSettingsTypes.SERIAL_PORTS:case ContentSettingsTypes.BLUETOOTH_DEVICES:case ContentSettingsTypes.BLUETOOTH_SCANNING:case ContentSettingsTypes.HID_DEVICES:case ContentSettingsTypes.VR:case ContentSettingsTypes.AR:case ContentSettingsTypes.WINDOW_PLACEMENT:return ContentSetting.ASK;default:assertNotReached("Invalid category: "+this.category);return ContentSetting.ALLOW}},getEnabledButtonClass_(){return this.allowOptionSubLabel?"two-line":""},getDisabledButtonClass_(){return this.blockOptionSubLabel?"two-line":""},onSelectedChanged_(){assert(this.pref_.enforcement!==chrome.settingsPrivate.Enforcement.ENFORCED);const allowOption=this.getAllowOptionForCategory_();this.browserProxy.setDefaultValueForContentType(this.category,this.categoryEnabled_?allowOption:ContentSetting.BLOCK)},updatePref_(update){if(update.source!==undefined&&update.source!==ContentSettingProvider.PREFERENCE){this.set("pref_.enforcement",chrome.settingsPrivate.Enforcement.ENFORCED);let controlledBy=chrome.settingsPrivate.ControlledBy.USER_POLICY;switch(update.source){case ContentSettingProvider.POLICY:controlledBy=chrome.settingsPrivate.ControlledBy.DEVICE_POLICY;break;case ContentSettingProvider.SUPERVISED_USER:controlledBy=chrome.settingsPrivate.ControlledBy.PARENT;break;case ContentSettingProvider.EXTENSION:controlledBy=chrome.settingsPrivate.ControlledBy.EXTENSION;break}this.set("pref_.controlledBy",controlledBy)}const enabled=this.computeIsSettingEnabled(update.setting);const prefValue=enabled?this.siteContentRadioSettingEnum_.ENABLED:this.siteContentRadioSettingEnum_.DISABLED;this.set("pref_.value",prefValue)},async onCategoryChanged_(category){if(category!==this.category){return}const defaultValue=await this.browserProxy.getDefaultValueForContentType(this.category);this.updatePref_(defaultValue)},get categoryEnabled_(){return this.pref_.value===SiteContentRadioSetting.ENABLED},isRadioGroupDisabled_(){return this.category===ContentSettingsTypes.POPUPS&&loadTimeData.getBoolean("isGuest")}});// Copyright 2019 The Chromium Authors. All rights reserved.
const PrivacyElementInteractions={SYNC_AND_GOOGLE_SERVICES:0,CHROME_SIGN_IN:1,DO_NOT_TRACK:2,PAYMENT_METHOD:3,NETWORK_PREDICTION:4,MANAGE_CERTIFICATES:5,SAFE_BROWSING:6,PASSWORD_CHECK:7,IMPROVE_SECURITY:8,COOKIES_ALL:9,COOKIES_INCOGNITO:10,COOKIES_THIRD:11,COOKIES_BLOCK:12,COOKIES_SESSION:13,SITE_DATA_REMOVE_ALL:14,SITE_DATA_REMOVE_FILTERED:15,SITE_DATA_REMOVE_SITE:16,COOKIE_DETAILS_REMOVE_ALL:17,COOKIE_DETAILS_REMOVE_ITEM:18,SITE_DETAILS_CLEAR_DATA:19,COUNT:20};const SafetyCheckInteractions={RUN_SAFETY_CHECK:0,UPDATES_RELAUNCH:1,PASSWORDS_MANAGE_COMPROMISED_PASSWORDS:2,SAFE_BROWSING_MANAGE:3,EXTENSIONS_REVIEW:4,CHROME_CLEANER_REBOOT:5,CHROME_CLEANER_REVIEW_INFECTED_STATE:6,PASSWORDS_CARET_NAVIGATION:7,SAFE_BROWSING_CARET_NAVIGATION:8,EXTENSIONS_CARET_NAVIGATION:9,CHROME_CLEANER_CARET_NAVIGATION:10,PASSWORDS_MANAGE_WEAK_PASSWORDS:11,COUNT:12};const SafeBrowsingInteractions={SAFE_BROWSING_SHOWED:0,SAFE_BROWSING_ENHANCED_PROTECTION_CLICKED:1,SAFE_BROWSING_STANDARD_PROTECTION_CLICKED:2,SAFE_BROWSING_DISABLE_SAFE_BROWSING_CLICKED:3,SAFE_BROWSING_ENHANCED_PROTECTION_EXPAND_ARROW_CLICKED:4,SAFE_BROWSING_STANDARD_PROTECTION_EXPAND_ARROW_CLICKED:5,SAFE_BROWSING_DISABLE_SAFE_BROWSING_DIALOG_CONFIRMED:6,SAFE_BROWSING_DISABLE_SAFE_BROWSING_DIALOG_DENIED:7,COUNT:8};class MetricsBrowserProxy{recordAction(action){}recordSafetyCheckInteractionHistogram(interaction){}recordSettingsPageHistogram(interaction){}recordSafeBrowsingInteractionHistogram(interaction){}}class MetricsBrowserProxyImpl{recordAction(action){chrome.send("metricsHandler:recordAction",[action])}recordSafetyCheckInteractionHistogram(interaction){chrome.send("metricsHandler:recordInHistogram",["Settings.SafetyCheck.Interactions",interaction,SafetyCheckInteractions.COUNT])}recordSettingsPageHistogram(interaction){chrome.send("metricsHandler:recordInHistogram",["Settings.PrivacyElementInteractions",interaction,PrivacyElementInteractions.COUNT])}recordSafeBrowsingInteractionHistogram(interaction){chrome.send("metricsHandler:recordInHistogram",["SafeBrowsing.Settings.UserAction.Default",interaction,SafeBrowsingInteractions.COUNT])}}addSingletonGetter(MetricsBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
const PrefsBehavior={properties:{prefs:{type:Object,notify:true}},getPref(prefPath){const pref=this.get(prefPath,this.prefs);assert(typeof pref!=="undefined","Pref is missing: "+prefPath);return pref},setPrefValue(prefPath,value){this.getPref(prefPath);this.set("prefs."+prefPath+".value",value)},appendPrefListItem(key,item){const pref=this.getPref(key);assert(pref&&pref.type===chrome.settingsPrivate.PrefType.LIST);if(pref.value.indexOf(item)===-1){this.push("prefs."+key+".value",item)}},deletePrefListItem(key,item){assert(this.getPref(key).type===chrome.settingsPrivate.PrefType.LIST);this.arrayDelete("prefs."+key+".value",item)}};// Copyright 2016 The Chromium Authors. All rights reserved.
let MetricsReporting;let ResolverOption;const SecureDnsMode={OFF:"off",AUTOMATIC:"automatic",SECURE:"secure"};const SecureDnsUiManagementMode={NO_OVERRIDE:0,DISABLED_MANAGED:1,DISABLED_PARENTAL_CONTROLS:2};let SecureDnsSetting;class PrivacyPageBrowserProxy{getMetricsReporting(){}setMetricsReportingEnabled(enabled){}showManageSSLCertificates(){}setBlockAutoplayEnabled(enabled){}getSecureDnsResolverList(){}getSecureDnsSetting(){}parseCustomDnsEntry(entry){}probeCustomDnsTemplate(template){}recordUserDropdownInteraction(oldSelection,newSelection){}}class PrivacyPageBrowserProxyImpl{getMetricsReporting(){return sendWithPromise("getMetricsReporting")}setMetricsReportingEnabled(enabled){chrome.send("setMetricsReportingEnabled",[enabled])}setBlockAutoplayEnabled(enabled){chrome.send("setBlockAutoplayEnabled",[enabled])}showManageSSLCertificates(){chrome.send("showManageSSLCertificates")}getSecureDnsResolverList(){return sendWithPromise("getSecureDnsResolverList")}getSecureDnsSetting(){return sendWithPromise("getSecureDnsSetting")}parseCustomDnsEntry(entry){return sendWithPromise("parseCustomDnsEntry",entry)}probeCustomDnsTemplate(template){return sendWithPromise("probeCustomDnsTemplate",template)}recordUserDropdownInteraction(oldSelection,newSelection){chrome.send("recordUserDropdownInteraction",[oldSelection,newSelection])}}addSingletonGetter(PrivacyPageBrowserProxyImpl);// Copyright 2018 The Chromium Authors. All rights reserved.
class OpenWindowProxy{openURL(url){}}class OpenWindowProxyImpl{openURL(url){window.open(url)}}addSingletonGetter(OpenWindowProxyImpl);// Copyright 2018 The Chromium Authors. All rights reserved.
class PasswordManagerProxy{addSavedPasswordListChangedListener(listener){}removeSavedPasswordListChangedListener(listener){}getSavedPasswordList(callback){}recordPasswordsPageAccessInSettings(){}changeSavedPassword(ids,newUsername,newPassword){}removeSavedPassword(id){}removeSavedPasswords(ids){}movePasswordsToAccount(ids){}addExceptionListChangedListener(listener){}removeExceptionListChangedListener(listener){}getExceptionList(callback){}removeException(id){}removeExceptions(ids){}undoRemoveSavedPasswordOrException(){}requestPlaintextPassword(id,reason){}importPasswords(){}exportPasswords(callback){}requestExportProgressStatus(callback){}addPasswordsFileExportProgressListener(listener){}removePasswordsFileExportProgressListener(listener){}cancelExportPasswords(){}addAccountStorageOptInStateListener(listener){}removeAccountStorageOptInStateListener(listener){}isOptedInForAccountStorage(){}optInForAccountStorage(optIn){}startBulkPasswordCheck(){}stopBulkPasswordCheck(){}getCompromisedCredentials(){}getWeakCredentials(){}getPasswordCheckStatus(){}removeInsecureCredential(insecureCredential){}addCompromisedCredentialsListener(listener){}removeCompromisedCredentialsListener(listener){}addWeakCredentialsListener(listener){}removeWeakCredentialsListener(listener){}addPasswordCheckStatusListener(listener){}removePasswordCheckStatusListener(listener){}getPlaintextInsecurePassword(credential,reason){}changeInsecureCredential(credential,newPassword){}recordPasswordCheckInteraction(interaction){}recordPasswordCheckReferrer(referrer){}}PasswordManagerProxy.PasswordCheckInteraction={START_CHECK_AUTOMATICALLY:0,START_CHECK_MANUALLY:1,STOP_CHECK:2,CHANGE_PASSWORD:3,EDIT_PASSWORD:4,REMOVE_PASSWORD:5,SHOW_PASSWORD:6,COUNT:7};PasswordManagerProxy.PasswordCheckReferrer={SAFETY_CHECK:0,PASSWORD_SETTINGS:1,PHISH_GUARD_DIALOG:2,PASSWORD_BREACH_DIALOG:3,COUNT:4};class PasswordManagerImpl{addSavedPasswordListChangedListener(listener){chrome.passwordsPrivate.onSavedPasswordsListChanged.addListener(listener)}removeSavedPasswordListChangedListener(listener){chrome.passwordsPrivate.onSavedPasswordsListChanged.removeListener(listener)}getSavedPasswordList(callback){chrome.passwordsPrivate.getSavedPasswordList(callback)}recordPasswordsPageAccessInSettings(){chrome.passwordsPrivate.recordPasswordsPageAccessInSettings()}changeSavedPassword(ids,newUsername,newPassword){return new Promise((resolve=>{chrome.passwordsPrivate.changeSavedPassword(ids,newUsername,newPassword,resolve)}))}removeSavedPassword(id){chrome.passwordsPrivate.removeSavedPassword(id)}removeSavedPasswords(ids){chrome.passwordsPrivate.removeSavedPasswords(ids)}movePasswordsToAccount(ids){chrome.passwordsPrivate.movePasswordsToAccount(ids)}addExceptionListChangedListener(listener){chrome.passwordsPrivate.onPasswordExceptionsListChanged.addListener(listener)}removeExceptionListChangedListener(listener){chrome.passwordsPrivate.onPasswordExceptionsListChanged.removeListener(listener)}getExceptionList(callback){chrome.passwordsPrivate.getPasswordExceptionList(callback)}removeException(id){chrome.passwordsPrivate.removePasswordException(id)}removeExceptions(ids){chrome.passwordsPrivate.removePasswordExceptions(ids)}undoRemoveSavedPasswordOrException(){chrome.passwordsPrivate.undoRemoveSavedPasswordOrException()}requestPlaintextPassword(id,reason){return new Promise(((resolve,reject)=>{chrome.passwordsPrivate.requestPlaintextPassword(id,reason,(password=>{if(chrome.runtime.lastError){reject(chrome.runtime.lastError.message);return}resolve(password)}))}))}importPasswords(){chrome.passwordsPrivate.importPasswords()}exportPasswords(callback){chrome.passwordsPrivate.exportPasswords(callback)}requestExportProgressStatus(callback){chrome.passwordsPrivate.requestExportProgressStatus(callback)}addPasswordsFileExportProgressListener(listener){chrome.passwordsPrivate.onPasswordsFileExportProgress.addListener(listener)}removePasswordsFileExportProgressListener(listener){chrome.passwordsPrivate.onPasswordsFileExportProgress.removeListener(listener)}cancelExportPasswords(){chrome.passwordsPrivate.cancelExportPasswords()}addAccountStorageOptInStateListener(listener){chrome.passwordsPrivate.onAccountStorageOptInStateChanged.addListener(listener)}removeAccountStorageOptInStateListener(listener){chrome.passwordsPrivate.onAccountStorageOptInStateChanged.removeListener(listener)}isOptedInForAccountStorage(){return new Promise((resolve=>{chrome.passwordsPrivate.isOptedInForAccountStorage(resolve)}))}getPasswordCheckStatus(){return new Promise((resolve=>{chrome.passwordsPrivate.getPasswordCheckStatus(resolve)}))}optInForAccountStorage(optIn){chrome.passwordsPrivate.optInForAccountStorage(optIn)}startBulkPasswordCheck(){return new Promise(((resolve,reject)=>{chrome.passwordsPrivate.startPasswordCheck((()=>{if(chrome.runtime.lastError){reject(chrome.runtime.lastError.message);return}resolve()}))}))}stopBulkPasswordCheck(){chrome.passwordsPrivate.stopPasswordCheck()}getCompromisedCredentials(){return new Promise((resolve=>{chrome.passwordsPrivate.getCompromisedCredentials(resolve)}))}getWeakCredentials(){return new Promise((resolve=>{chrome.passwordsPrivate.getWeakCredentials(resolve)}))}removeInsecureCredential(insecureCredential){chrome.passwordsPrivate.removeInsecureCredential(insecureCredential)}addCompromisedCredentialsListener(listener){chrome.passwordsPrivate.onCompromisedCredentialsChanged.addListener(listener)}removeCompromisedCredentialsListener(listener){chrome.passwordsPrivate.onCompromisedCredentialsChanged.removeListener(listener)}addWeakCredentialsListener(listener){chrome.passwordsPrivate.onWeakCredentialsChanged.addListener(listener)}removeWeakCredentialsListener(listener){chrome.passwordsPrivate.onWeakCredentialsChanged.removeListener(listener)}addPasswordCheckStatusListener(listener){chrome.passwordsPrivate.onPasswordCheckStatusChanged.addListener(listener)}removePasswordCheckStatusListener(listener){chrome.passwordsPrivate.onPasswordCheckStatusChanged.removeListener(listener)}getPlaintextInsecurePassword(credential,reason){return new Promise(((resolve,reject)=>{chrome.passwordsPrivate.getPlaintextInsecurePassword(credential,reason,(credentialWithPassword=>{if(chrome.runtime.lastError){reject(chrome.runtime.lastError.message);return}resolve(credentialWithPassword)}))}))}changeInsecureCredential(credential,newPassword){return new Promise((resolve=>{chrome.passwordsPrivate.changeInsecureCredential(credential,newPassword,resolve)}))}recordPasswordCheckInteraction(interaction){chrome.metricsPrivate.recordEnumerationValue("PasswordManager.BulkCheck.UserAction",interaction,PasswordManagerProxy.PasswordCheckInteraction.COUNT)}recordPasswordCheckReferrer(referrer){chrome.metricsPrivate.recordEnumerationValue("PasswordManager.BulkCheck.PasswordCheckReferrer",referrer,PasswordManagerProxy.PasswordCheckReferrer.COUNT)}}addSingletonGetter(PasswordManagerImpl);// Copyright 2017 The Chromium Authors. All rights reserved.
class ChromeCleanupProxy{registerChromeCleanerObserver(){}startScanning(logsUploadEnabled,notificationEnabled){}startCleanup(logsUploadEnabled){}restartComputer(){}notifyShowDetails(enabled){}notifyLearnMoreClicked(){}getMoreItemsPluralString(numHiddenItems){}getItemsToRemovePluralString(numItems){}}class ChromeCleanupProxyImpl{registerChromeCleanerObserver(){chrome.send("registerChromeCleanerObserver")}startScanning(logsUploadEnabled,notificationEnabled){chrome.send("startScanning",[logsUploadEnabled])}startCleanup(logsUploadEnabled){chrome.send("startCleanup",[logsUploadEnabled])}restartComputer(){chrome.send("restartComputer")}notifyShowDetails(enabled){chrome.send("notifyShowDetails",[enabled])}notifyLearnMoreClicked(){chrome.send("notifyChromeCleanupLearnMoreClicked")}getMoreItemsPluralString(numHiddenItems){return sendWithPromise("getMoreItemsPluralString",numHiddenItems)}getItemsToRemovePluralString(numItems){return sendWithPromise("getItemsToRemovePluralString",numItems)}}addSingletonGetter(ChromeCleanupProxyImpl);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var IronA11yAnnouncer=Polymer({_template:html`<!--css-build:shadow--><style scope="iron-a11y-announcer">:host {
  display: inline-block;
        position: fixed;
        clip: rect(0px,0px,0px,0px);
}

</style>
    <div aria-live$="[[mode]]">[[_text]]</div>
`,is:"iron-a11y-announcer",properties:{mode:{type:String,value:"polite"},_text:{type:String,value:""}},created:function(){if(!IronA11yAnnouncer.instance){IronA11yAnnouncer.instance=this}document.body.addEventListener("iron-announce",this._onIronAnnounce.bind(this))},announce:function(text){this._text="";this.async((function(){this._text=text}),100)},_onIronAnnounce:function(event){if(event.detail&&event.detail.text){this.announce(event.detail.text)}}});IronA11yAnnouncer.instance=null;IronA11yAnnouncer.requestAvailability=function(){if(!IronA11yAnnouncer.instance){IronA11yAnnouncer.instance=document.createElement("iron-a11y-announcer")}document.body.appendChild(IronA11yAnnouncer.instance)};// Copyright 2020 The Chromium Authors. All rights reserved.
class PluralStringProxyImpl{getPluralString(messageName,itemCount){return sendWithPromise("getPluralString",messageName,itemCount)}getPluralStringTupleWithComma(messageName1,itemCount1,messageName2,itemCount2){return sendWithPromise("getPluralStringTupleWithComma",messageName1,itemCount1,messageName2,itemCount2)}getPluralStringTupleWithPeriods(messageName1,itemCount1,messageName2,itemCount2){return sendWithPromise("getPluralStringTupleWithPeriods",messageName1,itemCount1,messageName2,itemCount2)}}addSingletonGetter(PluralStringProxyImpl);// Copyright 2020 The Chromium Authors. All rights reserved.
const PasswordCheckBehavior={properties:{compromisedPasswordsCount:String,weakPasswordsCount:String,insecurePasswordsCount:String,leakedPasswords:{type:Array,value:()=>[]},weakPasswords:{type:Array,value:()=>[]},status:{type:Object,value:()=>({state:chrome.passwordsPrivate.PasswordCheckState.IDLE})},isInitialStatus:{type:Boolean,value:true},passwordsWeaknessCheckEnabled:{type:Boolean,value(){return loadTimeData.getBoolean("passwordsWeaknessCheck")}}},leakedCredentialsListener_:null,weakCredentialsListener_:null,statusChangedListener_:null,passwordManager:null,attached(){this.statusChangedListener_=status=>{this.status=status;this.isInitialStatus=false};this.leakedCredentialsListener_=compromisedCredentials=>{this.updateCompromisedPasswordList(compromisedCredentials);this.fetchPluralizedStrings_()};this.weakCredentialsListener_=weakCredentials=>{this.weakPasswords=weakCredentials;this.fetchPluralizedStrings_()};this.passwordManager=PasswordManagerImpl.getInstance();this.passwordManager.getPasswordCheckStatus().then(this.statusChangedListener_);this.passwordManager.getCompromisedCredentials().then(this.leakedCredentialsListener_);this.passwordManager.getWeakCredentials().then(this.weakCredentialsListener_);this.passwordManager.addPasswordCheckStatusListener(this.statusChangedListener_);this.passwordManager.addCompromisedCredentialsListener(this.leakedCredentialsListener_);this.passwordManager.addWeakCredentialsListener(this.weakCredentialsListener_)},detached(){this.passwordManager.removeCompromisedCredentialsListener(assert(this.statusChangedListener_));this.statusChangedListener_=null;this.passwordManager.removeCompromisedCredentialsListener(assert(this.leakedCredentialsListener_));this.leakedCredentialsListener_=null;this.passwordManager.removeWeakCredentialsListener(assert(this.weakCredentialsListener_));this.weakCredentialsListener_=null},safetyCheckWeakPasswordsEnabled_(){return loadTimeData.getBoolean("safetyCheckWeakPasswordsEnabled")},fetchPluralizedStrings_(){const proxy=PluralStringProxyImpl.getInstance();const compromised=this.leakedPasswords.length;const weak=this.weakPasswords.length;proxy.getPluralString("compromisedPasswords",compromised).then((count=>this.compromisedPasswordsCount=count));proxy.getPluralString("weakPasswords",weak).then((count=>this.weakPasswordsCount=count));(()=>{if(!this.safetyCheckWeakPasswordsEnabled_()){return proxy.getPluralString("insecurePasswords",compromised+weak)}if(compromised>0&&weak>0){return proxy.getPluralStringTupleWithComma("safetyCheckPasswordsCompromised",compromised,"safetyCheckPasswordsWeak",weak)}if(compromised>0){return proxy.getPluralString("safetyCheckPasswordsCompromised",compromised)}if(weak>0){return proxy.getPluralString("safetyCheckPasswordsWeak",weak)}return proxy.getPluralString("compromisedPasswords",0)})().then((count=>this.insecurePasswordsCount=count))},updateCompromisedPasswordList(newList){const oldList=this.leakedPasswords.slice();const map=new Map(newList.map((item=>[item.id,item])));const resultList=[];for(const item of oldList){if(map.has(item.id)){resultList.push(map.get(item.id));map.delete(item.id)}}const addedResults=Array.from(map.values());addedResults.sort(((lhs,rhs)=>{const isPhished=cred=>cred.compromisedInfo.compromiseType!==chrome.passwordsPrivate.CompromiseType.LEAKED;if(isPhished(lhs)!==isPhished(rhs)){return isPhished(lhs)?-1:1}if(lhs.compromisedInfo.elapsedTimeSinceCompromise!==rhs.compromisedInfo.elapsedTimeSinceCompromise){return rhs.compromisedInfo.compromiseTime-lhs.compromisedInfo.compromiseTime}return lhs.formattedOrigin.localeCompare(rhs.formattedOrigin)||lhs.username.localeCompare(rhs.username)}));resultList.push(...addedResults);this.leakedPasswords=resultList}};// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class ActionLink extends HTMLAnchorElement{connectedCallback(){this.tabIndex=this.disabled?-1:0;if(!this.hasAttribute("role")){this.setAttribute("role","link")}this.addEventListener("keydown",(function(e){if(!this.disabled&&e.key==="Enter"&&!this.href){window.setTimeout(this.click.bind(this),0)}}));function preventDefault(e){e.preventDefault()}function removePreventDefault(){document.removeEventListener("selectstart",preventDefault);document.removeEventListener("mouseup",removePreventDefault)}this.addEventListener("mousedown",(function(){document.addEventListener("selectstart",preventDefault);document.addEventListener("mouseup",removePreventDefault);if(document.activeElement!==this){this.classList.add("no-outline")}}));this.addEventListener("blur",(function(){this.classList.remove("no-outline")}))}set disabled(disabled){if(disabled){HTMLAnchorElement.prototype.setAttribute.call(this,"disabled","")}else{HTMLAnchorElement.prototype.removeAttribute.call(this,"disabled")}this.tabIndex=disabled?-1:0}get disabled(){return this.hasAttribute("disabled")}setAttribute(attr,val){if(attr.toLowerCase()==="disabled"){this.disabled=true}else{HTMLAnchorElement.prototype.setAttribute.apply(this,arguments)}}removeAttribute(attr){if(attr.toLowerCase()==="disabled"){this.disabled=false}else{HTMLAnchorElement.prototype.removeAttribute.apply(this,arguments)}}}customElements.define("action-link",ActionLink,{extends:"a"});const template$e=document.createElement("template");template$e.innerHTML=`<dom-module id="action-link" assetpath="chrome://resources/" css-build="shadow">\n  <template css-build="shadow">\n    <style scope="action-link">[is='action-link'] {\n  cursor: pointer;\n        display: inline-block;\n        text-decoration: none;\n}\n\n[is='action-link'], [is='action-link']:active, [is='action-link']:hover, [is='action-link']:visited {\n  color: var(--cr-link-color);\n}\n\n[is='action-link'][disabled] {\n  color: var(--paper-grey-600);  \n        cursor: default;\n        opacity: 0.65;\n        pointer-events: none;\n}\n\n[is='action-link'].no-outline {\n  outline: none;\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$e.content.cloneNode(true));
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronScrollTargetBehavior={properties:{scrollTarget:{type:HTMLElement,value:function(){return this._defaultScrollTarget}}},observers:["_scrollTargetChanged(scrollTarget, isAttached)"],_shouldHaveListener:true,_scrollTargetChanged:function(scrollTarget,isAttached){if(this._oldScrollTarget){this._toggleScrollListener(false,this._oldScrollTarget);this._oldScrollTarget=null}if(!isAttached){return}if(scrollTarget==="document"){this.scrollTarget=this._doc}else if(typeof scrollTarget==="string"){var domHost=this.domHost;this.scrollTarget=domHost&&domHost.$?domHost.$[scrollTarget]:dom(this.ownerDocument).querySelector("#"+scrollTarget)}else if(this._isValidScrollTarget()){this._oldScrollTarget=scrollTarget;this._toggleScrollListener(this._shouldHaveListener,scrollTarget)}},_scrollHandler:function scrollHandler(){},get _defaultScrollTarget(){return this._doc},get _doc(){return this.ownerDocument.documentElement},get _scrollTop(){if(this._isValidScrollTarget()){return this.scrollTarget===this._doc?window.pageYOffset:this.scrollTarget.scrollTop}return 0},get _scrollLeft(){if(this._isValidScrollTarget()){return this.scrollTarget===this._doc?window.pageXOffset:this.scrollTarget.scrollLeft}return 0},set _scrollTop(top){if(this.scrollTarget===this._doc){window.scrollTo(window.pageXOffset,top)}else if(this._isValidScrollTarget()){this.scrollTarget.scrollTop=top}},set _scrollLeft(left){if(this.scrollTarget===this._doc){window.scrollTo(left,window.pageYOffset)}else if(this._isValidScrollTarget()){this.scrollTarget.scrollLeft=left}},scroll:function(leftOrOptions,top){var left;if(typeof leftOrOptions==="object"){left=leftOrOptions.left;top=leftOrOptions.top}else{left=leftOrOptions}left=left||0;top=top||0;if(this.scrollTarget===this._doc){window.scrollTo(left,top)}else if(this._isValidScrollTarget()){this.scrollTarget.scrollLeft=left;this.scrollTarget.scrollTop=top}},get _scrollTargetWidth(){if(this._isValidScrollTarget()){return this.scrollTarget===this._doc?window.innerWidth:this.scrollTarget.offsetWidth}return 0},get _scrollTargetHeight(){if(this._isValidScrollTarget()){return this.scrollTarget===this._doc?window.innerHeight:this.scrollTarget.offsetHeight}return 0},_isValidScrollTarget:function(){return this.scrollTarget instanceof HTMLElement},_toggleScrollListener:function(yes,scrollTarget){var eventTarget=scrollTarget===this._doc?window:scrollTarget;if(yes){if(!this._boundScrollHandler){this._boundScrollHandler=this._scrollHandler.bind(this);eventTarget.addEventListener("scroll",this._boundScrollHandler)}}else{if(this._boundScrollHandler){eventTarget.removeEventListener("scroll",this._boundScrollHandler);this._boundScrollHandler=null}}},toggleScrollListener:function(yes){this._shouldHaveListener=yes;this._toggleScrollListener(yes,this.scrollTarget)}};
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var IOS=navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/);var IOS_TOUCH_SCROLLING=IOS&&IOS[1]>=8;var DEFAULT_PHYSICAL_COUNT=3;var HIDDEN_Y="-10000px";var SECRET_TABINDEX=-100;Polymer({_template:html`<!--css-build:shadow--><style scope="iron-list">:host {
  display: block;
}

@media only screen and (-webkit-max-device-pixel-ratio: 1) {
:host {
  will-change: transform;
}

}

#items {
  user-select: var(--iron-list-items-container_-_user-select);
        position: relative;
}

:host(:not([grid])) #items > ::slotted(*) {
  width: 100%;
}

#items > ::slotted(*) {
  box-sizing: border-box;
        margin: 0;
        position: absolute;
        top: 0;
        will-change: transform;
}

</style>

    <array-selector id="selector" items="{{items}}" selected="{{selectedItems}}" selected-item="{{selectedItem}}"></array-selector>

    <div id="items">
      <slot></slot>
    </div>
`,is:"iron-list",properties:{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},selectedAs:{type:String,value:"selected"},grid:{type:Boolean,value:false,reflectToAttribute:true,observer:"_gridChanged"},selectionEnabled:{type:Boolean,value:false},selectedItem:{type:Object,notify:true},selectedItems:{type:Object,notify:true},multiSelection:{type:Boolean,value:false},scrollOffset:{type:Number,value:0},preserveFocus:{type:Boolean,value:false}},observers:["_itemsChanged(items.*)","_selectionEnabledChanged(selectionEnabled)","_multiSelectionChanged(multiSelection)","_setOverflow(scrollTarget, scrollOffset)"],behaviors:[Templatizer,IronResizableBehavior,IronScrollTargetBehavior,OptionalMutableDataBehavior],_ratio:.5,_scrollerPaddingTop:0,_scrollPosition:0,_physicalSize:0,_physicalAverage:0,_physicalAverageCount:0,_physicalTop:0,_virtualCount:0,_estScrollHeight:0,_scrollHeight:0,_viewportHeight:0,_viewportWidth:0,_physicalItems:null,_physicalSizes:null,_firstVisibleIndexVal:null,_lastVisibleIndexVal:null,_maxPages:2,_focusedItem:null,_focusedVirtualIndex:-1,_focusedPhysicalIndex:-1,_offscreenFocusedItem:null,_focusBackfillItem:null,_itemsPerRow:1,_itemWidth:0,_rowHeight:0,_templateCost:0,_parentModel:true,get _physicalBottom(){return this._physicalTop+this._physicalSize},get _scrollBottom(){return this._scrollPosition+this._viewportHeight},get _virtualEnd(){return this._virtualStart+this._physicalCount-1},get _hiddenContentSize(){var size=this.grid?this._physicalRows*this._rowHeight:this._physicalSize;return size-this._viewportHeight},get _itemsParent(){return dom(dom(this._userTemplate).parentNode)},get _maxScrollTop(){return this._estScrollHeight-this._viewportHeight+this._scrollOffset},get _maxVirtualStart(){var virtualCount=this._convertIndexToCompleteRow(this._virtualCount);return Math.max(0,virtualCount-this._physicalCount)},set _virtualStart(val){val=this._clamp(val,0,this._maxVirtualStart);if(this.grid){val=val-val%this._itemsPerRow}this._virtualStartVal=val},get _virtualStart(){return this._virtualStartVal||0},set _physicalStart(val){val=val%this._physicalCount;if(val<0){val=this._physicalCount+val}if(this.grid){val=val-val%this._itemsPerRow}this._physicalStartVal=val},get _physicalStart(){return this._physicalStartVal||0},get _physicalEnd(){return(this._physicalStart+this._physicalCount-1)%this._physicalCount},set _physicalCount(val){this._physicalCountVal=val},get _physicalCount(){return this._physicalCountVal||0},get _optPhysicalSize(){return this._viewportHeight===0?Infinity:this._viewportHeight*this._maxPages},get _isVisible(){return Boolean(this.offsetWidth||this.offsetHeight)},get firstVisibleIndex(){var idx=this._firstVisibleIndexVal;if(idx==null){var physicalOffset=this._physicalTop+this._scrollOffset;idx=this._iterateItems((function(pidx,vidx){physicalOffset+=this._getPhysicalSizeIncrement(pidx);if(physicalOffset>this._scrollPosition){return this.grid?vidx-vidx%this._itemsPerRow:vidx}if(this.grid&&this._virtualCount-1===vidx){return vidx-vidx%this._itemsPerRow}}))||0;this._firstVisibleIndexVal=idx}return idx},get lastVisibleIndex(){var idx=this._lastVisibleIndexVal;if(idx==null){if(this.grid){idx=Math.min(this._virtualCount,this.firstVisibleIndex+this._estRowsInView*this._itemsPerRow-1)}else{var physicalOffset=this._physicalTop+this._scrollOffset;this._iterateItems((function(pidx,vidx){if(physicalOffset<this._scrollBottom){idx=vidx}physicalOffset+=this._getPhysicalSizeIncrement(pidx)}))}this._lastVisibleIndexVal=idx}return idx},get _defaultScrollTarget(){return this},get _virtualRowCount(){return Math.ceil(this._virtualCount/this._itemsPerRow)},get _estRowsInView(){return Math.ceil(this._viewportHeight/this._rowHeight)},get _physicalRows(){return Math.ceil(this._physicalCount/this._itemsPerRow)},get _scrollOffset(){return this._scrollerPaddingTop+this.scrollOffset},ready:function(){this.addEventListener("focus",this._didFocus.bind(this),true)},attached:function(){this._debounce("_render",this._render,animationFrame);this.listen(this,"iron-resize","_resizeHandler");this.listen(this,"keydown","_keydownHandler")},detached:function(){this.unlisten(this,"iron-resize","_resizeHandler");this.unlisten(this,"keydown","_keydownHandler")},_setOverflow:function(scrollTarget){this.style.webkitOverflowScrolling=scrollTarget===this?"touch":"";this.style.overflowY=scrollTarget===this?"auto":"";this._lastVisibleIndexVal=null;this._firstVisibleIndexVal=null;this._debounce("_render",this._render,animationFrame)},updateViewportBoundaries:function(){var styles=window.getComputedStyle(this);this._scrollerPaddingTop=this.scrollTarget===this?0:parseInt(styles["padding-top"],10);this._isRTL=Boolean(styles.direction==="rtl");this._viewportWidth=this.$.items.offsetWidth;this._viewportHeight=this._scrollTargetHeight;this.grid&&this._updateGridMetrics()},_scrollHandler:function(){var scrollTop=Math.max(0,Math.min(this._maxScrollTop,this._scrollTop));var delta=scrollTop-this._scrollPosition;var isScrollingDown=delta>=0;this._scrollPosition=scrollTop;this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;if(Math.abs(delta)>this._physicalSize&&this._physicalSize>0){delta=delta-this._scrollOffset;var idxAdjustment=Math.round(delta/this._physicalAverage)*this._itemsPerRow;this._virtualStart=this._virtualStart+idxAdjustment;this._physicalStart=this._physicalStart+idxAdjustment;this._physicalTop=Math.min(Math.floor(this._virtualStart/this._itemsPerRow)*this._physicalAverage,this._scrollPosition);this._update()}else if(this._physicalCount>0){var reusables=this._getReusables(isScrollingDown);if(isScrollingDown){this._physicalTop=reusables.physicalTop;this._virtualStart=this._virtualStart+reusables.indexes.length;this._physicalStart=this._physicalStart+reusables.indexes.length}else{this._virtualStart=this._virtualStart-reusables.indexes.length;this._physicalStart=this._physicalStart-reusables.indexes.length}this._update(reusables.indexes,isScrollingDown?null:reusables.indexes);this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,0),microTask)}},_getReusables:function(fromTop){var ith,lastIth,offsetContent,physicalItemHeight;var idxs=[];var protectedOffsetContent=this._hiddenContentSize*this._ratio;var virtualStart=this._virtualStart;var virtualEnd=this._virtualEnd;var physicalCount=this._physicalCount;var top=this._physicalTop+this._scrollOffset;var bottom=this._physicalBottom+this._scrollOffset;var scrollTop=this._scrollPosition;var scrollBottom=this._scrollBottom;if(fromTop){ith=this._physicalStart;lastIth=this._physicalEnd;offsetContent=scrollTop-top}else{ith=this._physicalEnd;lastIth=this._physicalStart;offsetContent=bottom-scrollBottom}while(true){physicalItemHeight=this._getPhysicalSizeIncrement(ith);offsetContent=offsetContent-physicalItemHeight;if(idxs.length>=physicalCount||offsetContent<=protectedOffsetContent){break}if(fromTop){if(virtualEnd+idxs.length+1>=this._virtualCount){break}if(top+physicalItemHeight>=scrollTop-this._scrollOffset){break}idxs.push(ith);top=top+physicalItemHeight;ith=(ith+1)%physicalCount}else{if(virtualStart-idxs.length<=0){break}if(top+this._physicalSize-physicalItemHeight<=scrollBottom){break}idxs.push(ith);top=top-physicalItemHeight;ith=ith===0?physicalCount-1:ith-1}}return{indexes:idxs,physicalTop:top-this._scrollOffset}},_update:function(itemSet,movingUp){if(itemSet&&itemSet.length===0||this._physicalCount===0){return}this._manageFocus();this._assignModels(itemSet);this._updateMetrics(itemSet);if(movingUp){while(movingUp.length){var idx=movingUp.pop();this._physicalTop-=this._getPhysicalSizeIncrement(idx)}}this._positionItems();this._updateScrollerSize()},_createPool:function(size){this._ensureTemplatized();var i,inst;var physicalItems=new Array(size);for(i=0;i<size;i++){inst=this.stamp(null);physicalItems[i]=inst.root.querySelector("*");this._itemsParent.appendChild(inst.root)}return physicalItems},_isClientFull:function(){return this._scrollBottom!=0&&this._physicalBottom-1>=this._scrollBottom&&this._physicalTop<=this._scrollPosition},_increasePoolIfNeeded:function(count){var nextPhysicalCount=this._clamp(this._physicalCount+count,DEFAULT_PHYSICAL_COUNT,this._virtualCount-this._virtualStart);nextPhysicalCount=this._convertIndexToCompleteRow(nextPhysicalCount);if(this.grid){var correction=nextPhysicalCount%this._itemsPerRow;if(correction&&nextPhysicalCount-correction<=this._physicalCount){nextPhysicalCount+=this._itemsPerRow}nextPhysicalCount-=correction}var delta=nextPhysicalCount-this._physicalCount;var nextIncrease=Math.round(this._physicalCount*.5);if(delta<0){return}if(delta>0){var ts=window.performance.now();[].push.apply(this._physicalItems,this._createPool(delta));for(var i=0;i<delta;i++){this._physicalSizes.push(0)}this._physicalCount=this._physicalCount+delta;if(this._physicalStart>this._physicalEnd&&this._isIndexRendered(this._focusedVirtualIndex)&&this._getPhysicalIndex(this._focusedVirtualIndex)<this._physicalEnd){this._physicalStart=this._physicalStart+delta}this._update();this._templateCost=(window.performance.now()-ts)/delta;nextIncrease=Math.round(this._physicalCount*.5)}if(this._virtualEnd>=this._virtualCount-1||nextIncrease===0);else if(!this._isClientFull()){this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,nextIncrease),microTask)}else if(this._physicalSize<this._optPhysicalSize){this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,this._clamp(Math.round(50/this._templateCost),1,nextIncrease)),idlePeriod)}},_render:function(){if(!this.isAttached||!this._isVisible){return}if(this._physicalCount!==0){var reusables=this._getReusables(true);this._physicalTop=reusables.physicalTop;this._virtualStart=this._virtualStart+reusables.indexes.length;this._physicalStart=this._physicalStart+reusables.indexes.length;this._update(reusables.indexes);this._update();this._increasePoolIfNeeded(0)}else if(this._virtualCount>0){this.updateViewportBoundaries();this._increasePoolIfNeeded(DEFAULT_PHYSICAL_COUNT)}},_ensureTemplatized:function(){if(this.ctor){return}this._userTemplate=this.queryEffectiveChildren("template");if(!this._userTemplate){console.warn("iron-list requires a template to be provided in light-dom")}var instanceProps={};instanceProps.__key__=true;instanceProps[this.as]=true;instanceProps[this.indexAs]=true;instanceProps[this.selectedAs]=true;instanceProps.tabIndex=true;this._instanceProps=instanceProps;this.templatize(this._userTemplate,this.mutableData)},_gridChanged:function(newGrid,oldGrid){if(typeof oldGrid==="undefined")return;this.notifyResize();flush();newGrid&&this._updateGridMetrics()},_getFocusedElement:function(){function doSearch(node,query){let result=null;let type=node.nodeType;if(type==Node.ELEMENT_NODE||type==Node.DOCUMENT_FRAGMENT_NODE)result=node.querySelector(query);if(result)return result;let child=node.firstChild;while(child!==null&&result===null){result=doSearch(child,query);child=child.nextSibling}if(result)return result;const shadowRoot=node.shadowRoot;return shadowRoot?doSearch(shadowRoot,query):null}const focusWithin=doSearch(this,":focus-within");return focusWithin?doSearch(focusWithin,":focus"):null},_itemsChanged:function(change){var rendering=/^items(\.splices){0,1}$/.test(change.path);var lastFocusedIndex,focusedElement;if(rendering&&this.preserveFocus){lastFocusedIndex=this._focusedVirtualIndex;focusedElement=this._getFocusedElement()}var preservingFocus=rendering&&this.preserveFocus&&focusedElement;if(change.path==="items"){this._virtualStart=0;this._physicalTop=0;this._virtualCount=this.items?this.items.length:0;this._physicalIndexForKey={};this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;this._physicalCount=this._physicalCount||0;this._physicalItems=this._physicalItems||[];this._physicalSizes=this._physicalSizes||[];this._physicalStart=0;if(this._scrollTop>this._scrollOffset&&!preservingFocus){this._resetScrollPosition(0)}this._removeFocusedItem();this._debounce("_render",this._render,animationFrame)}else if(change.path==="items.splices"){this._adjustVirtualIndex(change.value.indexSplices);this._virtualCount=this.items?this.items.length:0;var itemAddedOrRemoved=change.value.indexSplices.some((function(splice){return splice.addedCount>0||splice.removed.length>0}));if(itemAddedOrRemoved){var activeElement=this._getActiveElement();if(this.contains(activeElement)){activeElement.blur()}}var affectedIndexRendered=change.value.indexSplices.some((function(splice){return splice.index+splice.addedCount>=this._virtualStart&&splice.index<=this._virtualEnd}),this);if(!this._isClientFull()||affectedIndexRendered){this._debounce("_render",this._render,animationFrame)}}else if(change.path!=="items.length"){this._forwardItemPath(change.path,change.value)}if(preservingFocus){flush();focusedElement.blur();this._focusPhysicalItem(Math.min(this.items.length-1,lastFocusedIndex));if(!this._isIndexVisible(this._focusedVirtualIndex)){this.scrollToIndex(this._focusedVirtualIndex)}}},_forwardItemPath:function(path,value){path=path.slice(6);var dot=path.indexOf(".");if(dot===-1){dot=path.length}var isIndexRendered;var pidx;var inst;var offscreenInstance=this.modelForElement(this._offscreenFocusedItem);var vidx=parseInt(path.substring(0,dot),10);isIndexRendered=this._isIndexRendered(vidx);if(isIndexRendered){pidx=this._getPhysicalIndex(vidx);inst=this.modelForElement(this._physicalItems[pidx])}else if(offscreenInstance){inst=offscreenInstance}if(!inst||inst[this.indexAs]!==vidx){return}path=path.substring(dot+1);path=this.as+(path?"."+path:"");inst._setPendingPropertyOrPath(path,value,false,true);inst._flushProperties&&inst._flushProperties();if(isIndexRendered){this._updateMetrics([pidx]);this._positionItems();this._updateScrollerSize()}},_adjustVirtualIndex:function(splices){splices.forEach((function(splice){splice.removed.forEach(this._removeItem,this);if(splice.index<this._virtualStart){var delta=Math.max(splice.addedCount-splice.removed.length,splice.index-this._virtualStart);this._virtualStart=this._virtualStart+delta;if(this._focusedVirtualIndex>=0){this._focusedVirtualIndex=this._focusedVirtualIndex+delta}}}),this)},_removeItem:function(item){this.$.selector.deselect(item);if(this._focusedItem&&this.modelForElement(this._focusedItem)[this.as]===item){this._removeFocusedItem()}},_iterateItems:function(fn,itemSet){var pidx,vidx,rtn,i;if(arguments.length===2&&itemSet){for(i=0;i<itemSet.length;i++){pidx=itemSet[i];vidx=this._computeVidx(pidx);if((rtn=fn.call(this,pidx,vidx))!=null){return rtn}}}else{pidx=this._physicalStart;vidx=this._virtualStart;for(;pidx<this._physicalCount;pidx++,vidx++){if((rtn=fn.call(this,pidx,vidx))!=null){return rtn}}for(pidx=0;pidx<this._physicalStart;pidx++,vidx++){if((rtn=fn.call(this,pidx,vidx))!=null){return rtn}}}},_computeVidx:function(pidx){if(pidx>=this._physicalStart){return this._virtualStart+(pidx-this._physicalStart)}return this._virtualStart+(this._physicalCount-this._physicalStart)+pidx},_assignModels:function(itemSet){this._iterateItems((function(pidx,vidx){var el=this._physicalItems[pidx];var item=this.items&&this.items[vidx];if(item!=null){var inst=this.modelForElement(el);inst.__key__=null;this._forwardProperty(inst,this.as,item);this._forwardProperty(inst,this.selectedAs,this.$.selector.isSelected(item));this._forwardProperty(inst,this.indexAs,vidx);this._forwardProperty(inst,"tabIndex",this._focusedVirtualIndex===vidx?0:-1);this._physicalIndexForKey[inst.__key__]=pidx;inst._flushProperties&&inst._flushProperties(true);el.removeAttribute("hidden")}else{el.setAttribute("hidden","")}}),itemSet)},_updateMetrics:function(itemSet){flush();var newPhysicalSize=0;var oldPhysicalSize=0;var prevAvgCount=this._physicalAverageCount;var prevPhysicalAvg=this._physicalAverage;this._iterateItems((function(pidx,vidx){oldPhysicalSize+=this._physicalSizes[pidx];this._physicalSizes[pidx]=this._physicalItems[pidx].offsetHeight;newPhysicalSize+=this._physicalSizes[pidx];this._physicalAverageCount+=this._physicalSizes[pidx]?1:0}),itemSet);if(this.grid){this._updateGridMetrics();this._physicalSize=Math.ceil(this._physicalCount/this._itemsPerRow)*this._rowHeight}else{oldPhysicalSize=this._itemsPerRow===1?oldPhysicalSize:Math.ceil(this._physicalCount/this._itemsPerRow)*this._rowHeight;this._physicalSize=this._physicalSize+newPhysicalSize-oldPhysicalSize;this._itemsPerRow=1}if(this._physicalAverageCount!==prevAvgCount){this._physicalAverage=Math.round((prevPhysicalAvg*prevAvgCount+newPhysicalSize)/this._physicalAverageCount)}},_updateGridMetrics:function(){this._itemWidth=this._physicalCount>0?this._physicalItems[0].getBoundingClientRect().width:200;this._rowHeight=this._physicalCount>0?this._physicalItems[0].offsetHeight:200;this._itemsPerRow=this._itemWidth?Math.floor(this._viewportWidth/this._itemWidth):this._itemsPerRow},_positionItems:function(){this._adjustScrollPosition();var y=this._physicalTop;if(this.grid){var totalItemWidth=this._itemsPerRow*this._itemWidth;var rowOffset=(this._viewportWidth-totalItemWidth)/2;this._iterateItems((function(pidx,vidx){var modulus=vidx%this._itemsPerRow;var x=Math.floor(modulus*this._itemWidth+rowOffset);if(this._isRTL){x=x*-1}this.translate3d(x+"px",y+"px",0,this._physicalItems[pidx]);if(this._shouldRenderNextRow(vidx)){y+=this._rowHeight}}))}else{const order=[];this._iterateItems((function(pidx,vidx){const item=this._physicalItems[pidx];this.translate3d(0,y+"px",0,item);y+=this._physicalSizes[pidx];const itemId=item.id;if(itemId){order.push(itemId)}}));if(order.length){this.setAttribute("aria-owns",order.join(" "))}}},_getPhysicalSizeIncrement:function(pidx){if(!this.grid){return this._physicalSizes[pidx]}if(this._computeVidx(pidx)%this._itemsPerRow!==this._itemsPerRow-1){return 0}return this._rowHeight},_shouldRenderNextRow:function(vidx){return vidx%this._itemsPerRow===this._itemsPerRow-1},_adjustScrollPosition:function(){var deltaHeight=this._virtualStart===0?this._physicalTop:Math.min(this._scrollPosition+this._physicalTop,0);if(deltaHeight!==0){this._physicalTop=this._physicalTop-deltaHeight;var scrollTop=this._scrollPosition;if(!IOS_TOUCH_SCROLLING&&scrollTop>0){this._resetScrollPosition(scrollTop-deltaHeight)}}},_resetScrollPosition:function(pos){if(this.scrollTarget&&pos>=0){this._scrollTop=pos;this._scrollPosition=this._scrollTop}},_updateScrollerSize:function(forceUpdate){if(this.grid){this._estScrollHeight=this._virtualRowCount*this._rowHeight}else{this._estScrollHeight=this._physicalBottom+Math.max(this._virtualCount-this._physicalCount-this._virtualStart,0)*this._physicalAverage}forceUpdate=forceUpdate||this._scrollHeight===0;forceUpdate=forceUpdate||this._scrollPosition>=this._estScrollHeight-this._physicalSize;forceUpdate=forceUpdate||this.grid&&this.$.items.style.height<this._estScrollHeight;if(forceUpdate||Math.abs(this._estScrollHeight-this._scrollHeight)>=this._viewportHeight){this.$.items.style.height=this._estScrollHeight+"px";this._scrollHeight=this._estScrollHeight}},scrollToItem:function(item){return this.scrollToIndex(this.items.indexOf(item))},scrollToIndex:function(idx){if(typeof idx!=="number"||idx<0||idx>this.items.length-1){return}flush();if(this._physicalCount===0){return}idx=this._clamp(idx,0,this._virtualCount-1);if(!this._isIndexRendered(idx)||idx>=this._maxVirtualStart){this._virtualStart=this.grid?idx-this._itemsPerRow*2:idx-1}this._manageFocus();this._assignModels();this._updateMetrics();this._physicalTop=Math.floor(this._virtualStart/this._itemsPerRow)*this._physicalAverage;var currentTopItem=this._physicalStart;var currentVirtualItem=this._virtualStart;var targetOffsetTop=0;var hiddenContentSize=this._hiddenContentSize;while(currentVirtualItem<idx&&targetOffsetTop<=hiddenContentSize){targetOffsetTop=targetOffsetTop+this._getPhysicalSizeIncrement(currentTopItem);currentTopItem=(currentTopItem+1)%this._physicalCount;currentVirtualItem++}this._updateScrollerSize(true);this._positionItems();this._resetScrollPosition(this._physicalTop+this._scrollOffset+targetOffsetTop);this._increasePoolIfNeeded(0);this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null},_resetAverage:function(){this._physicalAverage=0;this._physicalAverageCount=0},_resizeHandler:function(){this._debounce("_render",(function(){this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;if(this._isVisible){this.updateViewportBoundaries();this.toggleScrollListener(true);this._resetAverage();this._render()}else{this.toggleScrollListener(false)}}),animationFrame)},selectItem:function(item){return this.selectIndex(this.items.indexOf(item))},selectIndex:function(index){if(index<0||index>=this._virtualCount){return}if(!this.multiSelection&&this.selectedItem){this.clearSelection()}if(this._isIndexRendered(index)){var model=this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)]);if(model){model[this.selectedAs]=true}this.updateSizeForIndex(index)}this.$.selector.selectIndex(index)},deselectItem:function(item){return this.deselectIndex(this.items.indexOf(item))},deselectIndex:function(index){if(index<0||index>=this._virtualCount){return}if(this._isIndexRendered(index)){var model=this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)]);model[this.selectedAs]=false;this.updateSizeForIndex(index)}this.$.selector.deselectIndex(index)},toggleSelectionForItem:function(item){return this.toggleSelectionForIndex(this.items.indexOf(item))},toggleSelectionForIndex:function(index){var isSelected=this.$.selector.isIndexSelected?this.$.selector.isIndexSelected(index):this.$.selector.isSelected(this.items[index]);isSelected?this.deselectIndex(index):this.selectIndex(index)},clearSelection:function(){this._iterateItems((function(pidx,vidx){this.modelForElement(this._physicalItems[pidx])[this.selectedAs]=false}));this.$.selector.clearSelection()},_selectionEnabledChanged:function(selectionEnabled){var handler=selectionEnabled?this.listen:this.unlisten;handler.call(this,this,"tap","_selectionHandler")},_selectionHandler:function(e){var model=this.modelForElement(e.target);if(!model){return}var modelTabIndex,activeElTabIndex;var target=dom(e).path[0];var activeEl=this._getActiveElement();var physicalItem=this._physicalItems[this._getPhysicalIndex(model[this.indexAs])];if(target.localName==="input"||target.localName==="button"||target.localName==="select"){return}modelTabIndex=model.tabIndex;model.tabIndex=SECRET_TABINDEX;activeElTabIndex=activeEl?activeEl.tabIndex:-1;model.tabIndex=modelTabIndex;if(activeEl&&physicalItem!==activeEl&&physicalItem.contains(activeEl)&&activeElTabIndex!==SECRET_TABINDEX){return}this.toggleSelectionForItem(model[this.as])},_multiSelectionChanged:function(multiSelection){this.clearSelection();this.$.selector.multi=multiSelection},updateSizeForItem:function(item){return this.updateSizeForIndex(this.items.indexOf(item))},updateSizeForIndex:function(index){if(!this._isIndexRendered(index)){return null}this._updateMetrics([this._getPhysicalIndex(index)]);this._positionItems();return null},_manageFocus:function(){var fidx=this._focusedVirtualIndex;if(fidx>=0&&fidx<this._virtualCount){if(this._isIndexRendered(fidx)){this._restoreFocusedItem()}else{this._createFocusBackfillItem()}}else if(this._virtualCount>0&&this._physicalCount>0){this._focusedPhysicalIndex=this._physicalStart;this._focusedVirtualIndex=this._virtualStart;this._focusedItem=this._physicalItems[this._physicalStart]}},_convertIndexToCompleteRow:function(idx){this._itemsPerRow=this._itemsPerRow||1;return this.grid?Math.ceil(idx/this._itemsPerRow)*this._itemsPerRow:idx},_isIndexRendered:function(idx){return idx>=this._virtualStart&&idx<=this._virtualEnd},_isIndexVisible:function(idx){return idx>=this.firstVisibleIndex&&idx<=this.lastVisibleIndex},_getPhysicalIndex:function(vidx){return(this._physicalStart+(vidx-this._virtualStart))%this._physicalCount},focusItem:function(idx){this._focusPhysicalItem(idx)},_focusPhysicalItem:function(idx){if(idx<0||idx>=this._virtualCount){return}this._restoreFocusedItem();if(!this._isIndexRendered(idx)){this.scrollToIndex(idx)}var physicalItem=this._physicalItems[this._getPhysicalIndex(idx)];var model=this.modelForElement(physicalItem);var focusable;model.tabIndex=SECRET_TABINDEX;if(physicalItem.tabIndex===SECRET_TABINDEX){focusable=physicalItem}if(!focusable){focusable=dom(physicalItem).querySelector('[tabindex="'+SECRET_TABINDEX+'"]')}model.tabIndex=0;this._focusedVirtualIndex=idx;focusable&&focusable.focus()},_removeFocusedItem:function(){if(this._offscreenFocusedItem){this._itemsParent.removeChild(this._offscreenFocusedItem)}this._offscreenFocusedItem=null;this._focusBackfillItem=null;this._focusedItem=null;this._focusedVirtualIndex=-1;this._focusedPhysicalIndex=-1},_createFocusBackfillItem:function(){var fpidx=this._focusedPhysicalIndex;if(this._offscreenFocusedItem||this._focusedVirtualIndex<0){return}if(!this._focusBackfillItem){var inst=this.stamp(null);this._focusBackfillItem=inst.root.querySelector("*");this._itemsParent.appendChild(inst.root)}this._offscreenFocusedItem=this._physicalItems[fpidx];this.modelForElement(this._offscreenFocusedItem).tabIndex=0;this._physicalItems[fpidx]=this._focusBackfillItem;this._focusedPhysicalIndex=fpidx;this.translate3d(0,HIDDEN_Y,0,this._offscreenFocusedItem)},_restoreFocusedItem:function(){if(!this._offscreenFocusedItem||this._focusedVirtualIndex<0){return}this._assignModels();var fpidx=this._focusedPhysicalIndex=this._getPhysicalIndex(this._focusedVirtualIndex);var onScreenItem=this._physicalItems[fpidx];if(!onScreenItem){return}var onScreenInstance=this.modelForElement(onScreenItem);var offScreenInstance=this.modelForElement(this._offscreenFocusedItem);if(onScreenInstance[this.as]===offScreenInstance[this.as]){this._focusBackfillItem=onScreenItem;onScreenInstance.tabIndex=-1;this._physicalItems[fpidx]=this._offscreenFocusedItem;this.translate3d(0,HIDDEN_Y,0,this._focusBackfillItem)}else{this._removeFocusedItem();this._focusBackfillItem=null}this._offscreenFocusedItem=null},_didFocus:function(e){var targetModel=this.modelForElement(e.target);var focusedModel=this.modelForElement(this._focusedItem);var hasOffscreenFocusedItem=this._offscreenFocusedItem!==null;var fidx=this._focusedVirtualIndex;if(!targetModel){return}if(focusedModel===targetModel){if(!this._isIndexVisible(fidx)){this.scrollToIndex(fidx)}}else{this._restoreFocusedItem();if(focusedModel){focusedModel.tabIndex=-1}targetModel.tabIndex=0;fidx=targetModel[this.indexAs];this._focusedVirtualIndex=fidx;this._focusedPhysicalIndex=this._getPhysicalIndex(fidx);this._focusedItem=this._physicalItems[this._focusedPhysicalIndex];if(hasOffscreenFocusedItem&&!this._offscreenFocusedItem){this._update()}}},_keydownHandler:function(e){switch(e.keyCode){case 40:if(this._focusedVirtualIndex<this._virtualCount-1)e.preventDefault();this._focusPhysicalItem(this._focusedVirtualIndex+(this.grid?this._itemsPerRow:1));break;case 39:if(this.grid)this._focusPhysicalItem(this._focusedVirtualIndex+(this._isRTL?-1:1));break;case 38:if(this._focusedVirtualIndex>0)e.preventDefault();this._focusPhysicalItem(this._focusedVirtualIndex-(this.grid?this._itemsPerRow:1));break;case 37:if(this.grid)this._focusPhysicalItem(this._focusedVirtualIndex+(this._isRTL?1:-1));break;case 13:this._focusPhysicalItem(this._focusedVirtualIndex);if(this.selectionEnabled)this._selectionHandler(e);break}},_clamp:function(v,min,max){return Math.min(max,Math.max(min,v))},_debounce:function(name,cb,asyncModule){this._debouncers=this._debouncers||{};this._debouncers[name]=Debouncer.debounce(this._debouncers[name],asyncModule,cb.bind(this));enqueueDebouncer(this._debouncers[name])},_forwardProperty:function(inst,name,value){inst._setPendingProperty(name,value)},_forwardHostPropV2:function(prop,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach((function(item){if(item){this.modelForElement(item).forwardHostProp(prop,value)}}),this)},_notifyInstancePropV2:function(inst,prop,value){if(matches(this.as,prop)){var idx=inst[this.indexAs];if(prop==this.as){this.items[idx]=value}this.notifyPath(translate(this.as,"items."+idx,prop),value)}},_getStampedChildren:function(){return this._physicalItems},_forwardInstancePath:function(inst,path,value){if(path.indexOf(this.as+".")===0){this.notifyPath("items."+inst.__key__+"."+path.slice(this.as.length+1),value)}},_forwardParentPath:function(path,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach((function(item){if(item){this.modelForElement(item).notifyPath(path,value)}}),this)},_forwardParentProp:function(prop,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach((function(item){if(item){this.modelForElement(item)[prop]=value}}),this)},_getActiveElement:function(){var itemsHost=this._itemsParent.node.domHost;return dom(itemsHost?itemsHost.root:document).activeElement}});// Copyright 2017 The Chromium Authors. All rights reserved.
const CrContainerShadowSide={TOP:"top",BOTTOM:"bottom"};const CrContainerShadowBehavior={intersectionObserver_:null,dropShadows_:null,intersectionProbes_:null,sides_:null,ready(){this.dropShadows_=new Map;this.intersectionProbes_=new Map},attached(){const hasBottomShadow=this.$.container.hasAttribute("show-bottom-shadow");this.sides_=hasBottomShadow?[CrContainerShadowSide.TOP,CrContainerShadowSide.BOTTOM]:[CrContainerShadowSide.TOP];this.sides_.forEach((side=>{const shadow=document.createElement("div");shadow.id=`cr-container-shadow-${side}`;shadow.classList.add("cr-container-shadow");this.dropShadows_.set(side,shadow);this.intersectionProbes_.set(side,document.createElement("div"))}));this.$.container.parentNode.insertBefore(this.dropShadows_.get(CrContainerShadowSide.TOP),this.$.container);this.$.container.prepend(this.intersectionProbes_.get(CrContainerShadowSide.TOP));if(hasBottomShadow){this.$.container.parentNode.insertBefore(this.dropShadows_.get(CrContainerShadowSide.BOTTOM),this.$.container.nextSibling);this.$.container.append(this.intersectionProbes_.get(CrContainerShadowSide.BOTTOM))}this.enableShadowBehavior(true)},detached(){this.enableShadowBehavior(false)},getIntersectionObserver_(){const callback=entries=>{for(const entry of entries){const target=entry.target;this.sides_.forEach((side=>{if(target===this.intersectionProbes_.get(side)){this.dropShadows_.get(side).classList.toggle("has-shadow",entry.intersectionRatio===0)}}))}};return new IntersectionObserver(callback,{root:this.$.container,threshold:0})},enableShadowBehavior(enable){if(enable===!!this.intersectionObserver_){return}if(!enable){this.intersectionObserver_.disconnect();this.intersectionObserver_=null;return}this.intersectionObserver_=this.getIntersectionObserver_();window.setTimeout((()=>{if(this.intersectionObserver_){this.intersectionProbes_.forEach((probe=>{this.intersectionObserver_.observe(probe)}))}}))},showDropShadows(){assert(!this.intersectionObserver_);assert(this.sides_);for(const side of this.sides_){this.dropShadows_.get(side).classList.toggle("has-shadow",true)}}};// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style cr-icons" scope="cr-dialog">dialog {
  --scroll-border-color: var(--paper-grey-300);
        --scroll-border: 1px solid var(--scroll-border-color);
        border: 0;
        border-radius: 8px;
        bottom: 50%;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.12),
                    0 16px 16px rgba(0, 0, 0, 0.24);
        color: inherit;
        max-height: initial;
        max-width: initial;
        overflow-y: hidden;
        padding: 0;
        position: absolute;
        top: 50%;
        width: var(--cr-dialog-width, 512px);
}

@media (prefers-color-scheme: dark) {
dialog {
  --scroll-border-color: var(--google-grey-refresh-700);
          background-color: var(--google-grey-900);
          
          background-image: linear-gradient(rgba(255, 255, 255, .04),
                                            rgba(255, 255, 255, .04));
}

}

dialog[open] #content-wrapper {
  display: flex;
        flex-direction: column;
        max-height: 100vh;
        overflow: auto;
}

.top-container, :host ::slotted([slot=button-container]), :host ::slotted([slot=footer]) {
  flex-shrink: 0;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.6);
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
}

:host ::slotted([slot=body]) {
  color: var(--cr-secondary-text-color);
        padding: 0 20px;
}

:host ::slotted([slot=title]) {
  color: var(--cr-primary-text-color);
        flex: 1;
        font-family: var(--cr-dialog-font-family, inherit);
        font-size: var(--cr-dialog-title-font-size, calc(15 / 13 * 100%));
        line-height: 1;
        padding-bottom: var(--cr-dialog-title-slot-padding-bottom, 16px);
        padding-inline-end:  var(--cr-dialog-title-slot-padding-end, 20px);
        padding-inline-start: var(--cr-dialog-title-slot-padding-start, 20px);
        padding-top: var(--cr-dialog-title-slot-padding-top, 20px);
}

:host ::slotted([slot=button-container]) {
  display: flex;
        justify-content: flex-end;
        padding-bottom: 16px;
        padding-inline-end: 16px;
        padding-inline-start: 16px;
        padding-top: 24px;
}

:host ::slotted([slot=footer]) {
  border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        border-top: 1px solid #dbdbdb;
        margin: 0;
        padding: 16px 20px;
}

@media (prefers-color-scheme: dark) {
:host ::slotted([slot=footer]) {
  border-top-color: var(--cr-separator-color);
}

}

.body-container {
  box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-height: 1.375rem; 
        overflow: auto;
}

:host {
  --transparent-border: 1px solid transparent;
}

#cr-container-shadow-top {
  border-bottom: var(--cr-dialog-body-border-top,
            var(--transparent-border));
}

#cr-container-shadow-bottom {
  border-bottom: var(--cr-dialog-body-border-bottom,
            var(--transparent-border));
}

#cr-container-shadow-top.has-shadow, #cr-container-shadow-bottom.has-shadow {
  border-bottom: var(--scroll-border);
}

.top-container {
  align-items: flex-start;
        display: flex;
        min-height: var(--cr-dialog-top-container-min-height, 31px);
}

.title-container {
  display: flex;
        flex: 1;
        outline: none;
}

#close {
  align-self: flex-start;
        margin-inline-end: 4px;
        margin-top: 4px;
}

</style>
    <!-- TODO(crbug/1139958): Remove "not chromeos" block when chromeVox issue is fixed-->
    <!--Update both "not chromeos" and "chromeos" blocks if either changes-->

    <dialog id="dialog" on-close="onNativeDialogClose_" on-cancel="onNativeDialogCancel_" part="dialog" aria-labelledby="title">
    <!-- This wrapper is necessary, such that the "pulse" animation is not
        erroneously played when the user clicks on the outer-most scrollbar. -->
      <div id="content-wrapper" part="wrapper">
        <div class="top-container">
          <div id="title" class="title-container" tabindex="-1">
            <slot name="title"></slot>
          </div>
          <cr-icon-button id="close" class="icon-clear" hidden$="[[!showCloseButton]]" aria-label$="[[closeText]]" on-click="cancel" on-keypress="onCloseKeypress_">
          </cr-icon-button>
        </div>
        <slot name="header"></slot>
        <div class="body-container" id="container" show-bottom-shadow="" part="body-container">
          <slot name="body"></slot>
        </div>
        <slot name="button-container"></slot>
        <slot name="footer"></slot>
      </div>
    </dialog>


<!--_html_template_end_-->`,is:"cr-dialog",behaviors:[CrContainerShadowBehavior],properties:{open:{type:Boolean,value:false,reflectToAttribute:true},closeText:String,ignorePopstate:{type:Boolean,value:false},ignoreEnterKey:{type:Boolean,value:false},consumeKeydownEvent:{type:Boolean,value:false},noCancel:{type:Boolean,value:false},showCloseButton:{type:Boolean,value:false},showOnAttach:{type:Boolean,value:false}},listeners:{pointerdown:"onPointerdown_"},intersectionObserver_:null,mutationObserver_:null,boundKeydown_:null,ready(){window.addEventListener("popstate",function(){if(!this.ignorePopstate&&this.$.dialog.open){this.cancel()}}.bind(this));if(!this.ignoreEnterKey){this.addEventListener("keypress",this.onKeypress_.bind(this))}},attached(){const mutationObserverCallback=function(){if(this.$.dialog.open){this.enableShadowBehavior(true);this.addKeydownListener_()}else{this.enableShadowBehavior(false);this.removeKeydownListener_()}}.bind(this);this.mutationObserver_=new MutationObserver(mutationObserverCallback);this.mutationObserver_.observe(this.$.dialog,{attributes:true,attributeFilter:["open"]});mutationObserverCallback();if(this.showOnAttach){this.showModal()}},detached(){this.removeKeydownListener_();if(this.mutationObserver_){this.mutationObserver_.disconnect();this.mutationObserver_=null}},addKeydownListener_(){if(!this.consumeKeydownEvent){return}this.boundKeydown_=this.boundKeydown_||this.onKeydown_.bind(this);this.addEventListener("keydown",this.boundKeydown_);document.body.addEventListener("keydown",this.boundKeydown_)},removeKeydownListener_(){if(!this.boundKeydown_){return}this.removeEventListener("keydown",this.boundKeydown_);document.body.removeEventListener("keydown",this.boundKeydown_);this.boundKeydown_=null},showModal(){this.$.dialog.showModal();assert(this.$.dialog.open);this.open=true;this.fire("cr-dialog-open")},cancel(){this.fire("cancel");this.$.dialog.close();assert(!this.$.dialog.open);this.open=false},close(){this.$.dialog.close("success");assert(!this.$.dialog.open);this.open=false},setTitleAriaLabel(title){this.$.dialog.removeAttribute("aria-labelledby");this.$.dialog.setAttribute("aria-label",title)},onCloseKeypress_(e){e.stopPropagation()},onNativeDialogClose_(e){if(e.target!==this.getNative()){return}e.stopPropagation();this.fire("close")},onNativeDialogCancel_(e){if(e.target!==this.getNative()){return}if(this.noCancel){e.preventDefault();return}this.open=false;this.fire("cancel")},getNative(){return this.$.dialog},onKeypress_(e){if(e.key!=="Enter"){return}const accept=e.target===this||e.composedPath().some((el=>el.tagName==="CR-INPUT"&&el.type!=="search"));if(!accept){return}const actionButton=this.querySelector(".action-button:not([disabled]):not([hidden])");if(actionButton){actionButton.click();e.preventDefault()}},onKeydown_(e){assert(this.consumeKeydownEvent);if(!this.getNative().open){return}if(this.ignoreEnterKey&&e.key==="Enter"){return}e.stopPropagation()},onPointerdown_(e){if(e.button!==0||e.composedPath()[0].tagName!=="DIALOG"){return}this.$.dialog.animate([{transform:"scale(1)",offset:0},{transform:"scale(1.02)",offset:.4},{transform:"scale(1.02)",offset:.6},{transform:"scale(1)",offset:1}],{duration:180,easing:"ease-in-out",iterations:1});e.preventDefault()},focus(){this.$$(".title-container").focus()}});// Copyright 2016 The Chromium Authors. All rights reserved.
const CrScrollableBehavior={intervalId_:null,ready(){const readyAsync=()=>{this.requestUpdateScroll();const scrollableElements=this.root.querySelectorAll("[scrollable]");for(let i=0;i<scrollableElements.length;i++){scrollableElements[i].addEventListener("scroll",this.updateScrollEvent_.bind(this))}};if(Polymer.DomIf){beforeNextRender(this,readyAsync);return}readyAsync()},detached(){if(this.intervalId_!==null){clearInterval(this.intervalId_)}},updateScrollableContents(){if(this.intervalId_!==null){return}this.requestUpdateScroll();const nodeList=this.root.querySelectorAll("[scrollable] iron-list");if(!nodeList.length){return}let nodesToResize=Array.from(nodeList).map((node=>({node:node,lastScrollHeight:0})));this.intervalId_=window.setInterval((()=>{const checkAgain=[];nodesToResize.forEach((({node:node,lastScrollHeight:lastScrollHeight})=>{const scrollHeight=node.parentNode.scrollHeight;if(scrollHeight!==lastScrollHeight){const ironList=node;ironList.notifyResize()}if(scrollHeight<=1&&window.getComputedStyle(node.parentNode).display!=="none"){checkAgain.push({node:node,lastScrollHeight:scrollHeight})}}));if(checkAgain.length===0){window.clearInterval(this.intervalId_);this.intervalId_=null}else{nodesToResize=checkAgain}}),10)},requestUpdateScroll(){requestAnimationFrame(function(){const scrollableElements=this.root.querySelectorAll("[scrollable]");for(let i=0;i<scrollableElements.length;i++){this.updateScroll_(scrollableElements[i])}}.bind(this))},saveScroll(list){list.savedScrollTops=list.savedScrollTops||[];list.savedScrollTops.push(list.scrollTarget.scrollTop)},restoreScroll(list){this.async((function(){const scrollTop=list.savedScrollTops.shift();if(scrollTop!==0){list.scroll(0,scrollTop)}}))},updateScrollEvent_(event){const scrollable=event.target;this.updateScroll_(scrollable)},updateScroll_(scrollable){scrollable.classList.toggle("can-scroll",scrollable.clientHeight<scrollable.scrollHeight);scrollable.classList.toggle("is-scrolled",scrollable.scrollTop>0);scrollable.classList.toggle("scrolled-to-bottom",scrollable.scrollTop+scrollable.clientHeight>=scrollable.scrollHeight)}};// Copyright 2014 The Chromium Authors. All rights reserved.
class FocusRow{constructor(root,boundary,delegate){this.root=root;this.boundary_=boundary||document.documentElement;this.delegate=delegate;this.eventTracker=new EventTracker}static isFocusable(element){if(!element||element.disabled){return false}let current=element;while(true){assertInstanceof(current,Element);const style=window.getComputedStyle(current);if(style.visibility==="hidden"||style.display==="none"){return false}const parent=current.parentNode;if(!parent){return false}if(parent===current.ownerDocument||parent instanceof DocumentFragment){return true}current=parent}}static getFocusableElement(element){if(element.getFocusableElement){return element.getFocusableElement()}return element}addItem(type,selectorOrElement){assert(type);let element;if(typeof selectorOrElement==="string"){element=this.root.querySelector(selectorOrElement)}else{element=selectorOrElement}if(!element){return false}element.setAttribute("focus-type",type);element.tabIndex=this.isActive()?0:-1;this.eventTracker.add(element,"blur",this.onBlur_.bind(this));this.eventTracker.add(element,"focus",this.onFocus_.bind(this));this.eventTracker.add(element,"keydown",this.onKeydown_.bind(this));this.eventTracker.add(element,"mousedown",this.onMousedown_.bind(this));return true}destroy(){this.eventTracker.removeAll()}getCustomEquivalent(sampleElement){return assert(this.getFirstFocusable())}getElements(){return Array.from(this.root.querySelectorAll("[focus-type]")).map(FocusRow.getFocusableElement)}getEquivalentElement(sampleElement){if(this.getFocusableElements().indexOf(sampleElement)>=0){return sampleElement}const sampleFocusType=this.getTypeForElement(sampleElement);if(sampleFocusType){const sameType=this.getFirstFocusable(sampleFocusType);if(sameType){return sameType}}return this.getCustomEquivalent(sampleElement)}getFirstFocusable(opt_type){const element=this.getFocusableElements().find((el=>!opt_type||el.getAttribute("focus-type")===opt_type));return element||null}getFocusableElements(){return this.getElements().filter(FocusRow.isFocusable)}getTypeForElement(element){return element.getAttribute("focus-type")||""}isActive(){return this.root.classList.contains(FocusRow.ACTIVE_CLASS)}makeActive(active){if(active===this.isActive()){return}this.getElements().forEach((function(element){element.tabIndex=active?0:-1}));this.root.classList.toggle(FocusRow.ACTIVE_CLASS,active)}onBlur_(e){if(!this.boundary_.contains(e.relatedTarget)){return}const currentTarget=e.currentTarget;if(this.getFocusableElements().indexOf(currentTarget)>=0){this.makeActive(false)}}onFocus_(e){if(this.delegate){this.delegate.onFocus(this,e)}}onMousedown_(e){if(e.button){return}if(!e.currentTarget.disabled){e.currentTarget.tabIndex=0}}onKeydown_(e){const elements=this.getFocusableElements();const currentElement=FocusRow.getFocusableElement(e.currentTarget);const elementIndex=elements.indexOf(currentElement);assert(elementIndex>=0);if(this.delegate&&this.delegate.onKeydown(this,e)){return}const isShiftTab=!e.altKey&&!e.ctrlKey&&!e.metaKey&&e.shiftKey&&e.key==="Tab";if(hasKeyModifiers(e)&&!isShiftTab){return}let index=-1;let shouldStopPropagation=true;if(isShiftTab){index=elementIndex-1;if(index<0){return}}else if(e.key==="ArrowLeft"){index=elementIndex+(isRTL()?1:-1)}else if(e.key==="ArrowRight"){index=elementIndex+(isRTL()?-1:1)}else if(e.key==="Home"){index=0}else if(e.key==="End"){index=elements.length-1}else{shouldStopPropagation=false}const elementToFocus=elements[index];if(elementToFocus){this.getEquivalentElement(elementToFocus).focus();e.preventDefault()}if(shouldStopPropagation){e.stopPropagation()}}}FocusRow.ACTIVE_CLASS="focus-row-active";// Copyright 2016 The Chromium Authors. All rights reserved.
const AnchorAlignment={BEFORE_START:-2,AFTER_START:-1,CENTER:0,BEFORE_END:1,AFTER_END:2};const DROPDOWN_ITEM_CLASS="dropdown-item";const SELECTABLE_DROPDOWN_ITEM_QUERY=`.${DROPDOWN_ITEM_CLASS}:not([hidden]):not([disabled])`;const AFTER_END_OFFSET=10;function getStartPointWithAnchor(start,end,menuLength,anchorAlignment,min,max){let startPoint=0;switch(anchorAlignment){case AnchorAlignment.BEFORE_START:startPoint=-menuLength;break;case AnchorAlignment.AFTER_START:startPoint=start;break;case AnchorAlignment.CENTER:startPoint=(start+end-menuLength)/2;break;case AnchorAlignment.BEFORE_END:startPoint=end-menuLength;break;case AnchorAlignment.AFTER_END:startPoint=end;break}if(startPoint+menuLength>max){startPoint=end-menuLength}if(startPoint<min){startPoint=start}startPoint=Math.max(min,Math.min(startPoint,max-menuLength));return startPoint}function getDefaultShowConfig(){return{top:0,left:0,height:0,width:0,anchorAlignmentX:AnchorAlignment.AFTER_START,anchorAlignmentY:AnchorAlignment.AFTER_START,minX:0,minY:0,maxX:0,maxY:0}}Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-action-menu">:host dialog {
  background-color: var(--cr-menu-background-color);
        border: none;
        border-radius: 4px;
        box-shadow: var(--cr-menu-shadow);
        margin: 0;
        min-width: 128px;
        outline: none;
        padding: 0;
        position: absolute;
}

:host dialog::backdrop {
  background-color: transparent;
}

:host ::slotted(.dropdown-item) {
  -webkit-tap-highlight-color: transparent;
        background: none;
        border: none;
        border-radius: 0;
        box-sizing: border-box;
        color: var(--cr-primary-text-color);
        font: inherit;
        min-height: 32px;
        padding: 0 24px;
        text-align: start;
        user-select: none;
        width: 100%;
}

:host ::slotted(.dropdown-item:not([hidden])) {
  align-items: center;
        display: flex;
}

:host ::slotted(.dropdown-item[disabled]) {
  opacity: var(--cr-action-menu-disabled-item-opacity, 0.65);
}

:host ::slotted(.dropdown-item:not([disabled])) {
  cursor: pointer;
}

:host ::slotted(.dropdown-item:focus) {
  background-color: var(--cr-menu-background-focus-color);
        outline: none;
}

.item-wrapper {
  background: var(--cr-menu-background-sheen);
        outline: none;
        padding: 8px 0;
}

</style>
    <dialog id="dialog" part="dialog" on-close="onNativeDialogClose_" role="application" aria-roledescription$="[[roleDescription]]">
      <div id="wrapper" class="item-wrapper" role="menu" tabindex="-1">
        <slot id="contentNode"></slot>
      </div>
    </dialog>
<!--_html_template_end_-->`,is:"cr-action-menu",anchorElement_:null,boundClose_:null,hasMousemoveListener_:false,contentObserver_:null,resizeObserver_:null,lastConfig_:null,properties:{autoReposition:{type:Boolean,value:false},open:{type:Boolean,notify:true,value:false},roleDescription:String},listeners:{keydown:"onKeyDown_",mouseover:"onMouseover_",click:"onClick_"},detached(){this.removeListeners_()},getDialog(){return this.$.dialog},removeListeners_(){window.removeEventListener("resize",this.boundClose_);window.removeEventListener("popstate",this.boundClose_);if(this.contentObserver_){dom(this.$.contentNode).unobserveNodes(this.contentObserver_);this.contentObserver_=null}if(this.resizeObserver_){this.resizeObserver_.disconnect();this.resizeObserver_=null}},onNativeDialogClose_(e){if(e.target!==this.$.dialog){return}e.stopPropagation();this.fire("close")},onClick_(e){if(e.target===this){this.close();e.stopPropagation()}},onKeyDown_(e){e.stopPropagation();if(e.key==="Tab"||e.key==="Escape"){this.close();if(e.key==="Tab"){this.fire("tabkeyclose",{shiftKey:e.shiftKey})}e.preventDefault();return}if(e.key!=="Enter"&&e.key!=="ArrowUp"&&e.key!=="ArrowDown"){return}const options=Array.from(this.querySelectorAll(SELECTABLE_DROPDOWN_ITEM_QUERY));if(options.length===0){return}const focused=getDeepActiveElement();const index=options.findIndex((option=>FocusRow.getFocusableElement(option)===focused));if(e.key==="Enter"){if(index!==-1){return}if(isWindows||isMac){this.close();e.preventDefault();return}}e.preventDefault();this.updateFocus_(options,index,e.key!=="ArrowUp");if(!this.hasMousemoveListener_){this.hasMousemoveListener_=true;this.addEventListener("mousemove",(e=>{this.onMouseover_(e);this.hasMousemoveListener_=false}),{once:true})}},onMouseover_(e){const item=e.composedPath().find((el=>el.matches&&el.matches(SELECTABLE_DROPDOWN_ITEM_QUERY)));(item||this.$.wrapper).focus()},updateFocus_(options,focusedIndex,next){const numOptions=options.length;assert(numOptions>0);let index;if(focusedIndex===-1){index=next?0:numOptions-1}else{const delta=next?1:-1;index=(numOptions+focusedIndex+delta)%numOptions}options[index].focus()},close(){this.removeListeners_();this.$.dialog.close();this.open=false;if(this.anchorElement_){focusWithoutInk(assert(this.anchorElement_));this.anchorElement_=null}if(this.lastConfig_){this.lastConfig_=null}},showAt(anchorElement,opt_config){this.anchorElement_=anchorElement;this.anchorElement_.scrollIntoViewIfNeeded();const rect=this.anchorElement_.getBoundingClientRect();let height=rect.height;if(opt_config&&!opt_config.noOffset&&opt_config.anchorAlignmentY===AnchorAlignment.AFTER_END){height-=AFTER_END_OFFSET}this.showAtPosition(Object.assign({top:rect.top,left:rect.left,height:height,width:rect.width,anchorAlignmentX:AnchorAlignment.BEFORE_END},opt_config));this.$.wrapper.focus()},showAtPosition(config){const doc=document.scrollingElement;const scrollLeft=doc.scrollLeft;const scrollTop=doc.scrollTop;this.resetStyle_();this.$.dialog.showModal();this.open=true;config.top+=scrollTop;config.left+=scrollLeft;this.positionDialog_(Object.assign({minX:scrollLeft,minY:scrollTop,maxX:scrollLeft+doc.clientWidth,maxY:scrollTop+doc.clientHeight},config));doc.scrollTop=scrollTop;doc.scrollLeft=scrollLeft;this.addListeners_();const openedByKey=FocusOutlineManager.forDocument(document).visible;if(openedByKey){const firstSelectableItem=this.querySelector(SELECTABLE_DROPDOWN_ITEM_QUERY);if(firstSelectableItem){requestAnimationFrame((()=>{firstSelectableItem.focus()}))}}},resetStyle_(){this.$.dialog.style.left="";this.$.dialog.style.right="";this.$.dialog.style.top="0"},positionDialog_(config){this.lastConfig_=config;const c=Object.assign(getDefaultShowConfig(),config);const top=c.top;const left=c.left;const bottom=top+c.height;const right=left+c.width;const rtl=getComputedStyle(this).direction==="rtl";if(rtl){c.anchorAlignmentX*=-1}const offsetWidth=this.$.dialog.offsetWidth;const menuLeft=getStartPointWithAnchor(left,right,offsetWidth,c.anchorAlignmentX,c.minX,c.maxX);if(rtl){const menuRight=document.scrollingElement.clientWidth-menuLeft-offsetWidth;this.$.dialog.style.right=menuRight+"px"}else{this.$.dialog.style.left=menuLeft+"px"}const menuTop=getStartPointWithAnchor(top,bottom,this.$.dialog.offsetHeight,c.anchorAlignmentY,c.minY,c.maxY);this.$.dialog.style.top=menuTop+"px"},addListeners_(){this.boundClose_=this.boundClose_||function(){if(this.$.dialog.open){this.close()}}.bind(this);window.addEventListener("resize",this.boundClose_);window.addEventListener("popstate",this.boundClose_);this.contentObserver_=dom(this.$.contentNode).observeNodes((info=>{info.addedNodes.forEach((node=>{if(node.classList&&node.classList.contains(DROPDOWN_ITEM_CLASS)&&!node.getAttribute("role")){node.setAttribute("role","menuitem")}}))}));if(this.autoReposition){this.resizeObserver_=new ResizeObserver((()=>{if(this.lastConfig_){this.positionDialog_(this.lastConfig_);this.fire("cr-action-menu-repositioned")}}));this.resizeObserver_.observe(this.$.dialog)}}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><slot></slot>
<!--_html_template_end_-->`,is:"cr-lazy-render",child_:null,instance_:null,get(){if(!this.child_){this.render_()}return this.child_},getIfExists(){return this.child_},render_(){const template=this.getContentChildren()[0];const TemplateClass=templatize(template,this,{mutableData:false,forwardHostProp:this._forwardHostPropV2});const parentNode=this.parentNode;if(parentNode&&!this.child_){this.instance_=new TemplateClass;this.child_=this.instance_.root.firstElementChild;parentNode.insertBefore(this.instance_.root,this)}},_forwardHostPropV2(prop,value){if(this.instance_){this.instance_.forwardHostProp(prop,value)}}});// Copyright 2016 The Chromium Authors. All rights reserved.
function getSupportedScaleFactors(){const supportedScaleFactors=[];if(!isIOS){supportedScaleFactors.push(1)}if(!isIOS&&!isAndroid){supportedScaleFactors.push(2)}else{supportedScaleFactors.push(window.devicePixelRatio)}return supportedScaleFactors}function getUrlForCss(s){const s2=s.replace(/(\(|\)|\,|\s|\'|\"|\\)/g,"\\$1");return`url("${s2}")`}function getImageSet(path){const supportedScaleFactors=getSupportedScaleFactors();const replaceStartIndex=path.indexOf("SCALEFACTOR");if(replaceStartIndex<0){return getUrlForCss(path)}let s="";for(let i=0;i<supportedScaleFactors.length;++i){const scaleFactor=supportedScaleFactors[i];const pathWithScaleFactor=path.substr(0,replaceStartIndex)+scaleFactor+path.substr(replaceStartIndex+"scalefactor".length);s+=getUrlForCss(pathWithScaleFactor)+" "+scaleFactor+"x";if(i!==supportedScaleFactors.length-1){s+=", "}}return"-webkit-image-set("+s+")"}function getImage(path){const chromeThemePath="chrome://theme";const isChromeThemeUrl=path.slice(0,chromeThemePath.length)===chromeThemePath;return isChromeThemeUrl?getImageSet(path+"@SCALEFACTORx"):getUrlForCss(path)}function getBaseFaviconUrl(){const faviconUrl=new URL("chrome://favicon2/");faviconUrl.searchParams.set("size","16");faviconUrl.searchParams.set("scale_factor","SCALEFACTORx");return faviconUrl}function getFavicon(url){const faviconUrl=getBaseFaviconUrl();faviconUrl.searchParams.set("icon_url",url);return getImageSet(faviconUrl.toString())}function getFaviconForPageURL(url,isSyncedUrlForHistoryUi,remoteIconUrlForUma=""){const faviconUrl=getBaseFaviconUrl();faviconUrl.searchParams.set("page_url",url);const fallback=isSyncedUrlForHistoryUi?"1":"0";faviconUrl.searchParams.set("allow_google_server_fallback",fallback);if(isSyncedUrlForHistoryUi){faviconUrl.searchParams.set("icon_url",remoteIconUrlForUma)}return getImageSet(faviconUrl.toString())}// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({is:"site-favicon",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="site-favicon">:host {
  --site-favicon-height: 16px;
        --site-favicon-width: 16px;
}

#favicon {
  background-repeat: no-repeat;
        background-size: contain;
        border-radius: inherit;
        display: block;
        height: var(--site-favicon-height);
        width: var(--site-favicon-width);
}

</style>
    <div id="favicon" style="background-image: [[getBackgroundImage_(faviconUrl, url)]]">
    </div>
<!--_html_template_end_-->`,properties:{faviconUrl:String,url:String},getBackgroundImage_(){let backgroundImage=getFavicon("");if(this.faviconUrl){const url=this.ensureUrlHasScheme_(this.faviconUrl);backgroundImage=getFavicon(url)}else if(this.url){let url=this.removePatternWildcard_(this.url);url=this.ensureUrlHasScheme_(url);backgroundImage=getFaviconForPageURL(url||"",false)}return backgroundImage},removePatternWildcard_(pattern){if(!pattern||pattern.length===0){return pattern}if(pattern.startsWith("http://[*.]")){return pattern.replace("http://[*.]","http://")}else if(pattern.startsWith("https://[*.]")){return pattern.replace("https://[*.]","https://")}else if(pattern.startsWith("[*.]")){return pattern.substring(4,pattern.length)}return pattern},ensureUrlHasScheme_(url){if(!url||url.length===0){return url}return url.includes("://")?url:"http://"+url}});// Copyright 2017 The Chromium Authors. All rights reserved.
class FocusRowBehaviorDelegate{constructor(listItem){this.listItem_=listItem}onFocus(row,e){const element=e.path[0];const focusableElement=FocusRow.getFocusableElement(element);if(element!==focusableElement){focusableElement.focus()}this.listItem_.lastFocused=focusableElement}onKeydown(row,e){if(e.key==="Enter"){e.stopPropagation()}return false}getCustomEquivalent(sampleElement){return this.listItem_.overrideCustomEquivalent?this.listItem_.getCustomEquivalent(sampleElement):null}}class VirtualFocusRow extends FocusRow{constructor(root,delegate){super(root,null,delegate)}getCustomEquivalent(sampleElement){return this.delegate.getCustomEquivalent(sampleElement)||super.getCustomEquivalent(sampleElement)}}const FocusRowBehavior={properties:{row_:Object,mouseFocused_:Boolean,id:{type:String,reflectToAttribute:true},isFocused:{type:Boolean,notify:true},focusRowIndex:{type:Number,observer:"focusRowIndexChanged"},lastFocused:{type:Object,notify:true},ironListTabIndex:{type:Number,observer:"ironListTabIndexChanged_"},listBlurred:{type:Boolean,notify:true}},computeId_(index){return index!==undefined?`frb${index}`:undefined},focusRowIndexChanged(newIndex,oldIndex){this.setAttribute("aria-rowindex",newIndex+1);if(this.id===this.computeId_(oldIndex)){this.id=this.computeId_(newIndex)}},firstControl_:null,controlObservers_:[],attached(){this.classList.add("no-outline");afterNextRender(this,(function(){const rowContainer=this.root.querySelector("[focus-row-container]");assert(rowContainer);this.row_=new VirtualFocusRow(rowContainer,new FocusRowBehaviorDelegate(this));this.addItems_();this.listen(this,"focus","onFocus_");this.listen(this,"dom-change","addItems_");this.listen(this,"mousedown","onMouseDown_");this.listen(this,"blur","onBlur_")}))},detached(){this.unlisten(this,"focus","onFocus_");this.unlisten(this,"dom-change","addItems_");this.unlisten(this,"mousedown","onMouseDown_");this.unlisten(this,"blur","onBlur_");this.removeObservers_();if(this.firstControl_){this.unlisten(this.firstControl_,"keydown","onFirstControlKeydown_")}if(this.row_){this.row_.destroy()}},getFocusRow(){return assert(this.row_)},updateFirstControl_(){const newFirstControl=this.row_.getFirstFocusable();if(newFirstControl===this.firstControl_){return}if(this.firstControl_){this.unlisten(this.firstControl_,"keydown","onFirstControlKeydown_")}this.firstControl_=newFirstControl;if(this.firstControl_){this.listen(this.firstControl_,"keydown","onFirstControlKeydown_")}},removeObservers_(){if(this.controlObservers_.length>0){this.controlObservers_.forEach((observer=>{observer.disconnect()}))}this.controlObservers_=[]},addItems_(){this.ironListTabIndexChanged_();if(this.row_){this.removeObservers_();this.row_.destroy();const controls=this.root.querySelectorAll("[focus-row-control]");controls.forEach((control=>{this.row_.addItem(control.getAttribute("focus-type"),FocusRow.getFocusableElement(control));this.addMutationObservers_(assert(control))}));this.updateFirstControl_()}},createObserver_(){return new MutationObserver((mutations=>{const mutation=mutations[0];if(mutation.attributeName==="style"&&mutation.oldValue){const newStyle=window.getComputedStyle(mutation.target);const oldDisplayValue=mutation.oldValue.match(/^display:(.*)(?=;)/);const oldVisibilityValue=mutation.oldValue.match(/^visibility:(.*)(?=;)/);if(oldDisplayValue&&newStyle.display===oldDisplayValue[1].trim()&&oldVisibilityValue&&newStyle.visibility===oldVisibilityValue[1].trim()){return}}this.updateFirstControl_()}))},addMutationObservers_(control){let current=control;while(current&&current!==this.root){const currentObserver=this.createObserver_();currentObserver.observe(current,{attributes:true,attributeFilter:["hidden","disabled","style"],attributeOldValue:true});this.controlObservers_.push(currentObserver);current=current.parentNode}},onFocus_(e){if(this.mouseFocused_){this.mouseFocused_=false;return}const restoreFocusToFirst=this.listBlurred&&e.composedPath()[0]===this;if(this.lastFocused&&!restoreFocusToFirst){focusWithoutInk(this.row_.getEquivalentElement(this.lastFocused))}else{const firstFocusable=assert(this.firstControl_);focusWithoutInk(firstFocusable)}this.listBlurred=false;this.isFocused=true},onFirstControlKeydown_(e){if(e.shiftKey&&e.key==="Tab"){this.focus()}},ironListTabIndexChanged_(){if(this.row_){this.row_.makeActive(this.ironListTabIndex===0)}if(this.ironListTabIndex===0){this.listBlurred=false}},onMouseDown_(){this.mouseFocused_=true},onBlur_(e){this.mouseFocused_=false;this.isFocused=false;const node=e.relatedTarget?e.relatedTarget:null;if(!this.parentNode.contains(node)){this.listBlurred=true}}};// Copyright 2017 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-toast">:host {
  --cr-toast-background: #323232;
        --cr-toast-button-color: var(--google-blue-300);
        --cr-toast-text-color: #fff;
}

@media (prefers-color-scheme: dark) {
:host {
  --cr-toast-background: var(--google-grey-900)
              linear-gradient(rgba(255, 255, 255, .06), rgba(255, 255, 255, .06));
          --cr-toast-button-color: var(--google-blue-refresh-300);
          --cr-toast-text-color: var(--google-grey-200);
}

}

:host {
  align-items: center;
        background: var(--cr-toast-background);
        border-radius: 4px;
        bottom: 0;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.28);
        box-sizing: border-box;
        display: flex;
        margin: 24px;
        max-width: 568px;
        min-height: 52px;
        min-width: 288px;
        opacity: 0;
        padding: 0 24px;
        position: fixed;
        transform: translateY(100px);
        transition: opacity 300ms, transform 300ms;
        visibility: hidden;
        z-index: 1;
}

:host-context([dir=ltr]) {
  left: 0;
}

:host-context([dir=rtl]) {
  right: 0;
}

:host([open]) {
  opacity: 1;
        transform: translateY(0);
        visibility: visible;
}

:host ::slotted(*) {
  color: var(--cr-toast-text-color);
}

:host ::slotted(cr-button) {
  background-color: transparent !important;
        border: none !important;
        color: var(--cr-toast-button-color) !important;
        margin-inline-start: 32px !important;
        min-width: 52px !important;
        padding: 8px !important;
}

:host ::slotted(cr-button:hover) {
  background-color: transparent !important;
}

</style>
    <slot></slot>
<!--_html_template_end_-->`,is:"cr-toast",properties:{duration:{type:Number,value:0},open:{readOnly:true,type:Boolean,value:false,reflectToAttribute:true}},observers:["resetAutoHide_(duration, open)"],hideTimeoutId_:null,resetAutoHide_(){if(this.hideTimeoutId_!==null){window.clearTimeout(this.hideTimeoutId_);this.hideTimeoutId_=null}if(this.open&&this.duration!==0){this.hideTimeoutId_=window.setTimeout((()=>{this.hide()}),this.duration)}},show(){const shouldResetAutohide=this.open;this.removeAttribute("role");this.removeAttribute("aria-hidden");this._setOpen(true);this.setAttribute("role","alert");if(shouldResetAutohide){this.resetAutoHide_()}},hide(){this.setAttribute("aria-hidden","true");this._setOpen(false)}});// Copyright 2016 The Chromium Authors. All rights reserved.
class ProfileInfoBrowserProxyImpl{getProfileInfo(){return sendWithPromise("getProfileInfo")}getProfileStatsCount(){chrome.send("getProfileStatsCount")}}addSingletonGetter(ProfileInfoBrowserProxyImpl);// Copyright 2016 The Chromium Authors. All rights reserved.
let StoredAccount;let SyncStatus;const StatusAction={NO_ACTION:"noAction",REAUTHENTICATE:"reauthenticate",SIGNOUT_AND_SIGNIN:"signOutAndSignIn",UPGRADE_CLIENT:"upgradeClient",ENTER_PASSPHRASE:"enterPassphrase",RETRIEVE_TRUSTED_VAULT_KEYS:"retrieveTrustedVaultKeys",CONFIRM_SYNC_SETTINGS:"confirmSyncSettings"};const PageStatus={SPINNER:"spinner",CONFIGURE:"configure",DONE:"done",PASSPHRASE_FAILED:"passphraseFailed"};const PROMO_IMPRESSION_COUNT_KEY="signin-promo-count";class SyncBrowserProxy{startSignIn(){}signOut(deleteProfile){}pauseSync(){}getPromoImpressionCount(){}incrementPromoImpressionCount(){}startKeyRetrieval(){}getSyncStatus(){}getStoredAccounts(){}didNavigateToSyncPage(){}didNavigateAwayFromSyncPage(didAbort){}setSyncDatatypes(syncPrefs){}setEncryptionPassphrase(passphrase){}setDecryptionPassphrase(passphrase){}startSyncingWithEmail(email,isDefaultPromoAccount){}openActivityControlsUrl(){}sendSyncPrefsChanged(){}}class SyncBrowserProxyImpl{startSignIn(){chrome.send("SyncSetupStartSignIn")}signOut(deleteProfile){chrome.send("SyncSetupSignout",[deleteProfile])}pauseSync(){chrome.send("SyncSetupPauseSync")}getPromoImpressionCount(){return parseInt(window.localStorage.getItem(PROMO_IMPRESSION_COUNT_KEY),10)||0}incrementPromoImpressionCount(){window.localStorage.setItem(PROMO_IMPRESSION_COUNT_KEY,(this.getPromoImpressionCount()+1).toString())}startKeyRetrieval(){chrome.send("SyncStartKeyRetrieval")}getSyncStatus(){return sendWithPromise("SyncSetupGetSyncStatus")}getStoredAccounts(){return sendWithPromise("SyncSetupGetStoredAccounts")}didNavigateToSyncPage(){chrome.send("SyncSetupShowSetupUI")}didNavigateAwayFromSyncPage(didAbort){chrome.send("SyncSetupDidClosePage",[didAbort])}setSyncDatatypes(syncPrefs){return sendWithPromise("SyncSetupSetDatatypes",JSON.stringify(syncPrefs))}setEncryptionPassphrase(passphrase){return sendWithPromise("SyncSetupSetEncryptionPassphrase",passphrase)}setDecryptionPassphrase(passphrase){return sendWithPromise("SyncSetupSetDecryptionPassphrase",passphrase)}startSyncingWithEmail(email,isDefaultPromoAccount){chrome.send("SyncSetupStartSyncingWithEmail",[email,isDefaultPromoAccount])}openActivityControlsUrl(){chrome.metricsPrivate.recordUserAction("Signin_AccountSettings_GoogleActivityControlsClicked")}sendSyncPrefsChanged(){chrome.send("SyncPrefsDispatch")}}addSingletonGetter(SyncBrowserProxyImpl);// Copyright 2018 The Chromium Authors. All rights reserved.
const MAX_SIGNIN_PROMO_IMPRESSION=10;Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared" scope="settings-sync-account-control">:host {
  --shown-avatar-size: 40px;
        --sync-icon-border-size: 2px;
        --sync-icon-size: 16px;
}

.account-icon {
  border-radius: 20px;
        flex-shrink: 0;
        height: var(--shown-avatar-size);
        width: var(--shown-avatar-size);
}

.account-icon.small {
  height: 20px;
        width: 20px;
}

#menu .dropdown-item {
  padding: 12px;
}

#menu .dropdown-item span {
  margin-inline-start: 8px;
}

.flex {
  display: flex;
        flex: 1;
        flex-direction: column;
}

#avatar-container {
  height: var(--shown-avatar-size);
        position: relative;
}

#sync-icon-container {
  align-items: center;
        background: var(--google-green-700);
        border: var(--sync-icon-border-size) solid white;
        border-radius: 50%;
        display: flex;
        height: var(--sync-icon-size);
        position: absolute;
        right: -6px;
        top: calc(var(--shown-avatar-size) - var(--sync-icon-size) -
            var(--sync-icon-border-size));
        width: var(--sync-icon-size);
}

:host-context([dir='rtl']) #sync-icon-container {
  left: -6px;
        right: initial;
}

@media (prefers-color-scheme: dark) {
#sync-icon-container {
  background: var(--google-green-refresh-300);
          border-color: var(--google-grey-900);
}

}

#sync-icon-container.sync-problem {
  background: var(--settings-error-color);
}

#sync-icon-container.sync-paused {
  background: var(--google-blue-500);
}

@media (prefers-color-scheme: dark) {
#sync-icon-container.sync-paused {
  background: var(--google-blue-refresh-300);
}

}

#sync-icon-container.sync-disabled {
  background: var(--google-grey-400);
}

@media (prefers-color-scheme: dark) {
#sync-icon-container.sync-disabled {
  background: var(--google-grey-refresh-500);
}

}

#sync-icon-container iron-icon {
  fill: white;  
        height: 12px;
        margin: auto;
        width: 12px;
}

#sign-in {
  min-width: 100px;
}

#banner {
  background: url(chrome://settings/images/sync_banner.svg) no-repeat;
        background-size: 100% auto;
        display: none;
        padding-top: calc(120 / 680 * 100%);
}

@media (prefers-color-scheme: dark) {
#banner {
  background-image: url(chrome://settings/images/sync_banner_dark.svg);
}

}

:host([showing-promo]) #banner {
  display: block;
}

</style>
    <!-- TODO(jamescook): Show the promo on Chrome OS if the user is signed-in
         but has sync disabled. -->
    <div id="banner" hidden="[[syncStatus.signedIn]]" part="banner"></div>
    <div class="cr-row first" id="promo-header" hidden="[[syncStatus.signedIn]]">
      <div class="flex cr-padded-text">
        <div id="promo-title" part="title">
          [[getLabel_(promoLabelWithAccount,
              promoLabelWithNoAccount, shownAccount_)]]
        </div>
        <div class="secondary">[[subLabel_]]</div>
      </div>
      <cr-button class="action-button cr-button-gap" on-click="onSigninTap_" id="sign-in" disabled="[[shouldDisableSyncButton_(showSetupButtons_,
                  syncStatus.firstSetupInProgress,
                  prefs.signin.allowed_on_next_startup.value)]]" hidden="[[shouldShowAvatarRow_]]">
        تفعيل المزامنة…
      </cr-button>
    </div>
    <template is="dom-if" if="[[shouldShowAvatarRow_]]">
      <div class="cr-row first two-line" id="avatar-row">
        <div id="avatar-container">
          <img class="account-icon" alt="" src="[[getAccountImageSrc_(shownAccount_.avatarImage)]]">
          <div id="sync-icon-container" hidden="[[!syncStatus.signedIn]]" class$="[[getSyncIconStyle_(
                  syncStatus.hasError, syncStatus.statusAction,
                  syncStatus.disabled)]]">
            <iron-icon icon$="[[getSyncIcon_(
                syncStatus.hasError, syncStatus.statusAction,
                syncStatus.disabled)]]"></iron-icon>
          </div>
        </div>
        <div class="cr-row-gap cr-padded-text flex no-min-width" id="user-info">
          <div class="text-elide">
            [[getAvatarRowTitle_(shownAccount_.fullName,
                'المزامنة لا تعمل',
                'حدث خطأ أثناء مزامنة كلمات المرور',
                'تم إيقاف المزامنة مؤقتًا',
                'تم إيقاف المزامنة.', syncStatus.hasError,
                syncStatus.statusAction, syncStatus.disabled)]]
          </div>
          <div class="secondary text-elide">
            [[getAccountLabel_(
                'المزامنة مع $1', shownAccount_.email,
                syncStatus.hasError, syncStatus.signedIn,
                syncStatus.disabled, syncStatus.firstSetupInProgress)]]
          </div>
        </div>
<!-- Chrome OS does not allow switching users for sync. -->

        <cr-icon-button class="icon-arrow-dropdown cr-button-gap" hidden="[[syncStatus.signedIn]]" on-click="onMenuButtonTap_" id="dropdown-arrow" aria-label="استخدام حساب آخر">
        </cr-icon-button>
        <div class="separator" hidden="[[syncStatus.signedIn]]"></div>

        <cr-button id="sync-button" class="action-button cr-button-gap" hidden="[[syncStatus.signedIn]]" on-click="onSyncButtonTap_" disabled="[[shouldDisableSyncButton_(showSetupButtons_,
                    syncStatus.firstSetupInProgress,
                    prefs.signin.allowed_on_next_startup.value)]]">
          تفعيل المزامنة…
        </cr-button>
        <cr-button id="turn-off" class="cr-button-gap" hidden="[[!shouldShowTurnOffButton_(syncStatus.signedIn,
                syncStatus.domain, showSetupButtons_)]]" on-click="onTurnOffButtonTap_" disabled="[[syncStatus.firstSetupInProgress]]">
          إيقاف
        </cr-button>
        <cr-button id="sync-error-button" class="action-button cr-button-gap" hidden="[[!shouldShowErrorActionButton_(syncStatus,
                showSetupButtons_)]]" on-click="onErrorButtonTap_" disabled="[[syncStatus.firstSetupInProgress]]">
          [[syncStatus.statusActionText]]
        </cr-button>
        <div id="setup-buttons" hidden="[[!showSetupButtons_]]" class="cr-button-gap">
          <cr-button on-click="onSetupCancel_">إلغاء</cr-button>
          <cr-button class="action-button cr-button-gap" on-click="onSetupConfirm_">
            التأكيد
          </cr-button>
        </div>
      </div>
<!-- Chrome OS does not allow switching users for sync. -->

      <template is="dom-if" if="[[!syncStatus.signedIn]]" restamp="">
        <cr-action-menu id="menu" auto-reposition="" role-description="قائمة">
          <template is="dom-repeat" items="[[storedAccounts_]]">
            <button class="dropdown-item" on-click="onAccountTap_">
              <img class="account-icon small" alt="" src="[[getAccountImageSrc_(item.avatarImage)]]">
              <span>[[item.email]]</span>
            </button>
          </template>
          <button class="dropdown-item" on-click="onSigninTap_" disabled="[[syncStatus.firstSetupInProgress]]" id="sign-in-item">
            <img class="account-icon small" alt="" src="chrome://theme/IDR_PROFILE_AVATAR_PLACEHOLDER_LARGE">
            <span>استخدام حساب آخر</span>
          </button>
          <button class="dropdown-item" on-click="onSignoutTap_" disabled="[[syncStatus.firstSetupInProgress]]" id="sign-out-item">
            <iron-icon icon="settings:exit-to-app"></iron-icon>
            <span>تسجيل الخروج</span>
          </button>
        </cr-action-menu>
      </template>

    </template>
<!--_html_template_end_-->`,is:"settings-sync-account-control",behaviors:[WebUIListenerBehavior,PrefsBehavior],properties:{prefs:{type:Object,notify:true},syncStatus:Object,promoLabelWithAccount:String,promoLabelWithNoAccount:String,promoSecondaryLabelWithAccount:String,promoSecondaryLabelWithNoAccount:String,signedIn_:{type:Boolean,computed:"computeSignedIn_(syncStatus.signedIn)",observer:"onSignedInChanged_"},storedAccounts_:Object,shownAccount_:Object,showingPromo:{type:Boolean,value:false,reflectToAttribute:true},embeddedInSubpage:{type:Boolean,reflectToAttribute:true},hideButtons:{type:Boolean,value:false,reflectToAttribute:true},shouldShowAvatarRow_:{type:Boolean,value:false,computed:"computeShouldShowAvatarRow_(storedAccounts_, syncStatus,"+"storedAccounts_.length, syncStatus.signedIn)",observer:"onShouldShowAvatarRowChange_"},subLabel_:{type:String,computed:"computeSubLabel_(promoSecondaryLabelWithAccount,"+"promoSecondaryLabelWithNoAccount, shownAccount_)"},showSetupButtons_:{type:Boolean,computed:"computeShowSetupButtons_("+"hideButtons, syncStatus.firstSetupInProgress)"}},observers:["onShownAccountShouldChange_(storedAccounts_, syncStatus)"],syncBrowserProxy_:null,created(){this.syncBrowserProxy_=SyncBrowserProxyImpl.getInstance()},attached(){this.syncBrowserProxy_.getStoredAccounts().then(this.handleStoredAccounts_.bind(this));this.addWebUIListener("stored-accounts-updated",this.handleStoredAccounts_.bind(this))},recordImpressionUserActions_(){assert(!this.syncStatus.signedIn);assert(this.shownAccount_!==undefined);chrome.metricsPrivate.recordUserAction("Signin_Impression_FromSettings");if(this.shownAccount_){chrome.metricsPrivate.recordUserAction("Signin_ImpressionWithAccount_FromSettings")}else{chrome.metricsPrivate.recordUserAction("Signin_ImpressionWithNoAccount_FromSettings")}},computeSignedIn_(){return!!this.syncStatus&&!!this.syncStatus.signedIn},onSignedInChanged_(){if(this.embeddedInSubpage){this.showingPromo=true;return}if(!this.showingPromo&&!this.syncStatus.signedIn&&this.syncBrowserProxy_.getPromoImpressionCount()<MAX_SIGNIN_PROMO_IMPRESSION){this.showingPromo=true;this.syncBrowserProxy_.incrementPromoImpressionCount()}else{this.showingPromo=false}if(!this.syncStatus.signedIn&&this.shownAccount_!==undefined){this.recordImpressionUserActions_()}},getLabel_(labelWithAccount,labelWithNoAccount){return this.shownAccount_?labelWithAccount:labelWithNoAccount},computeSubLabel_(){return this.getLabel_(this.promoSecondaryLabelWithAccount,this.promoSecondaryLabelWithNoAccount)},getSubstituteLabel_(label,name){return loadTimeData.substituteString(label,name)},getAccountLabel_(label,account){if(this.syncStatus.firstSetupInProgress){return this.syncStatus.statusText||account}return this.syncStatus.signedIn&&!this.syncStatus.hasError&&!this.syncStatus.disabled?loadTimeData.substituteString(label,account):account},getAccountImageSrc_(image){return image||"chrome://theme/IDR_PROFILE_AVATAR_PLACEHOLDER_LARGE"},getSyncIconStyle_(){if(this.syncStatus.disabled){return"sync-disabled"}if(!this.syncStatus.hasError){return"sync"}if(this.syncStatus.hasUnrecoverableError){return"sync-problem"}if(this.syncStatus.statusAction===StatusAction.REAUTHENTICATE){return"sync-paused"}return"sync-problem"},getSyncIcon_(){switch(this.getSyncIconStyle_()){case"sync-problem":return"settings:sync-problem";case"sync-paused":return"settings:sync-disabled";default:return"cr:sync"}},getAvatarRowTitle_(accountName,syncErrorLabel,syncPasswordsOnlyErrorLabel,authErrorLabel,disabledLabel){if(this.syncStatus.disabled){return disabledLabel}if(!this.syncStatus.hasError){return accountName}if(this.syncStatus.hasUnrecoverableError){return syncErrorLabel}if(this.syncStatus.statusAction===StatusAction.REAUTHENTICATE){return authErrorLabel}if(this.syncStatus.hasPasswordsOnlyError){return syncPasswordsOnlyErrorLabel}return syncErrorLabel},shouldDisableSyncButton_(){if(this.hideButtons||this.prefs===undefined){return this.computeShowSetupButtons_()}return!!this.syncStatus.firstSetupInProgress||!this.getPref("signin.allowed_on_next_startup").value},shouldShowTurnOffButton_(){return!this.hideButtons&&!this.showSetupButtons_&&!!this.syncStatus.signedIn},shouldShowErrorActionButton_(){if(this.embeddedInSubpage&&this.syncStatus.statusAction===StatusAction.ENTER_PASSPHRASE){return false}return!this.hideButtons&&!this.showSetupButtons_&&!!this.syncStatus.signedIn&&!!this.syncStatus.hasError&&this.syncStatus.statusAction!==StatusAction.NO_ACTION},handleStoredAccounts_(accounts){this.storedAccounts_=accounts},computeShouldShowAvatarRow_(){if(this.storedAccounts_===undefined||this.syncStatus===undefined){return false}return this.syncStatus.signedIn||this.storedAccounts_.length>0},onErrorButtonTap_(){const router=Router.getInstance();const routes=router.getRoutes();switch(this.syncStatus.statusAction){case StatusAction.REAUTHENTICATE:this.syncBrowserProxy_.startSignIn();break;case StatusAction.SIGNOUT_AND_SIGNIN:if(this.syncStatus.domain){router.navigateTo(routes.SIGN_OUT)}else{this.syncBrowserProxy_.signOut(false);this.syncBrowserProxy_.startSignIn()}break;case StatusAction.UPGRADE_CLIENT:router.navigateTo(router.getRoutes().ABOUT);break;case StatusAction.RETRIEVE_TRUSTED_VAULT_KEYS:this.syncBrowserProxy_.startKeyRetrieval();break;case StatusAction.ENTER_PASSPHRASE:case StatusAction.CONFIRM_SYNC_SETTINGS:default:router.navigateTo(router.getRoutes().SYNC)}},onSigninTap_(){this.syncBrowserProxy_.startSignIn();if(this.$$("#menu")){this.$$("#menu").close()}},onSignoutTap_(){this.syncBrowserProxy_.signOut(false);this.$$("#menu").close()},onSyncButtonTap_(){assert(this.shownAccount_);assert(this.storedAccounts_.length>0);const isDefaultPromoAccount=this.shownAccount_.email===this.storedAccounts_[0].email;this.syncBrowserProxy_.startSyncingWithEmail(this.shownAccount_.email,isDefaultPromoAccount)},onTurnOffButtonTap_(){const router=Router.getInstance();router.navigateTo(router.getRoutes().SIGN_OUT)},onMenuButtonTap_(){const actionMenu=this.$$("#menu");actionMenu.showAt(assert(this.$$("#dropdown-arrow")))},onShouldShowAvatarRowChange_(){const actionMenu=this.$$("#menu");if(!this.shouldShowAvatarRow_&&actionMenu&&actionMenu.open){actionMenu.close()}},onAccountTap_(e){this.shownAccount_=e.model.item;this.$$("#menu").close()},onShownAccountShouldChange_(){if(this.storedAccounts_===undefined||this.syncStatus===undefined){return}if(this.syncStatus.signedIn){for(let i=0;i<this.storedAccounts_.length;i++){if(this.storedAccounts_[i].email===this.syncStatus.signedInUsername){this.shownAccount_=this.storedAccounts_[i];return}}}else{const firstStoredAccount=this.storedAccounts_.length>0?this.storedAccounts_[0]:null;const shouldRecordImpression=this.shownAccount_===undefined||!this.shownAccount_&&firstStoredAccount||this.shownAccount_&&!firstStoredAccount;this.shownAccount_=firstStoredAccount;if(shouldRecordImpression){this.recordImpressionUserActions_()}}},computeShowSetupButtons_(){return!this.hideButtons&&!!this.syncStatus.firstSetupInProgress},onSetupCancel_(){this.fire("sync-setup-done",false)},onSetupConfirm_(){this.fire("sync-setup-done",true)}});// Copyright 2016 The Chromium Authors. All rights reserved.
class ResetBrowserProxyImpl{performResetProfileSettings(sendSettings,requestOrigin){return sendWithPromise("performResetProfileSettings",sendSettings,requestOrigin)}onHideResetProfileDialog(){chrome.send("onHideResetProfileDialog")}onHideResetProfileBanner(){chrome.send("onHideResetProfileBanner")}onShowResetProfileDialog(){chrome.send("onShowResetProfileDialog")}showReportedSettings(){sendWithPromise("getReportedSettings").then((function(settings){const output=settings.map((function(entry){return entry.key+": "+entry.value.replace(/\n/g,", ")}));const win=window.open("about:blank");const div=win.document.createElement("div");div.textContent=output.join("\n");div.style.whiteSpace="pre";win.document.body.appendChild(div)}))}getTriggeredResetToolName(){return sendWithPromise("getTriggeredResetToolName")}}addSingletonGetter(ResetBrowserProxyImpl);// Copyright 2016 The Chromium Authors. All rights reserved.
let SearchEngine;let SearchEnginesInfo;class SearchEnginesBrowserProxy{setDefaultSearchEngine(modelIndex){}removeSearchEngine(modelIndex){}searchEngineEditStarted(modelIndex){}searchEngineEditCancelled(){}searchEngineEditCompleted(searchEngine,keyword,queryUrl){}getSearchEnginesList(){}validateSearchEngineInput(fieldName,fieldValue){}}class SearchEnginesBrowserProxyImpl{setDefaultSearchEngine(modelIndex){chrome.send("setDefaultSearchEngine",[modelIndex])}removeSearchEngine(modelIndex){chrome.send("removeSearchEngine",[modelIndex])}searchEngineEditStarted(modelIndex){chrome.send("searchEngineEditStarted",[modelIndex])}searchEngineEditCancelled(){chrome.send("searchEngineEditCancelled")}searchEngineEditCompleted(searchEngine,keyword,queryUrl){chrome.send("searchEngineEditCompleted",[searchEngine,keyword,queryUrl])}getSearchEnginesList(){return sendWithPromise("getSearchEnginesList")}validateSearchEngineInput(fieldName,fieldValue){return sendWithPromise("validateSearchEngineInput",fieldName,fieldValue)}}addSingletonGetter(SearchEnginesBrowserProxyImpl);// Copyright 2016 The Chromium Authors. All rights reserved.
var PromiseResolver=class{constructor(){this.resolve_;this.reject_;this.isFulfilled_=false;this.promise_=new Promise(((resolve,reject)=>{this.resolve_=resolution=>{resolve(resolution);this.isFulfilled_=true};this.reject_=reason=>{reject(reason);this.isFulfilled_=true}}))}get isFulfilled(){return this.isFulfilled_}set isFulfilled(i){assertNotReached()}get promise(){return this.promise_}set promise(p){assertNotReached()}get resolve(){return this.resolve_}set resolve(r){assertNotReached()}get reject(){return this.reject_}set reject(s){assertNotReached()}};// Copyright 2016 The Chromium Authors. All rights reserved.
let scrollTargetResolver=new PromiseResolver;const GlobalScrollTargetBehaviorImpl={properties:{scrollTarget:{type:Object,readOnly:true},subpageScrollTarget:{type:Object,computed:"getActiveTarget_(scrollTarget, active_)"},subpageRoute:Object,active_:Boolean},attached(){this.active_=Router.getInstance().getCurrentRoute()===this.subpageRoute;scrollTargetResolver.promise.then(this._setScrollTarget.bind(this))},currentRouteChanged(route){if(route===this.subpageRoute){this.active_=true}else{setTimeout((()=>{this.active_=false}))}},getActiveTarget_(target,active){if(target===undefined||active===undefined){return undefined}return active?target:null}};function setGlobalScrollTarget(scrollTarget){scrollTargetResolver.resolve(scrollTarget)}function resetGlobalScrollTargetForTesting(){scrollTargetResolver=new PromiseResolver}const GlobalScrollTargetBehavior=[RouteObserverBehavior,GlobalScrollTargetBehaviorImpl];// Copyright 2020 The Chromium Authors. All rights reserved.
class MultiStoreIdHandler{constructor(){this.deviceId_=null;this.accountId_=null}getAnyId(){if(this.deviceId_!==null){return this.deviceId_}if(this.accountId_!==null){return this.accountId_}assertNotReached();return 0}isPresentInAccount(){return this.accountId_!==null}isPresentOnDevice(){return this.deviceId_!==null}get deviceId(){return this.deviceId_}get accountId(){return this.accountId_}setId(id,fromAccountStore){if(fromAccountStore){this.accountId_=id}else{this.deviceId_=id}}}// Copyright 2020 The Chromium Authors. All rights reserved.
class MultiStoreExceptionEntry extends MultiStoreIdHandler{constructor(entry){super();this.urls_=entry.urls;this.setId(entry.id,entry.fromAccountStore)}mergeInPlace(otherEntry){const alreadyHasCopyFromStore=this.isPresentInAccount()&&otherEntry.fromAccountStore||this.isPresentOnDevice()&&!otherEntry.fromAccountStore;if(alreadyHasCopyFromStore){return false}if(JSON.stringify(this.urls_)!==JSON.stringify(otherEntry.urls)){return false}this.setId(otherEntry.id,otherEntry.fromAccountStore);return true}get urls(){return this.urls_}}// Copyright 2020 The Chromium Authors. All rights reserved.
class MultiStorePasswordUiEntry extends MultiStoreIdHandler{constructor(entry){super();this.contents_=MultiStorePasswordUiEntry.getContents_(entry);this.password_="";this.setId(entry.id,entry.fromAccountStore)}mergeInPlace(otherEntry){const alreadyHasCopyFromStore=this.isPresentInAccount()&&otherEntry.fromAccountStore||this.isPresentOnDevice()&&!otherEntry.fromAccountStore;if(alreadyHasCopyFromStore){return false}if(JSON.stringify(this.contents_)!==JSON.stringify(MultiStorePasswordUiEntry.getContents_(otherEntry))){return false}this.setId(otherEntry.id,otherEntry.fromAccountStore);return true}get urls(){return this.contents_.urls}get username(){return this.contents_.username}get password(){return this.password_}set password(password){this.password_=password}get federationText(){return this.contents_.federationText}static getContents_(entry){return{urls:entry.urls,username:entry.username,federationText:entry.federationText}}}export{OpenWindowProxy as $,IronA11yAnnouncer as A,FocusOutlineManager as B,CrSearchFieldBehavior as C,IronSelectableBehavior as D,CrContainerShadowBehavior as E,FocusRowBehavior as F,FindShortcutBehavior as G,pageVisibility as H,I18nBehavior as I,setGlobalScrollTarget as J,resetGlobalScrollTargetForTesting as K,LifetimeBrowserProxyImpl as L,MetricsBrowserProxyImpl as M,NotificationSetting as N,OpenWindowProxyImpl as O,PrefControlBehavior as P,PluralStringProxyImpl as Q,Router as R,SiteSettingsPrefsBrowserProxyImpl as S,MultiStoreExceptionEntry as T,MultiStorePasswordUiEntry as U,ExtensionControlBrowserProxyImpl as V,WebUIListenerBehavior as W,LifetimeBrowserProxy as X,MetricsBrowserProxy as Y,PrivacyElementInteractions as Z,SafeBrowsingInteractions as _,assertNotReached as a,setPageVisibilityForTesting as a0,MAX_SIGNIN_PROMO_IMPRESSION as a1,PageStatus as a2,StatusAction as a3,StoredAccount as a4,SyncBrowserProxy as a5,SyncStatus as a6,prefToString as a7,stringToPrefValue as a8,CrSettingsPrefs as a9,SiteSettingSource as aA,ContentSettingProvider as aB,hasKeyModifiers as aC,ChromeCleanupProxy as aD,CookieControlsMode as aE,kControlledByLookup as aF,DefaultContentSetting as aG,RawChooserException as aH,RawSiteException as aI,RecentSitePermissions as aJ,SiteException as aK,SiteGroup as aL,SiteSettingsPrefsBrowserProxy as aM,ZoomLevelEntry as aN,MetricsReporting as aa,PrivacyPageBrowserProxy as ab,ResolverOption as ac,SecureDnsMode as ad,SecureDnsSetting as ae,SecureDnsUiManagementMode as af,buildRouter as ag,Route as ah,SearchEngine as ai,SearchEnginesBrowserProxy as aj,SearchEnginesInfo as ak,PaperRippleBehavior as al,EventTracker as am,IronA11yKeysBehavior as an,GlobalScrollTargetBehavior as ao,getDeepActiveElement as ap,SettingsBooleanControlBehavior as aq,AnchorAlignment as ar,SiteSettingsBehavior as as,SITE_EXCEPTION_WILDCARD as at,ContentSetting as au,INVALID_CATEGORY_SUBTYPE as av,AllSitesAction2 as aw,SortMethod as ax,GlobalScrollTargetBehaviorImpl as ay,ALL_SITES_DIALOG as az,assert as b,CrPolicyPrefBehavior as c,PrefsBehavior as d,RouteObserverBehavior as e,ContentSettingsTypes as f,ChooserType as g,PrivacyPageBrowserProxyImpl as h,focusWithoutInk as i,SafetyCheckInteractions as j,PasswordManagerImpl as k,listenOnce as l,PasswordManagerProxy as m,ChromeCleanupProxyImpl as n,PasswordCheckBehavior as o,parseHtmlSubset as p,CrScrollableBehavior as q,routes as r,CrPolicyIndicatorBehavior as s,ProfileInfoBrowserProxyImpl as t,SyncBrowserProxyImpl as u,getImage as v,ResetBrowserProxyImpl as w,SearchEnginesBrowserProxyImpl as x,PromiseResolver as y,findAncestor as z};