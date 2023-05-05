import{Polymer,html,flush,templatize,DomIf,beforeNextRender}from"chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";import{a as assertNotReached,l as listenOnce,C as CrSearchFieldBehavior,I as I18nBehavior,W as WebUIListenerBehavior,b as assert,L as LifetimeBrowserProxyImpl,R as Router,p as parseHtmlSubset,c as CrPolicyPrefBehavior,P as PrefControlBehavior,r as routes,d as PrefsBehavior,e as RouteObserverBehavior,N as NotificationSetting,f as ContentSettingsTypes,g as ChooserType,h as PrivacyPageBrowserProxyImpl,M as MetricsBrowserProxyImpl,S as SiteSettingsPrefsBrowserProxyImpl,i as focusWithoutInk,j as SafetyCheckInteractions,O as OpenWindowProxyImpl,k as PasswordManagerImpl,m as PasswordManagerProxy,n as ChromeCleanupProxyImpl,o as PasswordCheckBehavior,F as FocusRowBehavior,q as CrScrollableBehavior,s as CrPolicyIndicatorBehavior,t as ProfileInfoBrowserProxyImpl,u as SyncBrowserProxyImpl,v as getImage,w as ResetBrowserProxyImpl,x as SearchEnginesBrowserProxyImpl,y as PromiseResolver,z as findAncestor,A as IronA11yAnnouncer,B as FocusOutlineManager,D as IronSelectableBehavior,E as CrContainerShadowBehavior,G as FindShortcutBehavior,H as pageVisibility,J as setGlobalScrollTarget,K as resetGlobalScrollTargetForTesting}from"./shared.rollup.js";export{a9 as CrSettingsPrefs,V as ExtensionControlBrowserProxyImpl,X as LifetimeBrowserProxy,L as LifetimeBrowserProxyImpl,a1 as MAX_SIGNIN_PROMO_IMPRESSION,Y as MetricsBrowserProxy,M as MetricsBrowserProxyImpl,aa as MetricsReporting,T as MultiStoreExceptionEntry,U as MultiStorePasswordUiEntry,$ as OpenWindowProxy,O as OpenWindowProxyImpl,a2 as PageStatus,k as PasswordManagerImpl,m as PasswordManagerProxy,Z as PrivacyElementInteractions,ab as PrivacyPageBrowserProxy,h as PrivacyPageBrowserProxyImpl,t as ProfileInfoBrowserProxyImpl,w as ResetBrowserProxyImpl,ac as ResolverOption,ah as Route,R as Router,_ as SafeBrowsingInteractions,j as SafetyCheckInteractions,ai as SearchEngine,aj as SearchEnginesBrowserProxy,x as SearchEnginesBrowserProxyImpl,ak as SearchEnginesInfo,ad as SecureDnsMode,ae as SecureDnsSetting,af as SecureDnsUiManagementMode,Q as SettingsPluralStringProxyImpl,a3 as StatusAction,a4 as StoredAccount,a5 as SyncBrowserProxy,u as SyncBrowserProxyImpl,a6 as SyncStatus,ag as buildRouter,H as pageVisibility,a7 as prefToString,r as routes,a0 as setPageVisibilityForTesting,a8 as stringToPrefValue}from"./shared.rollup.js";import{addSingletonGetter,sendWithPromise,isChromeOS,addWebUIListener}from"chrome://resources/js/cr.m.js";import{loadTimeData}from"chrome://resources/js/load_time_data.m.js";export{loadTimeData}from"chrome://resources/js/load_time_data.m.js";import"chrome://settings/strings.m.js";// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-drawer">:host dialog {
  --drawer-width: 256px;
        --transition-timing: 200ms ease;
        background-color: var(--cr-drawer-background-color, #fff);
        border: none;
        bottom: 0;
        left: calc(-1 * var(--drawer-width));
        margin: 0;
        max-height: initial;
        max-width: initial;
        overflow: hidden;
        padding: 0;
        position: absolute;
        top: 0;
        transition: left var(--transition-timing);
        width: var(--drawer-width);
}

@media (prefers-color-scheme: dark) {
:host dialog {
  background: var(--cr-drawer-background-color, var(--google-grey-900))
              linear-gradient(rgba(255, 255, 255, .04), rgba(255, 255, 255, .04));
}

}

:host dialog, #container {
  height: 100%;
        word-break: break-word;
}

:host([show_]) dialog {
  left: 0;
}

:host([align=rtl]) dialog {
  left: auto;
        right: calc(-1 * var(--drawer-width));
        transition: right var(--transition-timing);
}

:host([show_][align=rtl]) dialog {
  right: 0;
}

:host dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
        bottom: 0;
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: opacity var(--transition-timing);
}

:host([show_]) dialog::backdrop {
  opacity: 1;
}

.drawer-header {
  align-items: center;
        border-bottom: var(--cr-separator-line);
        color: var(--cr-drawer-header-color, inherit);
        display: flex;
        font-size: 123.08%;  
        font-weight: var(--cr-drawer-header-font-weight, inherit);
        min-height: 56px;
        padding-inline-start: var(--cr-drawer-header-padding, 24px);
}

@media (prefers-color-scheme: dark) {
.drawer-header {
  color: var(--cr-primary-text-color);
}

}

#heading {
  outline: none;
}

#iconButton {
  cursor: pointer;
        margin-inline-end: 14px;
        margin-inline-start: 0;
        outline: none;
}

:host ::slotted(.drawer-content) {
  height: calc(100% - 56px);
        overflow: auto;
}

</style>
    <dialog id="dialog" on-cancel="onDialogCancel_" on-click="onDialogTap_" on-close="onDialogClose_">
      <div id="container" on-click="onContainerTap_">
        <div class="drawer-header">
          <!-- Hidden from a11y because this icon is decorative. Clicking closes
              the dialog, but screen reader users can do this by pressing ESC,
              so aria-hidden is OK here. -->
          <iron-icon id="iconButton" icon="[[iconName]]" on-click="onIconTap_" title="[[iconTitle]]" hidden="[[!iconName]]" aria-hidden="true">
          </iron-icon>
          <div id="heading" tabindex="-1">[[heading]]</div>
        </div>
        <slot></slot>
      </div>
    </dialog>
<!--_html_template_end_-->`,is:"cr-drawer",properties:{heading:String,show_:{type:Boolean,reflectToAttribute:true},align:{type:String,value:"ltr",reflectToAttribute:true},iconName:{type:String,value:null},iconTitle:String},get open(){return this.$.dialog.open},set open(value){assertNotReached("Cannot set |open|.")},toggle(){if(this.open){this.cancel()}else{this.openDrawer()}},openDrawer(){if(this.open){return}this.$.dialog.showModal();this.show_=true;this.fire("cr-drawer-opening");listenOnce(this.$.dialog,"transitionend",(()=>{this.fire("cr-drawer-opened")}))},dismiss_(cancel){if(!this.open){return}this.show_=false;listenOnce(this.$.dialog,"transitionend",(()=>{this.$.dialog.close(cancel?"canceled":"closed")}))},cancel(){this.dismiss_(true)},close(){this.dismiss_(false)},wasCanceled(){return!this.open&&this.$.dialog.returnValue==="canceled"},onIconTap_(event){this.cancel()},onContainerTap_(event){event.stopPropagation()},onDialogTap_(){this.cancel()},onDialogCancel_(event){event.preventDefault();this.cancel()},onDialogClose_(event){event.stopPropagation();this.fire("close")}});const template=document.createElement("template");template.innerHTML=`<dom-module id="cr-page-host-style" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-page-host-style">:host {\n  color: var(--cr-primary-text-color);\n        line-height: 154%; \n        overflow: hidden; \n        user-select: text;\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template.content.cloneNode(true));// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style cr-icons" scope="cr-toolbar-search-field">:host {
  align-items: center;
        display: flex;
        height: 40px;
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
            width 150ms cubic-bezier(0.4, 0, 0.2, 1);
        width: 44px;
}

[hidden] {
  display: none !important;
}

cr-icon-button {
  --cr-icon-button-size: var(--cr-toolbar-icon-container-size, 32px);
        margin: var(--cr-toolbar-icon-margin, 6px);
}

@media (prefers-color-scheme: light) {
cr-icon-button {
  --cr-icon-button-fill-color: var(
              --cr-toolbar-search-field-input-icon-color,
              white);
}

}

@media (prefers-color-scheme: dark) {
cr-icon-button {
  --cr-icon-button-fill-color: var(
              --cr-toolbar-search-field-input-icon-color,
              var(--google-grey-refresh-500));
}

}

#icon {
  transition: margin 150ms, opacity 200ms;
}

#prompt {
  color: var(--cr-toolbar-search-field-prompt-color, white);
        opacity: 0;
}

@media (prefers-color-scheme: dark) {
#prompt {
  --cr-toolbar-search-field-prompt-opacity: 1;
          color: var(--cr-secondary-text-color, white);
}

}

paper-spinner-lite {
  --paper-spinner-color:
            var(--cr-toolbar-search-field-input-icon-color, white);
        height: var(--cr-icon-size);
        margin: var(--cr-toolbar-search-field-paper-spinner-margin, 0 6px);
        opacity: 0;
        padding: 6px;
        position: absolute;
        width: var(--cr-icon-size);
}

paper-spinner-lite[active] {
  opacity: 1;
}

#prompt, paper-spinner-lite {
  transition: opacity 200ms;
}

#searchTerm {
  -webkit-font-smoothing: antialiased;
        flex: 1;
        line-height: 185%;
        margin: var(--cr-toolbar-search-field-term-margin, 0 2px);
        position: relative;
}

label {
  bottom: 0;
        cursor: var(--cr-toolbar-search-field-cursor, text);
        left: 0;
        overflow: hidden;
        position: absolute;
        right: 0;
        top: 0;
        white-space: nowrap;
}

:host([has-search-text]) label {
  visibility: hidden;
}

input {
  -webkit-appearance: none;
        background: transparent;
        border: none;
        color: var(--cr-toolbar-search-field-input-text-color, white);
        cursor: var(--cr-toolbar-search-field-cursor, text);
        font: inherit;
        outline: none;
        padding: 0;
        position: relative;
        width: 100%;
}

input[type='search']::-webkit-search-cancel-button {
  display: none;
}

:host([narrow]) {
  border-radius:
            var(--cr-toolbar-search-field-border-radius, 0);
}

:host(:not([narrow])) {
  background:
            var(--cr-toolbar-search-field-background, rgba(0, 0, 0, 0.22));
        border-radius:
            var(--cr-toolbar-search-field-border-radius, 2px);
        cursor: var(--cr-toolbar-search-field-cursor, text);
        padding-inline-end: 0;
        width: var(--cr-toolbar-field-width, 680px);
}

:host(:not([narrow]):not([showing-search])) #icon {
  opacity: var(--cr-toolbar-search-field-icon-opacity, .7);
}

:host(:not([narrow])) #prompt {
  opacity: var(--cr-toolbar-search-field-prompt-opacity, .7);
}

:host([narrow]) #prompt {
  opacity: var(--cr-toolbar-search-field-narrow-mode-prompt-opacity, 0);
}

:host([narrow]:not([showing-search])) #searchTerm {
  display: none;
}

:host([showing-search][spinner-active]) #icon {
  opacity: 0;
}

:host([narrow][showing-search]) {
  width: 100%;
}

:host([narrow][showing-search]) #icon, :host([narrow][showing-search]) paper-spinner-lite {
  margin-inline-start:
            var(--cr-toolbar-search-icon-margin-inline-start, 18px);
}

</style>
    <template is="dom-if" id="spinnerTemplate">
      <paper-spinner-lite active="[[isSpinnerShown_]]">
      </paper-spinner-lite>
    </template>
    <cr-icon-button id="icon" iron-icon="cr:search" title="[[label]]" dir="ltr" tabindex$="[[computeIconTabIndex_(narrow, hasSearchText)]]" aria-hidden$="[[computeIconAriaHidden_(narrow, hasSearchText)]]" on-click="onSearchIconClicked_">
    </cr-icon-button>
    <div id="searchTerm">
      <label id="prompt" for="searchInput" aria-hidden="true">[[label]]</label>
      <input id="searchInput" aria-labelledby="prompt" autocapitalize="off" autocomplete="off" type="search" on-input="onSearchTermInput" on-search="onSearchTermSearch" on-keydown="onSearchTermKeydown_" on-focus="onInputFocus_" on-blur="onInputBlur_" autofocus$="[[autofocus]]" spellcheck="false">
    </div>
    <template is="dom-if" if="[[hasSearchText]]">
      <cr-icon-button id="clearSearch" iron-icon="cr:cancel" title="[[clearLabel]]" on-click="clearSearch_"></cr-icon-button>
    </template>
<!--_html_template_end_-->`,is:"cr-toolbar-search-field",behaviors:[CrSearchFieldBehavior],properties:{narrow:{type:Boolean,reflectToAttribute:true},showingSearch:{type:Boolean,value:false,notify:true,observer:"showingSearchChanged_",reflectToAttribute:true},autofocus:{type:Boolean,value:false,reflectToAttribute:true},label:String,clearLabel:String,spinnerActive:{type:Boolean,reflectToAttribute:true},isSpinnerShown_:{type:Boolean,computed:"computeIsSpinnerShown_(spinnerActive, showingSearch)"},searchFocused_:{type:Boolean,value:false}},listeners:{click:"showSearch_"},getSearchInput(){return this.$.searchInput},isSearchFocused(){return this.searchFocused_},showAndFocus(){this.showingSearch=true;this.focus_()},onSearchTermInput(){CrSearchFieldBehavior.onSearchTermInput.call(this);this.showingSearch=this.hasSearchText||this.isSearchFocused()},onSearchIconClicked_(){this.fire("search-icon-clicked")},focus_(){this.getSearchInput().focus()},computeIconTabIndex_(narrow){return narrow&&!this.hasSearchText?0:-1},computeIconAriaHidden_(narrow){return Boolean(!narrow||this.hasSearchText).toString()},computeIsSpinnerShown_(){const showSpinner=this.spinnerActive&&this.showingSearch;if(showSpinner){this.$.spinnerTemplate.if=true}return showSpinner},onInputFocus_(){this.searchFocused_=true},onInputBlur_(){this.searchFocused_=false;if(!this.hasSearchText){this.showingSearch=false}},onSearchTermKeydown_(e){if(e.key==="Escape"){this.showingSearch=false}},showSearch_(e){if(e.target!==this.$.clearSearch){this.showingSearch=true}},clearSearch_(e){this.setValue("");this.focus_();this.spinnerActive=false},showingSearchChanged_(current,previous){if(previous===undefined){return}if(this.showingSearch){this.focus_();return}this.setValue("");this.getSearchInput().blur()}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({is:"iron-media-query",properties:{queryMatches:{type:Boolean,value:false,readOnly:true,notify:true},query:{type:String,observer:"queryChanged"},full:{type:Boolean,value:false},_boundMQHandler:{value:function(){return this.queryHandler.bind(this)}},_mq:{value:null}},attached:function(){this.style.display="none";this.queryChanged()},detached:function(){this._remove()},_add:function(){if(this._mq){this._mq.addListener(this._boundMQHandler)}},_remove:function(){if(this._mq){this._mq.removeListener(this._boundMQHandler)}this._mq=null},queryChanged:function(){this._remove();var query=this.query;if(!query){return}if(!this.full&&query[0]!=="("){query="("+query+")"}this._mq=window.matchMedia(query);this._add();this.queryHandler(this._mq)},queryHandler:function(mq){this._setQueryMatches(mq.matches)}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-icons cr-hidden-style" scope="cr-toolbar">:host {
  align-items: center;
        background-color: var(--cr-toolbar-background-color);
        color: #fff;
        display: flex;
        height: var(--cr-toolbar-height);
}

@media (prefers-color-scheme: dark) {
:host {
  border-bottom: var(--cr-separator-line);
          box-sizing: border-box;
          color: var(--cr-secondary-text-color);
}

}

h1 {
  flex: 1;
        font-size: 123%;
        font-weight: var(--cr-toolbar-header-font-weight, 400);
        letter-spacing: .25px;
        line-height: normal;
        margin-inline-start: 6px;
        padding-inline-end: 12px;
}

@media (prefers-color-scheme: dark) {
h1 {
  color: var(--cr-primary-text-color);
}

}

#leftContent {
  position: relative;
        transition: opacity 100ms;
}

#leftSpacer {
  align-items: center;
        box-sizing: border-box;
        display: flex;
        
        padding-inline-start: calc(12px + 6px);
        width: var(--cr-toolbar-left-spacer-width, auto);
}

cr-icon-button {
  --cr-icon-button-size: 32px;
        min-width: 32px;
}

@media (prefers-color-scheme: light) {
cr-icon-button {
  --cr-icon-button-fill-color: currentColor;
}

}

#centeredContent {
  display: flex;
        flex: 1 1 0;
        justify-content: center;
}

#rightSpacer {
  padding-inline-end: 12px;
}

:host([narrow]) #centeredContent {
  justify-content: flex-end;
}

:host([has-overlay]) {
  transition: visibility var(--cr-toolbar-overlay-animation-duration);
        visibility: hidden;
}

:host([narrow][showing-search_]) #leftContent {
  opacity: 0;
        position: absolute;
}

:host(:not([narrow])) #leftContent {
  flex: 1 1 var(--cr-toolbar-field-margin, 0);
}

:host(:not([narrow])) #centeredContent {
  flex-basis: var(--cr-toolbar-center-basis, 0);
}

:host(:not([narrow])) #rightContent {
  flex: 1 1 0;
        text-align: end;
}

</style>
    <div id="leftContent">
      <div id="leftSpacer">
        <template is="dom-if" if="[[showMenu]]" restamp="">
          <cr-icon-button id="menuButton" class="no-overlap" iron-icon="cr20:menu" on-click="onMenuTap_" aria-label$="[[menuLabel]]" title="[[menuLabel]]">
          </cr-icon-button>
        </template>
        <h1>[[pageName]]</h1>
      </div>
    </div>

    <div id="centeredContent" hidden$="[[!showSearch]]">
      <cr-toolbar-search-field id="search" narrow="[[narrow]]" label="[[searchPrompt]]" clear-label="[[clearLabel]]" spinner-active="[[spinnerActive]]" showing-search="{{showingSearch_}}" autofocus$="[[autofocus]]">
      </cr-toolbar-search-field>
      <iron-media-query query="(max-width: [[narrowThreshold]]px)" query-matches="{{narrow}}">
      </iron-media-query>
    </div>

    <div id="rightContent">
      <div id="rightSpacer">
        <slot></slot>
      </div>
    </div>
<!--_html_template_end_-->`,is:"cr-toolbar",properties:{pageName:String,searchPrompt:String,clearLabel:String,menuLabel:String,spinnerActive:Boolean,showMenu:{type:Boolean,value:false},showSearch:{type:Boolean,value:true},autofocus:{type:Boolean,value:false,reflectToAttribute:true},narrow:{type:Boolean,reflectToAttribute:true,readonly:true,notify:true},narrowThreshold:{type:Number,value:900},showingSearch_:{type:Boolean,reflectToAttribute:true}},getSearchField(){return this.$.search},onMenuTap_(){this.fire("cr-toolbar-menu-tap")},focusMenuButton(){requestAnimationFrame((()=>{const menuButton=this.shadowRoot.querySelector("#menuButton");if(menuButton){menuButton.focus()}}))},isMenuFocused(){return Boolean(this.shadowRoot.activeElement)&&this.shadowRoot.activeElement.id==="menuButton"}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="managed-footnote">:host {
  align-items: center;
        border-top: 1px solid var(--cr-separator-color);
        color: var(--cr-secondary-text-color);
        display: none;
        
        font-size: 0.8125rem;
        justify-content: center;
        padding: 0 24px;
}

:host([is-managed_]) {
  display: flex;
}

a[href] {
  color: var(--cr-link-color);
        text-decoration: none;
}

iron-icon {
  align-self: flex-start;
        flex-shrink: 0;
        height: 20px;
        padding-inline-end: var(--managed-footnote-icon-padding, 8px);
        width: 20px;
}

</style>

    <template is="dom-if" if="[[isManaged_]]">
      <iron-icon icon="cr:domain"></iron-icon>
      <div id="content" inner-h-t-m-l="[[getManagementString_(showDeviceInfo)]]">
      </div>
    </template>
<!--_html_template_end_-->`,is:"managed-footnote",behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{isManaged_:{reflectToAttribute:true,type:Boolean,value(){return loadTimeData.getBoolean("isManaged")}},showDeviceInfo:{type:Boolean,value:false}},ready(){this.addWebUIListener("is-managed-changed",(managed=>{loadTimeData.overrideValues({isManaged:managed});this.isManaged_=managed}))},getManagementString_(){return this.i18nAdvanced("browserManagedByOrg")}});chrome.send("observeManagedUI");// Copyright 2018 The Chromium Authors. All rights reserved.
const WRAPPER_CSS_CLASS="search-highlight-wrapper";const ORIGINAL_CONTENT_CSS_CLASS="search-highlight-original-content";const HIT_CSS_CLASS="search-highlight-hit";const SEARCH_BUBBLE_CSS_CLASS="search-bubble";function removeHighlights(wrappers){for(const wrapper of wrappers){if(!wrapper.parentElement){continue}const textNode=wrapper.querySelector(`.${ORIGINAL_CONTENT_CSS_CLASS}`).firstChild;wrapper.parentElement.replaceChild(textNode,wrapper)}}function findAndRemoveHighlights(node){const wrappers=Array.from(node.querySelectorAll(`.${WRAPPER_CSS_CLASS}`));assert(wrappers.length===1);removeHighlights(wrappers)}function highlight(node,ranges){assert(ranges.length>0);const wrapper=document.createElement("span");wrapper.classList.add(WRAPPER_CSS_CLASS);node.parentNode.replaceChild(wrapper,node);const span=document.createElement("span");span.classList.add(ORIGINAL_CONTENT_CSS_CLASS);span.style.display="none";span.appendChild(node);wrapper.appendChild(span);const text=node.textContent;const tokens=[];for(let i=0;i<ranges.length;++i){const range=ranges[i];const prev=ranges[i-1]||{start:0,length:0};const start=prev.start+prev.length;const length=range.start-start;tokens.push(text.substr(start,length));tokens.push(text.substr(range.start,range.length))}const last=ranges.slice(-1)[0];tokens.push(text.substr(last.start+last.length));for(let i=0;i<tokens.length;++i){if(i%2===0){wrapper.appendChild(document.createTextNode(tokens[i]))}else{const hitSpan=document.createElement("span");hitSpan.classList.add(HIT_CSS_CLASS);hitSpan.style.backgroundColor="#ffeb3b";hitSpan.style.color="#202124";hitSpan.textContent=tokens[i];wrapper.appendChild(hitSpan)}}return wrapper}function createEmptySearchBubble(node,horizontallyCenter){let anchor=node;if(node.nodeName==="SELECT"){anchor=node.parentNode}if(anchor instanceof ShadowRoot){anchor=anchor.host.parentNode}let searchBubble=anchor.querySelector(`.${SEARCH_BUBBLE_CSS_CLASS}`);if(searchBubble){return searchBubble}searchBubble=document.createElement("div");searchBubble.classList.add(SEARCH_BUBBLE_CSS_CLASS);const innards=document.createElement("div");innards.classList.add("search-bubble-innards");innards.textContent=" ";searchBubble.appendChild(innards);anchor.appendChild(searchBubble);const updatePosition=function(){assert(typeof node.offsetTop==="number");searchBubble.style.top=node.offsetTop+(innards.classList.contains("above")?-searchBubble.offsetHeight:node.offsetHeight)+"px";if(horizontallyCenter){const width=node.offsetWidth-searchBubble.offsetWidth;searchBubble.style.left=node.offsetLeft+width/2+"px"}};updatePosition();searchBubble.addEventListener("mouseover",(function(){innards.classList.toggle("above");updatePosition()}));return searchBubble}function stripDiacritics(text){return text.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="settings-section">:host {
  display: flex;
        flex-direction: column;
        outline: none;
        position: relative;
}

#header .title {
  color: var(--cr-primary-text-color);
        font-size: 108%;
        font-weight: 400;
        letter-spacing: .25px;
        margin-bottom: 12px;
        margin-top: var(--cr-section-vertical-margin);
        outline: none;
        padding-bottom: 4px;
        padding-top: 8px;
}

:host(:not(.expanded)) #card {
  background-color: var(--cr-card-background-color);
        border-radius: var(--cr-card-border-radius);
        box-shadow: var(--cr-card-shadow);
        flex: 1;
}

:host([hidden-by-search]) {
  display: none;
}

</style>
    <div id="header">
      <h2 class="title" tabindex="-1" aria-hidden$="[[getTitleHiddenStatus_(pageTitle)]]">[[pageTitle]]</h2>
    </div>
    <div id="card">
      <slot></slot>
    </div>
<!--_html_template_end_-->`,is:"settings-section",properties:{section:String,pageTitle:{type:String,value:""},hiddenBySearch:{type:Boolean,value:false,reflectToAttribute:true}},getTitleHiddenStatus_(){return this.pageTitle?false:"true"},focus(){this.$$(".title").focus()}});const template$1=document.createElement("template");template$1.innerHTML=`<dom-module id="settings-page-styles" assetpath="chrome://resources/">\n  <template>\n    <style scope="settings-page-styles">:host(.showing-subpage) settings-section:not(.expanded) {\n  display: none;\n}\n\n:host > div > :not(.expanded) {\n  margin-bottom: 3px;\n}\n\n.expanded {\n  min-height: 100%;\n}\n\n</style>\n  </template>\n</dom-module>\n`;document.body.appendChild(template$1.content.cloneNode(true));// Copyright 2016 The Chromium Authors. All rights reserved.
const UpdateStatus={CHECKING:"checking",UPDATING:"updating",NEARLY_UPDATED:"nearly_updated",UPDATED:"updated",FAILED:"failed",DISABLED:"disabled",DISABLED_BY_ADMIN:"disabled_by_admin",NEED_PERMISSION_TO_UPDATE:"need_permission_to_update"};let PromoteUpdaterStatus;class AboutPageBrowserProxy{pageReady(){}refreshUpdateStatus(){}openHelpPage(){}openFeedbackDialog(){}}class AboutPageBrowserProxyImpl{pageReady(){chrome.send("aboutPageReady")}refreshUpdateStatus(){chrome.send("refreshUpdateStatus")}launchReleaseNotes(){chrome.send("launchReleaseNotes")}openHelpPage(){chrome.send("openHelpPage")}openFeedbackDialog(){chrome.send("openFeedbackDialog")}}addSingletonGetter(AboutPageBrowserProxyImpl);// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"settings-about-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared settings-page-styles iron-flex" scope="settings-about-page">:host {
  --about-page-image-space: 10px;
}

.info-sections {
  padding: var(--cr-section-vertical-padding) var(--cr-section-padding);
}

.info-section {
  margin-bottom: 12px;
}

.product-title {
  font-size: 153.85%;  
        font-weight: 400;
        margin-bottom: auto;
        margin-top: auto;
}

img {
  margin-inline-end: var(--about-page-image-space);
}

.icon-container {
  margin-inline-end: var(--about-page-image-space);
        min-width: 32px;  
        text-align: center;
}

iron-icon[icon='settings:check-circle'] {
  fill: var(--cr-checked-color);
}

iron-icon[icon='cr:error'] {
  fill: var(--settings-error-color);
}

cr-button {
  white-space: nowrap;
}

</style>
    <settings-section page-title="‏لمحة عن Chrome" section="about">
      <div class="cr-row two-line first">
        <img id="product-logo" on-click="onProductLogoTap_" srcset="chrome://theme/current-channel-logo@1x 1x,
                    chrome://theme/current-channel-logo@2x 2x" alt="‏شعار Chrome" role="presentation">
        <h1 class="product-title">Google Chrome</h1>
      </div>
      <div class="cr-row two-line">
        <!-- TODO(dpapad): Investigate why vulcanize does not handle well
          a new line after "getThrobberSrcIfUpdating_(", causes incorrect
          src URL -->
        <!-- Set the icon from the iconset (when it's obsolete/EOL and
          when update is done) or set the src (when it's updating). -->

        <div class="icon-container" hidden="[[!shouldShowIcons_(showUpdateStatus_)]]">
          <iron-icon icon$="[[getUpdateStatusIcon_(
                  obsoleteSystemInfo_, currentUpdateStatusEvent_)]]" src="[[getThrobberSrcIfUpdating_(obsoleteSystemInfo_, currentUpdateStatusEvent_)]]">
          </iron-icon>
        </div>

        <div class="flex cr-padded-text">

          <div id="updateStatusMessage" hidden="[[!showUpdateStatus_]]">
            <div inner-h-t-m-l="[[getUpdateStatusMessage_(
                    currentUpdateStatusEvent_)]]">
            </div>
            <a hidden$="[[!shouldShowLearnMoreLink_(
                currentUpdateStatusEvent_)]]" target="_blank" href="https://support.google.com/chrome?p=update_error">
              مزيد من المعلومات
            </a>
          </div>
          <span id="deprecationWarning" hidden="[[!obsoleteSystemInfo_.obsolete]]">
            ‏لن يستلم جهاز الكمبيوتر هذا تحديثات Google Chrome لأن Windows XP وWindows Vista أصبحا غير مدعومين.
            <a href="https://chrome.blogspot.com/2015/11/updates-to-chrome-platform-support.html" target="_blank">
              مزيد من المعلومات
            </a>
          </span>

          <div class="secondary">الإصدار 89.0.4389.90 (البنية الرسمية)  (64 بت)</div>

        </div>

        <div class="separator" hidden="[[!showButtonContainer_]]"></div>
        <span id="buttonContainer" hidden="[[!showButtonContainer_]]">
          <cr-button id="relaunch" hidden="[[!showRelaunch_]]" on-click="onRelaunchTap_">
            إعادة تشغيل
          </cr-button>
        </span>

      </div>

      <cr-link-row class="hr" id="help" on-click="onHelpTap_" label="‏الحصول على مساعدة في Chrome" external=""></cr-link-row>

      <cr-link-row class="hr" id="reportIssue" on-click="onReportIssueTap_" hidden="[[!prefs.feedback_allowed.value]]" label="الإبلاغ عن مشكلة" external=""></cr-link-row>

      <cr-link-row class="hr" on-click="onManagementPageTap_" start-icon="cr:domain" label="إدارة متصفِّحك" role-description="زر صفحة فرعية" hidden$="[[!isManaged_]]"></cr-link-row>
    </settings-section>

    <settings-section>
      <div class="info-sections">
        <div class="info-section">
          <div class="secondary">Google Chrome</div>
          <div class="secondary">‏حقوق الطبع والنشر لعام 2022 لشركة Google LLC. جميع الحقوق محفوظة.</div>
        </div>

        <div class="info-section">
          <div class="secondary">‏نوفر لكم Google Chrome بفضل المشروع المفتوح المصدر <a target="_blank" href="https://www.chromium.org/">Chromium</a> و<a target="_blank" href="chrome://credits/">برامج أخرى مفتوحة المصدر</a>.</div>
        </div>

        <div class="secondary">
          <a href="chrome://terms/">بنود الخدمة</a>
        </div>

      </div>
    </settings-section>
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior,I18nBehavior],properties:{currentUpdateStatusEvent_:{type:Object,value:{message:"",progress:0,rollback:false,status:UpdateStatus.DISABLED}},isManaged_:{type:Boolean,value(){return loadTimeData.getBoolean("isManaged")}},obsoleteSystemInfo_:{type:Object,value(){return{obsolete:loadTimeData.getBoolean("aboutObsoleteNowOrSoon"),endOfLine:loadTimeData.getBoolean("aboutObsoleteEndOfTheLine")}}},showUpdateStatus_:{type:Boolean,value:false},showButtonContainer_:Boolean,showRelaunch_:{type:Boolean,value:false}},observers:["updateShowUpdateStatus_("+"obsoleteSystemInfo_, currentUpdateStatusEvent_)","updateShowRelaunch_(currentUpdateStatusEvent_)","updateShowButtonContainer_(showRelaunch_)"],aboutBrowserProxy_:null,lifetimeBrowserProxy_:null,attached(){this.aboutBrowserProxy_=AboutPageBrowserProxyImpl.getInstance();this.aboutBrowserProxy_.pageReady();this.lifetimeBrowserProxy_=LifetimeBrowserProxyImpl.getInstance();this.startListening_();if(Router.getInstance().getQueryParameters().get("checkForUpdate")==="true"){this.onUpdateStatusChanged_({status:UpdateStatus.CHECKING});this.aboutBrowserProxy_.requestUpdate()}},getPromoteUpdaterClass_(){return""},startListening_(){this.addWebUIListener("update-status-changed",this.onUpdateStatusChanged_.bind(this));this.aboutBrowserProxy_.refreshUpdateStatus()},onUpdateStatusChanged_(event){this.currentUpdateStatusEvent_=event},onLearnMoreTap_(event){event.stopPropagation()},onReleaseNotesTap_(){this.aboutBrowserProxy_.launchReleaseNotes()},onHelpTap_(){this.aboutBrowserProxy_.openHelpPage()},onRelaunchTap_(){this.lifetimeBrowserProxy_.relaunch()},updateShowUpdateStatus_(){if(this.obsoleteSystemInfo_.endOfLine){this.showUpdateStatus_=false;return}this.showUpdateStatus_=this.currentUpdateStatusEvent_.status!==UpdateStatus.DISABLED},updateShowButtonContainer_(){this.showButtonContainer_=this.showRelaunch_},updateShowRelaunch_(){this.showRelaunch_=this.checkStatus_(UpdateStatus.NEARLY_UPDATED)},shouldShowLearnMoreLink_(){return this.currentUpdateStatusEvent_.status===UpdateStatus.FAILED},getUpdateStatusMessage_(){switch(this.currentUpdateStatusEvent_.status){case UpdateStatus.CHECKING:case UpdateStatus.NEED_PERMISSION_TO_UPDATE:return this.i18nAdvanced("aboutUpgradeCheckStarted");case UpdateStatus.NEARLY_UPDATED:return this.i18nAdvanced("aboutUpgradeRelaunch");case UpdateStatus.UPDATED:return this.i18nAdvanced("aboutUpgradeUpToDate");case UpdateStatus.UPDATING:assert(typeof this.currentUpdateStatusEvent_.progress==="number");const progressPercent=this.currentUpdateStatusEvent_.progress+"%";if(this.currentUpdateStatusEvent_.progress>0){return this.i18nAdvanced("aboutUpgradeUpdatingPercent",{substitutions:[progressPercent]})}return this.i18nAdvanced("aboutUpgradeUpdating");default:function formatMessage(msg){return parseHtmlSubset("<b>"+msg+"</b>",["br","pre"]).firstChild.innerHTML}let result="";const message=this.currentUpdateStatusEvent_.message;if(message){result+=formatMessage(message)}const connectMessage=this.currentUpdateStatusEvent_.connectionTypes;if(connectMessage){result+="<div>"+formatMessage(connectMessage)+"</div>"}return result}},getUpdateStatusIcon_(){if(this.obsoleteSystemInfo_.endOfLine){return"cr:error"}switch(this.currentUpdateStatusEvent_.status){case UpdateStatus.DISABLED_BY_ADMIN:return"cr20:domain";case UpdateStatus.FAILED:return"cr:error";case UpdateStatus.UPDATED:case UpdateStatus.NEARLY_UPDATED:return"settings:check-circle";default:return null}},getThrobberSrcIfUpdating_(){if(this.obsoleteSystemInfo_.endOfLine){return null}switch(this.currentUpdateStatusEvent_.status){case UpdateStatus.CHECKING:case UpdateStatus.UPDATING:return"chrome://resources/images/throbber_small.svg";default:return null}},checkStatus_(status){return this.currentUpdateStatusEvent_.status===status},onManagementPageTap_(){window.location.href="chrome://management"},onProductLogoTap_(){this.$["product-logo"].animate({transform:["none","rotate(-10turn)"]},{duration:500,easing:"cubic-bezier(1, 0, 0, 1)"})},onReportIssueTap_(){this.aboutBrowserProxy_.openFeedbackDialog()},shouldShowIcons_(){if(this.obsoleteSystemInfo_.endOfLine){return true}return this.showUpdateStatus_}});// Copyright 2016 The Chromium Authors. All rights reserved.
class AppearanceBrowserProxy{getDefaultZoom(){}getThemeInfo(themeId){}isSupervised(){}useDefaultTheme(){}validateStartupPage(url){}}class AppearanceBrowserProxyImpl{getDefaultZoom(){return new Promise((function(resolve){chrome.settingsPrivate.getDefaultZoom(resolve)}))}getThemeInfo(themeId){return new Promise((function(resolve){chrome.management.get(themeId,resolve)}))}isSupervised(){return loadTimeData.getBoolean("isSupervised")}useDefaultTheme(){chrome.send("useDefaultTheme")}validateStartupPage(url){return sendWithPromise("validateStartupPage",url)}}addSingletonGetter(AppearanceBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"home-url-input",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="home-url-input">:host {
  cursor: auto;
        display: block;
        width: 100%;
}

cr-input {
  width: 100%;
        --cr-input-width: 50%;
}

cr-input::part(row-container) {
  justify-content: normal;
}

</style>
    <!-- Max length of 100 KB to prevent browser from freezing. -->
    <cr-input id="input" value="{{value}}" error-message="غير صالح" placeholder="إدخال عنوان الويب المُخصص" maxlength="102400" on-change="onChange_" on-keydown="onKeydown_" on-input="validate_" invalid="{{invalid}}" tabindex="[[getTabindex_(canTab)]]" disabled="[[isDisabled_(disabled, pref.*)]]" spellcheck="false" on-keyup="stopKeyEventPropagation_" on-keypress="stopKeyEventPropagation_">
      <template is="dom-if" if="[[hasPrefPolicyIndicator(pref.*)]]">
        <cr-policy-pref-indicator pref="[[pref]]" icon-aria-label="[[label]]" slot="suffix">
        </cr-policy-pref-indicator>
      </template>
    </cr-input>
<!--_html_template_end_-->`,behaviors:[CrPolicyPrefBehavior,PrefControlBehavior],properties:{pref:{observer:"prefChanged_"},disabled:{type:Boolean,value:false,reflectToAttribute:true},canTab:Boolean,invalid:{type:Boolean,value:false},value:{type:String,value:"",notify:true}},browserProxy_:null,created(){this.browserProxy_=AppearanceBrowserProxyImpl.getInstance();this.noExtensionIndicator=true},focus(){this.$.input.focus()},prefChanged_(){if(!this.pref){return}if(this.$.input.focused){return}this.setInputValueFromPref_()},setInputValueFromPref_(){assert(this.pref.type===chrome.settingsPrivate.PrefType.URL);this.value=this.pref.value},getTabindex_(canTab){return canTab?0:-1},onChange_(){if(this.invalid){this.resetValue_();return}assert(this.pref.type===chrome.settingsPrivate.PrefType.URL);this.set("pref.value",this.value)},resetValue_(){this.invalid=false;this.setInputValueFromPref_();this.$.input.blur()},onKeydown_(event){if(event.key==="Enter"&&this.invalid){event.preventDefault()}else if(event.key==="Escape"){this.resetValue_()}this.stopKeyEventPropagation_(event)},stopKeyEventPropagation_(e){e.stopPropagation()},isDisabled_(disabled){return disabled||this.isPrefEnforced()},validate_(){if(this.value===""){this.invalid=false;return}this.browserProxy_.validateStartupPage(this.value).then((isValid=>{this.invalid=!isValid}))}});// Copyright 2015 The Chromium Authors. All rights reserved.
const SIZE_DIFFERENCE_FIXED_STANDARD=3;const AUTOGENERATED_THEME_ID="autogenerated_theme_id";Polymer({is:"settings-appearance-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared md-select iron-flex" scope="settings-appearance-page">#custom-input {
  --cr-radio-button-disc-margin-block-start: calc(
            (1.54em + 12px) / 2 - 8px);
        align-items: start;
}

#themeRow cr-button {
  margin-inline-end: 20px;
}

#themeRow .separator {
  margin-inline-start: 0;
}

</style>
    <settings-animated-pages id="pages" section="appearance" focus-config="[[focusConfig_]]">
      <div route-path="default">
        <div class="settings-row first" id="themeRow" hidden="[[!pageVisibility.setTheme]]">
          <cr-link-row class="first" hidden="[[!pageVisibility.setTheme]]" label="مظهر" sub-label="[[themeSublabel_]]" on-click="openThemeUrl_" external=""></cr-link-row>

          <template is="dom-if" if="[[prefs.extensions.theme.id.value]]">
            <div class="separator"></div>
            <cr-button id="useDefault" on-click="onUseDefaultTap_">
              إعادة الضبط على الإعداد التلقائي
            </cr-button>
          </template>


        </div>
        <div class="hr" hidden="[[!showHr_(
                pageVisibility.setTheme, pageVisibility.homeButton)]]">
        </div>
        <settings-toggle-button elide-label="" hidden="[[!pageVisibility.homeButton]]" pref="{{prefs.browser.show_home_button}}" label="عرض زر الصفحة الرئيسية" sub-label="[[getShowHomeSubLabel_(
                prefs.browser.show_home_button.value,
                prefs.homepage_is_newtabpage.value,
                prefs.homepage.value)]]">
        </settings-toggle-button>
        <template is="dom-if" if="[[prefs.browser.show_home_button.value]]">
          <div class="list-frame" hidden="[[!pageVisibility.homeButton]]">
            <settings-radio-group pref="{{prefs.homepage_is_newtabpage}}">
              <controlled-radio-button class="list-item" name="true" pref="[[prefs.homepage_is_newtabpage]]" label="صفحة &quot;علامة تبويب جديدة&quot;" no-extension-indicator="">
              </controlled-radio-button>
              <controlled-radio-button id="custom-input" class="list-item" name="false" pref="[[prefs.homepage_is_newtabpage]]" no-extension-indicator="">
                <!-- TODO(dbeam): this can show double indicators when both
                     homepage and whether to use the NTP as the homepage are
                     managed. -->
                <home-url-input id="customHomePage" pref="{{prefs.homepage}}" can-tab="[[!prefs.homepage_is_newtabpage.value]]">
                </home-url-input>
              </controlled-radio-button>
              <template is="dom-if" if="[[prefs.homepage.extensionId]]">
                <extension-controlled-indicator extension-id="[[prefs.homepage.extensionId]]" extension-can-be-disabled="[[
                        prefs.homepage.extensionCanBeDisabled]]" extension-name="[[prefs.homepage.controlledByName]]" on-disable-extension="onDisableExtension_">
                </extension-controlled-indicator>
              </template>
            </settings-radio-group>
          </div>
        </template>
        <div class="hr" hidden="[[!showHr_(
                pageVisibility.homeButton, pageVisibility.bookmarksBar)]]">
        </div>
        <settings-toggle-button hidden="[[!pageVisibility.bookmarksBar]]" pref="{{prefs.bookmark_bar.show_on_all_tabs}}" label="عرض شريط الإشارات">
        </settings-toggle-button>

        <div class="cr-row">
          <div class="flex cr-padded-text" aria-hidden="true">
            حجم الخط
          </div>
          <settings-dropdown-menu id="defaultFontSize" label="حجم الخط" pref="{{prefs.webkit.webprefs.default_font_size}}" menu-options="[[fontSizeOptions_]]">
          </settings-dropdown-menu>
        </div>
        <cr-link-row class="hr" id="customize-fonts-subpage-trigger" label="تخصيص الخطوط" on-click="onCustomizeFontsTap_" role-description="زر صفحة فرعية">
        </cr-link-row>
        <div class="cr-row" hidden="[[!pageVisibility.pageZoom]]">
          <div id="pageZoom" class="flex cr-padded-text" aria-hidden="true">
            تكبير/تصغير الصفحة
          </div>
          <select id="zoomLevel" class="md-select" aria-labelledby="pageZoom" on-change="onZoomLevelChange_">
            <template is="dom-repeat" items="[[pageZoomLevels_]]">
              <option value="[[item]]" selected="[[zoomValuesEqual_(item, defaultZoom_)]]">
                [[formatZoom_(item)]]%
              </option>
            </template>
          </select>
        </div>
        <template is="dom-if" if="[[showReaderModeOption_]]">
          <settings-toggle-button class="hr" pref="{{prefs.dom_distiller.offer_reader_mode}}" label="وضع القارئ لصفحات الويب" sub-label="اقتراح مشاهدة المقالات في وضع القارئ إذا كان ذلك متاحًا">
          </settings-toggle-button>
        </template>

      </div>
      <template is="dom-if" route-path="/fonts">
        <settings-subpage associated-control="[[$$('#customize-fonts-subpage-trigger')]]" page-title="تخصيص الخطوط">
          <settings-appearance-fonts-page prefs="{{prefs}}">
          </settings-appearance-fonts-page>
        </settings-subpage>
      </template>
    </settings-animated-pages>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{pageVisibility:Object,prefs:{type:Object,notify:true},defaultZoom_:Number,isWallpaperPolicyControlled_:{type:Boolean,value:true},fontSizeOptions_:{readOnly:true,type:Array,value(){return[{value:9,name:loadTimeData.getString("verySmall")},{value:12,name:loadTimeData.getString("small")},{value:16,name:loadTimeData.getString("medium")},{value:20,name:loadTimeData.getString("large")},{value:24,name:loadTimeData.getString("veryLarge")}]}},pageZoomLevels_:Array,themeSublabel_:String,themeUrl_:String,useSystemTheme_:{type:Boolean,value:false},focusConfig_:{type:Object,value(){const map=new Map;if(routes.FONTS){map.set(routes.FONTS.path,"#customize-fonts-subpage-trigger")}return map}},showReaderModeOption_:{type:Boolean,value(){return loadTimeData.getBoolean("showReaderModeOption")}}},appearanceBrowserProxy_:null,observers:["defaultFontSizeChanged_(prefs.webkit.webprefs.default_font_size.value)","themeChanged_(prefs.extensions.theme.id.value, useSystemTheme_)"],created(){this.appearanceBrowserProxy_=AppearanceBrowserProxyImpl.getInstance()},ready(){this.$.defaultFontSize.menuOptions=this.fontSizeOptions_;this.appearanceBrowserProxy_.getDefaultZoom().then((zoom=>{this.defaultZoom_=zoom}));this.pageZoomLevels_=JSON.parse(loadTimeData.getString("presetZoomFactors"))},formatZoom_(zoom){return Math.round(zoom*100)},getShowHomeSubLabel_(showHomepage,isNtp,homepageValue){if(!showHomepage){return this.i18n("homeButtonDisabled")}if(isNtp){return this.i18n("homePageNtp")}return homepageValue||this.i18n("customWebAddress")},onCustomizeFontsTap_(){Router.getInstance().navigateTo(routes.FONTS)},onDisableExtension_(){this.fire("refresh-pref","homepage")},defaultFontSizeChanged_(value){this.set("prefs.webkit.webprefs.default_fixed_font_size.value",value-SIZE_DIFFERENCE_FIXED_STANDARD)},openThemeUrl_(){window.open(this.themeUrl_||loadTimeData.getString("themesGalleryUrl"))},onUseDefaultTap_(){this.appearanceBrowserProxy_.useDefaultTheme()},themeChanged_(themeId,useSystemTheme){if(this.prefs===undefined||useSystemTheme===undefined){return}if(themeId.length>0&&themeId!==AUTOGENERATED_THEME_ID){assert(!useSystemTheme);this.appearanceBrowserProxy_.getThemeInfo(themeId).then((info=>{this.themeSublabel_=info.name}));this.themeUrl_="https://chrome.google.com/webstore/detail/"+themeId;return}this.themeUrl_="";if(themeId===AUTOGENERATED_THEME_ID){this.themeSublabel_=this.i18n("chromeColors");return}let i18nId;i18nId="chooseFromWebStore";this.themeSublabel_=this.i18n(i18nId)},onZoomLevelChange_(){chrome.settingsPrivate.setDefaultZoom(parseFloat(this.$.zoomLevel.value))},zoomValuesEqual_(zoom1,zoom2){return Math.abs(zoom1-zoom2)<=.001},showHr_(previousIsVisible,nextIsVisible){return previousIsVisible&&nextIsVisible}});// Copyright 2020 The Chromium Authors. All rights reserved.
class HatsBrowserProxy{tryShowSurvey(){}}class HatsBrowserProxyImpl{tryShowSurvey(){chrome.send("tryShowHatsSurvey")}}addSingletonGetter(HatsBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-privacy-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-privacy-page">.content-settings-header, #notificationRadioGroup {
  padding: 0 var(--cr-section-padding);
}

#notificationSubHeading {
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
    <template is="dom-if" if="[[showClearBrowsingDataDialog_]]" restamp="">
      <settings-clear-browsing-data-dialog prefs="{{prefs}}" on-close="onDialogClosed_">
      </settings-clear-browsing-data-dialog>
    </template>
    <settings-animated-pages id="pages" section="privacy" focus-config="[[focusConfig_]]">
      <div route-path="default">
        <cr-link-row id="clearBrowsingData" start-icon="cr:delete" label="محو بيانات التصفُّح" sub-label="محو السجلّ وملفات تعريف الارتباط وذاكرة التخزين المؤقت والمزيد" on-click="onClearBrowsingDataTap_"></cr-link-row>
        <cr-link-row id="cookiesLinkRow" start-icon="settings:cookie" class="hr" label="ملفات تعريف الارتباط وبيانات الموقع الإلكتروني الأخرى" sub-label="[[cookieSettingDescription_]]" on-click="onCookiesClick_" role-description="زر صفحة فرعية"></cr-link-row>
        <cr-link-row id="securityLinkRow" start-icon="cr:security" class="hr" label="أمن المعلومات" sub-label="التصفُّح الآمن (يوفّر حماية من المواقع الإلكترونية الضارة) وإعدادات الأمان الأخرى" on-click="onSecurityPageClick_" role-description="زر صفحة فرعية"></cr-link-row>
        <cr-link-row id="permissionsLinkRow" start-icon="settings:permissions" class="hr" label="إعدادات الموقع الإلكتروني" sub-label="يمكنك التحكّم بالمعلومات التي يمكن للمواقع الإلكترونية استخدامها وعرضها (مثل معلومات الموقع الجغرافي، والكاميرا، والنوافذ المنبثقة، وغيرها)." on-click="onPermissionsPageClick_" role-description="زر صفحة فرعية"></cr-link-row>
        <cr-link-row id="privacySandboxLinkRow" start-icon="settings20:experiment" class="hr" label="Privacy Sandbox" sub-label="Privacy Sandbox" on-click="onPrivacySandboxClick_" hidden="[[!enablePrivacySandboxSettings_]]" external="" role-description="زر صفحة فرعية"></cr-link-row>
      </div>



      <template is="dom-if" if="[[enableSecurityKeysSubpage_]]">
        <template is="dom-if" route-path="/securityKeys">
          <settings-subpage associated-control="[[$$('#securityLinkRow')]]" page-title="إدارة مفاتيح الأمان">
            <security-keys-subpage></security-keys-subpage>
          </settings-subpage>
        </template>
      </template>

      <template is="dom-if" route-path="/content">
        <settings-subpage associated-control="[[$$('#permissionsLinkRow')]]" id="site-settings" page-title="إعدادات الموقع الإلكتروني" learn-more-url="https://support.google.com/chrome/?p=settings_manage_exceptions">
          <settings-site-settings-page focus-config="[[focusConfig_]]">
          </settings-site-settings-page>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/security">
        <settings-subpage id="security" page-title="أمن المعلومات" associated-control="[[$$('#securityLinkRow')]]" learn-more-url="https://support.google.com/chrome?p=cpn_safe_browsing">
          <settings-security-page prefs="{{prefs}}" focus-config="[[focusConfig_]]">
          </settings-security-page>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/content/all" no-search="">
        <settings-subpage page-title="جميع المواقع الإلكترونية" search-label="البحث" search-term="{{searchFilter_}}" preserve-search-term="">
          <all-sites filter="[[searchFilter_]]"></all-sites>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/automaticDownloads" no-search="">
        <settings-subpage page-title="عمليات التنزيل التلقائية" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
                <h2>قد تعمل المواقع الإلكترونية على تنزيل الملفات المتشابهة معًا تلقائيًا لتوفير الوقت.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.AUTOMATIC_DOWNLOADS]]" allow-option-label="السماح للمواقع الإلكترونية بطلب تنزيل الملفات المتعدّدة تلقائيًا (مُستحسَن)" allow-option-icon="cr:file-download" block-option-label="منع المواقع الإلكترونية من تنزيل الملفات المتعدّدة تلقائيًا" block-option-icon="settings:block">
            <!-- TODO(https://crbug.com/1033607): use corresponding block
                  icons instead of generic ones throughout this page -->
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.AUTOMATIC_DOWNLOADS]]" allow-header="المواقع الإلكترونية التي يُسمح لها بتنزيل الملفات المتعدّدة تلقائيًا" block-header="المواقع الإلكترونية التي لا يُسمح لها بتنزيل الملفات المتعدّدة تلقائيًا" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="عدم السماح لأي موقع بتنزيل عدة ملفات تلقائيًا" toggle-on-label="طلب الإذن عند محاولة أحد المواقع تنزيل الملفات تلقائيًا بعد الملف الأول (مستحسن)" category="[[ContentSettingsTypes.AUTOMATIC_DOWNLOADS]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.AUTOMATIC_DOWNLOADS]]" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/backgroundSync" no-search="">
        <settings-subpage page-title="المزامنة في الخلفية" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>عندما تغادر موقعًا إلكترونيًا أو تصبح بلا اتصال بالإنترنت، تعمل المواقع الإلكترونية عادةً على مواصلة عملية المزامنة لإنهاء المهام، مثل تحميل الصور أو إرسال رسالة محادثة.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.BACKGROUND_SYNC]]" allow-option-label="السماح للمواقع الإلكترونية التي تم إغلاقها مؤخرًا بإنهاء إرسال البيانات واستلامها (مُستحسَن)" allow-option-icon="cr:sync" block-option-label="منع المواقع الإلكترونية التي تم إغلاقها مؤخرًا من إرسال البيانات واستلامها" block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.BACKGROUND_SYNC]]" allow-header="المواقع الإلكترونية التي يُسمح لها بإنهاء إرسال البيانات أو استلامها" block-header="المواقع الإلكترونية التي لا يُسمح لها بإنهاء إرسال البيانات أو استلامها" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="عدم السماح للمواقع الإلكترونية التي تم إغلاقها مؤخرًا بإنهاء إرسال البيانات واستلامها" toggle-on-label="السماح للمواقع الإلكترونية التي تم إغلاقها مؤخرًا بإنهاء إرسال البيانات واستلامها (موصى به)" category="[[ContentSettingsTypes.BACKGROUND_SYNC]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.BACKGROUND_SYNC]]" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/camera" no-search="">
        <settings-subpage page-title="الكاميرا" search-label="البحث" search-term="{{searchFilter_}}">
          <media-picker label="الكاميرا" type="camera">
          </media-picker>
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>تستخدم المواقع الإلكترونية عادةً كاميرا الفيديو لتتيح ميزات التواصل، مثل محادثة الفيديو.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.CAMERA]]" allow-option-label="السماح للمواقع الإلكترونية بطلب استخدام الكاميرا (مُستحسَن)" allow-option-icon="cr:videocam" block-option-label="منع المواقع الإلكترونية من استخدام الكاميرا" block-option-sub-label="لن تعمل الميزات التي تحتاج إلى كاميرا." block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.CAMERA]]" read-only-list="" allow-header="المواقع الإلكترونية التي يُسمح لها باستخدام الكاميرا" block-header="المواقع الإلكترونية التي لا يُسمح لها باستخدام الكاميرا" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting category="[[ContentSettingsTypes.CAMERA]]" toggle-off-label="الحظر" toggle-on-label="اسأل قبل الدخول (موصى به)">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.CAMERA]]" read-only-list="" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/cookies">
        <settings-subpage id="cookies" page-title="ملفات تعريف الارتباط وبيانات الموقع الإلكتروني الأخرى" learn-more-url="https://support.google.com/chrome?p=cpn_cookies" search-label="البحث" search-term="{{searchFilter_}}" associated-control="[[$$('#cookiesLinkRow')]]">
          <settings-cookies-page prefs="{{prefs}}" focus-config="[[focusConfig_]]" search-term="[[searchFilter_]]">
          </settings-cookies-page>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/siteData" no-search="">
        <settings-subpage page-title="جميع ملفات تعريف الارتباط وبيانات الموقع" search-label="ملفات تعريف ارتباط البحث" search-term="{{siteDataFilter_}}" preserve-search-term="">
          <site-data filter="[[siteDataFilter_]]" focus-config="[[focusConfig_]]">
          </site-data>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/images" no-search="">
        <settings-subpage page-title="الصور" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>تعمل المواقع الإلكترونية عادةً على عرض الصور لتوفير صور توضيحية مثل صور متاجر على الإنترنت أو مقالات إخبارية.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.IMAGES]]" allow-option-label="السماح للمواقع الإلكترونية بعرض الصور (مُستحسَن)" allow-option-icon="settings:photo" block-option-label="حظر الصور" block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.IMAGES]]" allow-header="المواقع الإلكترونية التي يُسمح لها بعرض الصور" block-header="المواقع الإلكترونية التي لا يُسمح لها بعرض الصور" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting category="[[ContentSettingsTypes.IMAGES]]" toggle-off-label="عدم عرض أي صور" toggle-on-label="عرض الكل (مستحسن)">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.IMAGES]]" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/insecureContent" no-search="">
        <settings-subpage page-title="محتوى غير آمن" search-label="البحث" search-term="{{searchFilter_}}">
          <div class="cr-row first">
            محتوى غير آمن محظور تلقائيًا على مواقع إلكترونية آمنة
          </div>
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <category-setting-exceptions category="[[ContentSettingsTypes.MIXEDSCRIPT]]" allow-header="المواقع الإلكترونية التي يُسمح لها بعرض المحتوى غير الآمن" block-header="المواقع الإلكترونية التي لا يُسمح لها بعرض المحتوى غير الآمن" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-setting-exceptions category="[[ContentSettingsTypes.MIXEDSCRIPT]]" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/location" no-search="">
        <settings-subpage page-title="الموقع الجغرافي" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>تستخدم المواقع الإلكترونية عادةً موقعك الجغرافي لتتيح ميزات أو معلومات ذات صلة مثل الأخبار المحلية أو المتاجر القريبة.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.GEOLOCATION]]" allow-option-label="السماح للمواقع الإلكترونية بطلب موقعك الجغرافي (مُستحسَن)" allow-option-icon="settings20:location-on" block-option-label="منع المواقع الإلكترونية من الاطّلاع على موقعك الجغرافي" block-option-sub-label="لن تعمل الميزات التي تحتاج إلى موقعك الجغرافي." block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.GEOLOCATION]]" read-only-list="" allow-header="المواقع الإلكترونية التي يُسمح لها بالاطّلاع على موقعك الجغرافي" block-header="المواقع الإلكترونية التي لا يُسمح لها بالاطّلاع على موقعك الجغرافي" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="الحظر" toggle-on-label="اسأل قبل الدخول (موصى به)" category="[[ContentSettingsTypes.GEOLOCATION]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.GEOLOCATION]]" read-only-list="" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/handlers" no-search="">
        <settings-subpage page-title="المعالجات">
          <protocol-handlers toggle-off-label="عدم السماح لأي موقع إلكتروني بمعالجة البروتوكولات" toggle-on-label="السماح للمواقع الإلكترونية بأن تطلب أن تصبح معالجات تلقائية للبروتوكولات (مستحسن)">
          </protocol-handlers>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/zoomLevels" no-search="">
        <settings-subpage page-title="مستويات التكبير أو التصغير">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>يمكنك ضبط مستوى التكبير أو التصغير على بعض المواقع الإلكترونية.</h2>
            </div>
          </template>
          <zoom-levels></zoom-levels>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/pdfDocuments" no-search="">
        <settings-subpage page-title="‏مستندات PDF">
          <settings-pdf-documents prefs="{{prefs}}"></settings-pdf-documents>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/javascript" no-search="">
        <settings-subpage page-title="JavaScript" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>‏تستخدم المواقع الإلكترونية عادةً JavaScript لعرض الميزات التفاعلية، مثل ألعاب الفيديو أو نماذج الويب.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.JAVASCRIPT]]" allow-option-label="‏السماح للمواقع الإلكترونية باستخدام JavaScript (مُستحسَن)" allow-option-icon="settings:code" block-option-label="‏حظر JavaScript" block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.JAVASCRIPT]]" allow-header="‏المواقع الإلكترونية التي يُسمح لها باستخدام JavaScript" block-header="‏المواقع الإلكترونية التي لا يُسمح لها باستخدام JavaScript" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="الحظر" toggle-on-label="مسموح بها (موصى بها)" category="[[ContentSettingsTypes.JAVASCRIPT]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.JAVASCRIPT]]" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/sound" no-search="">
        <settings-subpage page-title="الصوت" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>قد تُشغِّل المواقع الإلكترونية الصوت لتوفير صوت للموسيقى والفيديوهات والوسائط الأخرى.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.SOUND]]" allow-option-label="السماح للمواقع الإلكترونية بتشغيل الصوت (مُستحسَن)" allow-option-icon="settings:volume-up" block-option-label="كتم الصوت" block-option-icon="settings:block">
            </settings-category-default-radio-group>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="كتم صوت المواقع الإلكترونية التي تشغّل الصوت" toggle-on-label="السماح للمواقع الإلكترونية بتشغيل الصوت (موصى به)" category="[[ContentSettingsTypes.SOUND]]">
            </category-default-setting>
          </template>
          <settings-toggle-button id="block-autoplay-setting" class="hr" label="‏السماح لمتصفِّح Chrome باختيار الوقت الذي يمكن للمواقع الإلكترونية تشغيل الصوت فيه (مُوصى به)" pref="{{blockAutoplayStatus_.pref}}" disabled="[[!blockAutoplayStatus_.enabled]]" hidden="[[!enableBlockAutoplayContentSetting_]]" on-settings-boolean-control-change="onBlockAutoplayToggleChange_" no-set-pref="">
          </settings-toggle-button>
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <category-setting-exceptions category="[[ContentSettingsTypes.SOUND]]" allow-header="المواقع الإلكترونية التي يُسمح لها بتشغيل الصوت" block-header="المواقع الإلكترونية التي لا يُسمح لها بتشغيل الصوت" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-setting-exceptions category="[[ContentSettingsTypes.SOUND]]" block-header="كتم الصوت" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/microphone" no-search="">
        <settings-subpage page-title="الميكروفون" search-label="البحث" search-term="{{searchFilter_}}">
          <media-picker label="الميكروفون" type="mic">
          </media-picker>
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>تستخدم المواقع الإلكترونية عادةً الميكروفون لتتيح ميزات التواصل، مثل محادثة الفيديو.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.MIC]]" allow-option-label="السماح للمواقع الإلكترونية بطلب استخدام الميكروفون (مُستحسَن)" allow-option-icon="cr:mic" block-option-label="منع المواقع الإلكترونية من استخدام الميكروفون" block-option-sub-label="لن تعمل الميزات التي تحتاج إلى ميكروفون." block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.MIC]]" read-only-list="" allow-header="المواقع الإلكترونية التي يُسمح لها باستخدام الميكروفون" block-header="المواقع الإلكترونية التي لا يُسمح لها باستخدام الميكروفون" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting category="[[ContentSettingsTypes.MIC]]" toggle-off-label="الحظر" toggle-on-label="اسأل قبل الدخول (موصى به)">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.MIC]]" read-only-list="" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/sensors" no-search="">
        <settings-subpage page-title="مستشعرات الحركة" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>تستخدم المواقع الإلكترونية عادةً مستشعرات الحركة في جهازك لتتيح ميزات مثل الواقع الافتراضي أو حساب عدد الخطوات.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.SENSORS]]" allow-option-label="السماح للمواقع الإلكترونية باستخدام مستشعرات الحركة" allow-option-icon="settings:sensors" block-option-label="حظر المواقع الإلكترونية من استخدام مستشعرات الحركة" block-option-sub-label="لن تعمل الميزات التي تحتاج إلى مستشعرات الحركة." block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.SENSORS]]" read-only-list="" allow-header="المواقع الإلكترونية التي يُسمح لها باستخدام مستشعرات الحركة" block-header="المواقع الإلكترونية التي لا يُسمح لها باستخدام مستشعرات الحركة" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="حظر المواقع الإلكترونية من استخدام مستشعرات الحركة" toggle-on-label="السماح للمواقع الإلكترونية باستخدام مستشعرات الحركة" category="[[ContentSettingsTypes.SENSORS]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.SENSORS]]" read-only-list="" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
     </template>
      <template is="dom-if" route-path="/content/notifications" no-search="">
        <settings-subpage page-title="الإشعارات" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div id="notificationRadioGroup">
              <h2>تُرسِل المواقع الإلكترونية عادةً الإشعارات لإعلامك بالأخبار العاجلة أو رسائل الدردشة.</h2>
              <h2>الإعداد التلقائي</h2>
              <div id="notificationSubHeading" class="secondary">
                ستتبع المواقع الإلكترونية هذا الإعداد تلقائيًا عند زيارتك لها.
              </div>
              <settings-radio-group pref="{{prefs.generated.notification}}" selectable-elements="settings-collapse-radio-button">
                <settings-collapse-radio-button no-collapse="" name="[[notificationSettingEnum_.ASK]]" pref="[[prefs.generated.notification]]" label="السماح للمواقع الإلكترونية بطلب إرسال إشعارات" icon="settings:notifications">
                </settings-collapse-radio-button>
                <template is="dom-if" if="[[enableQuietNotificationPromptsSetting_]]">
                  <settings-collapse-radio-button no-collapse="" class="two-line" name="[[notificationSettingEnum_.QUIETER_MESSAGING]]" pref="[[prefs.generated.notification]]" label="السماح للمواقع الإلكترونية بطلب إرسال إشعارات" sub-label="استخدام طريقة أقل بروزًا لإرسال الإشعارات (مُستحسَن)" icon="settings:notifications">
                  </settings-collapse-radio-button>
                </template>
                <settings-collapse-radio-button no-collapse="" class="two-line" name="[[notificationSettingEnum_.BLOCK]]" pref="[[prefs.generated.notification]]" label="حظر الإشعارات" sub-label="لن تعمل الميزات التي تحتاج إلى الإشعارات." icon="settings:block">
                </settings-collapse-radio-button>
              </settings-radio-group>
            </div>
            <category-setting-exceptions category="[[ContentSettingsTypes.NOTIFICATIONS]]" allow-header="المواقع الإلكترونية التي يُسمح لها بإرسال الإشعارات" block-header="المواقع الإلكترونية التي لا يُسمح لها بإرسال الإشعارات" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <template is="dom-if" if="[[enableQuietNotificationPromptsSetting_]]">
              <category-default-setting toggle-off-label="السماح للمواقع الإلكترونية بطلب إرسال إشعارات" toggle-on-label="السماح للمواقع الإلكترونية بطلب إرسال إشعارات" category="[[ContentSettingsTypes.NOTIFICATIONS]]" sub-option-pref="{{prefs.profile.content_settings.enable_quiet_permission_ui.notifications}}" sub-option-label="استخدام طريقة أقل بروزًا لإرسال الإشعارات (منع رسائل الإشعارات من إزعاجك)" sub-option-mode="pref">
              </category-default-setting>
            </template>
            <template is="dom-if" if="[[!enableQuietNotificationPromptsSetting_]]">
              <category-default-setting toggle-off-label="الإشعارات" toggle-on-label="الإشعارات" toggle-off-description="منع المواقع الإلكترونية من طلب إرسال إشعارات" toggle-on-description="السماح للمواقع الإلكترونية بطلب إرسال إشعارات" category="[[ContentSettingsTypes.NOTIFICATIONS]]" sub-option-mode="none">
              </category-default-setting>
            </template>
            <category-setting-exceptions category="[[ContentSettingsTypes.NOTIFICATIONS]]" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/popups" no-search="">
        <settings-subpage page-title="النوافذ المنبثقة وإعادة التوجيه" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>قد ترسل المواقع الإلكترونية نوافذ منبثقة لعرض الإعلانات أو تستخدم عمليات إعادة التوجيه لتوجيهك إلى مواقع إلكترونية قد لا ترغب في زيارتها.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.POPUPS]]" allow-option-label="السماح للمواقع الإلكترونية بإرسال النوافذ المنبثقة واستخدام عمليات إعادة التوجيه" allow-option-icon="cr:open-in-new" block-option-label="حظر النوافذ المنبثقة وعمليات إعادة التوجيه (مُستحسَن)" block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.POPUPS]]" allow-header="المواقع الإلكترونية التي يُسمح لها بإرسال النوافذ المنبثقة واستخدام عمليات إعادة التوجيه" block-header="المواقع الإلكترونية التي لا يُسمح لها بإرسال النوافذ المنبثقة أو استخدام عمليات إعادة التوجيه" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting category="[[ContentSettingsTypes.POPUPS]]" toggle-off-label="محظور  (موصى به)" toggle-on-label="منح الإذن">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.POPUPS]]" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[enableSafeBrowsingSubresourceFilter_]]" no-search="">
        <template is="dom-if" route-path="/content/ads" no-search="">
          <settings-subpage page-title="الإعلانات" search-label="البحث" search-term="{{searchFilter_}}">
            <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
              <div class="content-settings-header">
                <h2>تعرض المواقع الإلكترونية عادةً الإعلانات لتتمكَّن من توفير محتوى أو خدمات مجانًا، إلا أن بعض المواقع الإلكترونية تُعرَف بعرضها إعلانات مضلِّلة أو غير مرغوب فيها.</h2>
              </div>
              <settings-category-default-radio-group category="[[ContentSettingsTypes.ADS]]" allow-option-label="السماح لجميع المواقع الإلكترونية بعرض أيّ إعلانات لك" allow-option-icon="settings:ads" block-option-label="حظر الإعلانات في المواقع الإلكترونية التي تعرض إعلانات مضلِّلة أو غير مرغوب فيها (مُستحسَن)" block-option-icon="settings:block">
              </settings-category-default-radio-group>
              <category-setting-exceptions category="[[ContentSettingsTypes.ADS]]" read-only-list="" allow-header="المواقع الإلكترونية التي يُسمح لها بعرض كل أنواع الإعلانات" block-header="المواقع الإلكترونية التي لا يُسمح لها بعرض الإعلانات المضلِّلة أو غير المرغوب فيها" search-filter="[[searchFilter_]]">
              </category-setting-exceptions>
            </template>
            <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
              <category-default-setting category="[[ContentSettingsTypes.ADS]]" toggle-off-label="تم حظر الإعلانات على المواقع الإلكترونية التي تعرض إعلانات مضلِّلة أو غير مرغوب فيها (مُستحسَن)" toggle-on-label="منح الإذن">
              </category-default-setting>
              <category-setting-exceptions category="[[ContentSettingsTypes.ADS]]" read-only-list="" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
              </category-setting-exceptions>
            </template>
          </settings-subpage>
       </template>
     </template>
      <template is="dom-if" route-path="/content/midiDevices" no-search="">
        <settings-subpage page-title="‏أجهزة MIDI" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>‏تتّصل المواقع الإلكترونية عادةً بأجهزة MIDI لتتيح ميزات إنشاء الموسيقى وتعديلها.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.MIDI_DEVICES]]" allow-option-label="‏السماح للمواقع الإلكترونية بطلب الاتصال بأجهزة MIDI" allow-option-icon="settings:midi" block-option-label="‏منع المواقع الإلكترونية من الاتصال بأجهزة MIDI" block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.MIDI_DEVICES]]" read-only-list="" allow-header="‏المواقع الإلكترونية التي يُسمح لها بالاتصال بأجهزة MIDI" block-header="‏المواقع الإلكترونية التي لا يُسمح لها بالاتصال بأجهزة MIDI" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="‏عدم السماح لأي موقع إلكتروني باستخدام الرسائل الحصرية في النظام للدخول إلى أجهزة MIDI" toggle-on-label="‏طلب الإذن عند محاولة أحد المواقع استخدام رسائل حصرية للنظام للوصول إلى أجهزة MIDI (موصى به)" category="[[ContentSettingsTypes.MIDI_DEVICES]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.MIDI_DEVICES]]" read-only-list="" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/usbDevices" no-search="">
        <settings-subpage page-title="‏أجهزة USB">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>‏تتّصل المواقع الإلكترونية عادةً بأجهزة USB لتتيح ميزات مثل طباعة مستند أو حفظ مستند على جهاز تخزين.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.USB_DEVICES]]" allow-option-label="‏السماح للمواقع الإلكترونية بطلب الاتصال بأجهزة USB" allow-option-icon="settings:usb" block-option-label="‏منع المواقع الإلكترونية من الاتصال بأجهزة USB" block-option-icon="settings:block">
            </settings-category-default-radio-group>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="‏عدم السماح لأي موقع إلكتروني بالوصول إلى أجهزة USB" toggle-on-label="‏طلب الإذن في حال محاولة أحد المواقع الوصول إلى أجهزة USB (مُوصى به)" category="[[ContentSettingsTypes.USB_DEVICES]]">
            </category-default-setting>
          </template>
          <chooser-exception-list category="[[ContentSettingsTypes.USB_DEVICES]]" chooser-type="[[ChooserType.USB_DEVICES]]">
          </chooser-exception-list>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/serialPorts" no-search="">
        <settings-subpage page-title="المنافذ التسلسلية">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>تتّصل المواقع الإلكترونية عادةً بأجهزة تسلسلية لتتيح ميزات نقل البيانات، مثل إعداد شبكة الإنترنت.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.SERIAL_PORTS]]" allow-option-label="السماح للمواقع الإلكترونية بطلب الاتصال بأجهزة تسلسلية" allow-option-icon="settings:serial-port" block-option-label="منع المواقع الإلكترونية من الاتصال بأجهزة تسلسلية" block-option-icon="settings:block">
            </settings-category-default-radio-group>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="عدم السماح لأي موقع إلكتروني بالوصول إلى المنافذ التسلسلية" toggle-on-label="طلب الإذن في حال محاولة موقع إلكتروني الوصول إلى المنافذ التسلسلية (مُستحسَن)" category="[[ContentSettingsTypes.SERIAL_PORTS]]">
            </category-default-setting>
          </template>
          <chooser-exception-list category="[[ContentSettingsTypes.SERIAL_PORTS]]" chooser-type="[[ChooserType.SERIAL_PORTS]]">
          </chooser-exception-list>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[enableWebBluetoothNewPermissionsBackend_]]">
        <template is="dom-if" route-path="/content/bluetoothDevices" no-search="">
          <settings-subpage page-title="أجهزة بلوتوث">
            <category-default-setting toggle-off-label="عدم السماح لأي موقع إلكتروني بالوصول إلى أجهزة البلوتوث" toggle-on-label="طلب الإذن عند محاولة موقع إلكتروني الوصول إلى أجهزة البلوتوث (مقترَح)" category="[[ContentSettingsTypes.BLUETOOTH_DEVICES]]">
            </category-default-setting>
            <chooser-exception-list category="[[ContentSettingsTypes.BLUETOOTH_DEVICES]]" chooser-type="[[ChooserType.BLUETOOTH_DEVICES]]">
            </chooser-exception-list>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" route-path="/content/filesystem" no-search="">
        <settings-subpage page-title="تعديل الملف">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>تطلب المواقع الإلكترونية عادةً الوصول إلى الملفات والمجلدات على جهازك لتتيح ميزات مثل حفظ عملك تلقائيًا.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.FILE_SYSTEM_WRITE]]" allow-option-label="السماح للمواقع إلكترونية بطلب تعديل الملفات أو المجلدات على جهازك (مُستحسَن)" allow-option-icon="settings:save-original" block-option-label="منع المواقع الإلكترونية من تعديل الملفات والمجلدات على جهازك" block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.FILE_SYSTEM_WRITE]]" read-only-list="" block-header="المواقع الإلكترونية التي لا يُسمح لها بتعديل الملفات والمجلدات على جهازك" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="عدم السماح لأي مواقع إلكترونية بتعديل الملفات والمجلدات على أجهزتك" toggle-on-label="طلب الإذن عند محاولة موقع إلكتروني تعديل الملفات والمجلدات على أجهزتك (مقترَح)" category="[[ContentSettingsTypes.FILE_SYSTEM_WRITE]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.FILE_SYSTEM_WRITE]]" read-only-list="" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/hidDevices" no-search="">
        <settings-subpage page-title="‏أجهزة HID">
          <category-default-setting toggle-off-label="‏عدم السماح لأي موقع إلكتروني بالوصول إلى أجهزة HID" toggle-on-label="‏السؤال عند محاولة موقع إلكتروني الوصول إلى أجهزة HID (مُوصى به)" category="[[ContentSettingsTypes.HID_DEVICES]]">
          </category-default-setting>
          <chooser-exception-list category="[[ContentSettingsTypes.HID_DEVICES]]" chooser-type="[[ChooserType.HID_DEVICES]]">
          </chooser-exception-list>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/siteDetails" no-search="">
        <settings-subpage page-title="[[pageTitle]]">
          <site-details page-title="{{pageTitle}}" block-autoplay-enabled="[[blockAutoplayStatus_.pref.value]]">
          </site-details>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/cookies/detail" no-search="">
        <settings-subpage page-title="[[pageTitle]]">
          <cr-button slot="subpage-title-extra" on-click="onRemoveAllCookiesFromSite_">
            إزالة كلمات المرور كلّها
          </cr-button>
          <site-data-details-subpage page-title="{{pageTitle}}">
          </site-data-details-subpage>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/protectedContent" no-search="">

        <settings-subpage page-title="المحتوى المحمي">


          <settings-toggle-button pref="{{prefs.webkit.webprefs.encrypted_media_enabled}}" label="[[getProtectedContentLabel_(
                  prefs.webkit.webprefs.encrypted_media_enabled.value)]]" disabled$="[[isGuest_]]">
          </settings-toggle-button>

          <div class="cr-row first two-line cr-padded-text">
            تستخدم بعض خدمات المحتوى مُعرّفات فريدةً لأغراض تتعلق بالسماح بالدخول إلى المحتوى المحمي
          </div>
          <settings-toggle-button pref="{{prefs.settings.privacy.drm_enabled}}" label="[[getProtectedContentIdentifiersLabel_(
                  prefs.settings.privacy.drm_enabled.value)]]" disabled$="[[isGuest_]]">
          </settings-toggle-button>


        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/clipboard" no-search="">
        <settings-subpage page-title="الحافظة" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>تقرأ المواقع الإلكترونية عادةً الحافظة لتتيح ميزات، مثل الحفاظ على صيغة النص الذي نسخته.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.CLIPBOARD]]" allow-option-label="السماح للمواقع الإلكترونية بطلب الاطّلاع على النصوص والصور التي تم نسخها إلى الحافظة" allow-option-icon="settings:clipboard" block-option-label="منع المواقع الإلكترونية من الاطّلاع على النص والصور التي تم نسخها إلى الحافظة" block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.CLIPBOARD]]" allow-header="المواقع الإلكترونية التي يُسمح لها بالاطّلاع على الحافظة" block-header="المواقع الإلكترونية التي لا يُسمح لها بالاطّلاع على الحافظة" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="عدم السماح للمواقع الإلكترونية بالاطّلاع على النصوص والصور التي تم نسخها إلى الحافظة" toggle-on-label="طلب الإذن عند محاولة أحد المواقع الاطلاع على النصوص والصور التي تم نسخها إلى الحافظة (موصى به)" category="[[ContentSettingsTypes.CLIPBOARD]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.CLIPBOARD]]" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[enablePaymentHandlerContentSetting_]]">
        <template is="dom-if" route-path="/content/paymentHandler" no-search="">
          <settings-subpage page-title="معالجات الدفع" search-label="البحث" search-term="{{searchFilter_}}">
            <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
              <div class="content-settings-header">
                <h2>تعمل المواقع الإلكترونية عادةً على تثبيت معالجات الدفع لتتيح ميزات التسوّق، مثل الدفع بسهولة.</h2>
              </div>
              <settings-category-default-radio-group category="[[ContentSettingsTypes.PAYMENT_HANDLER]]" allow-option-label="السماح للمواقع الإلكترونية بتثبيت معالجات الدفع (مُستحسَن)" allow-option-icon="settings:payment-handler" block-option-label="حظر معالجات الدفع" block-option-icon="settings:block">
              </settings-category-default-radio-group>
              <category-setting-exceptions category="[[ContentSettingsTypes.PAYMENT_HANDLER]]" allow-header="المواقع الإلكترونية التي يُسمح لها بتثبيت معالجات الدفع" block-header="المواقع الإلكترونية التي لا يُسمح لها بتثبيت معالجات الدفع" search-filter="[[searchFilter_]]">
              </category-setting-exceptions>
            </template>
            <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
              <category-default-setting toggle-off-label="عدم السماح لأي موقع بتثبيت معالجات الدفع" toggle-on-label="السماح للمواقع الإلكترونية بتثبيت معالجات الدفع (مستحسن)" category="[[ContentSettingsTypes.PAYMENT_HANDLER]]">
              </category-default-setting>
              <category-setting-exceptions category="[[ContentSettingsTypes.PAYMENT_HANDLER]]" block-header="الحظر" allow-header="سماح" search-filter="[[searchFilter_]]">
              </category-setting-exceptions>
            </template>
          </settings-subpage>
       </template>
      </template>
      <template is="dom-if" if="[[enableExperimentalWebPlatformFeatures_]]">
        <template is="dom-if" route-path="/content/bluetoothScanning" no-search="">
          <settings-subpage page-title="البحث عن بلوتوث" search-label="البحث" search-term="{{searchFilter_}}">
            <category-default-setting toggle-off-label="عدم السماح لأي موقع إلكتروني بالعثور على أجهزة البلوتوث المجاورة" toggle-on-label="طلب الإذن عند محاولة موقع إلكتروني العثور على أجهزة البلوتوث المجاورة (إجراء موصَى به)" category="[[ContentSettingsTypes.BLUETOOTH_SCANNING]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.BLUETOOTH_SCANNING]]" read-only-list="" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" route-path="/content/vr" no-search="">
        <settings-subpage page-title="الواقع الافتراضي" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>تستخدم المواقع الإلكترونية عادةً أجهزة الواقع الافتراضي وبياناتها للسماح لك بالدخول إلى جلسات الواقع الافتراضي.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.VR]]" allow-option-label="السماح للمواقع الإلكترونية بطلب استخدام أجهزة الواقع الافتراضي وبياناتها" allow-option-icon="settings:vr-headset" block-option-label="منع المواقع الإلكترونية من استخدام أجهزة الواقع الافتراضي وبياناتها" block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.VR]]" read-only-list="" allow-header="المواقع الإلكترونية التي يُسمح لها باستخدام أجهزة الواقع الافتراضي وبياناتها" block-header="المواقع الإلكترونية التي لا يُسمح لها باستخدام أجهزة الواقع الافتراضي وبياناتها" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="عدم السماح للمواقع الإلكترونية باستخدام أجهزة الواقع الافتراضي وبياناتها" toggle-on-label="طلب الإذن عندما يحاول موقع إلكتروني استخدام أجهزة الواقع الافتراضي وبياناتها (إعداد مقترَح)" category="[[ContentSettingsTypes.VR]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.VR]]" read-only-list="" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/ar" no-search="">
        <settings-subpage page-title="الواقع المعزّز" search-label="البحث" search-term="{{searchFilter_}}">
          <template is="dom-if" if="[[enableContentSettingsRedesign_]]">
            <div class="content-settings-header">
              <h2>تتبّع المواقع الإلكترونية عادةً موضع الكاميرا لتتيح ميزات الواقع المعزّز، مثل اتجاهات الألعاب أو التنبيه.</h2>
            </div>
            <settings-category-default-radio-group category="[[ContentSettingsTypes.AR]]" allow-option-label="السماح للمواقع الإلكترونية بتتبُّع موضع الكاميرا" allow-option-icon="settings:vr-headset" block-option-label="منع المواقع الإلكترونية من تتبُّع موضع الكاميرا" block-option-icon="settings:block">
            </settings-category-default-radio-group>
            <category-setting-exceptions category="[[ContentSettingsTypes.AR]]" read-only-list="" allow-header="المواقع الإلكترونية التي يُسمح لها بتتبّع موضع الكاميرا" block-header="المواقع الإلكترونية التي لا يُسمح لها بتتبّع موضع الكاميرا" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
          <template is="dom-if" if="[[!enableContentSettingsRedesign_]]">
            <category-default-setting toggle-off-label="عدم السماح للمواقع الإلكترونية بإنشاء خريطة ثلاثية الأبعاد للبيئة المحيطة بك أو تتبُّع موضع الكاميرا" toggle-on-label="طلب الإذن عند محاولة موقع إلكتروني إنشاء خريطة ثلاثية الأبعاد للبيئة المحيطة بك أو تتبُّع موضع الكاميرا (مقترَح)" category="[[ContentSettingsTypes.AR]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.AR]]" read-only-list="" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </template>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/content/idleDetection" no-search="">
        <settings-subpage page-title="متى تستخدم جهازك" search-label="البحث" search-term="{{searchFilter_}}">
          <category-default-setting toggle-off-label="منع المواقع الإلكترونية من معرفة متى تستخدم الجهاز" toggle-on-label="طلب الإذن عند محاولة موقع إلكتروني معرفة متى تستخدم الجهاز" category="[[ContentSettingsTypes.IDLE_DETECTION]]">
          </category-default-setting>
          <category-setting-exceptions category="[[ContentSettingsTypes.IDLE_DETECTION]]" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
          </category-setting-exceptions>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[enableExperimentalWebPlatformFeatures_]]">
        <template is="dom-if" route-path="/content/windowPlacement" no-search="">
          <settings-subpage page-title="موضِع النافذة" search-label="البحث" search-term="{{searchFilter_}}">
            <category-default-setting toggle-off-label="منع المواقع من فتح النوافذ ووضعها على شاشتك" toggle-on-label="السؤال عند محاولة موقع إلكتروني فتح النوافذ ووضعها على شاشتك (إعداد مُستحسَن)" category="[[ContentSettingsTypes.WINDOW_PLACEMENT]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.WINDOW_PLACEMENT]]" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </settings-subpage>
        </template>
      </template>
      <template is="dom-if" if="[[enableFontAccessContentSetting_]]">
        <template is="dom-if" route-path="/content/fontAccess" no-search="">
          <settings-subpage page-title="الخطوط" search-label="البحث" search-term="{{searchFilter_}}">
            <category-default-setting toggle-off-label="حظر المواقع الإلكترونية من استخدام الخطوط المثبّتة على جهازك" toggle-on-label="طلب الإذن عند محاولة موقع إلكتروني استخدام الخطوط المثبّتة على جهازك" category="[[ContentSettingsTypes.FONT_ACCESS]]">
            </category-default-setting>
            <category-setting-exceptions category="[[ContentSettingsTypes.FONT_ACCESS]]" block-header="حظر" allow-header="سماح" search-filter="[[searchFilter_]]">
            </category-setting-exceptions>
          </settings-subpage>
        </template>
      </template>
    </settings-animated-pages>
<!--_html_template_end_-->`,behaviors:[PrefsBehavior,RouteObserverBehavior,I18nBehavior,WebUIListenerBehavior],properties:{prefs:{type:Object,notify:true},isGuest_:{type:Boolean,value(){return loadTimeData.getBoolean("isGuest")}},showClearBrowsingDataDialog_:Boolean,enableSafeBrowsingSubresourceFilter_:{type:Boolean,value(){return loadTimeData.getBoolean("enableSafeBrowsingSubresourceFilter")}},cookieSettingDescription_:String,enableBlockAutoplayContentSetting_:{type:Boolean,value(){return loadTimeData.getBoolean("enableBlockAutoplayContentSetting")}},blockAutoplayStatus_:{type:Object,value(){return{}}},enableContentSettingsRedesign_:{type:Boolean,value(){return loadTimeData.getBoolean("enableContentSettingsRedesign")}},enablePaymentHandlerContentSetting_:{type:Boolean,value(){return loadTimeData.getBoolean("enablePaymentHandlerContentSetting")}},enableExperimentalWebPlatformFeatures_:{type:Boolean,value(){return loadTimeData.getBoolean("enableExperimentalWebPlatformFeatures")}},enableSecurityKeysSubpage_:{type:Boolean,readOnly:true,value(){return loadTimeData.getBoolean("enableSecurityKeysSubpage")}},enableFontAccessContentSetting_:{type:Boolean,value(){return loadTimeData.getBoolean("enableFontAccessContentSetting")}},enableQuietNotificationPromptsSetting_:{type:Boolean,value:()=>loadTimeData.getBoolean("enableQuietNotificationPromptsSetting")},enableWebBluetoothNewPermissionsBackend_:{type:Boolean,value:()=>loadTimeData.getBoolean("enableWebBluetoothNewPermissionsBackend")},enablePrivacySandboxSettings_:{type:Boolean,value:()=>loadTimeData.getBoolean("privacySandboxSettingsEnabled")},focusConfig_:{type:Object,value(){const map=new Map;if(routes.SECURITY){map.set(routes.SECURITY.path,"#securityLinkRow")}if(routes.COOKIES){map.set(`${routes.COOKIES.path}_${routes.PRIVACY.path}`,"#cookiesLinkRow");map.set(`${routes.COOKIES.path}_${routes.BASIC.path}`,"#cookiesLinkRow")}if(routes.SITE_SETTINGS){map.set(routes.SITE_SETTINGS.path,"#permissionsLinkRow")}return map}},notificationSettingEnum_:{type:Object,value:NotificationSetting},searchFilter_:String,siteDataFilter_:String},browserProxy_:null,metricsBrowserProxy_:null,ready(){this.ContentSettingsTypes=ContentSettingsTypes;this.ChooserType=ChooserType;this.browserProxy_=PrivacyPageBrowserProxyImpl.getInstance();this.metricsBrowserProxy_=MetricsBrowserProxyImpl.getInstance();this.onBlockAutoplayStatusChanged_({pref:{value:false},enabled:false});this.addWebUIListener("onBlockAutoplayStatusChanged",this.onBlockAutoplayStatusChanged_.bind(this));SiteSettingsPrefsBrowserProxyImpl.getInstance().getCookieSettingDescription().then((description=>this.cookieSettingDescription_=description));this.addWebUIListener("cookieSettingDescriptionChanged",(description=>this.cookieSettingDescription_=description))},currentRouteChanged(){this.showClearBrowsingDataDialog_=Router.getInstance().getCurrentRoute()===routes.CLEAR_BROWSER_DATA},onBlockAutoplayStatusChanged_(autoplayStatus){this.blockAutoplayStatus_=autoplayStatus},onBlockAutoplayToggleChange_(event){const target=event.target;this.browserProxy_.setBlockAutoplayEnabled(target.checked)},onRemoveAllCookiesFromSite_(){const node=this.$$("site-data-details-subpage");if(node){node.removeAll()}},onClearBrowsingDataTap_(){this.tryShowHatsSurvey_();Router.getInstance().navigateTo(routes.CLEAR_BROWSER_DATA)},onCookiesClick_(){this.tryShowHatsSurvey_();Router.getInstance().navigateTo(routes.COOKIES)},onDialogClosed_(){Router.getInstance().navigateTo(assert(routes.CLEAR_BROWSER_DATA.parent));setTimeout((()=>{focusWithoutInk(assert(this.$$("#clearBrowsingData")))}))},onPermissionsPageClick_(){this.tryShowHatsSurvey_();Router.getInstance().navigateTo(routes.SITE_SETTINGS)},onSecurityPageClick_(){this.tryShowHatsSurvey_();this.metricsBrowserProxy_.recordAction("SafeBrowsing.Settings.ShowedFromParentSettings");Router.getInstance().navigateTo(routes.SECURITY)},onPrivacySandboxClick_(){window.location="chrome://settings/privacySandbox"},getProtectedContentLabel_(value){return value?this.i18n("siteSettingsProtectedContentEnable"):this.i18n("siteSettingsBlocked")},getProtectedContentIdentifiersLabel_(value){return value?this.i18n("siteSettingsProtectedContentEnableIdentifiers"):this.i18n("siteSettingsBlocked")},tryShowHatsSurvey_(){HatsBrowserProxyImpl.getInstance().tryShowSurvey()}});// Copyright 2020 The Chromium Authors. All rights reserved.
const SafetyCheckCallbackConstants={PARENT_CHANGED:"safety-check-parent-status-changed",UPDATES_CHANGED:"safety-check-updates-status-changed",PASSWORDS_CHANGED:"safety-check-passwords-status-changed",SAFE_BROWSING_CHANGED:"safety-check-safe-browsing-status-changed",EXTENSIONS_CHANGED:"safety-check-extensions-status-changed",CHROME_CLEANER_CHANGED:"safety-check-chrome-cleaner-status-changed"};const SafetyCheckParentStatus={BEFORE:0,CHECKING:1,AFTER:2};const SafetyCheckUpdatesStatus={CHECKING:0,UPDATED:1,UPDATING:2,RELAUNCH:3,DISABLED_BY_ADMIN:4,FAILED_OFFLINE:5,FAILED:6,UNKNOWN:7};const SafetyCheckPasswordsStatus={CHECKING:0,SAFE:1,COMPROMISED:2,OFFLINE:3,NO_PASSWORDS:4,SIGNED_OUT:5,QUOTA_LIMIT:6,ERROR:7,FEATURE_UNAVAILABLE:8,WEAK_PASSWORDS_EXIST:9};const SafetyCheckSafeBrowsingStatus={CHECKING:0,ENABLED:1,DISABLED:2,DISABLED_BY_ADMIN:3,DISABLED_BY_EXTENSION:4,ENABLED_STANDARD:5,ENABLED_ENHANCED:6,ENABLED_STANDARD_AVAILABLE_ENHANCED:7};const SafetyCheckExtensionsStatus={CHECKING:0,ERROR:1,NO_BLOCKLISTED_EXTENSIONS:2,BLOCKLISTED_ALL_DISABLED:3,BLOCKLISTED_REENABLED_ALL_BY_USER:4,BLOCKLISTED_REENABLED_SOME_BY_USER:5,BLOCKLISTED_REENABLED_ALL_BY_ADMIN:6};const SafetyCheckChromeCleanerStatus={HIDDEN:0,CHECKING:1,INFECTED:2,REBOOT_REQUIRED:3,SCANNING_FOR_UWS:4,REMOVING_UWS:5,DISABLED_BY_ADMIN:6,ERROR:7,NO_UWS_FOUND_WITH_TIMESTAMP:8,NO_UWS_FOUND_WITHOUT_TIMESTAMP:9};class SafetyCheckBrowserProxy{runSafetyCheck(){}getParentRanDisplayString(){}}class SafetyCheckBrowserProxyImpl{runSafetyCheck(){chrome.send("performSafetyCheck")}getParentRanDisplayString(){return sendWithPromise("getSafetyCheckRanDisplayString")}}addSingletonGetter(SafetyCheckBrowserProxyImpl);// Copyright 2020 The Chromium Authors. All rights reserved.
const SafetyCheckIconStatus={RUNNING:0,SAFE:1,INFO:2,WARNING:3};Polymer({is:"settings-safety-check-child",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-safety-check-child">:host([row-clickable]) .cr-row {
  cursor: pointer;
}

:host([row-clickable]) #managedIcon {
  padding-inline-end: 0;
}

iron-icon {
  display: flex;
    flex-shrink: 0;
    padding-inline-end: var(--cr-icon-button-margin-start);
    width: var(--cr-link-row-icon-width, var(--cr-icon-size));
}

.icon-blue {
  fill: var(--google-blue-600);
}

.icon-red {
  fill: var(--google-red-600);
}

@media (prefers-color-scheme: dark) {
.icon-blue {
  fill: var(--google-blue-refresh-300);
}

.icon-red {
  fill: var(--google-red-refresh-300);
}

}

</style>
<div class="cr-row">
  <iron-icon id="statusIcon" icon="[[getStatusIcon_(iconStatus)]]" src="[[getStatusIconSrc_(iconStatus)]]" class$="[[getStatusIconClass_(iconStatus)]]" role="img" aria-label="[[getStatusIconAriaLabel_(iconStatus)]]">
  </iron-icon>
  <div class="flex cr-padded-text">
    <div id="label">[[label]]</div>
    <div id="subLabel" class="secondary" no-search="" inner-h-t-m-l="[[subLabel]]">
    </div>
  </div>
  <template is="dom-if" if="[[showButton_(buttonLabel)]]" restamp="">
    <cr-button id="button" class$="[[buttonClass]]" on-click="onButtonClick_" aria-label="[[buttonAriaLabel]]" no-search="">
      [[buttonLabel]]
    </cr-button>
  </template>
  <template is="dom-if" if="[[showManagedIcon_(managedIcon)]]">
    <iron-icon id="managedIcon" icon="[[managedIcon]]" aria-hidden="true">
    </iron-icon>
  </template>
  <template is="dom-if" if="[[rowClickable]]">
    <cr-icon-button id="rowClickableIndicator" iron-icon="[[rowClickableIcon_]]" aria-describedby="subLabel" aria-labelledby="label" aria-roledescription$="[[getRoleDescription_(rowClickableIcon_)]]">
    </cr-icon-button>
  </template>
</div>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{iconStatus:{type:Number,value:SafetyCheckIconStatus.RUNNING},label:String,subLabel:String,buttonLabel:String,buttonAriaLabel:String,buttonClass:String,rowClickable:{type:Boolean,value:false,reflectToAttribute:true},external:{type:Boolean,value:false},rowClickableIcon_:{type:String,computed:"computeRowClickableIcon_(external)"},managedIcon:String},getStatusIcon_:function(){switch(this.iconStatus){case SafetyCheckIconStatus.RUNNING:return null;case SafetyCheckIconStatus.SAFE:return"cr:check";case SafetyCheckIconStatus.INFO:return"cr:info";case SafetyCheckIconStatus.WARNING:return"cr:warning";default:assertNotReached()}},getStatusIconSrc_:function(){if(this.iconStatus===SafetyCheckIconStatus.RUNNING){return"chrome://resources/images/throbber_small.svg"}return null},getStatusIconClass_:function(){switch(this.iconStatus){case SafetyCheckIconStatus.RUNNING:case SafetyCheckIconStatus.SAFE:return"icon-blue";case SafetyCheckIconStatus.WARNING:return"icon-red";default:return""}},getStatusIconAriaLabel_:function(){switch(this.iconStatus){case SafetyCheckIconStatus.RUNNING:return this.i18n("safetyCheckIconRunningAriaLabel");case SafetyCheckIconStatus.SAFE:return this.i18n("safetyCheckIconSafeAriaLabel");case SafetyCheckIconStatus.INFO:return this.i18n("safetyCheckIconInfoAriaLabel");case SafetyCheckIconStatus.WARNING:return this.i18n("safetyCheckIconWarningAriaLabel");default:assertNotReached()}},showButton_:function(){return!!this.buttonLabel},onButtonClick_:function(){this.fire("button-click")},showManagedIcon_:function(){return!!this.managedIcon},computeRowClickableIcon_(){return this.external?"cr:open-in-new":"cr:arrow-right"},getRoleDescription_(){return this.rowClickableIcon_==="cr:arrow-right"?this.i18n("subpageArrowRoleDescription"):""}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-safety-check-extensions-child",_template:html`<!--css-build:shadow--><!--_html_template_start_--><settings-safety-check-child id="safetyCheckChild" icon-status="[[getIconStatus_(status_)]]" label="الإضافات" sub-label="[[displayString_]]" button-label="[[getButtonLabel_(status_)]]" button-aria-label="مراجعة الإضافات" button-class="action-button" on-button-click="onButtonClick_" on-click="onRowClick_" row-clickable="[[isRowClickable_(status_)]]" external="" managed-icon="[[getManagedIcon_(status_)]]">
</settings-safety-check-child>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{status_:{type:Number,value:SafetyCheckExtensionsStatus.CHECKING},displayString_:String,rowClickableStatuses:{readOnly:true,type:Object,value:()=>new Set([SafetyCheckExtensionsStatus.NO_BLOCKLISTED_EXTENSIONS,SafetyCheckExtensionsStatus.ERROR,SafetyCheckExtensionsStatus.BLOCKLISTED_ALL_DISABLED,SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_ALL_BY_ADMIN])}},metricsBrowserProxy_:null,attached:function(){this.metricsBrowserProxy_=MetricsBrowserProxyImpl.getInstance();this.addWebUIListener(SafetyCheckCallbackConstants.EXTENSIONS_CHANGED,this.onSafetyCheckExtensionsChanged_.bind(this))},onSafetyCheckExtensionsChanged_:function(event){this.status_=event.newState;this.displayString_=event.displayString},getIconStatus_:function(){switch(this.status_){case SafetyCheckExtensionsStatus.CHECKING:return SafetyCheckIconStatus.RUNNING;case SafetyCheckExtensionsStatus.ERROR:case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_ALL_BY_ADMIN:return SafetyCheckIconStatus.INFO;case SafetyCheckExtensionsStatus.NO_BLOCKLISTED_EXTENSIONS:case SafetyCheckExtensionsStatus.BLOCKLISTED_ALL_DISABLED:return SafetyCheckIconStatus.SAFE;case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_ALL_BY_USER:case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_SOME_BY_USER:return SafetyCheckIconStatus.WARNING;default:assertNotReached()}},getButtonLabel_:function(){switch(this.status_){case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_ALL_BY_USER:case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_SOME_BY_USER:return this.i18n("safetyCheckReview");default:return null}},onButtonClick_:function(){this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(SafetyCheckInteractions.EXTENSIONS_REVIEW);this.metricsBrowserProxy_.recordAction("Settings.SafetyCheck.ReviewExtensions");this.openExtensionsPage_()},getManagedIcon_:function(){switch(this.status_){case SafetyCheckExtensionsStatus.BLOCKLISTED_REENABLED_ALL_BY_ADMIN:return"cr20:domain";default:return null}},isRowClickable_:function(){return this.rowClickableStatuses.has(this.status_)},onRowClick_:function(){if(this.isRowClickable_()){this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(SafetyCheckInteractions.EXTENSIONS_CARET_NAVIGATION);this.metricsBrowserProxy_.recordAction("Settings.SafetyCheck.ReviewExtensionsThroughCaretNavigation");this.openExtensionsPage_()}},openExtensionsPage_:function(){OpenWindowProxyImpl.getInstance().openURL("chrome://extensions")}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-safety-check-passwords-child",_template:html`<!--css-build:shadow--><!--_html_template_start_--><settings-safety-check-child id="safetyCheckChild" icon-status="[[getIconStatus_(status_)]]" label="كلمات المرور" sub-label="[[displayString_]]" button-label="[[getButtonLabel_(status_)]]" button-aria-label="مراجعة كلمات المرور" button-class="action-button" on-button-click="onButtonClick_" on-click="onRowClick_" row-clickable="[[isRowClickable_(status_)]]">
</settings-safety-check-child>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{status_:{type:Number,value:SafetyCheckPasswordsStatus.CHECKING},displayString_:String,rowClickableStatuses:{readOnly:true,type:Object,value:()=>new Set([SafetyCheckPasswordsStatus.SAFE,SafetyCheckPasswordsStatus.QUOTA_LIMIT,SafetyCheckPasswordsStatus.ERROR,SafetyCheckPasswordsStatus.WEAK_PASSWORDS_EXIST])}},metricsBrowserProxy_:null,attached:function(){this.metricsBrowserProxy_=MetricsBrowserProxyImpl.getInstance();this.addWebUIListener(SafetyCheckCallbackConstants.PASSWORDS_CHANGED,this.onSafetyCheckPasswordsChanged_.bind(this))},onSafetyCheckPasswordsChanged_:function(event){this.status_=event.newState;this.displayString_=event.displayString},getIconStatus_:function(){switch(this.status_){case SafetyCheckPasswordsStatus.CHECKING:return SafetyCheckIconStatus.RUNNING;case SafetyCheckPasswordsStatus.SAFE:return SafetyCheckIconStatus.SAFE;case SafetyCheckPasswordsStatus.COMPROMISED:return SafetyCheckIconStatus.WARNING;case SafetyCheckPasswordsStatus.OFFLINE:case SafetyCheckPasswordsStatus.NO_PASSWORDS:case SafetyCheckPasswordsStatus.SIGNED_OUT:case SafetyCheckPasswordsStatus.QUOTA_LIMIT:case SafetyCheckPasswordsStatus.ERROR:case SafetyCheckPasswordsStatus.FEATURE_UNAVAILABLE:case SafetyCheckPasswordsStatus.WEAK_PASSWORDS_EXIST:return SafetyCheckIconStatus.INFO;default:assertNotReached()}},getButtonLabel_:function(){switch(this.status_){case SafetyCheckPasswordsStatus.COMPROMISED:return this.i18n("safetyCheckReview");default:return null}},onButtonClick_:function(){this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(SafetyCheckInteractions.PASSWORDS_MANAGE_COMPROMISED_PASSWORDS);this.metricsBrowserProxy_.recordAction("Settings.SafetyCheck.ManagePasswords");this.openPasswordCheckPage_()},isRowClickable_:function(){return this.rowClickableStatuses.has(this.status_)},onRowClick_:function(){if(this.isRowClickable_()){this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(this.status_===SafetyCheckPasswordsStatus.WEAK_PASSWORDS_EXIST?SafetyCheckInteractions.PASSWORDS_MANAGE_WEAK_PASSWORDS:SafetyCheckInteractions.PASSWORDS_CARET_NAVIGATION);this.metricsBrowserProxy_.recordAction(this.status_===SafetyCheckPasswordsStatus.WEAK_PASSWORDS_EXIST?"Settings.SafetyCheck.ManageWeakPasswords":"Settings.SafetyCheck.ManagePasswordsThroughCaretNavigation");this.openPasswordCheckPage_()}},openPasswordCheckPage_:function(){Router.getInstance().navigateTo(routes.CHECK_PASSWORDS,null,true);PasswordManagerImpl.getInstance().recordPasswordCheckReferrer(PasswordManagerProxy.PasswordCheckReferrer.SAFETY_CHECK)}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-safety-check-safe-browsing-child",_template:html`<!--css-build:shadow--><!--_html_template_start_--><settings-safety-check-child id="safetyCheckChild" icon-status="[[getIconStatus_(status_)]]" label="التصفح الآمن" sub-label="[[displayString_]]" button-label="[[getButtonLabel_(status_)]]" button-aria-label="إدارة &quot;التصّفح الآمن&quot;" button-class="action-button" on-button-click="onButtonClick_" on-click="onRowClick_" row-clickable="[[isRowClickable_(status_)]]" managed-icon="[[getManagedIcon_(status_)]]" "="">
</settings-safety-check-child>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{status_:{type:Number,value:SafetyCheckSafeBrowsingStatus.CHECKING},displayString_:String,rowClickableStatuses:{readOnly:true,type:Object,value:()=>new Set([SafetyCheckSafeBrowsingStatus.ENABLED_STANDARD,SafetyCheckSafeBrowsingStatus.ENABLED_ENHANCED,SafetyCheckSafeBrowsingStatus.ENABLED_STANDARD_AVAILABLE_ENHANCED,SafetyCheckSafeBrowsingStatus.DISABLED_BY_ADMIN,SafetyCheckSafeBrowsingStatus.DISABLED_BY_EXTENSION])}},metricsBrowserProxy_:null,attached:function(){this.metricsBrowserProxy_=MetricsBrowserProxyImpl.getInstance();this.addWebUIListener(SafetyCheckCallbackConstants.SAFE_BROWSING_CHANGED,this.onSafetyCheckSafeBrowsingChanged_.bind(this))},onSafetyCheckSafeBrowsingChanged_:function(event){this.displayString_=event.displayString;this.status_=event.newState},getIconStatus_:function(){switch(this.status_){case SafetyCheckSafeBrowsingStatus.CHECKING:return SafetyCheckIconStatus.RUNNING;case SafetyCheckSafeBrowsingStatus.ENABLED_STANDARD:case SafetyCheckSafeBrowsingStatus.ENABLED_ENHANCED:case SafetyCheckSafeBrowsingStatus.ENABLED_STANDARD_AVAILABLE_ENHANCED:return SafetyCheckIconStatus.SAFE;case SafetyCheckSafeBrowsingStatus.ENABLED:assertNotReached();case SafetyCheckSafeBrowsingStatus.DISABLED:case SafetyCheckSafeBrowsingStatus.DISABLED_BY_ADMIN:case SafetyCheckSafeBrowsingStatus.DISABLED_BY_EXTENSION:return SafetyCheckIconStatus.INFO;default:assertNotReached()}},getButtonLabel_:function(){switch(this.status_){case SafetyCheckSafeBrowsingStatus.DISABLED:return this.i18n("safetyCheckSafeBrowsingButton");default:return null}},onButtonClick_:function(){this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(SafetyCheckInteractions.SAFE_BROWSING_MANAGE);this.metricsBrowserProxy_.recordAction("Settings.SafetyCheck.ManageSafeBrowsing");this.openSecurityPage_()},getManagedIcon_:function(){switch(this.status_){case SafetyCheckSafeBrowsingStatus.DISABLED_BY_ADMIN:return"cr20:domain";case SafetyCheckSafeBrowsingStatus.DISABLED_BY_EXTENSION:return"cr:extension";default:return null}},isRowClickable_:function(){return this.rowClickableStatuses.has(this.status_)},onRowClick_:function(){if(this.isRowClickable_()){this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(SafetyCheckInteractions.SAFE_BROWSING_CARET_NAVIGATION);this.metricsBrowserProxy_.recordAction("Settings.SafetyCheck.ManageSafeBrowsingThroughCaretNavigation");this.openSecurityPage_()}},openSecurityPage_:function(){this.metricsBrowserProxy_.recordAction("SafeBrowsing.Settings.ShowedFromSafetyCheck");Router.getInstance().navigateTo(routes.SECURITY,null,true)}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-safety-check-updates-child",_template:html`<!--css-build:shadow--><!--_html_template_start_--><settings-safety-check-child id="safetyCheckChild" icon-status="[[getIconStatus_(status_)]]" label="التحديثات" sub-label="[[displayString_]]" button-label="[[getButtonLabel_(status_)]]" button-aria-label="‏إعادة تشغيل Chrome" button-class="action-button" on-button-click="onButtonClick_" managed-icon="[[getManagedIcon_(status_)]]">
</settings-safety-check-child>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{status_:{type:Number,value:SafetyCheckUpdatesStatus.CHECKING},displayString_:String},lifetimeBrowserProxy_:null,metricsBrowserProxy_:null,attached:function(){this.lifetimeBrowserProxy_=LifetimeBrowserProxyImpl.getInstance();this.metricsBrowserProxy_=MetricsBrowserProxyImpl.getInstance();this.addWebUIListener(SafetyCheckCallbackConstants.UPDATES_CHANGED,this.onSafetyCheckUpdatesChanged_.bind(this))},onSafetyCheckUpdatesChanged_:function(event){this.status_=event.newState;this.displayString_=event.displayString},getIconStatus_:function(){switch(this.status_){case SafetyCheckUpdatesStatus.CHECKING:case SafetyCheckUpdatesStatus.UPDATING:return SafetyCheckIconStatus.RUNNING;case SafetyCheckUpdatesStatus.UPDATED:return SafetyCheckIconStatus.SAFE;case SafetyCheckUpdatesStatus.RELAUNCH:case SafetyCheckUpdatesStatus.DISABLED_BY_ADMIN:case SafetyCheckUpdatesStatus.FAILED_OFFLINE:case SafetyCheckUpdatesStatus.UNKNOWN:return SafetyCheckIconStatus.INFO;case SafetyCheckUpdatesStatus.FAILED:return SafetyCheckIconStatus.WARNING;default:assertNotReached()}},getButtonLabel_:function(){switch(this.status_){case SafetyCheckUpdatesStatus.RELAUNCH:return this.i18n("aboutRelaunch");default:return null}},onButtonClick_:function(){this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(SafetyCheckInteractions.UPDATES_RELAUNCH);this.metricsBrowserProxy_.recordAction("Settings.SafetyCheck.RelaunchAfterUpdates");this.lifetimeBrowserProxy_.relaunch()},getManagedIcon_:function(){switch(this.status_){case SafetyCheckUpdatesStatus.DISABLED_BY_ADMIN:return"cr20:domain";default:return null}}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-safety-check-chrome-cleaner-child",_template:html`<!--css-build:shadow--><!--_html_template_start_--><template is="dom-if" if="[[showChild_(status_)]]" restamp="">
  <settings-safety-check-child id="safetyCheckChild" icon-status="[[getIconStatus_(status_)]]" label="برامج الجهاز" sub-label="[[displayString_]]" button-label="[[getButtonLabel_(status_)]]" button-aria-label="[[getButtonAriaLabel_(status_)]]" button-class="[[getButtonClass_(status_)]]" on-button-click="onButtonClick_" managed-icon="[[getManagedIcon_(status_)]]" on-click="onRowClick_" row-clickable="[[isRowClickable_(status_)]]">
  </settings-safety-check-child>
</template><!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{status_:{type:Number,value:SafetyCheckChromeCleanerStatus.HIDDEN},displayString_:String,rowClickableStatuses:{readOnly:true,type:Object,value:()=>new Set([SafetyCheckChromeCleanerStatus.SCANNING_FOR_UWS,SafetyCheckChromeCleanerStatus.REMOVING_UWS,SafetyCheckChromeCleanerStatus.ERROR,SafetyCheckChromeCleanerStatus.NO_UWS_FOUND_WITH_TIMESTAMP,SafetyCheckChromeCleanerStatus.NO_UWS_FOUND_WITHOUT_TIMESTAMP])}},chromeCleanupBrowserProxy_:null,metricsBrowserProxy_:null,attached:function(){this.chromeCleanupBrowserProxy_=ChromeCleanupProxyImpl.getInstance();this.metricsBrowserProxy_=MetricsBrowserProxyImpl.getInstance();this.addWebUIListener(SafetyCheckCallbackConstants.CHROME_CLEANER_CHANGED,this.onSafetyCheckChromeCleanerChanged_.bind(this))},onSafetyCheckChromeCleanerChanged_:function(event){this.status_=event.newState;this.displayString_=event.displayString},showChild_:function(){return this.status_!==SafetyCheckChromeCleanerStatus.HIDDEN&&loadTimeData.valueExists("safetyCheckChromeCleanerChildEnabled")&&loadTimeData.getBoolean("safetyCheckChromeCleanerChildEnabled")},getIconStatus_:function(){switch(this.status_){case SafetyCheckChromeCleanerStatus.HIDDEN:case SafetyCheckChromeCleanerStatus.CHECKING:case SafetyCheckChromeCleanerStatus.SCANNING_FOR_UWS:case SafetyCheckChromeCleanerStatus.REMOVING_UWS:return SafetyCheckIconStatus.RUNNING;case SafetyCheckChromeCleanerStatus.NO_UWS_FOUND_WITH_TIMESTAMP:return SafetyCheckIconStatus.SAFE;case SafetyCheckChromeCleanerStatus.REBOOT_REQUIRED:case SafetyCheckChromeCleanerStatus.DISABLED_BY_ADMIN:case SafetyCheckChromeCleanerStatus.ERROR:case SafetyCheckChromeCleanerStatus.NO_UWS_FOUND_WITHOUT_TIMESTAMP:return SafetyCheckIconStatus.INFO;case SafetyCheckChromeCleanerStatus.INFECTED:return SafetyCheckIconStatus.WARNING;default:assertNotReached()}},getButtonLabel_:function(){switch(this.status_){case SafetyCheckChromeCleanerStatus.INFECTED:return this.i18n("safetyCheckReview");case SafetyCheckChromeCleanerStatus.REBOOT_REQUIRED:return this.i18n("chromeCleanupRestartButtonLabel");default:return null}},getButtonAriaLabel_:function(){switch(this.status_){case SafetyCheckChromeCleanerStatus.INFECTED:return this.i18n("safetyCheckChromeCleanerButtonAriaLabel");case SafetyCheckChromeCleanerStatus.REBOOT_REQUIRED:return this.i18n("chromeCleanupRestartButtonLabel");default:return null}},getButtonClass_:function(){switch(this.status_){case SafetyCheckChromeCleanerStatus.INFECTED:case SafetyCheckChromeCleanerStatus.REBOOT_REQUIRED:return"action-button";default:return""}},logUserInteraction_:function(safetyCheckInteraction,userAction){this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(safetyCheckInteraction);this.metricsBrowserProxy_.recordAction(userAction)},onButtonClick_:function(){switch(this.status_){case SafetyCheckChromeCleanerStatus.INFECTED:this.logUserInteraction_(SafetyCheckInteractions.CHROME_CLEANER_REVIEW_INFECTED_STATE,"Settings.SafetyCheck.ChromeCleanerReviewInfectedState");this.navigateToFoilPage_();break;case SafetyCheckChromeCleanerStatus.REBOOT_REQUIRED:this.logUserInteraction_(SafetyCheckInteractions.CHROME_CLEANER_REBOOT,"Settings.SafetyCheck.ChromeCleanerReboot");this.chromeCleanupBrowserProxy_.restartComputer();break;default:break}},getManagedIcon_:function(){switch(this.status_){case SafetyCheckChromeCleanerStatus.DISABLED_BY_ADMIN:return"cr20:domain";default:return null}},isRowClickable_:function(){return this.rowClickableStatuses.has(this.status_)},onRowClick_:function(){if(this.isRowClickable_()){this.logUserInteraction_(SafetyCheckInteractions.CHROME_CLEANER_CARET_NAVIGATION,"Settings.SafetyCheck.ChromeCleanerCaretNavigation");this.navigateToFoilPage_()}},navigateToFoilPage_:function(){Router.getInstance().navigateTo(routes.CHROME_CLEANUP,null,true)}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-safety-check-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-safety-check-page">#safetyCheckCollapse .list-item.selected {
  min-height: var(--settings-row-two-line-min-height);
}

iron-icon {
  display: flex;
        flex-shrink: 0;
        padding-inline-end: var(--cr-icon-button-margin-start);
        width: var(--cr-link-row-icon-width, var(--cr-icon-size));
}

</style>
    <div id="safetyCheckParent" class="cr-row first two-line">
      <iron-icon icon="settings20:safety-check" aria-hidden="true">
      </iron-icon>
      <div class="flex cr-padded-text" no-search="">
        [[parentDisplayString_]]
      </div>
      <template is="dom-if" if="[[shouldShowParentButton_(parentStatus_)]]" restamp="">
        <cr-button id="safetyCheckParentButton" class="action-button" on-click="onRunSafetyCheckClick_" no-search="" aria-label="بدء التحقق من الأمان الآن">
          التحقّق الآن
        </cr-button>
      </template>
      <template is="dom-if" if="[[shouldShowParentIconButton_(parentStatus_)]]" restamp="">
        <cr-icon-button id="safetyCheckParentIconButton" iron-icon="settings:refresh" on-click="onRunSafetyCheckClick_" aria-label="التحقق مرة أخرى">
        </cr-icon-button>
      </template>
    </div>
    <iron-collapse id="safetyCheckCollapse" opened="[[shouldShowChildren_(parentStatus_)]]">
      <settings-safety-check-updates-child>
      </settings-safety-check-updates-child>
      <settings-safety-check-passwords-child>
      </settings-safety-check-passwords-child>
      <settings-safety-check-safe-browsing-child>
      </settings-safety-check-safe-browsing-child>
      <settings-safety-check-extensions-child>
      </settings-safety-check-extensions-child>

      <settings-safety-check-chrome-cleaner-child id="chromeCleanerChild">
      </settings-safety-check-chrome-cleaner-child>

    </iron-collapse>
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior,I18nBehavior],properties:{parentStatus_:{type:Number,value:SafetyCheckParentStatus.BEFORE},parentDisplayString_:String},safetyCheckBrowserProxy_:null,metricsBrowserProxy_:null,updateTimerId_:-1,attached:function(){this.safetyCheckBrowserProxy_=SafetyCheckBrowserProxyImpl.getInstance();this.metricsBrowserProxy_=MetricsBrowserProxyImpl.getInstance();this.addWebUIListener(SafetyCheckCallbackConstants.PARENT_CHANGED,this.onSafetyCheckParentChanged_.bind(this));this.parentDisplayString_=this.i18n("safetyCheckParentPrimaryLabelBefore")},runSafetyCheck_:function(){this.metricsBrowserProxy_.recordSafetyCheckInteractionHistogram(SafetyCheckInteractions.RUN_SAFETY_CHECK);this.metricsBrowserProxy_.recordAction("Settings.SafetyCheck.Start");this.safetyCheckBrowserProxy_.runSafetyCheck();this.fire("iron-announce",{text:this.i18n("safetyCheckAriaLiveRunning")})},onSafetyCheckParentChanged_:function(event){this.parentStatus_=event.newState;this.parentDisplayString_=event.displayString;if(this.parentStatus_===SafetyCheckParentStatus.CHECKING){flush();this.focusIconButton_()}else if(this.parentStatus_===SafetyCheckParentStatus.AFTER){const update=async()=>{this.parentDisplayString_=await this.safetyCheckBrowserProxy_.getParentRanDisplayString()};clearInterval(this.updateTimerId_);this.updateTimerId_=setInterval(update,6e4);update();this.fire("iron-announce",{text:this.i18n("safetyCheckAriaLiveAfter")})}},shouldShowParentButton_:function(){return this.parentStatus_===SafetyCheckParentStatus.BEFORE},shouldShowParentIconButton_:function(){return this.parentStatus_!==SafetyCheckParentStatus.BEFORE},onRunSafetyCheckClick_:function(){HatsBrowserProxyImpl.getInstance().tryShowSurvey();this.runSafetyCheck_()},focusIconButton_(){const element=this.$$("#safetyCheckParentIconButton");element.focus()},shouldShowChildren_:function(){return this.parentStatus_!==SafetyCheckParentStatus.BEFORE}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-autofill-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-autofill-page">cr-link-row {
  --cr-icon-button-margin-start: 20px;
}

cr-link-row:not([hidden]) + cr-link-row {
  border-top: var(--cr-separator-line);
}

</style>
    <settings-animated-pages id="pages" section="autofill" focus-config="[[focusConfig_]]">
      <div route-path="default">
        <cr-link-row id="passwordManagerButton" start-icon="settings20:vpn-key" label="كلمات المرور" on-click="onPasswordsClick_" role-description="زر صفحة فرعية">
          <span id="passwordManagerSubLabel" slot="sub-label">
              [[passwordManagerSubLabel_]]</span>
        </cr-link-row>
        <cr-link-row id="paymentManagerButton" start-icon="settings20:credit-card" label="طرق الدفع" on-click="onPaymentsClick_" role-description="زر صفحة فرعية"></cr-link-row>
        <cr-link-row id="addressesManagerButton" start-icon="settings20:location-on" label="العناوين والمزيد" on-click="onAddressesClick_" role-description="زر صفحة فرعية"></cr-link-row>
      </div>
      <template is="dom-if" route-path="/passwords">
        <settings-subpage associated-control="[[$$('#passwordManagerButton')]]" page-title="كلمات المرور" learn-more-url="https://support.google.com/chrome/?p=settings_password" search-label="بحث عن كلمات المرور" search-term="{{passwordFilter_}}">
          <passwords-section id="passwordSection" filter="[[passwordFilter_]]" focus-config="[[focusConfig_]]" prefs="{{prefs}}">
          </passwords-section>
        </settings-subpage>
      </template>
      <!-- TODO(crbug.com/1102294): Add a learn-more-url, which will cause the
      (?) button to appear. -->
      <template is="dom-if" route-path="/passwords/device" no-search="">
        <settings-subpage page-title="كلمات المرور" search-label="بحث عن كلمات المرور" search-term="{{passwordFilter_}}">
          <passwords-device-section id="passwordDeviceSection" filter="[[passwordFilter_]]">
          </passwords-device-section>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/passwords/check">
        <settings-subpage associated-control="[[$$('#passwordManagerButton')]]" page-title="التحقق من كلمات المرور" learn-more-url="https://support.google.com/chrome/?p=settings_password#leak_detection_privacy">
          <settings-password-check prefs="{{prefs}}"></settings-password-check>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/payments">
        <settings-subpage associated-control="[[$$('#paymentManagerButton')]]" page-title="طرق الدفع" learn-more-url="https://support.google.com/chrome/answer/142893?visit_id=636857416902558798-696405304&amp;p=settings_autofill&amp;rd=1">
          <settings-payments-section id="paymentsSection" prefs="{{prefs}}">
          </settings-payments-section>
        </settings-subpage>
      </template>
      <template is="dom-if" route-path="/addresses">
        <settings-subpage associated-control="[[$$('#addressesManagerButton')]]" page-title="العناوين والمزيد">
          <settings-autofill-section id="autofillSection" prefs="{{prefs}}">
          </settings-autofill-section>
        </settings-subpage>
      </template>
    </settings-animated-pages>
<!--_html_template_end_-->`,behaviors:[PrefsBehavior,PasswordCheckBehavior],properties:{passwordFilter_:String,focusConfig_:{type:Object,value(){const map=new Map;if(routes.PASSWORDS){map.set(routes.PASSWORDS.path,"#passwordManagerButton")}if(routes.PAYMENTS){map.set(routes.PAYMENTS.path,"#paymentManagerButton")}if(routes.ADDRESSES){map.set(routes.ADDRESSES.path,"#addressesManagerButton")}return map}},passwordManagerSubLabel_:{type:String,computed:"computePasswordManagerSubLabel_(compromisedPasswordsCount)"}},onAddressesClick_(event){Router.getInstance().navigateTo(routes.ADDRESSES)},onPaymentsClick_(){Router.getInstance().navigateTo(routes.PAYMENTS)},onPasswordsClick_(){PasswordManagerImpl.getInstance().recordPasswordsPageAccessInSettings();Router.getInstance().navigateTo(routes.PASSWORDS)},computePasswordManagerSubLabel_(){return this.leakedPasswords.length>0?this.compromisedPasswordsCount:""}});// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let lazyLoadPromise=null;function ensureLazyLoaded(){if(!lazyLoadPromise){const script=document.createElement("script");script.type="module";script.src="./lazy_load.js";document.body.appendChild(script);lazyLoadPromise=Promise.all(["settings-appearance-page","settings-autofill-section","settings-password-check","passwords-section","settings-payments-section","settings-clear-browsing-data-dialog","settings-search-engines-page","settings-a11y-page","settings-downloads-page","settings-languages-page","settings-reset-page","settings-system-page","settings-edit-dictionary-page"].map((name=>customElements.whenDefined(name))))}return lazyLoadPromise}// Copyright 2017 The Chromium Authors. All rights reserved.
Polymer({is:"settings-idle-load",_template:html`<!--css-build:shadow--><slot></slot>`,properties:{url:String},child_:null,instance_:null,idleCallback_:0,attached(){this.idleCallback_=requestIdleCallback((()=>{this.get()}))},detached(){cancelIdleCallback(this.idleCallback_)},requestLazyModule_(){return new Promise(((resolve,reject)=>{ensureLazyLoaded().then((()=>{const template=this.getContentChildren()[0];const TemplateClass=templatize(template,this,{mutableData:false,forwardHostProp:this._forwardHostPropV2});this.instance_=new TemplateClass;assert(!this.child_);this.child_=this.instance_.root.firstElementChild;this.parentNode.insertBefore(this.instance_.root,this);resolve(this.child_);this.fire("lazy-loaded")}),reject)}))},get(){if(this.loading_){return this.loading_}this.loading_=this.requestLazyModule_();return this.loading_},_forwardHostPropV2(prop,value){if(this.instance_){this.instance_.forwardHostProp(prop,value)}}});// Copyright 2016 The Chromium Authors. All rights reserved.
class StartupUrlsPageBrowserProxy{loadStartupPages(){}useCurrentPages(){}validateStartupPage(url){}addStartupPage(url){}editStartupPage(modelIndex,url){}removeStartupPage(index){}}class StartupUrlsPageBrowserProxyImpl{loadStartupPages(){chrome.send("onStartupPrefsPageLoad")}useCurrentPages(){chrome.send("setStartupPagesToCurrentPages")}validateStartupPage(url){return sendWithPromise("validateStartupPage",url)}addStartupPage(url){return sendWithPromise("addStartupPage",url)}editStartupPage(modelIndex,url){return sendWithPromise("editStartupPage",modelIndex,url)}removeStartupPage(index){chrome.send("removeStartupPage",[index])}}addSingletonGetter(StartupUrlsPageBrowserProxyImpl);// Copyright 2016 The Chromium Authors. All rights reserved.
const UrlInputError={NONE:0,INVALID_URL:1,TOO_LONG:2};Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-startup-url-dialog"></style>
    <cr-dialog id="dialog" close-text="إغلاق">
      <div slot="title">[[dialogTitle_]]</div>
      <div slot="body">
        <cr-input id="url" label="‏عنوان URL للموقع" value="{{url_}}" on-input="validate_" spellcheck="false" maxlength="[[urlLimit_]]" invalid="[[hasError_(error_)]]" autofocus="" error-message="[[errorMessage_('‏عنوان URL غير صالح',
                '‏يُرجى إدخال عنوان URL أقصر.', error_)]]">
        </cr-input>
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onCancelTap_" id="cancel">إلغاء</cr-button>
        <cr-button id="actionButton" class="action-button" on-click="onActionButtonTap_">[[actionButtonText_]]</cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,is:"settings-startup-url-dialog",properties:{error_:{type:Number,value:UrlInputError.NONE},url_:String,urlLimit_:{readOnly:true,type:Number,value:100*1024},model:Object,dialogTitle_:String,actionButtonText_:String},browserProxy_:null,attached(){this.browserProxy_=StartupUrlsPageBrowserProxyImpl.getInstance();if(this.model){this.dialogTitle_=loadTimeData.getString("onStartupEditPage");this.actionButtonText_=loadTimeData.getString("save");this.$.actionButton.disabled=false;this.url_=this.model.url}else{this.dialogTitle_=loadTimeData.getString("onStartupAddNewPage");this.actionButtonText_=loadTimeData.getString("add");this.$.actionButton.disabled=true}this.$.dialog.showModal()},hasError_(){return this.error_!==UrlInputError.NONE},errorMessage_(invalidUrl,tooLong){return["",invalidUrl,tooLong][this.error_]},onCancelTap_(){this.$.dialog.close()},onActionButtonTap_(){const whenDone=this.model?this.browserProxy_.editStartupPage(this.model.modelIndex,this.url_):this.browserProxy_.addStartupPage(this.url_);whenDone.then((success=>{if(success){this.$.dialog.close()}}))},validate_(){if(this.url_.length===0){this.$.actionButton.disabled=true;this.error_=UrlInputError.NONE;return}if(this.url_.length>=this.urlLimit_){this.$.actionButton.disabled=true;this.error_=UrlInputError.TOO_LONG;return}this.browserProxy_.validateStartupPage(this.url_).then((isValid=>{this.$.actionButton.disabled=!isValid;this.error_=isValid?UrlInputError.NONE:UrlInputError.INVALID_URL}))}});// Copyright 2016 The Chromium Authors. All rights reserved.
const EDIT_STARTUP_URL_EVENT="edit-startup-url";Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-startup-url-entry">.hide-overflow {
  overflow: hidden;
}

</style>
    <div class="list-item" focus-row-container="">
      <site-favicon url="[[model.url]]"></site-favicon>
      <div class="middle hide-overflow">
        <div class="text-elide">[[model.title]]</div>
        <div class="text-elide secondary">[[model.url]]</div>
      </div>
      <template is="dom-if" if="[[editable]]">
        <cr-icon-button class="icon-more-vert" id="dots" on-click="onDotsTap_" title="مزيد من الإجراءات" focus-row-control="" focus-type="menu">
        </cr-icon-button>
        <cr-lazy-render id="menu">
          <template>
            <cr-action-menu role-description="قائمة">
              <button class="dropdown-item" on-click="onEditTap_">
                تعديل
              </button>
              <button class="dropdown-item" id="remove" on-click="onRemoveTap_">
                إزالة
              </button>
            </cr-action-menu>
          </template>
        </cr-lazy-render>
      </template>
    </div>
<!--_html_template_end_-->`,is:"settings-startup-url-entry",behaviors:[FocusRowBehavior],properties:{editable:{type:Boolean,reflectToAttribute:true},model:Object},onRemoveTap_(){this.$$("cr-action-menu").close();StartupUrlsPageBrowserProxyImpl.getInstance().removeStartupPage(this.model.modelIndex)},onEditTap_(e){e.preventDefault();this.$$("cr-action-menu").close();this.fire(EDIT_STARTUP_URL_EVENT,{model:this.model,anchor:this.$$("#dots")})},onDotsTap_(){const actionMenu=this.$$("#menu").get();actionMenu.showAt(assert(this.$$("#dots")))}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared action-link iron-flex" scope="settings-startup-urls-page">#editOptions > div {
  border-top: var(--cr-separator-line);
}

#outer {
  max-height: 355px;
}

#container settings-startup-url-entry {
  cursor: default;
}

</style>
    <div id="outer" class="layout vertical flex list-frame">
      <div id="container" class="scroll-container" scrollable="">
        <iron-list items="[[startupPages_]]" scroll-target="container" preserve-focus="" risk-selection="" class="cr-separators">
          <template>
            <settings-startup-url-entry model="[[item]]" first$="[[!index]]" tabindex$="[[tabIndex]]" iron-list-tab-index="[[tabIndex]]" last-focused="{{lastFocused_}}" list-blurred="{{listBlurred_}}" focus-row-index="[[index]]" editable="[[shouldAllowUrlsEdit_(
                    prefs.session.startup_urls.enforcement)]]">
            </settings-startup-url-entry>
          </template>
        </iron-list>
      </div>
    </div>
    <div id="editOptions" class="list-frame">
      <template is="dom-if" if="[[shouldAllowUrlsEdit_(
          prefs.session.startup_urls.enforcement)]]" restamp="">
        <div class="list-item" id="addPage">
          <a is="action-link" class="list-button" on-click="onAddPageTap_">
            إضافة صفحة جديدة
          </a>
        </div>
        <div class="list-item" id="useCurrentPages">
          <a is="action-link" class="list-button" on-click="onUseCurrentPagesTap_">
            استخدام الصفحات الحالية
          </a>
        </div>
      </template>
      <template is="dom-if" if="[[prefs.session.startup_urls.extensionId]]" restamp="">
        <extension-controlled-indicator extension-id="[[prefs.session.startup_urls.extensionId]]" extension-name="[[prefs.session.startup_urls.controlledByName]]" extension-can-be-disabled="[[
                prefs.session.startup_urls.extensionCanBeDisabled]]">
        </extension-controlled-indicator>
      </template>
    </div>
    <template is="dom-if" if="[[showStartupUrlDialog_]]" restamp="">
      <settings-startup-url-dialog model="[[startupUrlDialogModel_]]" on-close="destroyUrlDialog_">
      </settings-startup-url-dialog>
    </template>
<!--_html_template_end_-->`,is:"settings-startup-urls-page",behaviors:[CrScrollableBehavior,WebUIListenerBehavior],properties:{prefs:Object,startupPages_:Array,showStartupUrlDialog_:Boolean,startupUrlDialogModel_:Object,lastFocused_:Object,listBlurred_:Boolean},browserProxy_:null,startupUrlDialogAnchor_:null,attached(){this.browserProxy_=StartupUrlsPageBrowserProxyImpl.getInstance();this.addWebUIListener("update-startup-pages",(startupPages=>{if(this.startupUrlDialogModel_){this.destroyUrlDialog_()}this.startupPages_=startupPages;this.updateScrollableContents()}));this.browserProxy_.loadStartupPages();this.addEventListener(EDIT_STARTUP_URL_EVENT,(event=>{this.startupUrlDialogModel_=event.detail.model;this.startupUrlDialogAnchor_=event.detail.anchor;this.showStartupUrlDialog_=true;event.stopPropagation()}))},onAddPageTap_(e){e.preventDefault();this.showStartupUrlDialog_=true;this.startupUrlDialogAnchor_=this.$$("#addPage a[is=action-link]")},destroyUrlDialog_(){this.showStartupUrlDialog_=false;this.startupUrlDialogModel_=null;if(this.startupUrlDialogAnchor_){focusWithoutInk(assert(this.startupUrlDialogAnchor_));this.startupUrlDialogAnchor_=null}},onUseCurrentPagesTap_(){this.browserProxy_.useCurrentPages()},shouldAllowUrlsEdit_(){return this.get("prefs.session.startup_urls.enforcement")!==chrome.settingsPrivate.Enforcement.ENFORCED}});// Copyright 2016 The Chromium Authors. All rights reserved.
class OnStartupBrowserProxy{getNtpExtension(){}}class OnStartupBrowserProxyImpl{getNtpExtension(){return sendWithPromise("getNtpExtension")}}addSingletonGetter(OnStartupBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-on-startup-page">.block {
  display: block;
}

</style>
    <div class="cr-row first">
      <settings-radio-group id="onStartupRadioGroup" class="flex" pref="{{prefs.session.restore_on_startup}}" group-aria-label="عند بدء التشغيل">
        <controlled-radio-button name="[[getName_(prefValues_.OPEN_NEW_TAB)]]" pref="[[prefs.session.restore_on_startup]]" label="فتح صفحة علامة التبويب الجديدة" no-extension-indicator="">
        </controlled-radio-button>
        <template is="dom-if" if="[[ntpExtension_]]">
          <extension-controlled-indicator extension-id="[[ntpExtension_.id]]" extension-name="[[ntpExtension_.name]]" extension-can-be-disabled="[[ntpExtension_.canBeDisabled]]">
          </extension-controlled-indicator>
        </template>
        <controlled-radio-button name="[[getName_(prefValues_.CONTINUE)]]" pref="[[prefs.session.restore_on_startup]]" label="المتابعة من حيث توقفت">
        </controlled-radio-button>
        <controlled-radio-button name="[[getName_(prefValues_.OPEN_SPECIFIC)]]" pref="[[prefs.session.restore_on_startup]]" label="فتح صفحة محددة أو مجموعة صفحات">
        </controlled-radio-button>
      </settings-radio-group>
    </div>
    <template is="dom-if" if="[[showStartupUrls_(prefs.session.restore_on_startup.value)]]">
      <settings-startup-urls-page prefs="[[prefs]]">
      </settings-startup-urls-page>
    </template>
<!--_html_template_end_-->`,is:"settings-on-startup-page",behaviors:[WebUIListenerBehavior],properties:{prefs:{type:Object,notify:true},ntpExtension_:Object,prefValues_:{readOnly:true,type:Object,value:{CONTINUE:1,OPEN_NEW_TAB:5,OPEN_SPECIFIC:4}}},attached(){const updateNtpExtension=ntpExtension=>{this.ntpExtension_=ntpExtension};OnStartupBrowserProxyImpl.getInstance().getNtpExtension().then(updateNtpExtension);this.addWebUIListener("update-ntp-extension",updateNtpExtension)},getName_(value){return value.toString()},showStartupUrls_(restoreOnStartup){return restoreOnStartup===this.prefValues_.OPEN_SPECIFIC}});// Copyright 2017 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="cr-policy-indicator"></style>
    <cr-tooltip-icon hidden$="[[!indicatorVisible]]" tooltip-text="[[indicatorTooltip_]]" icon-class="[[indicatorIcon]]" icon-aria-label="[[iconAriaLabel]]">
    </cr-tooltip-icon>
<!--_html_template_end_-->`,is:"cr-policy-indicator",behaviors:[CrPolicyIndicatorBehavior],properties:{iconAriaLabel:String,indicatorTooltip_:{type:String,computed:"getIndicatorTooltip_(indicatorType, indicatorSourceName)"}},getIndicatorTooltip_(indicatorType,indicatorSourceName){return this.getIndicatorTooltip(indicatorType,indicatorSourceName)}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-people-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-people-page">.sync-row {
  align-items: center;
        flex: auto;
}

#profile-icon {
  background: center / cover no-repeat;
        border-radius: 20px;
        flex-shrink: 0;
        height: 40px;
        width: 40px;
}

#sync-setup {
  --cr-secondary-text-color: var(--settings-error-color);
}

cr-link-row {
  --cr-link-row-icon-width: 40px;
        border-top: var(--cr-separator-line);
}

.icon-container {
  display: flex;
        flex-shrink: 0;
        justify-content: center;
        width: 40px;
}

#toast {
  left: 0;
        z-index: 1;
}

:host-context([dir='rtl']) #toast {
  left: auto;
        right: 0;
}

settings-sync-account-control[showing-promo]::part(banner) {
  border-top-left-radius: var(--cr-card-border-radius);
        border-top-right-radius: var(--cr-card-border-radius);
}

settings-sync-account-control[showing-promo]::part(title) {
  font-size: 1.1rem;
        line-height: 1.625rem;
}

</style>
    <settings-animated-pages id="pages" section="people" focus-config="[[focusConfig_]]">
      <div route-path="default">
        <template is="dom-if" if="[[shouldShowSyncAccountControl_(
            syncStatus.syncSystemEnabled)]]">
          <settings-sync-account-control sync-status="[[syncStatus]]" prefs="{{prefs}}" promo-label-with-account="‏الحصول على ميزات Google الذكية في Chrome" promo-label-with-no-account="‏الحصول على ميزات Google الذكية في Chrome" promo-secondary-label-with-account="‏يمكنك مزامنة Chrome وتخصيصه على جميع أجهزتك." promo-secondary-label-with-no-account="‏يمكنك مزامنة Chrome وتخصيصه على جميع أجهزتك.">
          </settings-sync-account-control>
        </template>
        <template is="dom-if" if="[[!shouldShowSyncAccountControl_(
            syncStatus.syncSystemEnabled, signinAllowed_)]]" restamp="">
          <div id="profile-row" class="cr-row first two-line" actionable$="[[isProfileActionable_]]" on-click="onProfileTap_">
            <template is="dom-if" if="[[syncStatus]]">
              <div id="profile-icon" style="background-image: [[getIconImageSet_(
                      profileIconUrl_)]]">
              </div>
              <div class="flex cr-row-gap cr-padded-text text-elide">
                <span id="profile-name">[[profileName_]]</span>
<!-- When the user is signed-in, the settings-sync-account-control is always
shown on non-ChromeOS platforms -->

              </div>

              <cr-icon-button class="subpage-arrow" aria-label="تخصيص الملف الشخصي" aria-describedby="profile-name" aria-roledescription="زر صفحة فرعية">
              </cr-icon-button>


            </template>
          </div>
        </template> <!-- if="[[!shouldShowSyncAccountControl_()]]" -->

        <cr-link-row id="sync-setup" label="‏خدمات Google والمزامنة" sub-label="[[getSyncAndGoogleServicesSubtext_(syncStatus)]]" on-click="onSyncTap_" role-description="زر صفحة فرعية">
        </cr-link-row>


        <template is="dom-if" if="[[signinAllowed_]]">
          <cr-link-row id="manage-google-account" label="‏إدارة حسابك على Google" hidden="[[!shouldShowGoogleAccount_]]" on-click="openGoogleAccount_" external=""></cr-link-row>

          <cr-link-row id="edit-profile" label="‏تخصيص ملفك الشخصي في Chrome" on-click="onProfileTap_"></cr-link-row>
        </template>



        <cr-link-row id="importDataDialogTrigger" label="استيراد الإشارات المرجعية والإعدادات" on-click="onImportDataTap_"></cr-link-row>


      </div>
      <template is="dom-if" route-path="/syncSetup">
        <settings-subpage associated-control="[[$$('#sync-setup')]]" page-title="‏خدمات Google والمزامنة" learn-more-url="https://support.google.com/chrome?p=syncgoogleservices">
          <settings-sync-page sync-status="[[syncStatus]]" prefs="{{prefs}}" page-visibility="[[pageVisibility.privacy]]" focus-config="[[focusConfig_]]">
          </settings-sync-page>
        </settings-subpage>
      </template>

      <template is="dom-if" route-path="/syncSetup/advanced">
        <settings-subpage page-title="إدارة البيانات المتزامنة" associated-control="[[$$('#sync-setup')]]" learn-more-url="https://support.google.com/chrome?p=syncgoogleservices">
          <settings-sync-controls sync-status="[[syncStatus]]">
          </settings-sync-controls>
        </settings-subpage>
      </template>


      <template is="dom-if" route-path="/manageProfile">
        <settings-subpage associated-control="[[getEditPersonAssocControl_(signinAllowed_)]]" page-title="تخصيص الملف الشخصي">
          <settings-manage-profile profile-name="[[profileName_]]" sync-status="[[syncStatus]]">
          </settings-manage-profile>
        </settings-subpage>
      </template>

    </settings-animated-pages>

    <template is="dom-if" if="[[showSignoutDialog_]]" restamp="">
      <settings-signout-dialog sync-status="[[syncStatus]]" on-close="onDisconnectDialogClosed_">
      </settings-signout-dialog>
    </template>

    <template is="dom-if" if="[[showImportDataDialog_]]" restamp="">
      <settings-import-data-dialog prefs="{{prefs}}" on-close="onImportDataDialogClosed_">
      </settings-import-data-dialog>
    </template>
    <cr-toast duration="3000" id="toast">
      <span>تم حفظ الإعدادات، وبدأت عملية المزامنة.</span>
    </cr-toast>
<!--_html_template_end_-->`,behaviors:[RouteObserverBehavior,I18nBehavior,WebUIListenerBehavior],properties:{prefs:{type:Object,notify:true},signinAllowed_:{type:Boolean,value(){return loadTimeData.getBoolean("signinAllowed")}},storedAccounts:Object,syncStatus:Object,pageVisibility:Object,authToken_:{type:String,value:""},profileIconUrl_:String,isProfileActionable_:{type:Boolean,value(){if(!isChromeOS){return true}return loadTimeData.getBoolean("isAccountManagerEnabled")},readOnly:true},profileName_:String,shouldShowGoogleAccount_:{type:Boolean,value:false,computed:"computeShouldShowGoogleAccount_(storedAccounts, syncStatus,"+"storedAccounts.length, syncStatus.signedIn, syncStatus.hasError)"},showImportDataDialog_:{type:Boolean,value:false},showSignoutDialog_:Boolean,focusConfig_:{type:Object,value(){const map=new Map;if(routes.SYNC){map.set(routes.SYNC.path,"#sync-setup")}if(routes.MANAGE_PROFILE){map.set(routes.MANAGE_PROFILE.path,this.signinAllowed_?"#edit-profile":"#profile-row .subpage-arrow")}return map}}},syncBrowserProxy_:null,attached(){{ProfileInfoBrowserProxyImpl.getInstance().getProfileInfo().then(this.handleProfileInfo_.bind(this));this.addWebUIListener("profile-info-changed",this.handleProfileInfo_.bind(this))}this.syncBrowserProxy_=SyncBrowserProxyImpl.getInstance();this.syncBrowserProxy_.getSyncStatus().then(this.handleSyncStatus_.bind(this));this.addWebUIListener("sync-status-changed",this.handleSyncStatus_.bind(this));const handleStoredAccounts=accounts=>{this.storedAccounts=accounts};this.syncBrowserProxy_.getStoredAccounts().then(handleStoredAccounts);this.addWebUIListener("stored-accounts-updated",handleStoredAccounts);this.addWebUIListener("sync-settings-saved",(()=>{this.$.toast.show()}))},currentRouteChanged(){this.showImportDataDialog_=Router.getInstance().getCurrentRoute()===routes.IMPORT_DATA;if(Router.getInstance().getCurrentRoute()===routes.SIGN_OUT){if(this.syncStatus&&!this.syncStatus.signedIn){Router.getInstance().navigateToPreviousRoute()}else{this.showSignoutDialog_=true}}},getEditPersonAssocControl_(){return this.signinAllowed_?assert(this.$$("#edit-profile")):assert(this.$$("#profile-row"))},getSyncAndGoogleServicesSubtext_(){if(this.syncStatus&&this.syncStatus.hasError&&this.syncStatus.statusText){return this.syncStatus.statusText}return""},handleProfileInfo_(info){this.profileName_=info.name;this.profileIconUrl_=info.iconUrl},handleSyncStatus_(syncStatus){const shouldRecordSigninImpression=!this.syncStatus&&syncStatus&&this.signinAllowed_&&!syncStatus.signedIn;this.syncStatus=syncStatus;if(shouldRecordSigninImpression&&!this.shouldShowSyncAccountControl_()){chrome.metricsPrivate.recordUserAction("Signin_Impression_FromSettings")}},computeShouldShowGoogleAccount_(){if(this.storedAccounts===undefined||this.syncStatus===undefined){return false}return(this.storedAccounts.length>0||!!this.syncStatus.signedIn)&&!this.syncStatus.hasError},onProfileTap_(){Router.getInstance().navigateTo(routes.MANAGE_PROFILE)},onDisconnectDialogClosed_(e){this.showSignoutDialog_=false;if(Router.getInstance().getCurrentRoute()===routes.SIGN_OUT){Router.getInstance().navigateToPreviousRoute()}},onSyncTap_(){Router.getInstance().navigateTo(routes.SYNC)},onImportDataTap_(){Router.getInstance().navigateTo(routes.IMPORT_DATA)},onImportDataDialogClosed_(){Router.getInstance().navigateToPreviousRoute();focusWithoutInk(assert(this.$.importDataDialogTrigger))},openGoogleAccount_(){OpenWindowProxyImpl.getInstance().openURL(loadTimeData.getString("googleAccountUrl"));chrome.metricsPrivate.recordUserAction("ManageGoogleAccount_Clicked")},shouldShowSyncAccountControl_(){if(this.syncStatus===undefined){return false}return!!this.syncStatus.syncSystemEnabled&&this.signinAllowed_},getIconImageSet_(iconUrl){return getImage(iconUrl)}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-reset-profile-banner",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-reset-profile-banner"></style>
    <cr-dialog id="dialog" close-text="إغلاق" ignore-popstate="">
      <div slot="title">تمت إعادة ضبط بعض الإعدادات</div>
      <div slot="body">
        <span id="description">
          ‏اكتشف Chrome أن بعض إعداداتك تم إتلافها من قبل برنامج آخر وإعادة تعيينها للحالة التلقائية الأصلية.
          <a id="learnMore" href="https://support.google.com/chrome/?p=ui_automatic_settings_reset" target="_blank">مزيد من المعلومات</a>
        </span>
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onOkTap_" id="ok">
          حسنًا
        </cr-button>
        <cr-button class="action-button" on-click="onResetTap_" id="reset">
          إعادة ضبط كل الإعدادات
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,listeners:{cancel:"onCancel_"},attached(){this.$.dialog.showModal()},onOkTap_(){this.$.dialog.cancel()},onCancel_(){ResetBrowserProxyImpl.getInstance().onHideResetProfileBanner()},onResetTap_(){this.$.dialog.close();Router.getInstance().navigateTo(routes.RESET_DIALOG)}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-search-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style iron-flex settings-shared md-select" scope="settings-search-page">#search-wrapper {
  align-items: center;
    display: flex;
    min-height: var(--settings-row-min-height);
}

</style>
<settings-animated-pages id="pages" section="search" focus-config="[[focusConfig_]]">
  <div route-path="default">
    <!-- Omnibox search engine -->
    <div class="cr-row first">
      <div id="searchExplanation" class="flex cr-padded-text">
        محرك البحث المُستخدَم في شريط العناوين
        <a href="https://support.google.com/chrome/?p=settings_omnibox" target="_blank">
          مزيد من المعلومات
        </a>
      </div>
      <template is="dom-if" if="[[isDefaultSearchControlledByPolicy_(
          prefs.default_search_provider_data.template_url_data)]]">
        <cr-policy-pref-indicator pref="[[
            prefs.default_search_provider_data.template_url_data]]">
        </cr-policy-pref-indicator>
      </template>
      <select class="md-select" on-change="onChange_" aria-labelledby="searchExplanation" disabled$="[[isDefaultSearchEngineEnforced_(
              prefs.default_search_provider_data.template_url_data)]]">
        <template is="dom-repeat" items="[[searchEngines_]]">
          <option selected="[[item.default]]">[[item.name]]</option>
        </template>
      </select>
    </div>
    <template is="dom-if" if="[[prefs.default_search_provider_data.template_url_data.extensionId]]">
      <div class="cr-row continuation">
        <extension-controlled-indicator class="flex" extension-id="[[
                prefs.default_search_provider_data.template_url_data.extensionId]]" extension-name="[[
                prefs.default_search_provider_data.template_url_data.controlledByName]]" extension-can-be-disabled="[[
                prefs.default_search_provider_data.template_url_data.extensionCanBeDisabled]]" on-disable-extension="onDisableExtension_">
        </extension-controlled-indicator>
      </div>
    </template>

    <!-- Manage search engines -->
    <cr-link-row class="hr" id="enginesSubpageTrigger" label="إدارة محركات البحث" on-click="onManageSearchEnginesTap_" role-description="زر صفحة فرعية"></cr-link-row>
  </div>
  <template is="dom-if" route-path="/searchEngines">
    <settings-subpage associated-control="[[$$('#enginesSubpageTrigger')]]" page-title="إدارة محركات البحث" search-label="البحث" search-term="{{searchEnginesFilter_}}">
      <settings-search-engines-page filter="[[searchEnginesFilter_]]">
    </settings-search-engines-page></settings-subpage>
  </template>
</settings-animated-pages>
<!--_html_template_end_-->`,properties:{prefs:Object,searchEngines_:{type:Array,value(){return[]}},searchEnginesFilter_:String,focusConfig_:Object},browserProxy_:null,created(){this.browserProxy_=SearchEnginesBrowserProxyImpl.getInstance()},ready(){const updateSearchEngines=searchEngines=>{this.set("searchEngines_",searchEngines.defaults)};this.browserProxy_.getSearchEnginesList().then(updateSearchEngines);addWebUIListener("search-engines-changed",updateSearchEngines);this.focusConfig_=new Map;if(routes.SEARCH_ENGINES){this.focusConfig_.set(routes.SEARCH_ENGINES.path,"#enginesSubpageTrigger")}},onChange_(){const select=this.$$("select");const searchEngine=this.searchEngines_[select.selectedIndex];this.browserProxy_.setDefaultSearchEngine(searchEngine.modelIndex)},onDisableExtension_(){this.fire("refresh-pref","default_search_provider.enabled")},onManageSearchEnginesTap_(){Router.getInstance().navigateTo(routes.SEARCH_ENGINES)},isDefaultSearchControlledByPolicy_(pref){return pref.controlledBy===chrome.settingsPrivate.ControlledBy.USER_POLICY},isDefaultSearchEngineEnforced_(pref){return pref.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED}});// Copyright 2016 The Chromium Authors. All rights reserved.
class DefaultBrowserBrowserProxyImpl{requestDefaultBrowserState(){return sendWithPromise("requestDefaultBrowserState")}setAsDefaultBrowser(){chrome.send("setAsDefaultBrowser")}}addSingletonGetter(DefaultBrowserBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-default-browser-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-default-browser-page"></style>
    <template is="dom-if" if="[[maySetDefaultBrowser_]]">
      <div class="cr-row first">
        <div class="flex cr-padded-text">
          <div id="canBeDefaultBrowser">المتصفح التلقائي</div>
          <div class="secondary">‏جعل Google Chrome المتصفّح التلقائي</div>
        </div>
        <div class="separator"></div>
        <cr-button on-click="onSetDefaultBrowserTap_">
          جعل الخيار تلقائيًا
        </cr-button>
      </div>
    </template>
    <template is="dom-if" if="[[!maySetDefaultBrowser_]]">
      <div class="cr-row first">
        <div class="flex cr-padded-text" hidden$="[[!isDefault_]]" id="isDefault">
          ‏Google Chrome هو متصفحك التلقائي
        </div>
        <div class="flex cr-padded-text" hidden$="[[!isSecondaryInstall_]]" id="isSecondaryInstall">
          ‏هذا تثبيت ثانوي من Google Chrome، ولا يمكن جعله متصفحك التلقائي.
        </div>
        <div class="cr-padded-text" hidden$="[[!isUnknownError_]]" id="isUnknownError">
          ‏يتعذَّر على Google Chrome تحديد المتصفح التلقائي أو تعيينه
        </div>
      </div>
    </template>
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior],properties:{isDefault_:Boolean,isSecondaryInstall_:Boolean,isUnknownError_:Boolean,maySetDefaultBrowser_:Boolean},browserProxy_:null,created(){this.browserProxy_=DefaultBrowserBrowserProxyImpl.getInstance()},ready(){this.addWebUIListener("browser-default-state-changed",this.updateDefaultBrowserState_.bind(this));this.browserProxy_.requestDefaultBrowserState().then(this.updateDefaultBrowserState_.bind(this))},updateDefaultBrowserState_(defaultBrowserState){this.isDefault_=false;this.isSecondaryInstall_=false;this.isUnknownError_=false;this.maySetDefaultBrowser_=false;if(defaultBrowserState.isDefault){this.isDefault_=true}else if(!defaultBrowserState.canBeDefault){this.isSecondaryInstall_=true}else if(!defaultBrowserState.isDisabledByPolicy&&!defaultBrowserState.isUnknownError){this.maySetDefaultBrowser_=true}else{this.isUnknownError_=true}},onSetDefaultBrowserTap_(){this.browserProxy_.setAsDefaultBrowser()}});// Copyright 2016 The Chromium Authors. All rights reserved.
const SKIP_SEARCH_CSS_ATTRIBUTE="no-search";const IGNORED_ELEMENTS=new Set(["CONTENT","CR-ACTION-MENU","CR-DIALOG","CR-ICON-BUTTON","CR-SLIDER","DIALOG","IMG","IRON-ICON","IRON-LIST","PAPER-RIPPLE","PAPER-SPINNER-LITE","SLOT","STYLE","TEMPLATE"]);function findAndHighlightMatches_(request,root){let foundMatches=false;const highlights=[];function doSearch(node){if(node.nodeName==="DOM-IF"&&node.hasAttribute("route-path")&&!node.if&&!node["noSearch"]&&!node.hasAttribute(SKIP_SEARCH_CSS_ATTRIBUTE)){request.queue_.addRenderTask(new RenderTask(request,node));return}if(IGNORED_ELEMENTS.has(node.nodeName)){return}if(node instanceof HTMLElement){const element=node;if(element.hasAttribute(SKIP_SEARCH_CSS_ATTRIBUTE)||element.hasAttribute("hidden")||element.style.display==="none"){return}}if(node.nodeType===Node.TEXT_NODE){const textContent=node.nodeValue;if(textContent.trim().length===0){return}const strippedText=stripDiacritics(textContent);const ranges=[];for(let match;match=request.regExp.exec(strippedText);){ranges.push({start:match.index,length:match[0].length})}if(ranges.length>0){foundMatches=true;revealParentSection_(node,ranges.length,request.bubbles);if(node.parentNode.nodeName==="OPTION"){const select=node.parentNode.parentNode;assert(select.nodeName==="SELECT");const isSubpage=n=>n.nodeName==="SETTINGS-SUBPAGE";if(findAncestor(select,isSubpage,true)){return}showBubble_(select,ranges.length,request.bubbles,true)}else{request.addTextObserver(node);highlights.push(highlight(node,ranges))}}return}let child=node.firstChild;while(child!==null){const nextSibling=child.nextSibling;doSearch(child);child=nextSibling}const shadowRoot=node.shadowRoot;if(shadowRoot){doSearch(shadowRoot)}}doSearch(root);request.addHighlights(highlights);return foundMatches}function revealParentSection_(node,numResults,bubbles){let associatedControl=null;let parent=node;while(parent.nodeName!=="SETTINGS-SECTION"){parent=parent.nodeType===Node.DOCUMENT_FRAGMENT_NODE?parent.host:parent.parentNode;if(!parent){return}if(parent.nodeName==="SETTINGS-SUBPAGE"){associatedControl=assert(parent.associatedControl,"An associated control was expected for SETTINGS-SUBPAGE "+parent.pageTitle+", but was not found.")}}parent.hiddenBySearch=false;if(associatedControl){showBubble_(associatedControl,numResults,bubbles,false)}}function showBubble_(control,numResults,bubbles,horizontallyCenter){const bubble=createEmptySearchBubble(control,horizontallyCenter);const numHits=numResults+(bubbles.get(bubble)||0);bubbles.set(bubble,numHits);const msgName=numHits===1?"searchResultBubbleText":"searchResultsBubbleText";bubble.firstChild.textContent=loadTimeData.getStringF(msgName,numHits)}class Task{constructor(request,node){this.request=request;this.node=node}exec(){}}class RenderTask extends Task{constructor(request,node){super(request,node)}exec(){const routePath=this.node.getAttribute("route-path");const content=DomIf._contentForTemplate(this.node.firstElementChild);const subpageTemplate=content.querySelector("settings-subpage");subpageTemplate.setAttribute("route-path",routePath);assert(!this.node.if);this.node.if=true;return new Promise(((resolve,reject)=>{const parent=this.node.parentNode;parent.async((()=>{const renderedNode=parent.querySelector('[route-path="'+routePath+'"]');this.request.queue_.addSearchAndHighlightTask(new SearchAndHighlightTask(this.request,assert(renderedNode)));resolve()}))}))}}class SearchAndHighlightTask extends Task{constructor(request,node){super(request,node)}exec(){const foundMatches=findAndHighlightMatches_(this.request,this.node);this.request.updateMatches(foundMatches);return Promise.resolve()}}class TopLevelSearchTask extends Task{constructor(request,page){super(request,page)}exec(){const shouldSearch=this.request.regExp!==null;this.setSectionsVisibility_(!shouldSearch);if(shouldSearch){const foundMatches=findAndHighlightMatches_(this.request,this.node);this.request.updateMatches(foundMatches)}return Promise.resolve()}setSectionsVisibility_(visible){const sections=this.node.querySelectorAll("settings-section");for(let i=0;i<sections.length;i++){sections[i].hiddenBySearch=!visible}}}class TaskQueue{constructor(request){this.request_=request;this.queues_;this.reset();this.onEmptyCallback_=null;this.running_=false}reset(){this.queues_={high:[],middle:[],low:[]}}addTopLevelSearchTask(task){this.queues_.high.push(task);this.consumePending_()}addSearchAndHighlightTask(task){this.queues_.middle.push(task);this.consumePending_()}addRenderTask(task){this.queues_.low.push(task);this.consumePending_()}onEmpty(onEmptyCallback){this.onEmptyCallback_=onEmptyCallback}popNextTask_(){return this.queues_.high.shift()||this.queues_.middle.shift()||this.queues_.low.shift()}consumePending_(){if(this.running_){return}const task=this.popNextTask_();if(!task){this.running_=false;if(this.onEmptyCallback_){this.onEmptyCallback_()}return}this.running_=true;window.requestIdleCallback((()=>{if(!this.request_.canceled){task.exec().then((()=>{this.running_=false;this.consumePending_()}))}}))}}class SearchRequest{constructor(rawQuery,root){this.rawQuery_=rawQuery;this.root_=root;this.regExp=this.generateRegExp_();this.canceled=false;this.foundMatches_=false;this.resolver=new PromiseResolver;this.queue_=new TaskQueue(this);this.queue_.onEmpty((()=>{this.resolver.resolve(this)}));this.textObservers_=new Set;this.highlights_=[];this.bubbles=new Map}addHighlights(highlights){this.highlights_.push(...highlights)}removeAllTextObservers(){this.textObservers_.forEach((observer=>{observer.disconnect()}));this.textObservers_.clear()}removeAllHighlightsAndBubbles(){removeHighlights(this.highlights_);this.bubbles.forEach(((count,bubble)=>bubble.remove()));this.highlights_=[];this.bubbles.clear()}addTextObserver(textNode){const originalParentNode=textNode.parentNode;const observer=new MutationObserver((mutations=>{const oldValue=mutations[0].oldValue.trim();const newValue=textNode.nodeValue.trim();if(oldValue!==newValue){observer.disconnect();this.textObservers_.delete(observer);findAndRemoveHighlights(originalParentNode)}}));observer.observe(textNode,{characterData:true,characterDataOldValue:true});this.textObservers_.add(observer)}start(){this.queue_.addTopLevelSearchTask(new TopLevelSearchTask(this,this.root_))}generateRegExp_(){let regExp=null;const strippedQuery=stripDiacritics(this.rawQuery_.trim());const sanitizedQuery=strippedQuery.replace(SANITIZE_REGEX,"\\$&");if(sanitizedQuery.length>0){regExp=new RegExp(`(${sanitizedQuery})`,"ig")}return regExp}isSame(rawQuery){return this.rawQuery_===rawQuery}updateMatches(found){this.foundMatches_=this.foundMatches_||found}didFindMatches(){return this.foundMatches_}}const SANITIZE_REGEX=/[-[\]{}()*+?.,\\^$|#\s]/g;class SearchManagerImpl{constructor(){this.activeRequests_=new Set;this.completedRequests_=new Set;this.lastSearchedText_=null}search(text,page){if(text!==this.lastSearchedText_){this.activeRequests_.forEach((function(request){request.removeAllTextObservers();request.removeAllHighlightsAndBubbles();request.canceled=true;request.resolver.resolve(request)}));this.activeRequests_.clear();this.completedRequests_.forEach((request=>{request.removeAllTextObservers();request.removeAllHighlightsAndBubbles()}));this.completedRequests_.clear()}this.lastSearchedText_=text;const request=new SearchRequest(text,page);this.activeRequests_.add(request);request.start();return request.resolver.promise.then((()=>{this.activeRequests_.delete(request);this.completedRequests_.add(request);return request}))}}let instance=null;function getSearchManager(){if(instance===null){instance=new SearchManagerImpl}return instance}function setSearchManagerForTesting(searchManager){instance=searchManager}// Copyright 2016 The Chromium Authors. All rights reserved.
const RouteState={INITIAL:"initial",DIALOG:"dialog",SECTION:"section",SUBPAGE:"subpage",TOP_LEVEL:"top-level"};function classifyRoute(route){if(!route){return RouteState.INITIAL}const routes=Router.getInstance().getRoutes();if(route===routes.BASIC){return RouteState.TOP_LEVEL}if(route.isSubpage()){return RouteState.SUBPAGE}if(route.isNavigableDialog){return RouteState.DIALOG}return RouteState.SECTION}const MainPageBehavior={properties:{inSearchMode:{type:Boolean,value:false,observer:"inSearchModeChanged_"}},scroller:null,validTransitions_:function(){const allStates=new Set([RouteState.DIALOG,RouteState.SECTION,RouteState.SUBPAGE,RouteState.TOP_LEVEL]);return new Map([[RouteState.INITIAL,allStates],[RouteState.DIALOG,new Set([RouteState.SECTION,RouteState.SUBPAGE,RouteState.TOP_LEVEL])],[RouteState.SECTION,allStates],[RouteState.SUBPAGE,allStates],[RouteState.TOP_LEVEL,allStates]])}(),attached(){this.scroller=this.domHost?this.domHost.parentNode:document.body},containsRoute(route){return false},inSearchModeChanged_(current,previous){if(previous===undefined){return}if(!this.inSearchMode){const route=Router.getInstance().getCurrentRoute();if(this.containsRoute(route)&&classifyRoute(route)===RouteState.SECTION){this.fire("showing-section",this.getSection(route.section))}}},shouldExpandAdvanced_(route){const routes=Router.getInstance().getRoutes();return this.tagName==="SETTINGS-BASIC-PAGE"&&routes.ADVANCED&&routes.ADVANCED.contains(route)},ensureSectionForRoute_(route){const section=this.getSection(route.section);if(section!==null){return Promise.resolve(section)}const waitFn=beforeNextRender.bind(null,this);return new Promise((resolve=>{if(this.shouldExpandAdvanced_(route)){this.fire("hide-container");waitFn((()=>{this.$$("#advancedPageTemplate").get().then((()=>{resolve(this.getSection(route.section))}))}))}else{waitFn((()=>{resolve(this.getSection(route.section))}))}}))},enterSubpage_(route){this.lastScrollTop_=this.scroller.scrollTop;this.scroller.scrollTop=0;this.classList.add("showing-subpage");this.fire("subpage-expand");ensureLazyLoaded();this.ensureSectionForRoute_(route).then((section=>{section.classList.add("expanded");this.fire("settings-section-expanded");this.fire("show-container")}))},enterMainPage_(oldRoute){const oldSection=this.getSection(oldRoute.section);oldSection.classList.remove("expanded");this.classList.remove("showing-subpage");return new Promise(((res,rej)=>{requestAnimationFrame((()=>{if(Router.getInstance().lastRouteChangeWasPopstate()){this.scroller.scrollTop=this.lastScrollTop_}this.fire("showing-main-page");res()}))}))},scrollToSection_(route){this.ensureSectionForRoute_(route).then((section=>{if(!this.inSearchMode){this.fire("showing-section",section)}this.fire("show-container")}))},getStateTransition_(newRoute,oldRoute){const containsNew=this.containsRoute(newRoute);const containsOld=this.containsRoute(oldRoute);if(!containsNew&&!containsOld){return null}if(containsOld&&!containsNew){return[classifyRoute(oldRoute),RouteState.TOP_LEVEL]}if(!containsOld&&containsNew){return[RouteState.TOP_LEVEL,classifyRoute(newRoute)]}return[classifyRoute(oldRoute),classifyRoute(newRoute)]},currentRouteChanged(newRoute,oldRoute){const transition=this.getStateTransition_(newRoute,oldRoute);if(transition===null){return}const oldState=transition[0];const newState=transition[1];assert(this.validTransitions_.get(oldState).has(newState));if(oldState===RouteState.TOP_LEVEL){if(newState===RouteState.SECTION){this.scrollToSection_(newRoute)}else if(newState===RouteState.SUBPAGE){this.enterSubpage_(newRoute)}return}if(oldState===RouteState.SECTION){if(newState===RouteState.SECTION){this.scrollToSection_(newRoute)}else if(newState===RouteState.SUBPAGE){this.enterSubpage_(newRoute)}else if(newState===RouteState.TOP_LEVEL){this.scroller.scrollTop=0}return}if(oldState===RouteState.SUBPAGE){if(newState===RouteState.SECTION){this.enterMainPage_(oldRoute);if(!Router.getInstance().lastRouteChangeWasPopstate()){this.scrollToSection_(newRoute)}}else if(newState===RouteState.SUBPAGE){if(!oldRoute.contains(newRoute)&&!newRoute.contains(oldRoute)){this.enterMainPage_(oldRoute).then((()=>{this.enterSubpage_(newRoute)}));return}if(oldRoute.contains(newRoute)){this.scroller.scrollTop=0;return}}else if(newState===RouteState.TOP_LEVEL){this.enterMainPage_(oldRoute)}else if(newState===RouteState.DIALOG){this.enterMainPage_(oldRoute)}return}if(oldState===RouteState.INITIAL){if(newState===RouteState.SECTION){this.scrollToSection_(newRoute)}else if(newState===RouteState.SUBPAGE){this.enterSubpage_(newRoute)}return}if(oldState===RouteState.DIALOG){if(newState===RouteState.SUBPAGE){this.enterSubpage_(newRoute)}}},getSection(section){if(!section){return null}return this.$$(`settings-section[section="${section}"]`)}};// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-basic-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-page-styles cr-hidden-style iron-flex settings-shared" scope="settings-basic-page">:host([is-subpage-animating]) {
  overflow: hidden;
}

:host([advanced-toggling-in-progress_]) {
  -webkit-tap-highlight-color: transparent;
}

#advancedToggle {
  --ink-color: currentColor;
        align-items: center;
        background: transparent;
        border: none;
        box-shadow: none;
        color: currentColor;
        display: flex;
        font-weight: 400;
        margin-bottom: 3px;
        margin-top: 12px;  
        min-height: 32px;
        padding: 0 12px;
}

:host-context(.focus-outline-visible) #advancedToggle:focus {
  outline: auto 5px -webkit-focus-ring-color;
}

#osSettingsBanner {
  background-color: var(--cr-card-background-color);
        border-radius: var(--cr-card-border-radius);
        box-shadow: var(--cr-card-shadow);
        margin-top: 21px;
}

#toggleContainer {
  align-items: center;
        color: var(--cr-primary-text-color);
        display: flex;
        font: inherit;
        justify-content: center;
        margin-bottom: 0;
        margin-top: 0;
        padding-bottom: 0;
        padding-top: 0;
}

#toggleSpacer {
  padding-top: 33px;
}

iron-icon {
  margin-inline-start: 16px;
}

</style>
    <template is="dom-if" if="[[showBasicPage_(
        currentRoute_, inSearchMode, hasExpandedSection_)]]">
      <div id="basicPage">
        <template is="dom-if" if="[[showResetProfileBanner_]]" restamp="">
          <settings-reset-profile-banner on-close="onResetProfileBannerClosed_">
          </settings-reset-profile-banner>
        </template>

        <template is="dom-if" if="[[showPage_(pageVisibility.people)]]" restamp="">
          <settings-section page-title="‏علاقتك مع Google" section="people">
            <settings-people-page prefs="{{prefs}}" page-visibility="[[pageVisibility]]">
            </settings-people-page>
          </settings-section>
        </template>
        <template is="dom-if" if="[[showPage_(pageVisibility.autofill)]]" restamp="">
          <settings-section page-title="الملء التلقائي" section="autofill">
            <settings-autofill-page prefs="{{prefs}}"></settings-autofill-page>
          </settings-section>
        </template>
        <template is="dom-if" if="[[showPage_(pageVisibility.safetyCheck)]]" restamp="">
          <settings-section page-title="التحقّق من الأمان" section="safetyCheck" id="safetyCheckSettingsSection">
            <settings-safety-check-page prefs="{{prefs}}">
            </settings-safety-check-page>
          </settings-section>
        </template>
        <template is="dom-if" if="[[showPage_(pageVisibility.privacy)]]" restamp="">
          <settings-section page-title="الخصوصية والأمان" section="privacy">
            <settings-privacy-page prefs="{{prefs}}" page-visibility="[[pageVisibility.privacy]]">
            </settings-privacy-page>
          </settings-section>
        </template>
        <template is="dom-if" if="[[showPage_(pageVisibility.appearance)]]" restamp="">
          <settings-section page-title="المظهر" section="appearance">
            <settings-appearance-page prefs="{{prefs}}" page-visibility="[[pageVisibility.appearance]]">
            </settings-appearance-page>
          </settings-section>
        </template>
        <settings-section page-title="محرك البحث" section="search">
          <settings-search-page prefs="{{prefs}}"></settings-search-page>
        </settings-section>

        <template is="dom-if" if="[[showPage_(pageVisibility.defaultBrowser)]]" restamp="">
          <settings-section page-title="المتصفح التلقائي" section="defaultBrowser">
            <settings-default-browser-page></settings-default-browser-page>
          </settings-section>
        </template>

        <template is="dom-if" if="[[showPage_(pageVisibility.onStartup)]]" restamp="">
          <settings-section page-title="عند بدء التشغيل" section="onStartup">
            <settings-on-startup-page prefs="{{prefs}}">
            </settings-on-startup-page>
          </settings-section>
        </template>
      </div>
    </template>

    <template is="dom-if" if="[[showAdvancedSettings_(pageVisibility.advancedSettings)]]">
      <template is="dom-if" if="[[showAdvancedToggle_(
          inSearchMode, hasExpandedSection_)]]">
        <div id="toggleSpacer"></div>
        <h2 id="toggleContainer">
          <cr-button id="advancedToggle" on-click="advancedToggleClicked_" aria-expanded$="[[boolToString_(advancedToggleExpanded)]]">
            <span>الإعدادات المتقدّمة</span>
            <iron-icon icon="[[getArrowIcon_(advancedToggleExpanded)]]">
            </iron-icon>
          </cr-button>
        </h2>
      </template>

      <settings-idle-load id="advancedPageTemplate" url="/lazy_load.html">
        <template>
          <div id="advancedPage" hidden$="[[!showAdvancedPage_(
              currentRoute_, inSearchMode, hasExpandedSection_,
              advancedToggleExpanded)]]">
            <template is="dom-if" if="[[showPage_(pageVisibility.languages)]]" restamp="">
              <settings-section page-title="اللغات" section="languages">
                <settings-languages-page prefs="{{prefs}}">
                </settings-languages-page>
              </settings-section>
            </template>
            <template is="dom-if" if="[[showPage_(pageVisibility.downloads)]]" restamp="">
              <settings-section page-title="الملفات التي تم تنزيلها" section="downloads">
                <settings-downloads-page prefs="{{prefs}}">
                </settings-downloads-page>
              </settings-section>
            </template>
            <template is="dom-if" if="[[showPage_(pageVisibility.a11y)]]" restamp="">
              <settings-section page-title="إمكانية الوصول" section="a11y">
                <settings-a11y-page prefs="{{prefs}}"></settings-a11y-page>
              </settings-section>
            </template>

            <settings-section page-title="النظام" section="system">
              <settings-system-page prefs="{{prefs}}"></settings-system-page>
            </settings-section>

            <template is="dom-if" if="[[showPage_(pageVisibility.reset)]]" restamp="">
              <settings-section page-title="إعادة الضبط وإزالة البرامج الضارة" section="reset">
                <settings-reset-page prefs="{{prefs}}"></settings-reset-page>
              </settings-section>
            </template>
          </div>
        </template>
      </settings-idle-load>
    </template>
<!--_html_template_end_-->`,behaviors:[MainPageBehavior,RouteObserverBehavior],properties:{prefs:{type:Object,notify:true},pageVisibility:{type:Object,value(){return{}}},advancedToggleExpanded:{type:Boolean,value:false,notify:true,observer:"advancedToggleExpandedChanged_"},hasExpandedSection_:{type:Boolean,value:false},showResetProfileBanner_:{type:Boolean,value(){return loadTimeData.getBoolean("showResetProfileBanner")}},currentRoute_:Object,advancedTogglingInProgress_:{type:Boolean,value:false,reflectToAttribute:true}},hostAttributes:{role:"main"},listeners:{"subpage-expand":"onSubpageExpanded_"},attached(){this.currentRoute_=Router.getInstance().getCurrentRoute()},currentRouteChanged(newRoute,oldRoute){this.currentRoute_=newRoute;if(routes.ADVANCED&&routes.ADVANCED.contains(newRoute)){this.advancedToggleExpanded=true}if(oldRoute&&oldRoute.isSubpage()){if(!newRoute.isSubpage()||newRoute.section!==oldRoute.section){this.hasExpandedSection_=false}}else{assert(!this.hasExpandedSection_)}MainPageBehavior.currentRouteChanged.call(this,newRoute,oldRoute)},containsRoute(route){return!route||routes.BASIC.contains(route)||routes.ADVANCED.contains(route)},showPage_(visibility){return visibility!==false},searchContents(query){const whenSearchDone=[getSearchManager().search(query,assert(this.$$("#basicPage")))];if(this.pageVisibility.advancedSettings!==false){whenSearchDone.push(this.$$("#advancedPageTemplate").get().then((function(advancedPage){return getSearchManager().search(query,advancedPage)})))}return Promise.all(whenSearchDone).then((function(requests){return{canceled:requests.some((function(r){return r.canceled})),didFindMatches:requests.some((function(r){return r.didFindMatches()})),wasClearSearch:requests[0].isSame("")}}))},onResetProfileBannerClosed_(){this.showResetProfileBanner_=false},onSubpageExpanded_(){this.hasExpandedSection_=true},advancedToggleExpandedChanged_(){if(!this.advancedToggleExpanded){return}beforeNextRender(this,(()=>{this.$$("#advancedPageTemplate").get()}))},advancedToggleClicked_(){if(this.advancedTogglingInProgress_){return}this.advancedTogglingInProgress_=true;const toggle=this.$$("#toggleContainer");if(!this.advancedToggleExpanded){this.advancedToggleExpanded=true;this.async((()=>{this.$$("#advancedPageTemplate").get().then((()=>{this.fire("scroll-to-top",{top:toggle.offsetTop,callback:()=>{this.advancedTogglingInProgress_=false}})}))}))}else{this.fire("scroll-to-bottom",{bottom:toggle.offsetTop+toggle.offsetHeight+24,callback:()=>{this.advancedToggleExpanded=false;this.advancedTogglingInProgress_=false}})}},showAdvancedToggle_(inSearchMode,hasExpandedSection){return!inSearchMode&&!hasExpandedSection},showBasicPage_(currentRoute,inSearchMode,hasExpandedSection){return!hasExpandedSection||routes.BASIC.contains(currentRoute)},showAdvancedPage_(currentRoute,inSearchMode,hasExpandedSection,advancedToggleExpanded){return hasExpandedSection?routes.ADVANCED&&routes.ADVANCED.contains(currentRoute):advancedToggleExpanded||inSearchMode},showAdvancedSettings_(visibility){return visibility!==false},getArrowIcon_(opened){return opened?"cr:arrow-drop-up":"cr:arrow-drop-down"},boolToString_(bool){return bool.toString()}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-main",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style cr-hidden-style settings-shared" scope="settings-main">#overscroll {
  margin-top: 64px;
}

.showing-subpage ~ #overscroll {
  display: none;
}

#noSearchResults {
  margin-top: 80px;
        text-align: center;
}

#noSearchResults div:first-child {
  font-size: 123%;  
        margin-bottom: 10px;
}

managed-footnote {
  border-top: none;
        
        margin-bottom: calc(-21px - 8px);
        padding-bottom: 16px;
        padding-top: 12px;
        
        position: relative;
        z-index: 1;
}

</style>
    <div id="noSearchResults" hidden$="[[!showNoResultsFound_]]">
      <div>لم يتم العثور على أي نتائج بحث</div>
      <div>‏يمكنك الانتقال إلى <a target="_blank" href="https://support.google.com/chrome/?p=settings_search_help">مساعدة Google Chrome</a> إذا لم تتمكن من العثور عما تبحث عنه</div>
    </div>
    <template is="dom-if" if="[[showManagedHeader_(inSearchMode_, showingSubpage_,
        showPages_.about)]]">
      <managed-footnote></managed-footnote>
    </template>
    <template is="dom-if" if="[[showPages_.settings]]">
      <settings-basic-page class="cr-centered-card-container" prefs="{{prefs}}" page-visibility="[[pageVisibility]]" on-showing-section="onShowingSection_" on-subpage-expand="onShowingSubpage_" on-showing-main-page="onShowingMainPage_" in-search-mode="[[inSearchMode_]]" advanced-toggle-expanded="{{advancedToggleExpanded}}">
      </settings-basic-page>
    </template>
    <template is="dom-if" if="[[showPages_.about]]">
      <settings-about-page role="main" class="cr-centered-card-container" in-search-mode="[[inSearchMode_]]" on-subpage-expand="onShowingSubpage_" on-showing-main-page="onShowingMainPage_" prefs="{{prefs}}" show-crostini="[[showCrostini]]">
      </settings-about-page>
    </template>
    <div id="overscroll" style="padding-bottom: [[overscroll_]]px"></div>
<!--_html_template_end_-->`,behaviors:[RouteObserverBehavior],properties:{prefs:{type:Object,notify:true},advancedToggleExpanded:{type:Boolean,notify:true},overscroll_:{type:Number,observer:"overscrollChanged_"},showPages_:{type:Object,value(){return{about:false,settings:false}}},inSearchMode_:{type:Boolean,value:false},showNoResultsFound_:{type:Boolean,value:false},showingSubpage_:Boolean,toolbarSpinnerActive:{type:Boolean,value:false,notify:true},pageVisibility:Object},overscrollChanged_(){if(!this.overscroll_&&this.boundScroll_){this.offsetParent.removeEventListener("scroll",this.boundScroll_);window.removeEventListener("resize",this.boundScroll_);this.boundScroll_=null}else if(this.overscroll_&&!this.boundScroll_){this.boundScroll_=()=>{if(!this.showingSubpage_){this.setOverscroll_(0)}};this.offsetParent.addEventListener("scroll",this.boundScroll_);window.addEventListener("resize",this.boundScroll_)}},setOverscroll_(opt_minHeight){const scroller=this.offsetParent;if(!scroller){return}const overscroll=this.$.overscroll;const visibleBottom=scroller.scrollTop+scroller.clientHeight;const overscrollBottom=overscroll.offsetTop+overscroll.scrollHeight;const visibleOverscroll=overscroll.scrollHeight-(overscrollBottom-visibleBottom);this.overscroll_=Math.max(opt_minHeight||0,Math.ceil(visibleOverscroll))},currentRouteChanged(newRoute){const inAbout=routes.ABOUT.contains(Router.getInstance().getCurrentRoute());this.showPages_={about:inAbout,settings:!inAbout};if(!newRoute.isSubpage()){document.title=inAbout?loadTimeData.getStringF("settingsAltPageTitle",loadTimeData.getString("aboutPageTitle")):loadTimeData.getString("settings")}},onShowingSubpage_(){this.showingSubpage_=true},onShowingMainPage_(){this.showingSubpage_=false},onShowingSection_(e){const section=e.detail;const sectionTop=section.offsetParent.offsetTop+section.offsetTop;const distance=this.$.overscroll.offsetTop-sectionTop;const overscroll=Math.max(0,this.offsetParent.clientHeight-distance);this.setOverscroll_(overscroll);section.scrollIntoView();section.focus()},getPage_(route){if(routes.ABOUT.contains(route)){return this.$$("settings-about-page")}if(routes.BASIC.contains(route)||routes.ADVANCED&&routes.ADVANCED.contains(route)){return this.$$("settings-basic-page")}assertNotReached()},searchContents(query){this.inSearchMode_=true;this.toolbarSpinnerActive=true;return new Promise(((resolve,reject)=>{setTimeout((()=>{const whenSearchDone=assert(this.getPage_(routes.BASIC)).searchContents(query);whenSearchDone.then((result=>{resolve();if(result.canceled){return}this.toolbarSpinnerActive=false;this.inSearchMode_=!result.wasClearSearch;this.showNoResultsFound_=this.inSearchMode_&&!result.didFindMatches;if(this.inSearchMode_){IronA11yAnnouncer.requestAvailability();this.fire("iron-announce",{text:this.showNoResultsFound_?loadTimeData.getString("searchNoResults"):loadTimeData.getStringF("searchResults",query)})}}))}),0)}))},showManagedHeader_(){return!this.inSearchMode_&&!this.showingSubpage_&&!this.showPages_.about}});// Copyright 2020 The Chromium Authors. All rights reserved.
class CrMenuSelector extends HTMLElement{static get is(){return"cr-menu-selector"}constructor(){super();this.focusOutlineManager_;this.addEventListener("focusin",(e=>this.onFocusin_(e)));this.addEventListener("keydown",(e=>this.onKeydown_(e)))}connectedCallback(){this.focusOutlineManager_=FocusOutlineManager.forDocument(document);this.setAttribute("role","menu")}getItems_(){return Array.from(this.querySelectorAll("[role=menuitem]:not([disabled]):not([hidden])"))}onFocusin_(e){const focusMovedWithKeyboard=this.focusOutlineManager_.visible;const focusMovedFromOutside=e.relatedTarget===null||!this.contains(e.relatedTarget);if(focusMovedWithKeyboard&&focusMovedFromOutside){this.getItems_()[0].focus()}}onKeydown_(event){const items=this.getItems_();assert(items.length>=1);const currentFocusedIndex=items.indexOf(this.querySelector(":focus"));let newFocusedIndex=currentFocusedIndex;switch(event.key){case"Tab":if(event.shiftKey){items[0].focus()}else{items[items.length-1].focus()}return;case"ArrowDown":newFocusedIndex=(currentFocusedIndex+1)%items.length;break;case"ArrowUp":newFocusedIndex=(currentFocusedIndex+items.length-1)%items.length;break;case"Home":newFocusedIndex=0;break;case"End":newFocusedIndex=items.length-1;break}if(newFocusedIndex===currentFocusedIndex){return}event.preventDefault();items[newFocusedIndex].focus()}}customElements.define(CrMenuSelector.is,CrMenuSelector);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronMultiSelectableBehaviorImpl={properties:{multi:{type:Boolean,value:false,observer:"multiChanged"},selectedValues:{type:Array,notify:true,value:function(){return[]}},selectedItems:{type:Array,readOnly:true,notify:true,value:function(){return[]}}},observers:["_updateSelected(selectedValues.splices)"],select:function(value){if(this.multi){this._toggleSelected(value)}else{this.selected=value}},multiChanged:function(multi){this._selection.multi=multi;this._updateSelected()},get _shouldUpdateSelection(){return this.selected!=null||this.selectedValues!=null&&this.selectedValues.length},_updateAttrForSelected:function(){if(!this.multi){IronSelectableBehavior._updateAttrForSelected.apply(this)}else if(this.selectedItems&&this.selectedItems.length>0){this.selectedValues=this.selectedItems.map((function(selectedItem){return this._indexToValue(this.indexOf(selectedItem))}),this).filter((function(unfilteredValue){return unfilteredValue!=null}),this)}},_updateSelected:function(){if(this.multi){this._selectMulti(this.selectedValues)}else{this._selectSelected(this.selected)}},_selectMulti:function(values){values=values||[];var selectedItems=(this._valuesToItems(values)||[]).filter((function(item){return item!==null&&item!==undefined}));this._selection.clear(selectedItems);for(var i=0;i<selectedItems.length;i++){this._selection.setItemSelected(selectedItems[i],true)}if(this.fallbackSelection&&!this._selection.get().length){var fallback=this._valueToItem(this.fallbackSelection);if(fallback){this.select(this.fallbackSelection)}}},_selectionChange:function(){var s=this._selection.get();if(this.multi){this._setSelectedItems(s);this._setSelectedItem(s.length?s[0]:null)}else{if(s!==null&&s!==undefined){this._setSelectedItems([s]);this._setSelectedItem(s)}else{this._setSelectedItems([]);this._setSelectedItem(null)}}},_toggleSelected:function(value){var i=this.selectedValues.indexOf(value);var unselected=i<0;if(unselected){this.push("selectedValues",value)}else{this.splice("selectedValues",i,1)}},_valuesToItems:function(values){return values==null?null:values.map((function(value){return this._valueToItem(value)}),this)}};const IronMultiSelectableBehavior=[IronSelectableBehavior,IronMultiSelectableBehaviorImpl];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({is:"iron-selector",behaviors:[IronMultiSelectableBehavior]});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-menu",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared cr-icons" scope="settings-menu">:host {
  box-sizing: border-box;
        display: block;
        padding-bottom: 5px; 
        padding-top: 8px;
}

:host * {
  -webkit-tap-highlight-color: transparent;
}

#topMenu {
  display: flex;
        flex-direction: column;
        min-width: fit-content;
}

a[href], #advancedButton {
  align-items: center;
        color: var(--settings-nav-item-color);
        display: flex;
        font-weight: 500;
        margin-inline-end: 2px;  
        margin-inline-start: 1px;
        min-height: 20px;
        padding-bottom: 10px;
        padding-inline-start: 23px;  
        padding-top: 10px;
}

a[href].iron-selected {
  color: var(--cr-link-color);
}

a[href]:focus {
  background: transparent;
        outline: auto 5px -webkit-focus-ring-color;
}

iron-icon {
  --iron-icon-fill-color: var(--settings-nav-icon-color);
        margin-inline-end: 24px;
        pointer-events: none;
        vertical-align: top;
}

.iron-selected > iron-icon {
  fill: var(--cr-link-color);
}

#advancedButton {
  --ink-color: var(--settings-nav-item-color);
        background: none;
        border: none;
        border-radius: initial;
        box-shadow: none;
        height: unset;
        margin-top: 8px;
        padding-inline-end: 0;
        text-transform: none;
}

#advancedButton:focus {
  outline: none;
}

:host-context(.focus-outline-visible) #advancedButton:focus {
  outline: auto 5px -webkit-focus-ring-color;
}

#advancedButton > span, #extensionsLink > span {
  flex: 1;
}

#advancedButton > iron-icon, #extensionsLink > .cr-icon {
  height: var(--cr-icon-size);
        margin-inline-end: 14px;  
        width: var(--cr-icon-size);
}

#menuSeparator {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        margin-bottom: 8px;
        margin-top: 8px;
}

@media (prefers-color-scheme: dark) {
#menuSeparator {
  border-bottom: var(--cr-separator-line);
}

}

</style>

    <div role="navigation">
      <cr-menu-selector>
        <iron-selector id="topMenu" selectable="a:not(#extensionsLink)" attr-for-selected="href" on-iron-activate="onSelectorActivate_" on-click="onLinkClick_">
          <a role="menuitem" id="people" href="/people" hidden="[[!pageVisibility.people]]">
            <iron-icon icon="cr:person"></iron-icon>
            ‏علاقتك مع Google
          </a>
          <a role="menuitem" id="autofill" href="/autofill" hidden="[[!pageVisibility.autofill]]">
            <iron-icon icon="settings:assignment"></iron-icon>
            الملء التلقائي
          </a>
          <a role="menuitem" href="/safetyCheck" hidden="[[!pageVisibility.safetyCheck]]" id="safetyCheck">
            <iron-icon icon="settings20:safety-check"></iron-icon>
            التحقّق من الأمان
          </a>
          <a role="menuitem" href="/privacy" hidden="[[!pageVisibility.privacy]]">
            <iron-icon icon="cr:security"></iron-icon>
            الخصوصية والأمان
          </a>
          <a role="menuitem" id="appearance" href="/appearance" hidden="[[!pageVisibility.appearance]]">
            <iron-icon icon="settings:palette"></iron-icon>
            المظهر
          </a>
          <a role="menuitem" href="/search">
            <iron-icon icon="cr:search"></iron-icon>
            محرك البحث
          </a>
    
          <a role="menuitem" id="defaultBrowser" href="/defaultBrowser" hidden="[[!pageVisibility.defaultBrowser]]">
            <iron-icon icon="settings:web"></iron-icon>
            المتصفح التلقائي
          </a>
    
          <a role="menuitem" id="onStartup" href="/onStartup" hidden="[[!pageVisibility.onStartup]]">
            <iron-icon icon="settings:power-settings-new"></iron-icon>
            عند بدء التشغيل
          </a>
          <cr-button role="menuitem" tabindex="-1" id="advancedButton" aria-expanded$="[[boolToString_(advancedOpened)]]" on-click="onAdvancedButtonToggle_" hidden="[[!pageVisibility.advancedSettings]]">
            <span>الإعدادات المتقدّمة</span>
            <iron-icon icon="[[arrowState_(advancedOpened)]]">
            </iron-icon></cr-button>
          <iron-collapse id="advancedSubmenu" opened="[[advancedOpened]]" hidden="[[!pageVisibility.advancedSettings]]">
            <iron-selector id="subMenu" selectable="a" attr-for-selected="href" role="navigation" on-click="onLinkClick_">
              <a role="menuitem" href="/languages" disabled$="[[!advancedOpened]]">
                <iron-icon icon="settings:language"></iron-icon>
                اللغات
              </a>
              <a role="menuitem" href="/downloads" disabled$="[[!advancedOpened]]">
                <iron-icon icon="cr:file-download"></iron-icon>
                الملفات التي تم تنزيلها
              </a>
              <a role="menuitem" href="/accessibility" disabled$="[[!advancedOpened]]">
                <iron-icon icon="settings:accessibility"></iron-icon>
                إمكانية الوصول
              </a>
    
              <a role="menuitem" href="/system" disabled$="[[!advancedOpened]]">
                <iron-icon icon="settings:build"></iron-icon>
                النظام
              </a>
    
              <a role="menuitem" id="reset" href="/reset" disabled$="[[!advancedOpened]]" hidden="[[!pageVisibility.reset]]">
                <iron-icon icon="settings:restore"></iron-icon>
                إعادة الضبط وإزالة البرامج الضارة
              </a>
            </iron-selector>
          </iron-collapse>
          <div id="menuSeparator"></div>
          <a role="menuitem" id="extensionsLink" href="chrome://extensions" target="_blank" hidden="[[!pageVisibility.extensions]]" on-click="onExtensionsLinkClick_" title="تفتح الصفحة في علامة تبويب جديدة">
            <span>الإضافات</span>
            <div class="cr-icon icon-external"></div>
          </a>
          <a role="menuitem" id="about-menu" href="/help">
            ‏لمحة عن Chrome
          </a>
        </iron-selector>
      </cr-menu-selector>
    </div>
<!--_html_template_end_-->`,behaviors:[RouteObserverBehavior],properties:{advancedOpened:{type:Boolean,value:false,notify:true},pageVisibility:Object},currentRouteChanged(newRoute){const anchors=this.root.querySelectorAll("a");for(let i=0;i<anchors.length;++i){const anchorRoute=Router.getInstance().getRouteForPath(anchors[i].getAttribute("href"));if(anchorRoute&&anchorRoute.contains(newRoute)){this.setSelectedUrl_(anchors[i].href);return}}this.setSelectedUrl_("")},focusFirstItem(){const firstFocusableItem=this.shadowRoot.querySelector("[role=menuitem]:not([hidden])");if(firstFocusableItem){firstFocusableItem.focus()}},onAdvancedButtonToggle_(){this.advancedOpened=!this.advancedOpened},onLinkClick_(event){if(event.target.matches("a:not(#extensionsLink)")){event.preventDefault()}},setSelectedUrl_(url){this.$.topMenu.selected=this.$.subMenu.selected=url},onSelectorActivate_(event){this.setSelectedUrl_(event.detail.selected);const path=new URL(event.detail.selected).pathname;const route=Router.getInstance().getRouteForPath(path);assert(route,"settings-menu has an entry with an invalid route.");Router.getInstance().navigateTo(route,null,true)},arrowState_(opened){return opened?"cr:arrow-drop-up":"cr:arrow-drop-down"},onExtensionsLinkClick_(){chrome.metricsPrivate.recordUserAction("SettingsMenu_ExtensionsLinkClicked")},boolToString_(bool){return bool.toString()}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-ui",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-page-host-style settings-shared" scope="settings-ui">:host {
  display: flex;
        flex-direction: column;
        height: 100%;
        --settings-menu-width: 250px;
        
        --settings-main-basis: calc(var(--cr-centered-card-max-width) /
            var(--cr-centered-card-width-percentage));
}

cr-toolbar {
  min-height: 56px;
        --cr-toolbar-center-basis: var(--settings-main-basis);
}

cr-toolbar:not([narrow]) {
  --cr-toolbar-left-spacer-width: var(--settings-menu-width);
}

@media (prefers-color-scheme: light) {
cr-toolbar {
  --iron-icon-fill-color: white;
}

}

#cr-container-shadow-top {
  z-index: 2;
}

#container {
  align-items: flex-start;
        display: flex;
        flex: 1;
        overflow: overlay;
        position: relative;
}

#left, #main, #right {
  flex: 1 1 0;
}

#left {
  height: 100%;
        position: sticky;
        top: 0;
}

#left settings-menu {
  max-height: 100%;
        overflow: auto;
        overscroll-behavior: contain;
        width: var(--settings-menu-width);
}

#main {
  flex-basis: var(--settings-main-basis);
}

@media (max-width: 980px) {
#main {
  min-width: auto;
          
          padding: 0 3px;
}

}

</style>
    <settings-prefs id="prefs" prefs="{{prefs}}"></settings-prefs>
    <cr-toolbar id="toolbar" page-name="الإعدادات" clear-label="محو البحث" autofocus="" search-prompt="بحث في الإعدادات" on-cr-toolbar-menu-tap="onMenuButtonTap_" spinner-active="[[toolbarSpinnerActive_]]" menu-label="القائمة الرئيسية" on-search-changed="onSearchChanged_" role="banner" narrow="{{narrow_}}" narrow-threshold="980" show-menu="[[narrow_]]">
    </cr-toolbar>
    <cr-drawer id="drawer" on-close="onMenuClose_" heading="الإعدادات" align="rtl">
      <div class="drawer-content">
        <template is="dom-if" id="drawerTemplate">
          <settings-menu id="drawerMenu" page-visibility="[[pageVisibility_]]" on-iron-activate="onIronActivate_" advanced-opened="{{advancedOpenedInMenu_}}">
          </settings-menu>
        </template>
      </div>
    </cr-drawer>
    <div id="container" class="no-outline">
      <div id="left" hidden$="[[narrow_]]">
        <settings-menu id="leftMenu" page-visibility="[[pageVisibility_]]" on-iron-activate="onIronActivate_" advanced-opened="{{advancedOpenedInMenu_}}">
        </settings-menu>
      </div>
      <settings-main id="main" prefs="{{prefs}}" toolbar-spinner-active="{{toolbarSpinnerActive_}}" page-visibility="[[pageVisibility_]]" advanced-toggle-expanded="{{advancedOpenedInMain_}}">
      </settings-main>
      <!-- An additional child of the flex #container to take up space,
           aligned with the right-hand child of the flex toolbar. -->
      <div id="right" hidden$="[[narrow_]]"></div>
    </div>
<!--_html_template_end_-->`,behaviors:[RouteObserverBehavior,CrContainerShadowBehavior,FindShortcutBehavior],properties:{prefs:Object,advancedOpenedInMain_:{type:Boolean,value:false,notify:true,observer:"onAdvancedOpenedInMainChanged_"},advancedOpenedInMenu_:{type:Boolean,value:false,notify:true,observer:"onAdvancedOpenedInMenuChanged_"},toolbarSpinnerActive_:{type:Boolean,value:false},narrow_:{type:Boolean,observer:"onNarrowChanged_"},pageVisibility_:{type:Object,value:pageVisibility},lastSearchQuery_:{type:String,value:""}},listeners:{"refresh-pref":"onRefreshPref_"},created(){Router.getInstance().initializeRouteFromUrl()},ready(){listenOnce(this.$.drawer,"cr-drawer-opening",(()=>{this.$.drawerTemplate.if=true}));window.addEventListener("popstate",(e=>{this.$.drawer.cancel()}));window.CrPolicyStrings={controlledSettingExtension:loadTimeData.getString("controlledSettingExtension"),controlledSettingExtensionWithoutName:loadTimeData.getString("controlledSettingExtensionWithoutName"),controlledSettingPolicy:loadTimeData.getString("controlledSettingPolicy"),controlledSettingRecommendedMatches:loadTimeData.getString("controlledSettingRecommendedMatches"),controlledSettingRecommendedDiffers:loadTimeData.getString("controlledSettingRecommendedDiffers")};this.addEventListener("show-container",(()=>{this.$.container.style.visibility="visible"}));this.addEventListener("hide-container",(()=>{this.$.container.style.visibility="hidden"}))},attached(){document.documentElement.classList.remove("loading");setTimeout((function(){chrome.send("metricsHandler:recordTime",["Settings.TimeUntilInteractive",window.performance.now()])}));document.fonts.load("bold 12px Roboto");setGlobalScrollTarget(this.$.container);const scrollToTop=top=>new Promise((resolve=>{if(this.$.container.scrollTop===top){resolve();return}const behavior=isChromeOS?"auto":"smooth";this.$.container.scrollTo({top:top,behavior:behavior});const onScroll=()=>{this.debounce("scrollEnd",(()=>{this.$.container.removeEventListener("scroll",onScroll);resolve()}),75)};this.$.container.addEventListener("scroll",onScroll)}));this.addEventListener("scroll-to-top",(e=>{scrollToTop(e.detail.top).then(e.detail.callback)}));this.addEventListener("scroll-to-bottom",(e=>{scrollToTop(e.detail.bottom-this.$.container.clientHeight).then(e.detail.callback)}))},detached(){Router.getInstance().resetRouteForTesting();resetGlobalScrollTargetForTesting()},currentRouteChanged(route){const urlSearchQuery=Router.getInstance().getQueryParameters().get("search")||"";if(urlSearchQuery===this.lastSearchQuery_){return}this.lastSearchQuery_=urlSearchQuery;const toolbar=this.$$("cr-toolbar");const searchField=toolbar.getSearchField();if(urlSearchQuery!==searchField.getValue()){searchField.setValue(urlSearchQuery,true)}this.$.main.searchContents(urlSearchQuery)},handleFindShortcut(modalContextOpen){if(modalContextOpen){return false}this.$$("cr-toolbar").getSearchField().showAndFocus();return true},searchInputHasFocus(){return this.$$("cr-toolbar").getSearchField().isSearchFocused()},onRefreshPref_(e){return this.$.prefs.refresh(e.detail)},onSearchChanged_(e){const query=e.detail;Router.getInstance().navigateTo(routes.BASIC,query.length>0?new URLSearchParams("search="+encodeURIComponent(query)):undefined,true)},onIronActivate_(){this.$.drawer.close()},onMenuButtonTap_(){this.$.drawer.toggle()},onMenuClose_(){if(!this.$.drawer.wasCanceled()){return}this.$.container.setAttribute("tabindex","-1");this.$.container.focus();listenOnce(this.$.container,["blur","pointerdown"],(()=>{this.$.container.removeAttribute("tabindex")}))},onAdvancedOpenedInMainChanged_(){if(this.advancedOpenedInMain_){this.advancedOpenedInMenu_=true}},onAdvancedOpenedInMenuChanged_(){if(this.advancedOpenedInMenu_){this.advancedOpenedInMain_=true}},onNarrowChanged_(){if(this.$.drawer.open&&!this.narrow_){this.$.drawer.close()}const focusedElement=this.shadowRoot.activeElement;if(this.narrow_&&focusedElement===this.$.leftMenu){this.$.toolbar.focusMenuButton()}else if(!this.narrow_&&this.$.toolbar.isMenuFocused()){this.$.leftMenu.focusFirstItem()}else if(!this.narrow_&&focusedElement===this.$$("#drawerMenu")){const boundCloseListener=()=>{this.$.leftMenu.focusFirstItem();this.$.drawer.removeEventListener("close",boundCloseListener)};this.$.drawer.addEventListener("close",boundCloseListener)}},getAdvancedOpenedInMainForTest(){return this.advancedOpenedInMain_},getAdvancedOpenedInMenuForTest(){return this.advancedOpenedInMenu_}});export{AboutPageBrowserProxy,AboutPageBrowserProxyImpl,AppearanceBrowserProxy,AppearanceBrowserProxyImpl,DefaultBrowserBrowserProxyImpl,EDIT_STARTUP_URL_EVENT,HatsBrowserProxy,HatsBrowserProxyImpl,OnStartupBrowserProxy,OnStartupBrowserProxyImpl,PromoteUpdaterStatus,SafetyCheckBrowserProxy,SafetyCheckBrowserProxyImpl,SafetyCheckCallbackConstants,SafetyCheckChromeCleanerStatus,SafetyCheckExtensionsStatus,SafetyCheckIconStatus,SafetyCheckParentStatus,SafetyCheckPasswordsStatus,SafetyCheckSafeBrowsingStatus,SafetyCheckUpdatesStatus,SearchRequest,StartupUrlsPageBrowserProxy,StartupUrlsPageBrowserProxyImpl,UpdateStatus,getSearchManager,setSearchManagerForTesting};