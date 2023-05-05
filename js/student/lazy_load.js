import{Polymer,html,calculateSplices,afterNextRender,flush,PolymerElement,mixinBehaviors}from"chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";import{al as PaperRippleBehavior,am as EventTracker,c as CrPolicyPrefBehavior,b as assert,I as I18nBehavior,W as WebUIListenerBehavior,k as PasswordManagerImpl,i as focusWithoutInk,m as PasswordManagerProxy,a as assertNotReached,O as OpenWindowProxyImpl,o as PasswordCheckBehavior,d as PrefsBehavior,e as RouteObserverBehavior,u as SyncBrowserProxyImpl,R as Router,r as routes,T as MultiStoreExceptionEntry,U as MultiStorePasswordUiEntry,F as FocusRowBehavior,an as IronA11yKeysBehavior,ao as GlobalScrollTargetBehavior,A as IronA11yAnnouncer,ap as getDeepActiveElement,Q as PluralStringProxyImpl,M as MetricsBrowserProxyImpl,Z as PrivacyElementInteractions,aq as SettingsBooleanControlBehavior,a3 as StatusAction,x as SearchEnginesBrowserProxyImpl,ar as AnchorAlignment,V as ExtensionControlBrowserProxyImpl,as as SiteSettingsBehavior,at as SITE_EXCEPTION_WILDCARD,au as ContentSetting,f as ContentSettingsTypes,S as SiteSettingsPrefsBrowserProxyImpl,g as ChooserType,av as INVALID_CATEGORY_SUBTYPE,h as PrivacyPageBrowserProxyImpl,ad as SecureDnsMode,af as SecureDnsUiManagementMode,_ as SafeBrowsingInteractions,aw as AllSitesAction2,ax as SortMethod,ay as GlobalScrollTargetBehaviorImpl,az as ALL_SITES_DIALOG,aA as SiteSettingSource,aB as ContentSettingProvider,aC as hasKeyModifiers,v as getImage,t as ProfileInfoBrowserProxyImpl,L as LifetimeBrowserProxyImpl,a2 as PageStatus,P as PrefControlBehavior,l as listenOnce,y as PromiseResolver,a9 as CrSettingsPrefs,q as CrScrollableBehavior,G as FindShortcutBehavior,w as ResetBrowserProxyImpl,n as ChromeCleanupProxyImpl}from"./shared.rollup.js";export{g as ChooserType,aD as ChromeCleanupProxy,n as ChromeCleanupProxyImpl,au as ContentSetting,aB as ContentSettingProvider,f as ContentSettingsTypes,aE as CookieControlsMode,aG as DefaultContentSetting,aH as RawChooserException,aI as RawSiteException,aJ as RecentSitePermissions,at as SITE_EXCEPTION_WILDCARD,aK as SiteException,aL as SiteGroup,aA as SiteSettingSource,aM as SiteSettingsPrefsBrowserProxy,S as SiteSettingsPrefsBrowserProxyImpl,ax as SortMethod,aN as ZoomLevelEntry,aF as kControlledByLookup}from"./shared.rollup.js";import{sendWithPromise,addSingletonGetter,isChromeOS,isWindows}from"chrome://resources/js/cr.m.js";import{loadTimeData}from"chrome://resources/js/load_time_data.m.js";import"chrome://settings/strings.m.js";import{SkColorSpec}from"chrome://resources/mojo/skia/public/mojom/skcolor.mojom-webui.js";import{mojo}from"chrome://resources/mojo/mojo/public/js/bindings.js";// Copyright 2018 The Chromium Authors. All rights reserved.
function clamp(min,max,value){return Math.min(max,Math.max(min,value))}function getAriaValue(tick){if(Number.isFinite(tick)){return tick}else if(tick.ariaValue!==undefined){return tick.ariaValue}else{return tick.value}}Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="cr-slider">:host {
  --cr-slider-active-color: var(--google-blue-600);
        --cr-slider-container-color: rgba(var(--google-blue-600-rgb), .24);
        --cr-slider-container-disabled-color:
            rgba(var(--google-grey-600-rgb), .24);
        --cr-slider-disabled-color: var(--google-grey-600);
        --cr-slider-knob-color-rgb: var(--google-blue-600-rgb);
        --cr-slider-knob-disabled-color: white;
        --cr-slider-marker-active-color: rgba(255, 255, 255, .54);
        --cr-slider-marker-color: rgba(26, 115, 232, .54);
        --cr-slider-marker-disabled-color: rgba(128, 134, 139, .54);
        --cr-slider-position-transition: 80ms ease;
        --cr-slider-ripple-color: rgba(var(--cr-slider-knob-color-rgb), .25);

        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        cursor: default;
        height: 32px;
        outline: none;
        padding: 0 16px;
        user-select: none;
}

@media (prefers-color-scheme: dark) {
:host {
  --cr-slider-active-color: var(--google-blue-refresh-300);
          --cr-slider-container-color:
              rgba(var(--google-blue-refresh-500-rgb), .48);
          --cr-slider-container-disabled-color:
              rgba(var(--google-grey-600-rgb), .48);
          
          --cr-slider-knob-color-rgb: var(--google-blue-refresh-300-rgb);
          --cr-slider-knob-disabled-color:
              var(--google-grey-900-white-4-percent);
          --cr-slider-marker-active-color: var(--google-blue-refresh-300);
          --cr-slider-marker-color: var(--google-blue-refresh-300);
          --cr-slider-marker-disabled-color: rgba(255, 255, 255, .54);
          --cr-slider-ripple-color: rgba(var(--cr-slider-knob-color-rgb), .4);
}

}

:host([dragging]), :host([dragging]) > #container {
  touch-action: none;
}

#container, #bar {
  border-top-style: solid;
        border-top-width: 2px;
}

#container {
  border-top-color: var(--cr-slider-container-color);
        position: relative;
        top: 16px;
}

#container > div {
  position: absolute;
}

#markers, #bar {
  top: -2px;
}

#markers {
  display: flex;
        flex-direction: row;
        left: 0;
        pointer-events: none;
        right: 0;
}

.active-marker, .inactive-marker {
  flex: 1;
}

#markers::before, #markers::after, .active-marker::after, .inactive-marker::after {
  border-radius: 50%;
        content: '';
        display: block;
        height: 2px;
        margin-inline-start: -1px;
        width: 2px;
}

#markers::before, .active-marker::after {
  background-color: var(--cr-slider-marker-active-color);
}

#markers::after, .inactive-marker::after {
  background-color: var(--cr-slider-marker-color);
}

#bar {
  border-top-color: var(--cr-slider-active-color);
}

:host([transiting_]) #bar {
  transition: width var(--cr-slider-position-transition);
}

#knobAndLabel {
  top: -1px;
}

:host([transiting_]) #knobAndLabel {
  transition: margin-inline-start var(--cr-slider-position-transition);
}

#knob {
  background-color: rgb(var(--cr-slider-knob-color-rgb));
        border-radius: 50%;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .4);
        height: 10px;
        outline: none;
        transform: translate(-50%, -50%);
        width: 10px;
}

:host([is-rtl_]) #knob {
  transform: translate(50%, -50%);
}

#label {
  background: rgb(var(--cr-slider-knob-color-rgb));
        border-radius: .75em;
        bottom: 22px;
        color: white;  
        font-size: 12px;
        line-height: 1.5em;
        opacity: 0;
        
        outline: 1px transparent solid;
        padding: 0 .67em;
        position: absolute;
        transform: translateX(-50%);
        transition: opacity 80ms ease-in-out;
        white-space: nowrap;
}

:host([is-rtl_]) #label {
  transform: translateX(50%);
}

:host(:hover) #label, :host([show-label_]) #label {
  opacity: 1;
}

paper-ripple {
  --paper-ripple-opacity: 1;  
        color: var(--cr-slider-ripple-color);
        height: 32px;
        left: -11px;
        pointer-events: none;
        top: -11px;
        transition: color linear 80ms;
        width: 32px;
}

:host([is-rtl_]) paper-ripple {
  left: auto;
        right: -11px;
}

:host([disabled_]) {
  pointer-events: none;
}

:host([disabled_]) #container {
  border-top-color: var(--cr-slider-container-disabled-color);
}

:host([disabled_]) #bar {
  border-top-color: var(--cr-slider-disabled-color);
}

:host([disabled_]) .inactive-marker::after, :host([disabled_]) #markers::after {
  background-color: var(--cr-slider-marker-disabled-color);
}

:host([disabled_]) #knob {
  background-color: var(--cr-slider-disabled-color);
        border: 2px solid var(--cr-slider-knob-disabled-color);
        box-shadow: unset;
}

</style>
    <div id="container" hidden="">
      <div id="bar"></div>
      <div id="markers" hidden$="[[!markerCount]]">
        <template is="dom-repeat" items="[[getMarkers_(markerCount)]]">
          <div class$="[[getMarkerClass_(index, value, min, max,
                                         markerCount)]]"></div>
        </template>
      </div>
      <div id="knobAndLabel" on-transitionend="onTransitionEnd_">
        <div id="knob"></div>
        <div id="label">[[label_]]</div>
      </div>
    </div>
<!--_html_template_end_-->`,is:"cr-slider",behaviors:[PaperRippleBehavior],properties:{disabled:{type:Boolean,value:false},disabled_:{type:Boolean,computed:"computeDisabled_(disabled, ticks.*)",reflectToAttribute:true,observer:"onDisabledChanged_"},dragging:{type:Boolean,value:false,notify:true,reflectToAttribute:true},updatingFromKey:{type:Boolean,value:false,notify:true},markerCount:{type:Number,value:0},max:{type:Number,value:100},min:{type:Number,value:0},noKeybindings:{type:Boolean,value:false},snaps:{type:Boolean,value:false},ticks:{type:Array,value:()=>[]},value:Number,label_:{type:String,value:""},showLabel_:{type:Boolean,value:false,reflectToAttribute:true},isRtl_:{type:Boolean,value:false,reflectToAttribute:true},transiting_:{type:Boolean,value:false,reflectToAttribute:true}},hostAttributes:{role:"slider"},observers:["onTicksChanged_(ticks.*)","updateUi_(ticks.*, value, min, max)","onValueMinMaxChange_(value, min, max)"],listeners:{blur:"hideRipple_",focus:"showRipple_",keydown:"onKeyDown_",keyup:"onKeyUp_",pointerdown:"onPointerDown_"},deltaKeyMap_:null,draggingEventTracker_:null,attached(){this.isRtl_=window.getComputedStyle(this)["direction"]==="rtl";this.deltaKeyMap_=new Map([["ArrowDown",-1],["ArrowUp",1],["PageDown",-1],["PageUp",1],["ArrowLeft",this.isRtl_?1:-1],["ArrowRight",this.isRtl_?-1:1]]);this.draggingEventTracker_=new EventTracker},computeDisabled_(){return this.disabled||this.ticks.length===1},getMarkers_(){return new Array(Math.max(0,this.markerCount-1))},getMarkerClass_(index){const currentStep=(this.markerCount-1)*this.getRatio();return index<currentStep?"active-marker":"inactive-marker"},getRatio(){return(this.value-this.min)/(this.max-this.min)},stopDragging_(pointerId){this.draggingEventTracker_.removeAll();this.releasePointerCapture(pointerId);this.dragging=false;this.hideRipple_()},hideRipple_(){this.getRipple().clear();this.showLabel_=false},showRipple_(){this.getRipple().showAndHoldDown();this.showLabel_=true},onDisabledChanged_(){this.setAttribute("tabindex",this.disabled_?-1:0);this.blur()},onKeyDown_(event){if(this.disabled_||this.noKeybindings){return}if(event.metaKey||event.shiftKey||event.altKey||event.ctrlKey){return}let newValue;if(event.key==="Home"){newValue=this.min}else if(event.key==="End"){newValue=this.max}else if(this.deltaKeyMap_.has(event.key)){newValue=this.value+this.deltaKeyMap_.get(event.key)}if(newValue===undefined){return}this.updatingFromKey=true;if(this.updateValue_(newValue)){this.fire("cr-slider-value-changed")}event.preventDefault();event.stopPropagation();this.showRipple_()},onKeyUp_(event){if(event.key==="Home"||event.key==="End"||this.deltaKeyMap_.has(event.key)){setTimeout((()=>{this.updatingFromKey=false}))}},onPointerDown_(event){if(this.disabled_||event.buttons!==1&&event.pointerType==="mouse"){return}this.dragging=true;this.transiting_=true;this.updateValueFromClientX_(event.clientX);this.showRipple_();this.setPointerCapture(event.pointerId);const stopDragging=this.stopDragging_.bind(this,event.pointerId);this.draggingEventTracker_.add(this,"pointermove",(e=>{e.preventDefault();if(e.buttons!==1&&e.pointerType==="mouse"){stopDragging();return}this.updateValueFromClientX_(e.clientX)}));this.draggingEventTracker_.add(this,"pointercancel",stopDragging);this.draggingEventTracker_.add(this,"pointerdown",stopDragging);this.draggingEventTracker_.add(this,"pointerup",stopDragging);this.draggingEventTracker_.add(this,"keydown",(e=>{if(e.key==="Escape"||e.key==="Tab"||e.key==="Home"||e.key==="End"||this.deltaKeyMap_.has(e.key)){stopDragging()}}))},onTicksChanged_(){if(this.ticks.length>1){this.snaps=true;this.max=this.ticks.length-1;this.min=0}if(this.value!==undefined){this.updateValue_(this.value)}},onTransitionEnd_(){this.transiting_=false},onValueMinMaxChange_(){if(this.value===undefined||this.min===undefined||this.max===undefined){return}this.updateValue_(this.value)},updateUi_(){const percent=`${this.getRatio()*100}%`;this.$.bar.style.width=percent;this.$.knobAndLabel.style.marginInlineStart=percent;const ticks=this.ticks;const value=this.value;if(ticks&&ticks.length>0&&value>=0&&value<ticks.length&&Number.isInteger(value)){const tick=ticks[this.value];this.label_=Number.isFinite(tick)?"":tick.label;const ariaValueNow=getAriaValue(tick);this.setAttribute("aria-valuetext",this.label_||ariaValueNow);this.setAttribute("aria-valuenow",ariaValueNow);this.setAttribute("aria-valuemin",getAriaValue(ticks[0]));this.setAttribute("aria-valuemax",getAriaValue(ticks.slice(-1)[0]))}else{this.setAttribute("aria-valuetext",value);this.setAttribute("aria-valuenow",value);this.setAttribute("aria-valuemin",this.min);this.setAttribute("aria-valuemax",this.max)}},updateValue_(value){this.$.container.hidden=false;if(this.snaps){if(Math.abs(this.value-value)<.8){return false}value=Math.round(value)}value=clamp(this.min,this.max,value);if(this.value===value){return false}this.value=value;return true},updateValueFromClientX_(clientX){const rect=this.$.container.getBoundingClientRect();let ratio=(clientX-rect.left)/rect.width;if(this.isRtl_){ratio=1-ratio}if(this.updateValue_(ratio*(this.max-this.min)+this.min)){this.fire("cr-slider-value-changed")}},_createRipple(){this._rippleContainer=this.$.knob;const ripple=PaperRippleBehavior._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");ripple.classList.add("circle","toggle-ink");return ripple}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="settings-slider">:host {
  display: inline-flex;
}

cr-policy-pref-indicator {
  align-self: center;
        margin-inline-start: var(--settings-controlled-by-spacing);
}

#labels[disabled] {
  color: var(--paper-grey-400);
}

@media (prefers-color-scheme: dark) {
#labels[disabled] {
  color: var(--google-grey-refresh-500);
}

}

div.outer {
  align-items: stretch;
        display: flex;
        flex-direction: column;
        margin: 8px 0;
        min-width: 200px;
}

#labels {
  display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: -4px 16px 0 16px;
}

#labels > div {
  font-size: 12px;
}

#label-begin {
  margin-inline-end: 4px;
}

#label-end {
  margin-inline-start: 4px;
}

</style>
    <template is="dom-if" if="[[pref.controlledBy]]" restamp="">
      <cr-policy-pref-indicator pref="[[pref]]"></cr-policy-pref-indicator>
    </template>
    <div class="outer">
      <cr-slider id="slider" disabled$="[[disableSlider_]]" ticks="[[ticks]]" on-cr-slider-value-changed="onSliderChanged_" max="[[max]]" min="[[min]]" on-dragging-changed="onSliderChanged_" on-updating-from-key="onSliderChanged_" aria-roledescription$="[[getRoleDescription_()]]" aria-label$="[[labelAria]]">
      </cr-slider>
      <!-- aria-hidden because role description on #slider contains min/max. -->
      <div id="labels" disabled$="[[disableSlider_]]" aria-hidden="true">
        <div id="label-begin">[[labelMin]]</div>
        <div id="label-end">[[labelMax]]</div>
      </div>
    </div>
<!--_html_template_end_-->`,is:"settings-slider",behaviors:[CrPolicyPrefBehavior],properties:{pref:Object,ticks:{type:Array,value:()=>[]},scale:{type:Number,value:1},min:Number,max:Number,labelAria:String,labelMin:String,labelMax:String,disabled:Boolean,showMarkers:Boolean,disableSlider_:{computed:"computeDisableSlider_(pref.*, disabled, ticks.*)",type:Boolean},updateValueInstantly:{type:Boolean,value:true,observer:"onSliderChanged_"},loaded_:Boolean},observers:["valueChanged_(pref.*, ticks.*, loaded_)"],attached(){this.loaded_=true},focus(){this.$.slider.focus()},getTickValue_(tick){return typeof tick==="object"?tick.value:tick},getTickValueAtIndex_(index){return this.getTickValue_(this.ticks[index])},onSliderChanged_(){if(!this.loaded_){return}if(this.$.slider.dragging&&!this.updateValueInstantly){return}const sliderValue=this.$.slider.value;let newValue;if(this.ticks&&this.ticks.length>0){newValue=this.getTickValueAtIndex_(sliderValue)}else{newValue=sliderValue/this.scale}this.set("pref.value",newValue)},computeDisableSlider_(){return this.disabled||this.isPrefEnforced()},valueChanged_(){if(this.pref===undefined||!this.loaded_||this.$.slider.dragging||this.$.slider.updatingFromKey){return}const numTicks=this.ticks.length;if(numTicks===1){this.$.slider.disabled=true;return}const prefValue=this.pref.value;if(numTicks===0){this.$.slider.value=prefValue*this.scale;return}assert(this.scale===1);const MAX_TICKS=10;this.$.slider.markerCount=this.showMarkers||numTicks<=MAX_TICKS?numTicks:0;const index=this.ticks.map((tick=>Math.abs(this.getTickValue_(tick)-prefValue))).reduce(((acc,diff,index)=>diff<acc.diff?{index:index,diff:diff}:acc),{index:-1,diff:Number.MAX_VALUE}).index;assert(index!==-1);if(this.$.slider.value!==index){this.$.slider.value=index}const tickValue=this.getTickValueAtIndex_(index);if(this.pref.value!==tickValue){this.set("pref.value",tickValue)}},getRoleDescription_(){return loadTimeData.getStringF("settingsSliderRoleDescription",this.labelMin,this.labelMax)}});// Copyright 2016 The Chromium Authors. All rights reserved.
class FontsBrowserProxy{fetchFontsData(){}}class FontsBrowserProxyImpl{fetchFontsData(){return sendWithPromise("fetchFontsData")}}addSingletonGetter(FontsBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
const FONT_SIZE_RANGE=[9,10,11,12,13,14,15,16,17,18,20,22,24,26,28,30,32,34,36,40,44,48,56,64,72];const MINIMUM_FONT_SIZE_RANGE=[0,6,7,8,9,10,11,12,13,14,15,16,17,18,20,22,24];function ticksWithLabels(ticks){return ticks.map((x=>({label:`${x}`,value:x})))}Polymer({is:"settings-appearance-fonts-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-appearance-fonts-page">#minimumSize {
  align-items: flex-end;
        display: flex;
        flex-direction: column;
}

#minimumSizeSample {
  text-align: end;
}

</style>
    <div class="cr-row first">
      <div class="flex cr-padded-text" aria-hidden="true">
        حجم الخط
      </div>
      <settings-slider id="sizeSlider" pref="{{prefs.webkit.webprefs.default_font_size}}" ticks="[[fontSizeRange_]]" label-aria="حجم الخط" label-min="دقيق" label-max="ضخم">
      </settings-slider>
    </div>
    <div class="cr-row">
      <div class="flex cr-padded-text" aria-hidden="true">
        الحد الأدنى لحجم الخط
      </div>
      <div id="minimumSize">
        <settings-slider pref="{{prefs.webkit.webprefs.minimum_font_size}}" ticks="[[minimumFontSizeRange_]]" label-aria="الحد الأدنى لحجم الخط" label-min="دقيق" label-max="ضخم">
        </settings-slider>
        <div id="minimumSizeSample" style="
                font-size:[[computeMinimumFontSize_(
                    prefs.webkit.webprefs.minimum_font_size.value)]]px;
                font-family:
                    '[[prefs.webkit.webprefs.fonts.standard.Zyyy.value]]';" hidden="">
          [[computeMinimumFontSize_(
                  prefs.webkit.webprefs.minimum_font_size.value)]]:
          أبجد هوز حطي كلمن سعفص قرشت ثخذ ضظغ
        </div>
      </div>
    </div>
    <div class="cr-row" aria-hidden="true">
      <h2>الخط العادي</h2>
    </div>
    <div class="list-frame">
      <div class="list-item">
        <settings-dropdown-menu class="start" label="الخط العادي" pref="{{prefs.webkit.webprefs.fonts.standard.Zyyy}}" menu-options="[[fontOptions_]]">
        </settings-dropdown-menu>
      </div>
      <div class="list-item cr-padded-text" style="
              font-size:[[prefs.webkit.webprefs.default_font_size.value]]px;
              font-family:
                  '[[prefs.webkit.webprefs.fonts.standard.Zyyy.value]]';">
        <span>
          [[prefs.webkit.webprefs.default_font_size.value]]:
          أبجد هوز حطي كلمن سعفص قرشت ثخذ ضظغ
        </span>
      </div>
    </div>
    <div class="cr-row" aria-hidden="true">
      <h2>‏خط Serif</h2>
    </div>
    <div class="list-frame">
      <div class="list-item">
        <settings-dropdown-menu class="start" label="‏خط Serif" pref="{{prefs.webkit.webprefs.fonts.serif.Zyyy}}" menu-options="[[fontOptions_]]">
        </settings-dropdown-menu>
      </div>
      <div class="list-item cr-padded-text" style="
              font-size:[[prefs.webkit.webprefs.default_font_size.value]]px;
              font-family:
                  '[[prefs.webkit.webprefs.fonts.serif.Zyyy.value]]';">
        <span>
          [[prefs.webkit.webprefs.default_font_size.value]]:
          أبجد هوز حطي كلمن سعفص قرشت ثخذ ضظغ
        </span>
      </div>
    </div>
    <div class="cr-row" aria-hidden="true">
      <h2>‏خط Sans-serif</h2>
    </div>
    <div class="list-frame">
      <div class="list-item">
        <settings-dropdown-menu class="start" label="‏خط Sans-serif" pref="{{prefs.webkit.webprefs.fonts.sansserif.Zyyy}}" menu-options="[[fontOptions_]]">
        </settings-dropdown-menu>
      </div>
      <div class="list-item cr-padded-text" style="
              font-size:[[prefs.webkit.webprefs.default_font_size.value]]px;
              font-family:
                  '[[prefs.webkit.webprefs.fonts.sansserif.Zyyy.value]]';">
        <span>
          [[prefs.webkit.webprefs.default_font_size.value]]:
          أبجد هوز حطي كلمن سعفص قرشت ثخذ ضظغ
        </span>
      </div>
    </div>
    <div class="cr-row" aria-hidden="true">
      <h2>خط ثابت العرض</h2>
    </div>
    <div class="list-frame">
      <div class="list-item">
        <settings-dropdown-menu class="start" label="خط ثابت العرض" pref="{{prefs.webkit.webprefs.fonts.fixed.Zyyy}}" menu-options="[[fontOptions_]]">
        </settings-dropdown-menu>
      </div>
      <div class="list-item cr-padded-text" style="
              font-size:
                  [[prefs.webkit.webprefs.default_fixed_font_size.value]]px;
              font-family:
                  '[[prefs.webkit.webprefs.fonts.fixed.Zyyy.value]]';">
        [[prefs.webkit.webprefs.default_font_size.value]]:
        أبجد هوز حطي كلمن سعفص قرشت ثخذ ضظغ
      </div>
    </div>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{fontOptions_:Object,fontSizeRange_:{readOnly:true,type:Array,value:ticksWithLabels(FONT_SIZE_RANGE)},minimumFontSizeRange_:{readOnly:true,type:Array,value:ticksWithLabels(MINIMUM_FONT_SIZE_RANGE)},prefs:{type:Object,notify:true}},observers:["onMinimumSizeChange_(prefs.webkit.webprefs.minimum_font_size.value)"],browserProxy_:null,created(){this.browserProxy_=FontsBrowserProxyImpl.getInstance()},ready(){this.browserProxy_.fetchFontsData().then(this.setFontsData_.bind(this))},setFontsData_(response){const fontMenuOptions=[];for(const fontData of response.fontList){fontMenuOptions.push({value:fontData[0],name:fontData[1]})}this.fontOptions_=fontMenuOptions},computeMinimumFontSize_(){const prefValue=this.get("prefs.webkit.webprefs.minimum_font_size.value");return prefValue||MINIMUM_FONT_SIZE_RANGE[0]},onMinimumSizeChange_(){this.$.minimumSizeSample.hidden=this.computeMinimumFontSize_()<=0}});// Copyright 2020 The Chromium Authors. All rights reserved.
const template=document.createElement("template");template.innerHTML=`<dom-module id="passwords-shared">\x3c!--_html_template_start_--\x3e\n\n  <template>\n    <style scope="passwords-shared">:host {\n  display: flex;\n        flex-direction: column;\n}\n\n.list-with-header > div:first-of-type {\n  border-top: var(--cr-separator-line);\n}\n\n.website-column {\n  align-items: center;\n        display: flex;\n        flex: 1;\n}\n\n.website-column > a {\n  color: var(--cr-primary-text-color);\n}\n\n.username-column {\n  flex: 1;\n        margin: 0 8px;\n}\n\n.password-column {\n  align-items: center;\n        display: flex;\n        flex: 1;\n}\n\n.password-field {\n  background-color: transparent;\n        border: none;\n        flex: 1;\n        height: 20px;\n        width: 0;\n}\n\n.type-column {\n  align-items: center;\n        flex: 2;\n}\n\n.ellipses {\n  flex: 1;\n        max-width: fit-content;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n}\n\nsite-favicon {\n  margin-inline-end: 16px;\n        min-width: 16px;\n}\n\ninput.password-input, cr-input.password-input::part(input), #leakedPassword {\n  font-family: 'Consolas', monospace;\n}\n\n</style>\n  </template>\n\x3c!--_html_template_end_--\x3e</dom-module>\n`;document.body.appendChild(template.content.cloneNode(true));// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-password-check-edit-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared passwords-shared" scope="settings-password-check-edit-dialog">cr-input {
  --cr-input-error-display: none;
}

cr-input:not(:last-of-type) {
  margin-bottom: var(--cr-form-field-bottom-spacing);
}

cr-icon-button {
  --cr-icon-button-icon-size: 16px;
        margin-inline-start: 2px;
}

#footnote {
  margin-inline-start: 2px;
        margin-top: 16px;
}

</style>
    <cr-dialog id="dialog" close-text="إغلاق">
      <div slot="title">تعديل كلمة المرور</div>
      <div slot="body">
        <cr-input value="[[item.detailedOrigin]]" readonly="" label="[[getSiteOrApp_(item.isAndroidCredential)]]">
        </cr-input>
        <cr-input value="[[item.username]]" readonly="" label="اسم المستخدم">
        </cr-input>
        <cr-input id="passwordInput" value="[[item.password]]" class="password-input" label="كلمة المرور" type="[[getPasswordInputType_(visible)]]" required="" auto-validate="" invalid="{{inputInvalid_}}">
          <cr-icon-button id="showPasswordButton" class$="[[showPasswordIcon_(visible)]]" slot="suffix" on-click="onShowPasswordButtonClick_" title="[[showPasswordTitle_(visible)]]">
          </cr-icon-button>
        </cr-input>
        <div id="footnote">[[getFootnote_(item.formattedOrigin)]]</div>
      </div>
      <div slot="button-container">
        <cr-button id="cancel" class="cancel-button" on-click="onCancel_">
          إلغاء
        </cr-button>
        <cr-button id="save" class="action-button" on-click="onSave_" disabled="[[inputInvalid_]]">
          حفظ
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{item:Object,visible:{type:Boolean,value:false},inputInvalid_:Boolean},passwordManager_:null,attached(){this.passwordManager_=PasswordManagerImpl.getInstance();this.$.dialog.showModal();focusWithoutInk(this.$.cancel)},close(){this.$.dialog.close()},onCancel_(){this.close()},onSave_(){this.passwordManager_.recordPasswordCheckInteraction(PasswordManagerProxy.PasswordCheckInteraction.EDIT_PASSWORD);this.passwordManager_.changeInsecureCredential(assert(this.item),this.$.passwordInput.value).finally((()=>{this.close()}))},showPasswordTitle_(){return this.i18n(this.visible?"hidePassword":"showPassword")},showPasswordIcon_(){return this.visible?"icon-visibility-off":"icon-visibility"},getPasswordInputType_(){return this.visible?"text":"password"},onShowPasswordButtonClick_(){this.visible=!this.visible},getFootnote_(){return this.i18n("editPasswordFootnote",this.item.formattedOrigin)},getSiteOrApp_(){return this.i18n(this.item.isAndroidCredential?"editCompromisedPasswordApp":"editCompromisedPasswordSite")}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-password-edit-disclaimer-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><cr-dialog id="dialog" close-text="إغلاق">
      <div slot="title">[[getDisclaimerTitle_(origin)]]</div>
      <div slot="body">‏في هذه الحالة، يُرجى تعديل كلمة المرور المحفوظة في Chrome لتتطابق مع كلمة المرور الجديدة.</div>
      <div slot="button-container">
        <cr-button id="cancel" class="cancel-button" on-click="onCancel_">
          إلغاء
        </cr-button>
        <cr-button id="edit" class="action-button" on-click="onEditClick_">
          تعديل كلمة المرور
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{origin:String},attached(){this.$.dialog.showModal()},onEditClick_(){this.fire("edit-password-click");this.$.dialog.close()},onCancel_(){this.$.dialog.close()},getDisclaimerTitle_(){return this.i18n("editDisclaimerTitle",this.origin)}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"password-check-list-item",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared passwords-shared action-link" scope="password-check-list-item">#change-password-link-icon {
  height: 16px;
        margin-inline-start: 10px;
        width: 16px;
        --iron-icon-fill-color: var(--text-color-action);
}

#insecurePassword {
  background-color: transparent;
        border: none;
        font-size: inherit;
        margin-inline-start: 4px;
}

#insecure-item {
  margin-bottom: 12px;
        margin-top: 12px;
}

#insecure-info {
  display: flex;
        flex: 2;
        width: 0;
}

#insecureUsername {
  align-items: baseline;
        display: flex;
        flex: 1;
}

#changePasswordInApp {
  display: flex;
        flex: 2;
        flex-direction: row-reverse;
        text-align: end;
}

#changePasswordUrl {
  align-items: flex-end;
        display: flex;
        flex: 1.5;
        flex-direction: column;
}

#changePasswordButton {
  white-space: nowrap;
}

#alreadyChanged {
  margin-top: 8px;
        text-align: end;
}

#info-column {
  display: flex;
        flex: 1;
        flex-direction: column;
}

#insecureOrigin {
  direction: rtl;
        display: flex;
        justify-content: flex-end;
}

.icon-weak-cta {
  fill: var(--google-blue-600);
}

@media (prefers-color-scheme: dark) {
.icon-weak-cta {
  fill: var(--google-blue-refresh-300);
}

}

:host-context([dir='rtl']) #insecureOrigin {
  justify-content: flex-start;
}

:host-context([dir='rtl']) #change-password-link-icon {
  transform: scaleX(-1);
}

</style>
    <div class="list-item" id="insecure-item" focus-row-container="">
      <site-favicon url="[[item.changePasswordUrl]]"></site-favicon>
      <div id="insecure-info">
        <div id="info-column" class="no-min-width">
          <div id="insecureOrigin" class="no-min-width">
            <span class="text-elide">
              <!-- This bdo tag is necessary to fix the display of domains
                starting with numbers. -->
              <bdo dir="ltr">[[item.formattedOrigin]]</bdo>
            </span>
          </div>
          <div class="no-min-width" id="insecureUsername">
            <span class="no-min-width text-elide secondary">
              [[item.username]]
            </span>
            <input class="no-min-width secondary text-elide" id="insecurePassword" focus-row-control="" focus-type="passwordField" readonly="" type="[[getInputType_(isPasswordVisible_)]]" value="[[password_]]" on-click="onReadonlyInputTap_" disabled$="[[!isPasswordVisible_]]">
          </div>
          <template is="dom-if" if="[[isCompromisedItem_(item)]]">
            <div class="secondary" id="leakType">
              [[getCompromiseType_(item)]]
            </div>
            <div class="secondary" id="elapsedTime">
              [[item.compromisedInfo.elapsedTimeSinceCompromise]]
            </div>
          </template>
        </div>
      </div>
      <template is="dom-if" if="[[item.changePasswordUrl]]">
        <div class="button-container" id="changePasswordUrl">
          <cr-button id="changePasswordButton" class$="[[buttonClass_]]" on-click="onChangePasswordClick_">
            تغيير كلمة المرور
            <iron-icon icon="cr:open-in-new" id="change-password-link-icon" class$="[[iconClass_]]">
            </iron-icon>
          </cr-button>
          <a id="alreadyChanged" hidden="[[!clickedChangePassword]]" is="action-link" on-click="onAlreadyChangedClick_">
            هل سبق وغيرت كلمة المرور هذه؟
          </a>
        </div>
      </template>
      <template is="dom-if" if="[[!item.changePasswordUrl]]">
        <span id="changePasswordInApp">فتح التطبيق لتغيير كلمة المرور</span>
      </template>
      <cr-icon-button class="icon-more-vert" id="more" title="مزيد من الإجراءات" on-click="onMoreClick_">
      </cr-icon-button>
    </div>
<!--_html_template_end_-->`,properties:{item:Object,isPasswordVisible_:{type:Boolean,computed:"computePasswordVisibility_(item.password)"},password_:{type:String,computed:"computePassword_(item.password)"},clickedChangePassword:{type:Boolean,value:false},buttonClass_:{type:String,computed:"computeButtonClass_(item.compromisedInfo)"},iconClass_:{type:String,computed:"computeIconClass_(item.compromisedInfo)"}},passwordManager_:null,attached(){this.passwordManager_=PasswordManagerImpl.getInstance()},isCompromisedItem_(){return!!this.item.compromisedInfo},getCompromiseType_(){switch(this.item.compromisedInfo.compromiseType){case chrome.passwordsPrivate.CompromiseType.PHISHED:return loadTimeData.getString("phishedPassword");case chrome.passwordsPrivate.CompromiseType.LEAKED:return loadTimeData.getString("leakedPassword");case chrome.passwordsPrivate.CompromiseType.PHISHED_AND_LEAKED:return loadTimeData.getString("phishedAndLeakedPassword")}assertNotReached("Can't find a string for type: "+this.item.compromisedInfo.compromiseType)},onChangePasswordClick_(){this.fire("change-password-clicked",{id:this.item.id});const url=assert(this.item.changePasswordUrl);OpenWindowProxyImpl.getInstance().openURL(url);PasswordManagerImpl.getInstance().recordPasswordCheckInteraction(PasswordManagerProxy.PasswordCheckInteraction.CHANGE_PASSWORD)},onMoreClick_(event){this.fire("more-actions-click",{moreActionsButton:event.target})},getInputType_(){return this.isPasswordVisible_?"text":"password"},computePasswordVisibility_(){return!!this.item.password},computeButtonClass_(){if(this.item.compromisedInfo){return"action-button"}return""},computeIconClass_(){if(this.item.compromisedInfo){return""}return"icon-weak-cta"},computePassword_(){const NUM_PLACEHOLDERS=10;return this.item.password||" ".repeat(NUM_PLACEHOLDERS)},hidePassword(){this.set("item.password",null)},showPassword(){this.passwordManager_.recordPasswordCheckInteraction(PasswordManagerProxy.PasswordCheckInteraction.SHOW_PASSWORD);this.passwordManager_.getPlaintextInsecurePassword(assert(this.item),chrome.passwordsPrivate.PlaintextReason.VIEW).then((insecureCredential=>{this.set("item",insecureCredential)}),(error=>{}))},onReadonlyInputTap_(){if(this.isPasswordVisible_){this.$$("#leakedPassword").select()}},onAlreadyChangedClick_(event){event.preventDefault();this.fire("already-changed-password-click",event.target)}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-password-remove-confirmation-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><!-- We have to include the shared settings style in order to properly --><!-- style the contained link in the dialog. --><style include="settings-shared" scope="settings-password-remove-confirmation-dialog"></style>
    <cr-dialog id="dialog" close-text="إغلاق" ignore-popstate="" ignore-enter-key="">
      <div slot="title">
        هل تريد إزالة كلمة المرور؟
      </div>
      <div slot="body">
        <span id="link" hidden="[[!hasSecureChangePasswordUrl_(item)]]" inner-h-t-m-l="[[getRemovePasswordDescriptionHtml_(item)]]">
        </span>
        <span id="text" hidden="[[hasSecureChangePasswordUrl_(item)]]">
          [[getRemovePasswordDescriptionText_(item)]]
        </span>
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onCancelClick_" id="cancel">
          إلغاء
        </cr-button>
        <cr-button class="action-button" on-click="onRemoveClick_" id="remove">
          إزالة كلمة المرور
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{item:Object},passwordManager_:null,attached(){this.passwordManager_=PasswordManagerImpl.getInstance();this.$.dialog.showModal()},onRemoveClick_(){this.passwordManager_.recordPasswordCheckInteraction(PasswordManagerProxy.PasswordCheckInteraction.REMOVE_PASSWORD);this.passwordManager_.removeInsecureCredential(assert(this.item));this.$.dialog.close()},onCancelClick_(){this.$.dialog.close()},hasSecureChangePasswordUrl_(){const url=this.item.changePasswordUrl;return!!url&&(url.startsWith("https://")||url.startsWith("chrome://"))},getRemovePasswordDescriptionHtml_(){if(!this.hasSecureChangePasswordUrl_()){return""}const url=assert(this.item.changePasswordUrl);const origin=this.item.formattedOrigin;return this.i18nAdvanced("removeCompromisedPasswordConfirmationDescription",{substitutions:[origin,`<a href='${url}' target='_blank'>${origin}</a>`]})},getRemovePasswordDescriptionText_(){const origin=this.item.formattedOrigin;return this.i18n("removeCompromisedPasswordConfirmationDescription",origin,origin)}});// Copyright 2020 The Chromium Authors. All rights reserved.
const CheckState=chrome.passwordsPrivate.PasswordCheckState;Polymer({is:"settings-password-check",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-password-check">#iconContainer {
  height: 24px;
        line-height: 100%;
        margin-inline-end: 20px;
        padding: 4px;
        width: 24px;
}

#iconContainer.warning-halo {
  background: radial-gradient(circle 16px at 16px,
                                    #FCE8E6 100%,
                                    transparent 100%);
}

iron-icon, #progressSpinner {
  --paper-spinner-stroke-width: 2px;
        height: 22px;
        line-height: 100%;
        padding: 0 1px 2px;
        width: 22px;
}

iron-icon.has-security-issues {
  --iron-icon-fill-color: var(--google-red-600);
}

@media (prefers-color-scheme: dark) {
iron-icon.has-security-issues {
  --iron-icon-fill-color: var(--google-red-refresh-300);
}

#iconContainer.warning-halo {
  background: radial-gradient(circle 16px at 16px,
                                      var(--google-grey-900) 100%,
                                      transparent 100%);
}

}

iron-icon.no-security-issues {
  --iron-icon-fill-color: var(--google-blue-600);
        background-size: 16px 16px;
}

iron-icon.hidden {
  display: none;
}

#securityCheckHeader {
  border-bottom: var(--cr-separator-line);
}

#bannerImage {
  width: 100%;
}

</style>
    <!-- The banner is visible if no insecure password was found (yet) and user
    is signed in. -->
    <template is="dom-if" if="[[shouldShowBanner_(status, leakedPasswords, weakPasswords)]]">
      <picture>
        <source srcset="[[bannerImageSrc_(1, status)]]" media="(prefers-color-scheme: dark)">
        <img id="bannerImage" src="[[bannerImageSrc_(0, status)]]" alt="">
      </picture>
    </template>

    <!-- The header showing progress or result of the check-->
    <div class="cr-row first two-line" id="securityCheckHeader">
      <!-- If the password check concluded, show only a status Icon. -->
      <div id="iconContainer" class$="[[iconHaloClass_]]">
        <template is="dom-if" if="[[!isCheckInProgress_(status)]]">
          <iron-icon class$="[[getStatusIconClass_(status, isSignedOut_,
                              leakedPasswords, weakPasswords)]]" icon="[[getStatusIcon_(status, isSignedOut_,
                             leakedPasswords, weakPasswords)]]">
          </iron-icon>
        </template>

        <!-- Show a loader instead of an icon while checking passwords. -->
        <template is="dom-if" if="[[isCheckInProgress_(status)]]">
          <paper-spinner-lite id="progressSpinner" active="">
          </paper-spinner-lite>
        </template>
      </div>

      <div class="flex cr-padded-text">
        <div id="titleRow">
          <span id="title" inner-h-t-m-l="[[title_]]"></span>
          <span class="secondary inline" id="lastCompletedCheck" hidden$="[[!showsTimestamp_(status)]]">
            • [[status.elapsedTimeSinceLastCheck]]
          </span>
        </div>
        <div class="secondary" id="subtitle" hidden$="[[!showsPasswordsCount_(status, leakedPasswords, weakPasswords)]]">
          [[getPasswordsCount_(status, insecurePasswordsCount,
              compromisedPasswordsCount, weakPasswordsCount)]]
        </div>
      </div>
      <cr-button id="controlPasswordCheckButton" on-click="onPasswordCheckButtonClick_" class$="[[getButtonTypeClass_(status)]] cr-button-gap" hidden$="[[isButtonHidden_]]">
        [[getButtonText_(status)]]
      </cr-button>
    </div>
    <div id="noCompromisedCredentials" class="cr-row first" hidden$="[[!showNoCompromisedPasswordsLabel_]]">
      <div class="cr-padded-text secondary">
        ‏في حال تسجيل الدخول باستخدام كلمة مرور محتمَل تعرّضها للاختراق، سيرسل Chrome إشعارات إليك.
      </div>
    </div>
    <div id="compromisedCredentialsBody" hidden$="[[!showCompromisedCredentialsBody_]]">
      <div class="cr-row first">
        <h2>كلمات مرور محتمَل تعرّضها للاختراق</h2>
      </div>
      <div class="list-frame vertical-list">
        <div class="cr-padded-text secondary" id="compromisedPasswordsDescription" hidden$="[[!hasLeakedCredentials_(leakedPasswords)]]">
          عليك تغيير كلمات المرور هذه فورًا للحفاظ على أمان حسابك:
        </div>
      </div>
      <div id="leakedPasswordList" class="list-frame first">
        <template is="dom-repeat" items="[[leakedPasswords]]">
          <password-check-list-item item="[[item]]" on-more-actions-click="onMoreActionsClick_" clicked-change-password="[[clickedChangePassword_(item, clickedChangePasswordIds_.size)]]" on-change-password-clicked="onChangePasswordClick_" on-already-changed-password-click="onAlreadyChangedClick_">
          </password-check-list-item>
        </template>
      </div>
      <div class="list-frame vertical-list">
        <div class="list-item secondary" hidden$="[[!isSignedOut_]]" id="signedOutUserLabel">
          <div inner-h-t-m-l="[[getSignedOutUserLabel_(leakedPasswords)]]"></div>
        </div>
      </div>
    </div>
    <!-- TODO(crbug.com/1119752): |weakCredentialsBody| is almost a copy-paste
    of |compromisedCredentialsBody|. Clean it up by creating a polymer element
    for this. -->
    <div id="weakCredentialsBody" hidden$="[[!hasWeakCredentials_(weakPasswords)]]">
      <div class="cr-row first">
        <h2>كلمات مرور ضعيفة</h2>
      </div>
      <div class="list-frame vertical-list">
        <div class="cr-padded-text secondary" id="weakPasswordsDescription" inner-h-t-m-l="[[getWeakPasswordsHelpText_(isSyncingPasswords_)]]">
        </div>
      </div>
      <div id="weakPasswordList" class="list-frame first">
        <template is="dom-repeat" items="[[weakPasswords]]">
          <password-check-list-item item="[[item]]" on-more-actions-click="onMoreActionsClick_" clicked-change-password="[[clickedChangePassword_(item, clickedChangePasswordIds_.size)]]" on-change-password-clicked="onChangePasswordClick_" on-already-changed-password-click="onAlreadyChangedClick_">
          </password-check-list-item>
        </template>
      </div>
    </div>
    <cr-action-menu id="moreActionsMenu" role-description="قائمة">
      <button id="menuShowPassword" class="dropdown-item" on-click="onMenuShowPasswordClick_">
        [[showHideMenuTitle_]]
      </button>
      <button id="menuEditPassword" class="dropdown-item" on-click="onEditPasswordClick_">
        تعديل كلمة المرور
      </button>
      <button id="menuRemovePassword" class="dropdown-item" on-click="onMenuRemovePasswordClick_">
        إزالة كلمة المرور
      </button>
    </cr-action-menu>
    <template is="dom-if" if="[[showPasswordEditDialog_]]" restamp="">
      <settings-password-check-edit-dialog on-close="onPasswordEditDialogClosed_" item="[[activePassword_]]">
      
    </settings-password-check-edit-dialog></template>
    <template is="dom-if" if="[[showPasswordRemoveDialog_]]" restamp="">
      <settings-password-remove-confirmation-dialog on-close="onPasswordRemoveDialogClosed_" item="[[activePassword_]]">
      </settings-password-remove-confirmation-dialog>
    </template>
    <template is="dom-if" if="[[showPasswordEditDisclaimer_]]" restamp="">
      <settings-password-edit-disclaimer-dialog on-edit-password-click="onEditPasswordClick_" origin="[[activePassword_.formattedOrigin]]" on-close="onEditDisclaimerClosed_">
      </settings-password-edit-disclaimer-dialog>
    </template>
    
<!--_html_template_end_-->`,behaviors:[I18nBehavior,PasswordCheckBehavior,PrefsBehavior,RouteObserverBehavior,WebUIListenerBehavior],properties:{storedAccounts_:Array,title_:{type:String,computed:"computeTitle_(status, canUsePasswordCheckup_)"},isSignedOut_:{type:Boolean,computed:"computeIsSignedOut_(syncStatus_, storedAccounts_)"},isSyncingPasswords_:{type:Boolean,computed:"computeIsSyncingPasswords_(syncPrefs_, syncStatus_)"},canUsePasswordCheckup_:{type:Boolean,computed:"computeCanUsePasswordCheckup_(syncPrefs_, syncStatus_)"},isButtonHidden_:{type:Boolean,computed:"computeIsButtonHidden_(status, isSignedOut_, isInitialStatus)"},syncPrefs_:Object,syncStatus_:Object,showPasswordEditDialog_:Boolean,showPasswordRemoveDialog_:Boolean,showPasswordEditDisclaimer_:Boolean,activePassword_:Object,showCompromisedCredentialsBody_:{type:Boolean,computed:"computeShowCompromisedCredentialsBody_(isSignedOut_, "+"leakedPasswords, passwordsWeaknessCheckEnabled)"},showNoCompromisedPasswordsLabel_:{type:Boolean,computed:"computeShowNoCompromisedPasswordsLabel_(syncStatus_, "+"prefs.*, status, leakedPasswords, passwordsWeaknessCheckEnabled)"},showHideMenuTitle_:{type:String,computed:"computeShowHideMenuTitle(activePassword_)"},iconHaloClass_:{type:String,computed:"computeIconHaloClass_(status, isSignedOut_, "+"leakedPasswords, weakPasswords)"},clickedChangePasswordIds_:{type:Object,value:new Set}},activeDialogAnchorStack_:null,activeListItem_:null,startCheckAutomaticallySucceeded:false,setSavedPasswordsListener_:null,attached(){this.activeDialogAnchorStack_=[];const setSavedPasswordsListener=list=>{this.startCheckAutomaticallySucceeded=false};this.setSavedPasswordsListener_=setSavedPasswordsListener;this.passwordManager.addSavedPasswordListChangedListener(setSavedPasswordsListener);const syncBrowserProxy=SyncBrowserProxyImpl.getInstance();const syncStatusChanged=syncStatus=>this.syncStatus_=syncStatus;const syncPrefsChanged=syncPrefs=>this.syncPrefs_=syncPrefs;this.addWebUIListener("sync-status-changed",syncStatusChanged);this.addWebUIListener("sync-prefs-changed",syncPrefsChanged);syncBrowserProxy.getSyncStatus().then(syncStatusChanged);syncBrowserProxy.sendSyncPrefsChanged();const storedAccountsChanged=accounts=>this.storedAccounts_=accounts;syncBrowserProxy.getStoredAccounts().then(storedAccountsChanged);this.addWebUIListener("stored-accounts-updated",storedAccountsChanged)},detached(){this.passwordManager.removeSavedPasswordListChangedListener(assert(this.setSavedPasswordsListener_))},currentRouteChanged(currentRoute){const router=Router.getInstance();if(currentRoute.path===routes.CHECK_PASSWORDS.path&&!this.startCheckAutomaticallySucceeded&&router.getQueryParameters().get("start")==="true"){this.passwordManager.recordPasswordCheckInteraction(PasswordManagerProxy.PasswordCheckInteraction.START_CHECK_AUTOMATICALLY);this.passwordManager.startBulkPasswordCheck().then((()=>{this.startCheckAutomaticallySucceeded=true}),(error=>{}))}this.passwordManager.getPasswordCheckStatus().then((status=>this.status=status))},onPasswordCheckButtonClick_(){switch(this.status.state){case CheckState.RUNNING:this.passwordManager.recordPasswordCheckInteraction(PasswordManagerProxy.PasswordCheckInteraction.STOP_CHECK);this.passwordManager.stopBulkPasswordCheck();return;case CheckState.IDLE:case CheckState.CANCELED:case CheckState.OFFLINE:case CheckState.OTHER_ERROR:this.passwordManager.recordPasswordCheckInteraction(PasswordManagerProxy.PasswordCheckInteraction.START_CHECK_MANUALLY);this.passwordManager.startBulkPasswordCheck();return;case CheckState.SIGNED_OUT:this.passwordManager.recordPasswordCheckInteraction(PasswordManagerProxy.PasswordCheckInteraction.START_CHECK_MANUALLY);this.passwordManager.startBulkPasswordCheck().then((()=>{}),(error=>{}));return;case CheckState.NO_PASSWORDS:case CheckState.QUOTA_LIMIT:}assertNotReached("Can't trigger an action for state: "+this.status.state)},hasLeakedCredentials_(){return!!this.leakedPasswords.length},hasWeakCredentials_(){return this.passwordsWeaknessCheckEnabled&&!!this.weakPasswords.length},hasInsecureCredentials_(){return!!this.leakedPasswords.length||this.hasWeakCredentials_()},getWeakPasswordsHelpText_(){return this.i18nAdvanced(this.isSyncingPasswords_?"weakPasswordsDescriptionGeneration":"weakPasswordsDescription")},onMoreActionsClick_(event){const target=event.detail.moreActionsButton;this.$.moreActionsMenu.showAt(target);this.activeDialogAnchorStack_.push(target);this.activeListItem_=event.target;this.activePassword_=this.activeListItem_.item},onMenuShowPasswordClick_(){this.activePassword_.password?this.activeListItem_.hidePassword():this.activeListItem_.showPassword();this.$.moreActionsMenu.close();this.activePassword_=null;this.activeDialogAnchorStack_.pop()},onEditPasswordClick_(){this.passwordManager.getPlaintextInsecurePassword(assert(this.activePassword_),chrome.passwordsPrivate.PlaintextReason.EDIT).then((insecureCredential=>{this.activePassword_=insecureCredential;this.showPasswordEditDialog_=true}),(error=>{this.activePassword_=null;this.onPasswordEditDialogClosed_()}));this.$.moreActionsMenu.close()},onMenuRemovePasswordClick_(){this.$.moreActionsMenu.close();this.showPasswordRemoveDialog_=true},onPasswordRemoveDialogClosed_(){this.showPasswordRemoveDialog_=false;focusWithoutInk(assert(this.activeDialogAnchorStack_.pop()))},onPasswordEditDialogClosed_(){this.showPasswordEditDialog_=false;focusWithoutInk(assert(this.activeDialogAnchorStack_.pop()))},onAlreadyChangedClick_(event){const target=event.detail;this.activeDialogAnchorStack_.push(target);this.activeListItem_=event.target;this.activePassword_=event.target.item;this.showPasswordEditDisclaimer_=true},onEditDisclaimerClosed_(){this.showPasswordEditDisclaimer_=false;focusWithoutInk(assert(this.activeDialogAnchorStack_.pop()))},computeShowHideMenuTitle(){return this.i18n(this.activeListItem_.isPasswordVisible_?"hideCompromisedPassword":"showCompromisedPassword")},computeIconHaloClass_(){return!this.isCheckInProgress_()&&this.hasLeakedCredentials_()?"warning-halo":""},getStatusIcon_(){if(!this.hasInsecureCredentialsOrErrors_()){return"settings:check-circle"}if(this.hasLeakedCredentials_()){return"cr:warning"}return"cr:info"},getStatusIconClass_(){if(!this.hasInsecureCredentialsOrErrors_()){return this.waitsForFirstCheck_()?"hidden":"no-security-issues"}if(this.hasLeakedCredentials_()){return"has-security-issues"}return""},computeTitle_(){switch(this.status.state){case CheckState.IDLE:return this.waitsForFirstCheck_()?this.i18n("checkPasswordsDescription"):this.i18n("checkedPasswords");case CheckState.CANCELED:return this.i18n("checkPasswordsCanceled");case CheckState.RUNNING:return this.i18n("checkPasswordsProgress",(this.status.alreadyProcessed||0)+1,Math.max(this.status.remainingInQueue+this.status.alreadyProcessed,1));case CheckState.OFFLINE:return this.i18n("checkPasswordsErrorOffline");case CheckState.SIGNED_OUT:return this.i18n(this.passwordsWeaknessCheckEnabled?"checkedPasswords":"checkPasswordsErrorSignedOut");case CheckState.NO_PASSWORDS:return this.i18n("checkPasswordsErrorNoPasswords");case CheckState.QUOTA_LIMIT:return this.canUsePasswordCheckup_?this.i18nAdvanced("checkPasswordsErrorQuotaGoogleAccount"):this.i18n("checkPasswordsErrorQuota");case CheckState.OTHER_ERROR:return this.i18n("checkPasswordsErrorGeneric")}assertNotReached("Can't find a title for state: "+this.status.state)},isCheckInProgress_(){return this.status.state===CheckState.RUNNING},showsTimestamp_(){return!!this.status.elapsedTimeSinceLastCheck&&(this.status.state===CheckState.IDLE||this.status.state===CheckState.SIGNED_OUT&&this.passwordsWeaknessCheckEnabled)},getButtonText_(){switch(this.status.state){case CheckState.IDLE:return this.waitsForFirstCheck_()?this.i18n("checkPasswords"):this.i18n("checkPasswordsAgain");case CheckState.CANCELED:return this.i18n("checkPasswordsAgain");case CheckState.RUNNING:return this.i18n("checkPasswordsStop");case CheckState.OFFLINE:case CheckState.NO_PASSWORDS:case CheckState.OTHER_ERROR:return this.i18n("checkPasswordsAgainAfterError");case CheckState.SIGNED_OUT:return this.i18n(this.passwordsWeaknessCheckEnabled?"checkPasswordsAgain":"checkPasswordsAgainAfterError");case CheckState.QUOTA_LIMIT:return""}assertNotReached("Can't find a button text for state: "+this.status.state)},getButtonTypeClass_(){return this.waitsForFirstCheck_()?"action-button":" "},computeIsButtonHidden_(){switch(this.status.state){case CheckState.IDLE:return this.isInitialStatus;case CheckState.CANCELED:case CheckState.RUNNING:case CheckState.OFFLINE:case CheckState.OTHER_ERROR:return false;case CheckState.SIGNED_OUT:return!this.passwordsWeaknessCheckEnabled&&this.isSignedOut_;case CheckState.NO_PASSWORDS:case CheckState.QUOTA_LIMIT:return true}assertNotReached("Can't determine button visibility for state: "+this.status.state)},bannerImageSrc_(isDarkMode){const type=this.status.state===CheckState.IDLE&&!this.waitsForFirstCheck_()?"positive":"neutral";const suffix=isDarkMode?"_dark":"";return`chrome://settings/images/password_check_${type}${suffix}.svg`},shouldShowBanner_(){if(this.hasInsecureCredentials_()){return false}return this.status.state===CheckState.CANCELED||!this.hasInsecureCredentialsOrErrors_()},hasInsecureCredentialsOrErrors_(){if(this.hasInsecureCredentials_()){return true}switch(this.status.state){case CheckState.IDLE:case CheckState.RUNNING:return false;case CheckState.CANCELED:case CheckState.OFFLINE:case CheckState.NO_PASSWORDS:case CheckState.QUOTA_LIMIT:case CheckState.OTHER_ERROR:return true;case CheckState.SIGNED_OUT:return!this.passwordsWeaknessCheckEnabled}assertNotReached("Not specified whether to state is an error: "+this.status.state)},showsPasswordsCount_(){if(this.hasInsecureCredentials_()){return true}switch(this.status.state){case CheckState.IDLE:return!this.waitsForFirstCheck_();case CheckState.CANCELED:case CheckState.RUNNING:case CheckState.OFFLINE:case CheckState.NO_PASSWORDS:case CheckState.QUOTA_LIMIT:case CheckState.OTHER_ERROR:return false;case CheckState.SIGNED_OUT:return this.passwordsWeaknessCheckEnabled}assertNotReached("Not specified whether to show passwords for state: "+this.status.state)},getPasswordsCount_(){if(!this.passwordsWeaknessCheckEnabled){return this.compromisedPasswordsCount}return this.isSignedOut_&&this.leakedPasswords.length===0?this.weakPasswordsCount:this.insecurePasswordsCount},getSignedOutUserLabel_(){return this.i18nAdvanced(this.hasLeakedCredentials_()?"signedOutUserHasCompromisedCredentialsLabel":"signedOutUserLabel")},waitsForFirstCheck_(){if(this.passwordsWeaknessCheckEnabled&&this.isSignedOut_){return false}return!this.status.elapsedTimeSinceLastCheck},computeIsSignedOut_(){if(!this.syncStatus_||!this.syncStatus_.signedIn){return!this.storedAccounts_||this.storedAccounts_.length===0}return!!this.syncStatus_.hasError},computeIsSyncingPasswords_(){return!!this.syncStatus_&&!!this.syncStatus_.signedIn&&!this.syncStatus_.hasError&&!!this.syncPrefs_&&this.syncPrefs_.passwordsSynced},computeCanUsePasswordCheckup_(){return!!this.syncStatus_&&!!this.syncStatus_.signedIn&&(!this.syncPrefs_||!this.syncPrefs_.encryptAllData)},computeShowCompromisedCredentialsBody_(){if(this.passwordsWeaknessCheckEnabled&&this.isSignedOut_){return true}return this.hasLeakedCredentials_()},computeShowNoCompromisedPasswordsLabel_(){if(!this.syncStatus_||!this.syncStatus_.signedIn){return false}if(!this.prefs||!this.getPref("profile.password_manager_leak_detection").value){return false}return!this.hasLeakedCredentials_()&&this.showsTimestamp_()},onChangePasswordClick_(event){this.clickedChangePasswordIds_.add(event.detail.id);this.notifyPath("clickedChangePasswordIds_.size")},clickedChangePassword_(item){return this.clickedChangePasswordIds_.has(item.id)}});// Copyright 2020 The Chromium Authors. All rights reserved.
const MergeExceptionsStoreCopiesBehavior={properties:{passwordExceptions:{type:Array,value:()=>[]}},setPasswordExceptionsListener_:null,attached(){this.setPasswordExceptionsListener_=list=>{this.passwordExceptions=this.mergeExceptionsStoreDuplicates_(list)};PasswordManagerImpl.getInstance().getExceptionList(this.setPasswordExceptionsListener_);PasswordManagerImpl.getInstance().addExceptionListChangedListener(this.setPasswordExceptionsListener_)},detached(){PasswordManagerImpl.getInstance().removeExceptionListChangedListener(assert(this.setPasswordExceptionsListener_))},mergeExceptionsStoreDuplicates_(exceptionList){const multiStoreEntries=[];const frontendIdToMergedEntry=new Map;for(const entry of exceptionList){if(frontendIdToMergedEntry.has(entry.frontendId)){const mergeSucceded=frontendIdToMergedEntry.get(entry.frontendId).mergeInPlace(entry);if(mergeSucceded);else{multiStoreEntries.push(new MultiStoreExceptionEntry(entry))}}else{const multiStoreEntry=new MultiStoreExceptionEntry(entry);frontendIdToMergedEntry.set(entry.frontendId,multiStoreEntry);multiStoreEntries.push(multiStoreEntry)}}return multiStoreEntries}};// Copyright 2018 The Chromium Authors. All rights reserved.
const ListPropertyUpdateBehavior={updateList(propertyPath,identityGetter,updatedList,identityBasedUpdate=false){return updateListProperty(this,propertyPath,identityGetter,updatedList,identityBasedUpdate)}};function updateListProperty(instance,propertyPath,identityGetter,updatedList,identityBasedUpdate=false){const list=instance.get(propertyPath);const splices=calculateSplices(updatedList.map(identityGetter),list.map(identityGetter));splices.forEach((splice=>{const index=splice.index;const deleteCount=splice.removed.length;splice.removed=list.slice(index,index+deleteCount);splice.object=list;splice.type="splice";const added=updatedList.slice(index,index+splice.addedCount);const spliceParams=[index,deleteCount].concat(added);list.splice.apply(list,spliceParams)}));let updated=splices.length>0;if(!identityBasedUpdate){list.forEach(((item,index)=>{const updatedItem=updatedList[index];if(JSON.stringify(item)!==JSON.stringify(updatedItem)){instance.set([propertyPath,index],updatedItem);updated=true}}))}if(splices.length>0){instance.notifySplices(propertyPath,splices)}return updated}// Copyright 2020 The Chromium Authors. All rights reserved.
const MergePasswordsStoreCopiesBehaviorImpl={properties:{savedPasswords:{type:Array,value:()=>[]}},setSavedPasswordsListener_:null,attached(){this.setSavedPasswordsListener_=passwordList=>{const mergedPasswordList=this.mergePasswordsStoreDuplicates_(passwordList);const getCombinedId=entry=>[entry.deviceId,entry.accountId].join("_");this.updateList("savedPasswords",getCombinedId,mergedPasswordList)};PasswordManagerImpl.getInstance().getSavedPasswordList(this.setSavedPasswordsListener_);PasswordManagerImpl.getInstance().addSavedPasswordListChangedListener(this.setSavedPasswordsListener_);this.notifySplices("savedPasswords",[])},detached(){PasswordManagerImpl.getInstance().removeSavedPasswordListChangedListener(assert(this.setSavedPasswordsListener_))},mergePasswordsStoreDuplicates_(passwordList){const multiStoreEntries=[];const frontendIdToMergedEntry=new Map;for(const entry of passwordList){if(frontendIdToMergedEntry.has(entry.frontendId)){const mergeSucceded=frontendIdToMergedEntry.get(entry.frontendId).mergeInPlace(entry);if(mergeSucceded);else{multiStoreEntries.push(new MultiStorePasswordUiEntry(entry))}}else{const multiStoreEntry=new MultiStorePasswordUiEntry(entry);frontendIdToMergedEntry.set(entry.frontendId,multiStoreEntry);multiStoreEntries.push(multiStoreEntry)}}return multiStoreEntries}};const MergePasswordsStoreCopiesBehavior=[ListPropertyUpdateBehavior,MergePasswordsStoreCopiesBehaviorImpl];// Copyright 2017 The Chromium Authors. All rights reserved.
const ShowPasswordBehavior={properties:{entry:Object},getPasswordInputType(){return this.entry.password||this.entry.federationText?"text":"password"},showPasswordTitle(password,hide,show){return password?hide:show},getIconClass(){return this.entry.password?"icon-visibility-off":"icon-visibility"},getPassword(){const NUM_PLACEHOLDERS=10;return this.entry.federationText||this.entry.password||" ".repeat(NUM_PLACEHOLDERS)},onShowPasswordButtonTap(){if(this.entry.password){this.hide();return}PasswordManagerImpl.getInstance().requestPlaintextPassword(this.entry.getAnyId(),chrome.passwordsPrivate.PlaintextReason.VIEW).then((password=>{this.set("entry.password",password)}),(error=>{}))},hide(){this.set("entry.password","")}};// Copyright 2017 The Chromium Authors. All rights reserved.
Polymer({is:"password-list-item",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared passwords-shared" scope="password-list-item">#originUrl {
  direction: rtl;
         display: flex;
}

#username, #password {
  color: inherit;
        font-size: inherit;
        line-height: inherit;
}

#username {
  font-family: inherit;
}

#username, #password:not([type='password']) {
  text-overflow: ellipsis;
}

</style>
    <div class="list-item" focus-row-container="">
      <slot name="checkbox"></slot>
      <div class="website-column no-min-width">
        <site-favicon url="[[entry.urls.link]]"></site-favicon>
        <a id="originUrl" target="_blank" class="no-min-width" href="[[entry.urls.link]]" focus-row-control="" focus-type="originUrl">
          <span class="text-elide">
            <!-- This bdo tag is necessary to fix the display of domains
              starting with numbers. -->
            <bdo dir="ltr">[[entry.urls.shown]]</bdo>
          </span>
        </a>
      </div>
      <input id="username" class="username-column password-field" aria-label="اسم المستخدم" readonly="" value="[[entry.username]]" focus-row-control="" focus-type="username">
      <div class="password-column">
        <template is="dom-if" if="[[!entry.federationText]]">
          <input id="password" aria-label="كلمة المرور" type="[[getPasswordInputType(entry.password)]]" class="password-field password-input" readonly="" disabled$="[[!entry.password]]" on-click="onReadonlyInputTap_" value="[[getPassword(entry.password)]]" focus-row-control="" focus-type="passwordField">
          <cr-icon-button id="showPasswordButton" class$="[[getIconClass(entry.password)]]" on-click="onShowPasswordButtonTap" title="[[showPasswordTitle(entry.password,
                  'إخفاء كلمة المرور',
                  'عرض كلمة المرور')]]" focus-row-control="" focus-type="showPassword"></cr-icon-button>
        </template>
        <span class="password-field text-elide" id="federated" hidden$="[[!entry.federationText]]">
          [[entry.federationText]]
        </span>
      </div>
      <cr-icon-button class="icon-more-vert" id="moreActionsButton" hidden$="[[shouldHideMoreActionsButton]]" on-click="onPasswordMoreActionsButtonTap_" title="مزيد من الإجراءات" focus-row-control="" focus-type="moreActionsButton" aria-label$="[[getMoreActionsLabel_(entry)]]"></cr-icon-button>
    </div>
<!--_html_template_end_-->`,behaviors:[FocusRowBehavior,ShowPasswordBehavior],properties:{shouldHideMoreActionsButton:{type:Boolean,value:false}},onReadonlyInputTap_(){if(this.password){this.$$("#password").select()}},onPasswordMoreActionsButtonTap_(){this.fire("password-more-actions-clicked",{target:this.$.moreActionsButton,listItem:this})},getMoreActionsLabel_(){return loadTimeData.getStringF(this.entry.federationText?"passwordRowFederatedMoreActionsButton":"passwordRowMoreActionsButton",this.entry.username,this.entry.urls.shown)}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"password-edit-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared passwords-shared" scope="password-edit-dialog">cr-input:not(:last-of-type) {
  margin-bottom: var(--cr-form-field-bottom-spacing);
}

cr-icon-button {
  --cr-icon-button-icon-size: 16px;
        margin-inline-start: 2px;
}

#footnote {
  margin-inline-start: 2px;
        margin-top: 16px;
}

cr-input {
  --cr-input-error-display: none;
}

#usernameInput[invalid] {
  --cr-input-error-display: block;
}

</style>
    <cr-dialog id="dialog" close-text="إغلاق">
      <div slot="title" id="title">[[getTitle_(isEditDialog_)]]</div>
      <div slot="body">
        <div hidden="[[!shouldShowStorageDetails]]" id="storageDetails">
          [[getStorageDetailsMessage_()]]
        </div>
        <cr-input id="websiteInput" label="موقع إلكتروني" value="[[entry.urls.link]]" on-blur="onInputBlur_" readonly="">
        </cr-input>
        <cr-input id="usernameInput" label="اسم المستخدم" readonly="[[!isEditDialog_]]" invalid="[[usernameInputInvalid_]]" on-value-changed="validateUsername_" value="[[entry.username]]" error-message="سبق لك حفظ اسم المستخدم لهذا الموقع الإلكتروني.">
        </cr-input>
        <cr-input id="passwordInput" label="كلمة المرور" type="[[getPasswordInputType_(isPasswordVisible_, entry.password)]]" value="[[getPassword_(entry.password)]]" class="password-input" readonly="[[!isEditDialog_]]" invalid="{{passwordInputInvalid_}}" required="[[isEditDialog_]]" auto-validate="[[isEditDialog_]]">
          <cr-icon-button id="showPasswordButton" class$="[[getIconClass_(isPasswordVisible_, entry.password)]]" slot="suffix" hidden$="[[entry.federationText]]" on-click="onShowPasswordButtonTap_" title="[[showPasswordTitle_(entry.password, isPasswordVisible_,
                  'إخفاء كلمة المرور',
                  'عرض كلمة المرور')]]">
          </cr-icon-button>
        </cr-input>
        <div id="footnote" hidden="[[!isEditDialog_]]">
          [[getFootnote_()]]
        </div>
      </div>
      <div slot="button-container">
        <cr-button id="cancel" class="cancel-button" on-click="onCancel_" hidden="[[!isEditDialog_]]">
          إلغاء
        </cr-button>
        <cr-button id="actionButton" class="action-button" on-click="onActionButtonTap_" disabled="[[isSaveButtonDisabled_]]">
          [[getActionButtonName_(isEditDialog_)]]
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[ShowPasswordBehavior,I18nBehavior],properties:{shouldShowStorageDetails:{type:Boolean,value:false},savedPasswords:{type:Array,value:()=>[]},usernamesForSameOrigin:{type:Object,value:null},editPasswordsInSettings_:{type:Boolean,value(){return loadTimeData.getBoolean("editPasswordsInSettings")}},isEditDialog_:{type:Boolean,computed:"computeIsEditDialog_(editPasswordsInSettings_, entry)"},isPasswordVisible_:{type:Boolean,value:false},usernameInputInvalid_:Boolean,passwordInputInvalid_:Boolean,isSaveButtonDisabled_:{type:Boolean,computed:"computeIsSaveButtonDisabled_(usernameInputInvalid_, passwordInputInvalid_)"}},attached(){this.$.dialog.showModal();this.usernamesForSameOrigin=new Set(this.savedPasswords.filter((item=>item.urls.shown===this.entry.urls.shown&&(item.isPresentOnDevice()===this.entry.isPresentOnDevice()||item.isPresentInAccount()===this.entry.isPresentInAccount()))).map((item=>item.username)))},close(){this.$.dialog.close()},computeIsEditDialog_(){return this.editPasswordsInSettings_&&!this.entry.federationText},onCancel_(){this.close()},getPasswordInputType_(){if(this.isEditDialog_){return this.isPasswordVisible_||this.entry.federationText?"text":"password"}else{return this.getPasswordInputType()}},showPasswordTitle_(password,isPasswordVisible,hide,show){if(this.isEditDialog_){return isPasswordVisible?hide:show}else{return this.showPasswordTitle(password,hide,show)}},getIconClass_(){if(this.isEditDialog_){return this.isPasswordVisible_?"icon-visibility-off":"icon-visibility"}else{return this.getIconClass()}},getPassword_(){if(this.isEditDialog_){return this.entry.password}else{return this.getPassword()}},onShowPasswordButtonTap_(){if(this.isEditDialog_){this.isPasswordVisible_=!this.isPasswordVisible_}else{this.onShowPasswordButtonTap()}},onActionButtonTap_(){if(this.isEditDialog_){const idsToChange=[];const accountId=this.entry.accountId;const deviceId=this.entry.deviceId;if(accountId!==null){idsToChange.push(accountId)}if(deviceId!==null){idsToChange.push(deviceId)}PasswordManagerImpl.getInstance().changeSavedPassword(idsToChange,this.$.usernameInput.value,this.$.passwordInput.value).finally((()=>{this.close()}))}else{this.close()}},getActionButtonName_(){return this.isEditDialog_?this.i18n("save"):this.i18n("done")},onInputBlur_(){this.shadowRoot.getSelection().removeAllRanges()},getStorageDetailsMessage_(){if(this.entry.isPresentInAccount()&&this.entry.isPresentOnDevice()){return this.i18n("passwordStoredInAccountAndOnDevice")}return this.entry.isPresentInAccount()?this.i18n("passwordStoredInAccount"):this.i18n("passwordStoredOnDevice")},getTitle_(){return this.isEditDialog_?this.i18n("editPasswordTitle"):this.i18n("passwordDetailsTitle")},getFootnote_(){return this.i18n("editPasswordFootnote",this.entry.urls.shown)},computeIsSaveButtonDisabled_(){return this.usernameInputInvalid_||this.passwordInputInvalid_},validateUsername_(){if(this.entry.username!==this.$.usernameInput.value){this.usernameInputInvalid_=this.usernamesForSameOrigin.has(this.$.usernameInput.value)}else{this.usernameInputInvalid_=false}}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-avatar-icon",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="settings-avatar-icon">#avatar {
  border-radius: 50%;
    height: inherit;
    width: inherit;
}

</style>
<img id="avatar" src="[[avatarUrl_]]">
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior],properties:{avatarUrl_:{type:String,value:""}},attached(){const setAvatarUrl=accounts=>{this.avatarUrl_=accounts.length>0&&!!accounts[0].avatarImage?accounts[0].avatarImage:"chrome://theme/IDR_PROFILE_AVATAR_PLACEHOLDER_LARGE"};SyncBrowserProxyImpl.getInstance().getStoredAccounts().then(setAvatarUrl);this.addWebUIListener("stored-accounts-updated",setAvatarUrl)}});// Copyright 2020 The Chromium Authors. All rights reserved.
const MoveToAccountStoreTrigger={SUCCESSFUL_LOGIN_WITH_PROFILE_STORE_PASSWORD:0,EXPLICITLY_TRIGGERED_IN_SETTINGS:1,EXPLICITLY_TRIGGERED_FOR_MULTIPLE_PASSWORDS_IN_SETTINGS:2,COUNT:3};Polymer({is:"password-move-to-account-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style" scope="password-move-to-account-dialog">:host {
  --computer-icon-padding-top: 11px;
      --computer-icon-padding-bottom: 10px;
      --computer-icon-padding-sides: 8px;
      
      --hairline-opacity: calc(96/255);
      --hairline-width: 1px;
      --hairline-color :
          rgba(var(--google-grey-700-rgb), var(--hairline-opacity));
      --outer-icon-size: 48px;
}

@media (prefers-color-scheme: dark) {
:host {
  --hairline-color:
          rgba(var(--google-grey-500-rgb), var(--hairline-opacity))
}

}

cr-dialog::part(body-container) {
  height: 124px;
}

.icon-container {
  height: var(--outer-icon-size);
    position: relative;
    width: var(--outer-icon-size);
}

settings-avatar-icon {
  border: var(--hairline-width) solid var(--hairline-color);
    border-radius: 50%;
    display: flex;
    flex-shrink: 0;
    height: calc(var(--outer-icon-size) - 2 * var(--hairline-width));
    width: calc(var(--outer-icon-size) - 2 * var(--hairline-width));
}

#computerIcon {
  --iron-icon-height: calc(var(--outer-icon-size) - 2 * var(--hairline-width)
        - var(--computer-icon-padding-top)
        - var(--computer-icon-padding-bottom));
    --iron-icon-width: calc(var(--outer-icon-size) - 2 * var(--hairline-width)
        - 2 * var(--computer-icon-padding-sides));
    border: var(--hairline-width) solid var(--hairline-color);
    border-radius: 50%;
    flex-shrink: 0;
    padding-bottom: var(--computer-icon-padding-bottom);
    padding-inline-end: var(--computer-icon-padding-sides);
    padding-inline-start: var(--computer-icon-padding-sides);
    padding-top: var(--computer-icon-padding-top);
}

site-favicon {
  background-color: white;
    border: var(--hairline-width) solid var(--hairline-color);
    border-radius: 50%;
    bottom: 0;
    padding: 2px;
    position: absolute;
    right: 0;
}

@media (prefers-color-scheme: dark) {
site-favicon {
  background-color: var(--google-grey-900-white-4-percent);
}

}

.cr-row {
  display: flex;
    justify-content: center;
}

#chevronIcon {
  height: 16px;
    margin: 0 16px;
    width: 16px;
}

:host-context([dir=rtl]) #chevronIcon {
  transform: scaleX(-1);
}

#dialogMessage {
  margin-bottom: 24px;
}

</style>
<cr-dialog id="dialog" close-text="إغلاق">
  <div slot="title">‏هل تريد نقل كلمات المرور إلى حساب Google؟</div>
  <div slot="body">
    <div id="dialogMessage">
      ‏يمكنك نقل كلمة مرورك إلى حسابك على Google للوصول إليها بشكل آمن أينما سجّلت دخولك.
    </div>
    <div class="cr-row first">
      <div class="icon-container">
        <iron-icon id="computerIcon" icon="cr:computer">
        </iron-icon>
        <site-favicon url="[[passwordToMove.urls.link]]">
        </site-favicon>
      </div>
      <iron-icon id="chevronIcon" icon="cr:chevron-right"></iron-icon>
      <div class="icon-container">
        <settings-avatar-icon></settings-avatar-icon>
        <site-favicon url="[[passwordToMove.urls.link]]">
        </site-favicon>
      </div>
    </div>
  </div>
  <div slot="button-container">
    <cr-button class="cancel-button" id="cancelButton" on-click="onCancelButtonClick_">
      إلغاء
    </cr-button>
    <cr-button class="action-button" id="moveButton" on-click="onMoveButtonClick_">
      نقل
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{passwordToMove:Object},attached(){chrome.send("metricsHandler:recordInHistogram",["PasswordManager.AccountStorage.MoveToAccountStoreFlowOffered",MoveToAccountStoreTrigger.EXPLICITLY_TRIGGERED_IN_SETTINGS,MoveToAccountStoreTrigger.COUNT]);this.$.dialog.showModal()},onMoveButtonClick_(){assert(this.passwordToMove.isPresentOnDevice());PasswordManagerImpl.getInstance().movePasswordsToAccount([this.passwordToMove.deviceId]);this.$.dialog.close()},onCancelButtonClick_(){this.$.dialog.close()}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-checkbox">:host {
  -webkit-tap-highlight-color: transparent;
        align-items: center;
        cursor: pointer;
        display: flex;
        outline: none;
        user-select: none;

        
        --cr-checkbox-border-size: 2px;
        --cr-checkbox-size: 16px;
        --cr-checkbox-ripple-size: 40px;

        
        --cr-checkbox-ripple-offset: calc(var(--cr-checkbox-size)/2 -
            var(--cr-checkbox-ripple-size)/2 - var(--cr-checkbox-border-size));

        
        --cr-checkbox-checked-box-color: var(--cr-checked-color);
        --cr-checkbox-ripple-checked-color: var(--cr-checked-color);

        
        --cr-checkbox-checked-ripple-opacity: .2;
        --cr-checkbox-mark-color: white;
        --cr-checkbox-ripple-unchecked-color: var(--google-grey-900);
        --cr-checkbox-unchecked-box-color: var(--google-grey-refresh-700);
        --cr-checkbox-unchecked-ripple-opacity: .15;
}

@media (prefers-color-scheme: dark) {
:host {
  --cr-checkbox-checked-ripple-opacity: .4;
          --cr-checkbox-mark-color: var(--google-grey-900);
          --cr-checkbox-ripple-unchecked-color: var(--google-grey-refresh-500);
          --cr-checkbox-unchecked-box-color: var(--google-grey-refresh-500);
          --cr-checkbox-unchecked-ripple-opacity: .4;
}

}

:host([disabled]) {
  cursor: initial;
        opacity: var(--cr-disabled-opacity);
        pointer-events: none;
}

#checkbox {
  background: none;
        border: var(--cr-checkbox-border-size) solid
            var(--cr-checkbox-unchecked-box-color);
        border-radius: 2px;
        box-sizing: border-box;
        cursor: pointer;
        display: block;
        flex-shrink: 0;
        height: var(--cr-checkbox-size);
        margin: 0;
        outline: none;
        padding: 0;
        position: relative;
        transform: none;  
        width: var(--cr-checkbox-size);
}

#checkmark {
  border-color: var(--cr-checkbox-mark-color);
        border-style: solid;
        border-width: 0 2px 2px 0;
        content: '';
        display: block;
        height: 73%;
        transform: scale(0) rotate(45deg);
        transform-origin: 100% 80%;
        width: 36%;
}

:host-context([dir='rtl']) #checkmark {
  transform-origin: 50% 14%;
}

:host([checked]) #checkbox {
  background: var(--cr-checkbox-checked-box-color);
        border-color: var(--cr-checkbox-checked-box-color);
}

:host([checked]) #checkmark {
  transform: scale(1) rotate(45deg);
        
        transition: transform 140ms ease-out;
}

paper-ripple {
  --paper-ripple-opacity: var(--cr-checkbox-ripple-opacity,
            var(--cr-checkbox-unchecked-ripple-opacity));
        color: var(--cr-checkbox-ripple-unchecked-color);
        height: var(--cr-checkbox-ripple-size);
        left: var(--cr-checkbox-ripple-offset);
        pointer-events: none;
        top: var(--cr-checkbox-ripple-offset);
        transition: color linear 80ms;
        width: var(--cr-checkbox-ripple-size);
}

:host([checked]) paper-ripple {
  --paper-ripple-opacity: var(--cr-checkbox-ripple-opacity,
            var(--cr-checkbox-checked-ripple-opacity));
        color: var(--cr-checkbox-ripple-checked-color);
}

:host-context([dir=rtl]) paper-ripple {
  left: auto;
        right: var(--cr-checkbox-ripple-offset);
}

#label-container {
  color: var(--cr-checkbox-label-color, var(--cr-primary-text-color));
        padding-inline-start: var(--cr-checkbox-label-padding-start, 20px);
        white-space: normal;
}

:host(.no-label) #label-container {
  display: none;
}

#ariaDescription {
  height: 0;
        overflow: hidden;
        width: 0;
}

</style>
    <div id="checkbox" tabindex$="[[tabIndex]]" role="checkbox" on-keydown="onKeyDown_" on-keyup="onKeyUp_" aria-disabled="false" aria-checked="false" aria-labelledby="label-container" aria-describedby="ariaDescription">
      <span id="checkmark"></span>
    </div>
    <div id="label-container" aria-hidden="true" part="label-container">
      <slot></slot>
    </div>
    <div id="ariaDescription" aria-hidden="true">[[ariaDescription]]</div>
<!--_html_template_end_-->`,is:"cr-checkbox",behaviors:[PaperRippleBehavior],properties:{checked:{type:Boolean,value:false,reflectToAttribute:true,observer:"checkedChanged_",notify:true},disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"disabledChanged_"},ariaDescription:String,tabIndex:{type:Number,value:0,observer:"onTabIndexChanged_"}},listeners:{blur:"hideRipple_",click:"onClick_",focus:"showRipple_",up:"hideRipple_"},ready(){this.removeAttribute("unresolved")},focus(){this.$.checkbox.focus()},getFocusableElement(){return this.$.checkbox},checkedChanged_(){this.$.checkbox.setAttribute("aria-checked",this.checked?"true":"false")},disabledChanged_(current,previous){if(previous===undefined&&!this.disabled){return}this.tabIndex=this.disabled?-1:0;this.$.checkbox.setAttribute("aria-disabled",this.disabled?"true":"false")},showRipple_(){this.getRipple().showAndHoldDown()},hideRipple_(){this.getRipple().clear()},onClick_(e){if(this.disabled||e.target.tagName==="A"){return}e.stopPropagation();e.preventDefault();this.checked=!this.checked;this.fire("change",this.checked)},onKeyDown_(e){if(e.key!==" "&&e.key!=="Enter"){return}e.preventDefault();e.stopPropagation();if(e.repeat){return}if(e.key==="Enter"){this.click()}},onKeyUp_(e){if(e.key===" "||e.key==="Enter"){e.preventDefault();e.stopPropagation()}if(e.key===" "){this.click()}},onTabIndexChanged_(){this.removeAttribute("tabindex")},_createRipple(){this._rippleContainer=this.$.checkbox;const ripple=PaperRippleBehavior._createRipple();ripple.id="ink";ripple.setAttribute("recenters","");ripple.classList.add("circle","toggle-ink");return ripple}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"password-remove-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style" scope="password-remove-dialog">cr-checkbox {
  display: flex;
    padding: 10px 8px;
}

.checkbox-label {
  color: var(--google-grey-800);
}

settings-avatar-icon {
  height: 20px;
    margin-inline-end: 16px;
    width: 20px;
}

.cr-row {
  padding: 0;
}

</style>
<cr-dialog id="dialog" close-text="إغلاق">
  <div slot="title">هل تريد حذف كلمة المرور؟</div>
  <div slot="body">
    <div inner-h-t-m-l="[[getDialogBodyMessage_()]]"></div>
    <cr-checkbox checked="{{removeFromAccountChecked_}}" id="removeFromAccountCheckbox">
      <div class="cr-row first">
        <settings-avatar-icon></settings-avatar-icon>
        <div class="checkbox-label">
          ‏من حسابك على Google
        </div>
        <div class="cr-secondary-text">
          &nbsp;([[accountEmail_]])
        </div>
      </div>
    </cr-checkbox>
    <cr-checkbox checked="{{removeFromDeviceChecked_}}" id="removeFromDeviceCheckbox">
      <div class="checkbox-label">
        من هذا الجهاز
      </div>
    </cr-checkbox>
  </div>
  <div slot="button-container">
    <cr-button class="cancel-button" id="cancelButton" on-click="onCancelButtonClick_">
      إلغاء
    </cr-button>
    <cr-button class="action-button" id="removeButton" disabled="[[shouldDisableRemoveButton_(removeFromAccountChecked_,
            removeFromDeviceChecked_)]]" on-click="onRemoveButtonClick_">
      حذف
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{duplicatedPassword:Object,removeFromAccountChecked_:{type:Boolean,value:true},removeFromDeviceChecked_:{type:Boolean,value:true},accountEmail_:{type:String,value:""}},attached(){assert(this.duplicatedPassword.isPresentInAccount()&&this.duplicatedPassword.isPresentOnDevice());this.$.dialog.showModal();SyncBrowserProxyImpl.getInstance().getStoredAccounts().then((accounts=>{if(!!accounts&&accounts.length>0){this.accountEmail_=accounts[0].email}}))},onRemoveButtonClick_(){const idsToRemove=[];if(this.removeFromAccountChecked_){idsToRemove.push(this.duplicatedPassword.accountId)}if(this.removeFromDeviceChecked_){idsToRemove.push(this.duplicatedPassword.deviceId)}PasswordManagerImpl.getInstance().removeSavedPasswords(idsToRemove);this.$.dialog.close();this.fire("password-remove-dialog-passwords-removed",{removedFromAccount:this.removeFromAccountChecked_,removedFromDevice:this.removeFromDeviceChecked_})},onCancelButtonClick_(){this.$.dialog.close()},shouldDisableRemoveButton_(){return!this.removeFromAccountChecked_&&!this.removeFromDeviceChecked_},getDialogBodyMessage_(){return this.i18nAdvanced("passwordRemoveDialogBody",{substitutions:[this.duplicatedPassword.urls.shown],tags:["b"]})}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"passwords-list-handler",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="passwords-list-handler">#removalNotification {
  display: flex;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
}

</style>

    <slot name="body"></slot>

    <cr-action-menu id="menu" role-description="قائمة">
      <button id="menuCopyPassword" class="dropdown-item" hidden$="[[activePassword_.entry.federationText]]" on-click="onMenuCopyPasswordButtonTap_">نسخ كلمة المرور</button>
      <button id="menuEditPassword" class="dropdown-item" on-click="onMenuEditPasswordTap_">
        [[getMenuEditPasswordName_(isEditDialog_)]]
      </button>
      <button id="menuRemovePassword" class="dropdown-item" on-click="onMenuRemovePasswordTap_">إزالة</button>
      <button id="menuMovePasswordToAccount" on-click="onMenuMovePasswordToAccountTap_" hidden$="[[!shouldShowMoveToAccountOption_(activePassword_,
              allowMoveToAccountOption, firstSignedInAccountEmail_)]]" class="dropdown-item">‏نقل كلمات المرور إلى حساب Google</button>
    </cr-action-menu>

    <template is="dom-if" if="[[showPasswordEditDialog_]]" restamp="">
      <password-edit-dialog on-close="onPasswordEditDialogClosed_" id="passwordEditDialog" entry="[[activePassword_.entry]]" saved-passwords="[[savedPasswords]]" should-show-storage-details="[[shouldShowStorageDetails]]">
      </password-edit-dialog>
    </template>

    <template is="dom-if" if="[[showPasswordMoveToAccountDialog_]]" restamp="">
      <password-move-to-account-dialog id="passwordMoveToAccountDialog" password-to-move="[[activePassword_.entry]]" on-close="onPasswordMoveToAccountDialogClosed_">
      </password-move-to-account-dialog>
    </template>

    <template is="dom-if" if="[[showPasswordRemoveDialog_]]" restamp="">
      <password-remove-dialog id="passwordRemoveDialog" duplicated-password="[[activePassword_.entry]]" on-close="onPasswordRemoveDialogClosed_">
      </password-remove-dialog>
    </template>

    <cr-toast id="toast" duration="5000">
      <div id="removalNotification">[[removalNotification_]]</div>
      <cr-button aria-label="اضغط على Ctrl+Z للتراجع" on-click="onUndoButtonClick_">تراجع</cr-button>
    </cr-toast>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{savedPasswords:{type:Array,value:()=>[]},shouldShowStorageDetails:{type:Boolean,value:false},allowMoveToAccountOption:{type:Boolean,value:false},activePassword_:{type:Object,value:null},editPasswordsInSettings_:{type:Boolean,value(){return loadTimeData.getBoolean("editPasswordsInSettings")}},isEditDialog_:{type:Boolean,computed:"computeIsEditDialog_(editPasswordsInSettings_, activePassword_)"},showPasswordEditDialog_:{type:Boolean,value:false},showPasswordMoveToAccountDialog_:{type:Boolean,value:false},showPasswordRemoveDialog_:{type:Boolean,value:false},activeDialogAnchor_:{type:Object,value:null},removalNotification_:{type:String,value:""},firstSignedInAccountEmail_:{type:String,value:""}},passwordManager_:null,listeners:{"password-more-actions-clicked":"passwordMoreActionsClickedHandler_","password-remove-dialog-passwords-removed":"passwordRemoveDialogPasswordsRemovedHandler_"},attached(){this.passwordManager_=PasswordManagerImpl.getInstance();const extractFirstAccountEmail=accounts=>{this.firstSignedInAccountEmail_=accounts.length>0?accounts[0].email:""};SyncBrowserProxyImpl.getInstance().getStoredAccounts().then(extractFirstAccountEmail);this.addWebUIListener("stored-accounts-updated",extractFirstAccountEmail)},detached(){if(this.$.toast.open){this.$.toast.hide()}},onSavedPasswordOrExceptionRemoved(){this.$.toast.hide()},passwordMoreActionsClickedHandler_(event){const target=event.detail.target;this.activePassword_=event.detail.listItem;this.$.menu.showAt(target);this.activeDialogAnchor_=target},passwordRemoveDialogPasswordsRemovedHandler_(event){this.displayRemovalNotification_(event.detail.removedFromAccount,event.detail.removedFromDevice)},computeIsEditDialog_(){return this.editPasswordsInSettings_&&(!this.activePassword_||!this.activePassword_.entry.federationText)},requestActivePlaintextPassword_(reason,callback){this.passwordManager_.requestPlaintextPassword(this.activePassword_.entry.getAnyId(),reason).then(callback,(error=>{}))},onMenuEditPasswordTap_(){if(this.isEditDialog_){this.requestActivePlaintextPassword_(chrome.passwordsPrivate.PlaintextReason.EDIT,(password=>{this.set("activePassword_.entry.password",password);this.showPasswordEditDialog_=true}))}else{this.showPasswordEditDialog_=true}this.$.menu.close();this.activePassword_.hide()},getMenuEditPasswordName_(){return this.isEditDialog_?this.i18n("editPassword"):this.i18n("passwordViewDetails")},onPasswordEditDialogClosed_(){this.showPasswordEditDialog_=false;focusWithoutInk(assert(this.activeDialogAnchor_));this.activeDialogAnchor_=null;this.activePassword_.hide();this.activePassword_=null},onMovePasswordToAccountDialogClosed_(){this.showPasswordEditDialog_=false;focusWithoutInk(assert(this.activeDialogAnchor_));this.activeDialogAnchor_=null;this.activePassword_=null},onMenuCopyPasswordButtonTap_(){this.requestActivePlaintextPassword_(chrome.passwordsPrivate.PlaintextReason.COPY,(_=>{this.activePassword_=null}));this.$.menu.close()},onMenuRemovePasswordTap_(){this.$.menu.close();if(this.activePassword_.entry.isPresentOnDevice()&&this.activePassword_.entry.isPresentInAccount()){this.showPasswordRemoveDialog_=true;return}const idToRemove=this.activePassword_.entry.isPresentInAccount()?this.activePassword_.entry.accountId:this.activePassword_.entry.deviceId;this.passwordManager_.removeSavedPassword(idToRemove);this.displayRemovalNotification_(this.activePassword_.entry.isPresentInAccount(),this.activePassword_.entry.isPresentOnDevice());this.activePassword_=null},displayRemovalNotification_(removedFromAccount,removedFromDevice){assert(removedFromAccount||removedFromDevice);this.removalNotification_=this.i18n("passwordDeleted");if(this.shouldShowStorageDetails){if(removedFromAccount&&removedFromDevice){this.removalNotification_=this.i18n("passwordDeletedFromAccountAndDevice")}else if(removedFromAccount){this.removalNotification_=this.i18n("passwordDeletedFromAccount")}else{this.removalNotification_=this.i18n("passwordDeletedFromDevice")}}this.$.toast.show()},onUndoButtonClick_(){this.passwordManager_.undoRemoveSavedPasswordOrException();this.onSavedPasswordOrExceptionRemoved()},onMenuMovePasswordToAccountTap_(){this.$.menu.close();this.showPasswordMoveToAccountDialog_=true},onPasswordMoveToAccountDialogClosed_(){this.showPasswordMoveToAccountDialog_=false;this.activePassword_=null;this.activeDialogAnchor_=null},onPasswordRemoveDialogClosed_(){this.showPasswordRemoveDialog_=false;this.activePassword_=null;this.activeDialogAnchor_=null},shouldShowMoveToAccountOption_(){const isFirstSignedInAccountPassword=!!this.activePassword_&&this.activePassword_.entry.urls.origin.includes("accounts.google.com")&&this.activePassword_.entry.username===this.firstSignedInAccountEmail_;return this.allowMoveToAccountOption&&!isFirstSignedInAccountPassword}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const IronRangeBehavior={properties:{value:{type:Number,value:0,notify:true,reflectToAttribute:true},min:{type:Number,value:0,notify:true},max:{type:Number,value:100,notify:true},step:{type:Number,value:1,notify:true},ratio:{type:Number,value:0,readOnly:true,notify:true}},observers:["_update(value, min, max, step)"],_calcRatio:function(value){return(this._clampValue(value)-this.min)/(this.max-this.min)},_clampValue:function(value){return Math.min(this.max,Math.max(this.min,this._calcStep(value)))},_calcStep:function(value){value=parseFloat(value);if(!this.step){return value}var numSteps=Math.round((value-this.min)/this.step);if(this.step<1){return numSteps/(1/this.step)+this.min}else{return numSteps*this.step+this.min}},_validateValue:function(){var v=this._clampValue(this.value);this.value=this.oldValue=isNaN(v)?this.oldValue:v;return this.value!==v},_update:function(){this._validateValue();this._setRatio(this._calcRatio(this.value)*100)}};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({_template:html`<!--css-build:shadow--><style scope="paper-progress">:host {
  display: block;
        width: 200px;
        position: relative;
        overflow: hidden;
}

:host([hidden]), [hidden] {
  display: none !important;
}

#progressContainer {
  ;
        position: relative;
}

#progressContainer, .indeterminate::after {
  height: var(--paper-progress-height, 4px);
}

#primaryProgress, #secondaryProgress, .indeterminate::after {
  position: var(--layout-fit_-_position); top: var(--layout-fit_-_top); right: var(--layout-fit_-_right); bottom: var(--layout-fit_-_bottom); left: var(--layout-fit_-_left);
}

#progressContainer, .indeterminate::after {
  background: var(--paper-progress-container-color, var(--google-grey-300));
}

:host(.transiting) #primaryProgress, :host(.transiting) #secondaryProgress {
  transition-property: transform;

        
        transition-duration: var(--paper-progress-transition-duration, 0.08s);

        
        transition-timing-function: var(--paper-progress-transition-timing-function, ease);

        
        transition-delay: var(--paper-progress-transition-delay, 0s);
}

#primaryProgress, #secondaryProgress {
  position: var(--layout-fit_-_position); top: var(--layout-fit_-_top); right: var(--layout-fit_-_right); bottom: var(--layout-fit_-_bottom); left: var(--layout-fit_-_left);
        transform-origin: left center;
        transform: scaleX(0);
        will-change: transform;
}

#primaryProgress {
  background: var(--paper-progress-active-color, var(--google-green-500));
}

#secondaryProgress {
  background: var(--paper-progress-secondary-color, var(--google-green-100));
}

:host([disabled]) #primaryProgress {
  background: var(--paper-progress-disabled-active-color, var(--google-grey-500));
}

:host([disabled]) #secondaryProgress {
  background: var(--paper-progress-disabled-secondary-color, var(--google-grey-300));
}

:host(:not([disabled])) #primaryProgress.indeterminate {
  transform-origin: right center;
        animation: indeterminate-bar var(--paper-progress-indeterminate-cycle-duration, 2s) linear infinite;
}

:host(:not([disabled])) #primaryProgress.indeterminate::after {
  content: "";
        transform-origin: center center;

        animation: indeterminate-splitter var(--paper-progress-indeterminate-cycle-duration, 2s) linear infinite;
}

@keyframes indeterminate-bar {
0% {
  transform: scaleX(1) translateX(-100%);
}

50% {
  transform: scaleX(1) translateX(0%);
}

75% {
  transform: scaleX(1) translateX(0%);
          animation-timing-function: cubic-bezier(.28,.62,.37,.91);
}

100% {
  transform: scaleX(0) translateX(0%);
}

}

@keyframes indeterminate-splitter {
0% {
  transform: scaleX(.75) translateX(-125%);
}

30% {
  transform: scaleX(.75) translateX(-125%);
          animation-timing-function: cubic-bezier(.42,0,.6,.8);
}

90% {
  transform: scaleX(.75) translateX(125%);
}

100% {
  transform: scaleX(.75) translateX(125%);
}

}

</style>

    <div id="progressContainer">
      <div id="secondaryProgress" hidden$="[[_hideSecondaryProgress(secondaryRatio)]]"></div>
      <div id="primaryProgress"></div>
    </div>
`,is:"paper-progress",behaviors:[IronRangeBehavior],properties:{secondaryProgress:{type:Number,value:0},secondaryRatio:{type:Number,value:0,readOnly:true},indeterminate:{type:Boolean,value:false,observer:"_toggleIndeterminate"},disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"_disabledChanged"}},observers:["_progressChanged(secondaryProgress, value, min, max, indeterminate)"],hostAttributes:{role:"progressbar"},_toggleIndeterminate:function(indeterminate){this.toggleClass("indeterminate",indeterminate,this.$.primaryProgress)},_transformProgress:function(progress,ratio){var transform="scaleX("+ratio/100+")";progress.style.transform=progress.style.webkitTransform=transform},_mainRatioChanged:function(ratio){this._transformProgress(this.$.primaryProgress,ratio)},_progressChanged:function(secondaryProgress,value,min,max,indeterminate){secondaryProgress=this._clampValue(secondaryProgress);value=this._clampValue(value);var secondaryRatio=this._calcRatio(secondaryProgress)*100;var mainRatio=this._calcRatio(value)*100;this._setSecondaryRatio(secondaryRatio);this._transformProgress(this.$.secondaryProgress,secondaryRatio);this._transformProgress(this.$.primaryProgress,mainRatio);this.secondaryProgress=secondaryProgress;if(indeterminate){this.removeAttribute("aria-valuenow")}else{this.setAttribute("aria-valuenow",value)}this.setAttribute("aria-valuemin",min);this.setAttribute("aria-valuemax",max)},_disabledChanged:function(disabled){this.setAttribute("aria-disabled",disabled?"true":"false")},_hideSecondaryProgress:function(secondaryRatio){return secondaryRatio===0}});// Copyright 2017 The Chromium Authors. All rights reserved.
const States={START:"START",IN_PROGRESS:"IN_PROGRESS",ERROR:"ERROR"};const ProgressStatus=chrome.passwordsPrivate.ExportProgressStatus;const progressBarDelayMs=100;const progressBarBlockMs=1e3;Polymer({is:"passwords-export-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared iron-flex" scope="passwords-export-dialog">paper-progress {
  --paper-progress-active-color: var(--google-blue-500);
        width: 100%;
}

@media (prefers-color-scheme: dark) {
paper-progress {
  --paper-progress-active-color: var(--google-blue-refresh-300);
}

}

.action-button {
  margin-inline-start: 8px;
}

</style>
    <template is="dom-if" if="[[showStartDialog_]]" restamp="">
      <cr-dialog id="dialog_start" close-text="إغلاق" show-on-attach="">
        <div slot="title">تصدير كلمات المرور</div>
        <div slot="body">
          <div class="layout horizontal center">
            <div>ستكون كلمات مرورك مرئية لأي شخص يمكنه الاطلاع على الملف الذي تم تصديره.</div>
          </div>
        </div>
        <div slot="button-container">
          <cr-button class="secondary-button header-aligned-button" on-click="onCancelButtonTap_" id="cancelButton">
            إلغاء
          </cr-button>
          <cr-button class="action-button header-aligned-button" on-click="onExportTap_" id="exportPasswordsButton">
            جارٍ تصدير كلمات المرور…
          </cr-button>
        </div>
      </cr-dialog>
    </template>

    <template is="dom-if" if="[[showProgressDialog_]]" restamp="">
      <cr-dialog id="dialog_progress" no-cancel="true" show-on-attach="">
        <div slot="title">جارٍ تصدير كلمات المرور…</div>
        <div slot="body">
          <paper-progress indeterminate="" class="blue"></paper-progress>
        </div>
        <div slot="button-container">
          <cr-button id="cancel_progress_button" class="header-aligned-button" on-click="onCancelProgressButtonTap_">
            إلغاء
          </cr-button>
        </div>
      </cr-dialog>
    </template>

    <template is="dom-if" if="[[showErrorDialog_]]" restamp="">
      <cr-dialog id="dialog_error" close-text="إغلاق" show-on-attach="">
        <div slot="title">[[exportErrorMessage]]</div>
        <div slot="body">
          جرّب النصائح التالية:
          <ul>
            <li>التأكد من توفر مساحة كافية على جهازك</li>
            <li>تصدير كلمات المرور إلى مجلد آخر</li>
          </ul>
        </div>
        <div slot="button-container">
          <cr-button class="header-aligned-button" on-click="onCancelButtonTap_" id="cancelErrorButton">
            إلغاء
          </cr-button>
          <cr-button class="action-button header-aligned-button" on-click="onExportTap_" id="tryAgainButton">
            أعد المحاولة
          </cr-button>
        </div>
      </cr-dialog>
    </template>

<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{exportErrorMessage:String,showStartDialog_:Boolean,showProgressDialog_:Boolean,showErrorDialog_:Boolean},listeners:{cancel:"close"},passwordManager_:null,onPasswordsFileExportProgressListener_:null,progressTaskToken_:null,delayedCompletionToken_:null,delayedProgress_:null,attached(){this.passwordManager_=PasswordManagerImpl.getInstance();this.switchToDialog_(States.START);this.onPasswordsFileExportProgressListener_=this.onPasswordsFileExportProgress_.bind(this);this.passwordManager_.requestExportProgressStatus((status=>{if(status===ProgressStatus.IN_PROGRESS){this.switchToDialog_(States.IN_PROGRESS)}}));this.passwordManager_.addPasswordsFileExportProgressListener(this.onPasswordsFileExportProgressListener_)},onPasswordsFileExportProgress_(progress){const progressBlocked=!this.progressTaskToken_&&this.delayedCompletionToken_;if(!progressBlocked){clearTimeout(this.progressTaskToken_);this.progressTaskToken_=null;this.processProgress_(progress)}else{this.delayedProgress_=progress}},progressTask_(){this.progressTaskToken_=null;this.switchToDialog_(States.IN_PROGRESS);this.delayedCompletionToken_=setTimeout(this.delayedCompletionTask_.bind(this),progressBarBlockMs)},delayedCompletionTask_(){this.delayedCompletionToken_=null;if(this.delayedProgress_){this.processProgress_(this.delayedProgress_);this.delayedProgress_=null}},close(){clearTimeout(this.progressTaskToken_);clearTimeout(this.delayedCompletionToken_);this.progressTaskToken_=null;this.delayedCompletionToken_=null;this.passwordManager_.removePasswordsFileExportProgressListener(this.onPasswordsFileExportProgressListener_);this.showStartDialog_=false;this.showProgressDialog_=false;this.showErrorDialog_=false;this.async((()=>this.fire("passwords-export-dialog-close")))},onExportTap_(){this.exportPasswords_()},exportPasswords_(){this.passwordManager_.exportPasswords((()=>{if(chrome.runtime.lastError&&chrome.runtime.lastError.message==="in-progress"){this.switchToDialog_(States.IN_PROGRESS)}}))},processProgress_(progress){if(progress.status===ProgressStatus.IN_PROGRESS){this.progressTaskToken_=setTimeout(this.progressTask_.bind(this),progressBarDelayMs);return}if(progress.status===ProgressStatus.SUCCEEDED){this.close();return}if(progress.status===ProgressStatus.FAILED_WRITE_FAILED){this.exportErrorMessage=this.i18n("exportPasswordsFailTitle",progress.folderName);this.switchToDialog_(States.ERROR);return}},switchToDialog_(state){this.showStartDialog_=state===States.START;this.showProgressDialog_=state===States.IN_PROGRESS;this.showErrorDialog_=state===States.ERROR},onCancelButtonTap_(){this.close()},onCancelProgressButtonTap_(){this.passwordManager_.cancelExportPasswords();this.close()}});// Copyright 2015 The Chromium Authors. All rights reserved.
function isEditable(element){const nodeName=element.nodeName.toLowerCase();return element.nodeType===Node.ELEMENT_NODE&&(nodeName==="textarea"||nodeName==="input"&&/^(?:text|search|email|number|tel|url|password)$/i.test(element.type))}Polymer({is:"passwords-section",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex passwords-shared" scope="passwords-section">#savedPasswordsHeaders {
  padding-inline-end: calc(
          var(--cr-icon-ripple-size) + var(--cr-icon-button-margin-start));
}

#exportImportMenuButtonContainer {
  margin-inline-end: 0;
}

#checkPasswordsBannerContainer {
  line-height: 0;
        padding-top: 16px;
}

#banner {
  border-radius: 4px;
        width: 100%;
}

#checkPasswordsLinkRow iron-icon {
  --iron-icon-fill-color: var(--google-red-600);
        background: radial-gradient(circle 12px at 12px,
            rgb(252, 232, 230) 100%, transparent 100%);
        height: 16px;
        margin-inline-end: 16px;
        margin-inline-start: -4px;
        padding-bottom: 4px;
        padding-inline-end: 4px;
        padding-inline-start: 4px;
        padding-top: 4px;
        width: 16px;
}

@media (prefers-color-scheme: dark) {
#checkPasswordsLinkRow iron-icon {
  --iron-icon-fill-color: var(--google-red-refresh-300);
          background: radial-gradient(circle 12px at 12px,
                                    var(--google-grey-900) 100%,
                                    transparent 100%);
}

}

#profileIcon {
  flex-shrink: 0;
        height: 40px;
        margin-inline-end: 16px;
        width: 40px;
}

#accountStorageOptInButtonsContainer {
  padding-bottom: 16px;
}

#devicePasswordsLink {
  cursor: pointer;
        padding-top: 16px;
}

#devicePasswordsLinkIcon {
  border-color: var(--google-grey-200);
        border-radius: 20px;
        border-style: solid;
        border-width: 1px;
        height: 17px;
        margin-inline-end: 16px;
        padding-bottom: 10px;
        padding-inline-end: 8px;
        padding-inline-start: 8px;
        padding-top: 11px;
        width: 22px;
}

#devicePasswordsLinkLabel {
  flex-grow: 1;
}

</style>
    <settings-toggle-button id="passwordToggle" aria-label="كلمات المرور" no-extension-indicator="" label="اقتراح حفظ كلمات المرور" pref="{{prefs.credentials_enable_service}}">
    </settings-toggle-button>
    <template is="dom-if" if="[[prefs.credentials_enable_service.extensionId]]">
      <div class="cr-row continuation">
        <extension-controlled-indicator class="flex" id="passwordsExtensionIndicator" extension-id="[[prefs.credentials_enable_service.extensionId]]" extension-name="[[
                prefs.credentials_enable_service.controlledByName]]" extension-can-be-disabled="[[
                prefs.credentials_enable_service.extensionCanBeDisabled]]">
        </extension-controlled-indicator>
      </div>
    </template>
    <settings-toggle-button id="autosigninCheckbox" class="hr" pref="{{prefs.credentials_enable_autosignin}}" label="تسجيل الدخول تلقائيًا" sub-label="يمكنك تسجيل الدخول تلقائيًا إلى المواقع الإلكترونية باستخدام بيانات الاعتماد المخزّنة. وعندما تكون هذه الميزة غير مفعّلة، سيُطلب منك التحقّق من بيانات الاعتماد في كل مرة قبل تسجيل الدخول إلى موقع إلكتروني.">
    </settings-toggle-button>
    <div id="checkPasswordsBannerContainer" class="cr-row" hidden$="[[!shouldShowBanner_]]">
      <picture>
        <source srcset="chrome://settings/images/password_check_neutral_dark.svg" media="(prefers-color-scheme: dark)">
        <img id="banner" alt="" src="chrome://settings/images/password_check_neutral.svg">
      </picture>
    </div>
    <div id="checkPasswordsButtonRow" class="cr-row continuation" hidden$="[[!shouldShowBanner_]]">
      <div class="flex cr-padded-text">
        <div>التحقق من كلمات المرور</div>
        <div class="secondary">لحماية كلمة المرور من عمليات اختراق البيانات ومشاكل الأمان الأخرى</div>
      </div>
      <cr-button id="checkPasswordsButton" class="action-button cr-button-gap" on-click="onCheckPasswordsClick_">
        التحقق من كلمات المرور
      </cr-button>
    </div>
    <div class="cr-row" id="checkPasswordsLinkRow" on-click="onCheckPasswordsClick_" actionable="" hidden$="[[shouldShowBanner_]]">
      <iron-icon icon="cr:warning" id="checkPasswordWarningIcon" hidden$="[[!hasLeakedCredentials_]]"></iron-icon>
      <div class="flex cr-padded-text">
        <div>
          التحقق من كلمات المرور
        </div>
        <div class="secondary" id="checkPasswordLeakCount" hidden$="[[!hasLeakedCredentials_]]">
          [[compromisedPasswordsCount]]
        </div>
        <div class="secondary" id="checkPasswordLeakDescription" hidden$="[[hasLeakedCredentials_]]">
          لحماية كلمة المرور من عمليات اختراق البيانات ومشاكل الأمان الأخرى
        </div>
      </div>
      <cr-icon-button id="icon" class="subpage-arrow" aria-label="التحقق من كلمات المرور">
      </cr-icon-button>
    </div>
    <div id="manageLink" class="cr-row two-line" hidden$="[[hidePasswordsLink_]]">
      <!-- This div lays out the link correctly, relative to the text. -->
      <div class="cr-padded-text">‏بإمكانك عرض كلمات المرور المحفوظة وإدارتها في <a is="action-link" href="https://passwords.google.com/?utm_source=chrome&utm_medium=desktop&utm_campaign=chrome_settings" target="_blank">حسابك على Google</a>.</div>
    </div>
    <div class="cr-row first">
      <h2 id="savedPasswordsHeading" class="flex">
        كلمات المرور المحفوظة
      </h2>
      <template is="dom-if" if="[[showImportOrExportPasswords_(
                    hasSavedPasswords_, showImportPasswords_)]]">
        <cr-icon-button class="icon-more-vert header-aligned-button" id="exportImportMenuButton" on-click="onImportExportMenuTap_" title="مزيد من الإجراءات" focus-type="exportImportMenuButton" aria-describedby="savedPasswordsHeading"></cr-icon-button>
      </template>
    </div>

    <passwords-list-handler id="passwordsListHandler" should-show-storage-details="[[shouldShowStorageDetails_]]" saved-passwords="[[savedPasswords]]">
      <div slot="body" class="list-frame">
        <div hidden$="[[!eligibleForAccountStorage_]]" id="accountStorageButtonsContainer">
          <div class="cr-row first two-line list-item" id="accountStorageOptInButtonsContainer">
            <settings-avatar-icon id="profileIcon"></settings-avatar-icon>
            <div class="flex cr-padded-text">
              <div id="accountStorageOptInBody" hidden$="[[isOptedInForAccountStorage_]]">
                ‏يمكنك أيضًا عرض كلمات المرور من <a is="action-link" href="https://passwords.google.com/?utm_source=chrome&utm_medium=desktop&utm_campaign=chrome_settings" target="_blank">حسابك على Google</a> هنا.
              </div>
              <div id="accountStorageOptOutBody" hidden$="[[!isOptedInForAccountStorage_]]">
                ‏عرض كلمات المرور من <a is="action-link" href="https://passwords.google.com/?utm_source=chrome&utm_medium=desktop&utm_campaign=chrome_settings" target="_blank">حسابك على Google</a>
              </div>
              <div id="accountEmail" class="secondary">[[profileEmail_]]</div>
            </div>
            <cr-button on-click="onOptIn_" id="optInToAccountStorageButton" hidden$="[[isOptedInForAccountStorage_]]">
              عرض
            </cr-button>
            <cr-button on-click="onOptOut_" id="optOutOfAccountStorageButton" hidden$="[[!isOptedInForAccountStorage_]]">
              إزالة من الجهاز
            </cr-button>
          </div>
          <div id="devicePasswordsLink" class="cr-row two-line list-item" hidden$="[[!shouldShowDevicePasswordsLink_]]" on-click="onDevicePasswordsLinkClicked_">
            <iron-icon id="devicePasswordsLinkIcon" icon="cr:computer">
            </iron-icon>
            <div id="devicePasswordsLinkLabel">
                الاطّلاع على كلمات المرور المحفوظة على هذا الجهاز وإدارتها
            </div>
            <cr-icon-button iron-icon="cr:arrow-right" aria-roledescription="زر صفحة فرعية">
            </cr-icon-button>
          </div>
        </div>
        <div id="savedPasswordsHeaders" class="list-item column-header" hidden$="[[!hasSavedPasswords_]]" aria-hidden="true">
          <div class="website-column">موقع إلكتروني</div>
          <div class="username-column">
            اسم المستخدم
          </div>
          <div class="password-column">
            كلمة المرور
          </div>
        </div>
        <iron-list id="passwordList" preserve-focus="" items="[[getFilteredPasswords_(filter,
              savedPasswords.splices, isOptedInForAccountStorage_)]]" class="cr-separators list-with-header" scroll-target="[[subpageScrollTarget]]" risk-selection="">
          <template>
            <password-list-item entry="[[item]]" tabindex$="[[tabIndex]]" focus-row-index="[[index]]" first$="[[!index]]" iron-list-tab-index="[[tabIndex]]" last-focused="{{lastFocused_}}" list-blurred="{{listBlurred_}}">
            </password-list-item>
          </template>
        </iron-list>
        <div id="noPasswordsLabel" class="list-item" hidden$="[[hasSavedPasswords_]]">
          ستظهر هنا كلمات المرور المحفوظة
        </div>
      </div>
    </passwords-list-handler>
    <cr-action-menu id="exportImportMenu" role-description="قائمة">
      <button id="menuImportPassword" class="dropdown-item" on-click="onImportTap_" hidden="[[!showImportPasswords_]]">
        الاستيراد
      </button>
      <button id="menuExportPassword" class="dropdown-item" on-click="onExportTap_" hidden="[[!hasSavedPasswords_]]">
        جارٍ تصدير كلمات المرور…
      </button>
    </cr-action-menu>
    <template is="dom-if" if="[[showPasswordsExportDialog_]]" restamp="">
      <passwords-export-dialog on-passwords-export-dialog-close="onPasswordsExportDialogClosed_">
      </passwords-export-dialog>
    </template>

    <div class="cr-row first">
      <h2 class="flex">المواقع التي لن تحفظ كلمات المرور أبدًا</h2>
    </div>
    <div class="list-frame vertical-list" id="passwordExceptionsList">
      <template is="dom-repeat" items="[[passwordExceptions]]" filter="[[passwordExceptionFilter_(filter)]]">
        <div class="list-item">
          <div class="start website-column">
            <site-favicon url="[[item.urls.link]]"></site-favicon>
            <a id="exception" href="[[item.urls.link]]" target="_blank">
              [[item.urls.shown]]
            </a>
          </div>
          <cr-icon-button class="icon-clear" id="removeExceptionButton" on-click="onRemoveExceptionButtonTap_" tabindex$="[[tabIndex]]" title="حذف هذا العنصر"></cr-icon-button>
        </div>
      </template>
      <div id="noExceptionsLabel" class="list-item" hidden$="[[hasPasswordExceptions_]]">
        ستظهر هنا المواقع الإلكترونية التي لا يتم حفظ كلمات المرور لها مطلقًا
      </div>
    </div>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior,MergeExceptionsStoreCopiesBehavior,MergePasswordsStoreCopiesBehavior,PasswordCheckBehavior,IronA11yKeysBehavior,GlobalScrollTargetBehavior,PrefsBehavior],properties:{focusConfig:{type:Object,observer:"focusConfigChanged_"},prefs:{type:Object,notify:true},subpageRoute:{type:Object,value:routes.PASSWORDS},keyEventTarget:{type:Object,value:()=>document},filter:{type:String,value:""},storedAccounts_:Array,signedIn_:{type:Boolean,value:true,computed:"computeSignedIn_(syncStatus_, storedAccounts_)"},eligibleForAccountStorage_:{type:Boolean,value:false,computed:"computeEligibleForAccountStorage_("+"syncStatus_, signedIn_, syncPrefs_)"},hasNeverCheckedPasswords_:{type:Boolean,computed:"computeHasNeverCheckedPasswords_(status)"},hasSavedPasswords_:{type:Boolean,computed:"computeHasSavedPasswords_(savedPasswords, savedPasswords.splices)"},numberOfDevicePasswords_:{type:Number,computed:"computeNumberOfDevicePasswords_(savedPasswords, "+"savedPasswords.splices)"},hasPasswordExceptions_:{type:Boolean,computed:"computeHasPasswordExceptions_(passwordExceptions)"},shouldShowBanner_:{type:Boolean,value:true,computed:"computeShouldShowBanner_(hasLeakedCredentials_,"+"signedIn_, hasNeverCheckedPasswords_, hasSavedPasswords_)"},shouldShowStorageDetails_:{type:Boolean,value:false,computed:"computeShouldShowStorageDetails_("+"eligibleForAccountStorage_, isOptedInForAccountStorage_)"},shouldShowDevicePasswordsLink_:{type:Boolean,value:false,computed:"computeShouldShowDevicePasswordsLink_("+"isOptedInForAccountStorage_, numberOfDevicePasswords_)"},hasLeakedCredentials_:{type:Boolean,computed:"computeHasLeakedCredentials_(leakedPasswords)"},hidePasswordsLink_:{type:Boolean,computed:"computeHidePasswordsLink_(syncPrefs_, syncStatus_, "+"eligibleForAccountStorage_)"},showImportPasswords_:{type:Boolean,value(){return loadTimeData.valueExists("showImportPasswords")&&loadTimeData.getBoolean("showImportPasswords")}},accountStorageFeatureEnabled_:{type:Boolean,value(){return loadTimeData.getBoolean("enableAccountStorage")}},profileEmail_:{type:String,value:"",computed:"getFirstStoredAccountEmail_(storedAccounts_)"},profileIcon_:String,isOptedInForAccountStorage_:Boolean,syncPrefs_:Object,syncStatus_:Object,lastFocused_:Object,listBlurred_:Boolean},keyBindings:{"ctrl+z":"onUndoKeyBinding_"},activeDialogAnchorStack_:[],passwordManager_:null,setIsOptedInForAccountStorageListener_:null,setPasswordExceptionsListener_:null,attached(){const setIsOptedInForAccountStorageListener=optedIn=>{this.isOptedInForAccountStorage_=optedIn};this.setIsOptedInForAccountStorageListener_=setIsOptedInForAccountStorageListener;this.passwordManager_=PasswordManagerImpl.getInstance();this.passwordManager_.isOptedInForAccountStorage().then(setIsOptedInForAccountStorageListener);this.passwordManager_.addAccountStorageOptInStateListener(setIsOptedInForAccountStorageListener);const syncBrowserProxy=SyncBrowserProxyImpl.getInstance();const syncStatusChanged=syncStatus=>this.syncStatus_=syncStatus;syncBrowserProxy.getSyncStatus().then(syncStatusChanged);this.addWebUIListener("sync-status-changed",syncStatusChanged);const syncPrefsChanged=syncPrefs=>this.syncPrefs_=syncPrefs;this.addWebUIListener("sync-prefs-changed",syncPrefsChanged);syncBrowserProxy.sendSyncPrefsChanged();const storedAccountsChanged=accounts=>this.storedAccounts_=accounts;syncBrowserProxy.getStoredAccounts().then(storedAccountsChanged);this.addWebUIListener("stored-accounts-updated",storedAccountsChanged);afterNextRender(this,(function(){IronA11yAnnouncer.requestAvailability()}))},detached(){this.passwordManager_.removeAccountStorageOptInStateListener(assert(this.setIsOptedInForAccountStorageListener_))},computeSignedIn_(){return!!this.syncStatus_&&!!this.syncStatus_.signedIn?!this.syncStatus_.hasError:!!this.storedAccounts_&&this.storedAccounts_.length>0},computeEligibleForAccountStorage_(){return this.accountStorageFeatureEnabled_&&!!this.syncStatus_&&!this.syncStatus_.signedIn&&this.signedIn_&&(!this.syncPrefs_||!this.syncPrefs_.encryptAllData)},computeHasSavedPasswords_(){return this.savedPasswords.length>0},computeNumberOfDevicePasswords_(){return this.savedPasswords.filter((p=>p.isPresentOnDevice())).length},computeHasPasswordExceptions_(){return this.passwordExceptions.length>0},computeShouldShowBanner_(){return this.signedIn_&&this.hasSavedPasswords_&&this.hasNeverCheckedPasswords_&&!this.hasLeakedCredentials_},computeShouldShowStorageDetails_(){return this.eligibleForAccountStorage_&&this.isOptedInForAccountStorage_},computeShouldShowDevicePasswordsLink_(){return this.isOptedInForAccountStorage_&&this.numberOfDevicePasswords_>0},computeHidePasswordsLink_(){return this.eligibleForAccountStorage_||!!this.syncStatus_&&!!this.syncStatus_.signedIn&&!!this.syncPrefs_&&!!this.syncPrefs_.encryptAllData},computeHasLeakedCredentials_(){return this.leakedPasswords.length>0},computeHasNeverCheckedPasswords_(){return!this.status.elapsedTimeSinceLastCheck},onCheckPasswordsClick_(){Router.getInstance().navigateTo(routes.CHECK_PASSWORDS,new URLSearchParams("start=true"));this.passwordManager_.recordPasswordCheckReferrer(PasswordManagerProxy.PasswordCheckReferrer.PASSWORD_SETTINGS)},onDevicePasswordsLinkClicked_(){Router.getInstance().navigateTo(routes.DEVICE_PASSWORDS)},getFilteredPasswords_(filter){if(!filter){return this.savedPasswords.slice()}return this.savedPasswords.filter((p=>[p.urls.shown,p.username].some((term=>term.toLowerCase().includes(filter.toLowerCase())))))},passwordExceptionFilter_(filter){return exception=>exception.urls.shown.toLowerCase().includes(filter.toLowerCase())},onUndoKeyBinding_(event){const activeElement=getDeepActiveElement();if(!activeElement||!isEditable(activeElement)){this.passwordManager_.undoRemoveSavedPasswordOrException();this.$.passwordsListHandler.onSavedPasswordOrExceptionRemoved();event.preventDefault()}},onRemoveExceptionButtonTap_(e){const exception=e.model.item;const allExceptionIds=[];if(exception.isPresentInAccount()){allExceptionIds.push(exception.accountId)}if(exception.isPresentOnDevice()){allExceptionIds.push(exception.deviceId)}this.passwordManager_.removeExceptions(allExceptionIds)},onImportExportMenuTap_(){const menu=this.$.exportImportMenu;const target=this.$$("#exportImportMenuButton");menu.showAt(target);this.activeDialogAnchorStack_.push(target)},onImportTap_(){this.passwordManager_.importPasswords();this.$.exportImportMenu.close()},onExportTap_(){this.showPasswordsExportDialog_=true;this.$.exportImportMenu.close()},onPasswordsExportDialogClosed_(){this.showPasswordsExportDialog_=false;focusWithoutInk(assert(this.activeDialogAnchorStack_.pop()))},onOptIn_:function(){this.passwordManager_.optInForAccountStorage(true)},onOptOut_:function(){this.passwordManager_.optInForAccountStorage(false)},showImportOrExportPasswords_(){return this.hasSavedPasswords_||this.showImportPasswords_},getFirstStoredAccountEmail_(){return!!this.storedAccounts_&&this.storedAccounts_.length>0?this.storedAccounts_[0].email:""},focusConfigChanged_(newConfig,oldConfig){assert(!oldConfig);this.focusConfig.set(assert(routes.CHECK_PASSWORDS).path,(()=>{focusWithoutInk(assert(this.$$("#icon")))}))}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"password-move-multiple-passwords-to-account-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="password-move-multiple-passwords-to-account-dialog">[slot=checkbox] {
  margin-inline-start: 16px;
}

[slot=footer] {
  padding:0;
}

settings-avatar-icon {
  flex-shrink: 0;
    height: 40px;
    margin-inline-end: 16px;
    width: 40px;
}

</style>

<cr-dialog id="dialog" close-text="إغلاق" show-on-attach="">
  <div slot="title">يُرجى اختيار كلمات المرور المطلوب نقلها</div>

  <div slot="body">
    <dom-repeat id="devicePasswordList" items="[[passwordsToMove]]" class="cr-separators list-with-header">
      <template>
        <password-list-item entry="[[item]]" tabindex$="[[tabIndex]]" focus-row-index="[[index]]" first$="[[!index]]" last-focused="{{lastFocused_}}" list-blurred="{{listBlurred_}}" should-hide-more-actions-button="">
          <cr-checkbox slot="checkbox" id="checkbox" checked="true" data-id$="[[item.deviceId_]]">
          </cr-checkbox>
        </password-list-item>
      </template>
    </dom-repeat>
  </div>

  <div slot="button-container">
    <cr-button class="cancel-button" id="cancelButton" on-click="onCancelButtonClick_">
      إلغاء
    </cr-button>
    <cr-button class="action-button" id="moveButton" on-click="onMoveButtonClick_">
      نقل
    </cr-button>
  </div>
  <div slot="footer" id="footer">
    <div class="cr-row two-line ">
      <settings-avatar-icon></settings-avatar-icon>
      <div class="flex cr-padded-text">
        <div id="movingPasswordsCountLabel">
          ‏سيتم نقل كلمات المرور من جهازك إلى حسابك على Google.</div>
        <div class="secondary">[[accountEmail]]</div>
      </div>
    </div>
  </div>
</cr-dialog>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{passwordsToMove:{type:Array,value:()=>[]},accountEmail:String},wasConfirmed(){return this.$.dialog.getNative().returnValue==="success"},attached(){chrome.metricsPrivate.recordEnumerationValue("PasswordManager.AccountStorage.MoveToAccountStoreFlowOffered",MoveToAccountStoreTrigger.EXPLICITLY_TRIGGERED_FOR_MULTIPLE_PASSWORDS_IN_SETTINGS,MoveToAccountStoreTrigger.COUNT)},onMoveButtonClick_(){const checkboxes=this.$.dialog.querySelectorAll("cr-checkbox");const selectedPasswords=[];checkboxes.forEach((checkbox=>{if(checkbox.checked){selectedPasswords.push(Number(checkbox.dataset.id))}}));PasswordManagerImpl.getInstance().movePasswordsToAccount(selectedPasswords);chrome.metricsPrivate.recordSmallCount("PasswordManager.AccountStorage.MoveToAccountStorePasswordsCount",selectedPasswords.length);this.$.dialog.close()},onCancelButtonClick_(){this.$.dialog.cancel()}});// Copyright 2020 The Chromium Authors. All rights reserved.
function isEditable$1(element){const nodeName=element.nodeName.toLowerCase();return element.nodeType===Node.ELEMENT_NODE&&(nodeName==="textarea"||nodeName==="input"&&/^(?:text|search|email|number|tel|url|password)$/i.test(element.type))}Polymer({is:"passwords-device-section",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex passwords-shared" scope="passwords-device-section">settings-avatar-icon {
  flex-shrink: 0;
    height: 40px;
    margin-inline-end: 16px;
    width: 40px;
}

#manageAccountPasswordsBanner {
  border: 1px solid var(--google-grey-refresh-300);
    border-radius: 10px;
    cursor: pointer;
    margin: 10px 20px;
    padding: 0 10px;
}

@media (prefers-color-scheme: dark) {
#manageAccountPasswordsBanner {
  border: 1px solid var(--google-grey-700);
}

}

#googleGIcon {
  margin-inline-end: 16px;
}

</style>
<div id="moveMultiplePasswordsBanner" on-click="onMoveMultiplePasswordsTap_" class="cr-row two-line" hidden$="[[!movingMultiplePasswordsToAccountFeatureEnabled_]]">
  <img id="googleGIcon" alt="" src="chrome://settings/images/googleg_standard_clr_32px.svg">
  <div class="flex cr-padded-text">
    <div>[[devicePasswordsLabel_]]</div>
    <div class="secondary">‏لاستخدام كلمات المرور على كل أجهزتك، يمكنك نقل هذه الكلمات إلى حسابك على Google.</div>
  </div>
  <cr-button id="moveMultiplePasswordsButton" class="action-button cr-button-gap">
    نقل كلمات المرور
  </cr-button>
</div>
<div class="cr-row first">
  <h2 class="flex">
    كلمات المرور المحفوظة
  </h2>
</div>
<passwords-list-handler id="passwordsListHandler" allow-move-to-account-option="" should-show-storage-details="" saved-passwords="[[savedPasswords]]">
  <div slot="body" class="list-frame">
    <div class="list-item column-header" aria-hidden="true">
        كلمات المرور المخزّنة على هذا الجهاز فقط
    </div>
    <iron-list id="deviceOnlyPasswordList" preserve-focus="" items="[[getFilteredPasswords_(deviceOnlyPasswords_,filter)]]" class="cr-separators list-with-header" scroll-target="[[subpageScrollTarget]]" risk-selection="">
      <template>
        <password-list-item entry="[[item]]" tabindex$="[[tabIndex]]" focus-row-index="[[index]]" first$="[[!index]]" iron-list-tab-index="[[tabIndex]]" last-focused="{{lastFocused_}}" list-blurred="{{listBlurred_}}">
        </password-list-item>
      </template>
    </iron-list>
    <div id="noDeviceOnlyPasswordsLabel" class="list-item" hidden$="[[isNonEmpty_(deviceOnlyPasswords_)]]">
        ستظهر هنا كلمات المرور المحفوظة
    </div>
    <div class="list-item column-header" aria-hidden="true">
        ‏كلمات المرور المخزّنة على هذا الجهاز وفي حسابك على Google
    </div>
    <iron-list id="deviceAndAccountPasswordList" preserve-focus="" items="[[getFilteredPasswords_(deviceAndAccountPasswords_,filter)]]" class="cr-separators list-with-header" scroll-target="[[subpageScrollTarget]]" risk-selection="">
      <template>
        <password-list-item entry="[[item]]" tabindex$="[[tabIndex]]" focus-row-index="[[index]]" first$="[[!index]]" iron-list-tab-index="[[tabIndex]]" last-focused="{{lastFocused_}}" list-blurred="{{listBlurred_}}">
        </password-list-item>
      </template>
    </iron-list>
    <div id="noDeviceAndAccountPasswordsLabel" class="list-item" hidden$="[[isNonEmpty_(deviceAndAccountPasswords_)]]">
      ستظهر هنا كلمات المرور المحفوظة
    </div>
  </div>
</passwords-list-handler>
<div id="manageAccountPasswordsBanner" class="cr-row two-line list-item" on-click="onManageAccountPasswordsClicked_">
  <settings-avatar-icon></settings-avatar-icon>
  <div class="flex cr-padded-text">
    <div>‏يمكنك الاطّلاع على كلمات المرور المحفوظة وإدارتها في حسابك على Google.</div>
    <div class="secondary">[[accountEmail_]]</div>
  </div>
  <cr-icon-button iron-icon="cr:open-in-new"></cr-icon-button>
</div>
<cr-toast id="toast" duration="5000">
  <div>‏تم نقل كلمات المرور إلى حسابك على Google.</div>
</cr-toast>
<template is="dom-if" if="[[showMoveMultiplePasswordsDialog_]]" restamp="">
  <password-move-multiple-passwords-to-account-dialog passwords-to-move="[[allDevicePasswords_]]" account-email="[[accountEmail_]]" on-close="onMoveMultiplePasswordsDialogClose_">
  </password-move-multiple-passwords-to-account-dialog>
</template>
<!--_html_template_end_-->`,behaviors:[MergePasswordsStoreCopiesBehavior,I18nBehavior,IronA11yKeysBehavior,GlobalScrollTargetBehavior,WebUIListenerBehavior,RouteObserverBehavior],properties:{subpageRoute:{type:Object,value:routes.DEVICE_PASSWORDS},filter:{type:String,value:""},keyEventTarget:{type:Object,value:()=>document},deviceOnlyPasswords_:{type:Array,value:()=>[],computed:"computeDeviceOnlyPasswords_(savedPasswords, savedPasswords.splices)"},deviceAndAccountPasswords_:{type:Array,value:()=>[],computed:"computeDeviceAndAccountPasswords_(savedPasswords, "+"savedPasswords.splices)"},allDevicePasswords_:{type:Array,value:()=>[],computed:"computeAllDevicePasswords_(savedPasswords.splices)",observer:"onAllDevicePasswordsChanged_"},lastFocused_:Object,listBlurred_:Boolean,accountEmail_:String,isUserAllowedToAccessPage_:{type:Boolean,computed:"computeIsUserAllowedToAccessPage_(signedIn_, syncDisabled_,"+"optedInForAccountStorage_)"},signedIn_:{type:Boolean,value:null},syncDisabled_:{type:Boolean,value:null},optedInForAccountStorage_:{type:Boolean,value:null},showMoveMultiplePasswordsDialog_:Boolean,currentRoute_:{type:Object,value:null},devicePasswordsLabel_:{type:String,value:""},movingMultiplePasswordsToAccountFeatureEnabled_:{type:Boolean,value(){return loadTimeData.getBoolean("enableMovingMultiplePasswordsToAccount")}}},keyBindings:{"ctrl+z":"onUndoKeyBinding_"},accountStorageOptInStateListener_:Function,observers:["maybeRedirectToPasswordsPage_(isUserAllowedToAccessPage_, "+"currentRoute_)"],attached(){this.addListenersForAccountStorageRequirements_();this.currentRoute_=Router.getInstance().currentRoute;const extractFirstStoredAccountEmail=accounts=>{this.accountEmail_=accounts.length>0?accounts[0].email:""};SyncBrowserProxyImpl.getInstance().getStoredAccounts().then(extractFirstStoredAccountEmail);this.addWebUIListener("stored-accounts-updated",extractFirstStoredAccountEmail)},detached(){PasswordManagerImpl.getInstance().removeAccountStorageOptInStateListener(this.accountStorageOptInStateListener_)},computeAllDevicePasswords_(){return this.savedPasswords.filter((p=>p.isPresentOnDevice()))},computeDeviceOnlyPasswords_(){return this.savedPasswords.filter((p=>p.isPresentOnDevice()&&!p.isPresentInAccount()))},computeDeviceAndAccountPasswords_(){return this.savedPasswords.filter((p=>p.isPresentOnDevice()&&p.isPresentInAccount()))},computeIsUserAllowedToAccessPage_(){return(this.signedIn_===null||!!this.signedIn_)&&(this.syncDisabled_===null||!!this.syncDisabled_)&&(this.optedInForAccountStorage_===null||!!this.optedInForAccountStorage_)},async onAllDevicePasswordsChanged_(){this.devicePasswordsLabel_=await PluralStringProxyImpl.getInstance().getPluralString("movePasswordsToAccount",this.allDevicePasswords_.length)},currentRouteChanged(route){this.currentRoute_=route||null},addListenersForAccountStorageRequirements_(){const setSyncDisabled=syncStatus=>{this.syncDisabled_=!syncStatus.signedIn};SyncBrowserProxyImpl.getInstance().getSyncStatus().then(setSyncDisabled);this.addWebUIListener("sync-status-changed",setSyncDisabled);const setSignedIn=storedAccounts=>{this.signedIn_=storedAccounts.length>0};SyncBrowserProxyImpl.getInstance().getStoredAccounts().then(setSignedIn);this.addWebUIListener("stored-accounts-updated",setSignedIn);const setOptedIn=optedInForAccountStorage=>{this.optedInForAccountStorage_=optedInForAccountStorage};PasswordManagerImpl.getInstance().isOptedInForAccountStorage().then(setOptedIn);PasswordManagerImpl.getInstance().addAccountStorageOptInStateListener(setOptedIn);this.accountStorageOptInStateListener_=setOptedIn},isNonEmpty_(passwords){return passwords.length>0},getFilteredPasswords_(passwords,filter){if(!filter){return passwords.slice()}return passwords.filter((p=>[p.urls.shown,p.username].some((term=>term.toLowerCase().includes(filter.toLowerCase())))))},onUndoKeyBinding_(event){const activeElement=getDeepActiveElement();if(!activeElement||!isEditable$1(activeElement)){PasswordManagerImpl.getInstance().undoRemoveSavedPasswordOrException();this.$.passwordsListHandler.onSavedPasswordOrExceptionRemoved();event.preventDefault()}},onManageAccountPasswordsClicked_(){OpenWindowProxyImpl.getInstance().openURL(loadTimeData.getString("googlePasswordManagerUrl"))},onMoveMultiplePasswordsTap_(){this.showMoveMultiplePasswordsDialog_=true},onMoveMultiplePasswordsDialogClose_(){if(this.$$("password-move-multiple-passwords-to-account-dialog").wasConfirmed()){this.$.toast.show()}this.showMoveMultiplePasswordsDialog_=false},maybeRedirectToPasswordsPage_(){if(!this.isUserAllowedToAccessPage_&&this.currentRoute_===routes.DEVICE_PASSWORDS){Router.getInstance().navigateTo(routes.PASSWORDS)}}});// Copyright 2016 The Chromium Authors. All rights reserved.
const NICKNAME_INVALID_REGEX=new RegExp(".*\\d+.*");Polymer({is:"settings-credit-card-edit-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared md-select" scope="settings-credit-card-edit-dialog">cr-input {
  --cr-input-error-display: block;
        margin-bottom: 0;
        width: var(--settings-input-max-width);
}

div[slot='button-container'] {
  padding-top: 0;
}

.md-select + .md-select {
  margin-inline-start: 8px;
}

#month {
  width: 70px;
}

#saved-to-this-device-only-label {
  margin-bottom: 26px;
        margin-top: 0;
}

#year {
  width: 100px;
}

#nicknameInput {
  --cr-input-width: var(--settings-input-max-width);
        width: fit-content;
}

#charCount {
  font-size: var(--cr-form-field-label-font-size);
        line-height: var(--cr-form-field-label-line-height);
        padding-inline-start: 8px;
}

#nicknameInput:not(:focus-within) #charCount {
  display: none;
}

#expired-error {
  display: block;
        font-size: var(--cr-form-field-label-font-size);
        height: var(--cr-form-field-label-height);
        line-height: var(--cr-form-field-label-line-height);
        margin: 8px 0;
        visibility: hidden;
}

:host([expired_]) #expired-error {
  visibility: visible;
}

#expired-error, :host([expired_]) #expiration {
  color: var(--google-red-600);
}

@media (prefers-color-scheme: dark) {
#expired-error, :host([expired_]) #expiration {
  color: var(--google-red-refresh-300);
}

}

</style>
    <cr-dialog id="dialog" close-text="إغلاق">
      <div slot="title">[[title_]]</div>
      <div slot="body">
        <cr-input id="numberInput" label="رقم البطاقة" value="{{creditCard.cardNumber}}" autofocus="">
        </cr-input>
        <!-- aria-hidden for creditCardExpiration label since
          creditCardExpirationMonth and creditCardExpirationYear provide
          sufficient labeling. -->
        <label id="expiration" class="cr-form-field-label" aria-hidden="true">
          تاريخ انتهاء الصلاحية
        </label>
        <select class="md-select" id="month" value="[[expirationMonth_]]" on-change="onMonthChange_" aria-label="شهر انتهاء الصلاحية" aria-invalid$="[[getExpirationAriaInvalid_(expired_)]]">
          <template is="dom-repeat" items="[[monthList_]]">
            <option>[[item]]</option>
          </template>
        </select>
        <select class="md-select" id="year" value="[[expirationYear_]]" on-change="onYearChange_" aria-label="سنة انتهاء الصلاحية" aria-invalid$="[[getExpirationAriaInvalid_(expired_)]]">
          <template is="dom-repeat" items="[[yearList_]]">
            <option>[[item]]</option>
          </template>
        </select>
        <div id="expired-error">انتهت صلاحية بطاقتك</div>
        <!-- Place cardholder name field and nickname field after expiration.-->
        <cr-input id="nameInput" label="الاسم كما على البطاقة" value="{{creditCard.name}}" spellcheck="false">
        </cr-input>
        <cr-input id="nicknameInput" label="لقب البطاقة" value="{{creditCard.nickname}}" spellcheck="false" maxlength="25" on-input="validateNickname_" invalid="[[nicknameInvalid_]]" error-message="يجب ألا يضم اللقب أرقامًا">
            <div id="charCount" slot="suffix">
              [[computeNicknameCharCount_(creditCard.nickname)]]/25
            </div>
        </cr-input>
        <div id="saved-to-this-device-only-label">
          سيتم حفظ هذه البطاقة في هذا الجهاز فقط
        </div>
      </div>
      <div slot="button-container">
        <cr-button id="cancelButton" class="cancel-button" on-click="onCancelButtonTap_">إلغاء</cr-button>
        <cr-button id="saveButton" class="action-button" on-click="onSaveButtonTap_" disabled="[[!saveEnabled_(nicknameInvalid_, creditCard.*,
                expired_)]]">
          حفظ
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,properties:{creditCard:Object,title_:String,monthList_:{type:Array,value:["01","02","03","04","05","06","07","08","09","10","11","12"]},yearList_:Array,expirationYear_:String,expirationMonth_:String,nicknameInvalid_:{type:Boolean,value:false},expired_:{type:Boolean,computed:"computeExpired_(expirationMonth_, expirationYear_)",reflectToAttribute:true,observer:"onExpiredChanged_"}},behaviors:[I18nBehavior],computeExpired_(){if(this.expirationYear_===undefined||this.expirationMonth_===undefined){return false}const now=new Date;const expirationYear=parseInt(this.expirationYear_,10);const expirationMonth=parseInt(this.expirationMonth_,10);return expirationYear<now.getFullYear()||expirationYear===now.getFullYear()&&expirationMonth<=now.getMonth()},attached(){this.title_=this.i18n(this.creditCard.guid?"editCreditCardTitle":"addCreditCardTitle");if(this.creditCard.expirationMonth.length===1){this.creditCard.expirationMonth="0"+this.creditCard.expirationMonth}const date=new Date;let firstYear=date.getFullYear();let lastYear=firstYear+19;let selectedYear=parseInt(this.creditCard.expirationYear,10);if(!selectedYear){selectedYear=firstYear}else if(selectedYear<firstYear){firstYear=selectedYear}else if(selectedYear>lastYear){lastYear=selectedYear}const yearList=[];for(let i=firstYear;i<=lastYear;++i){yearList.push(i.toString())}this.yearList_=yearList;this.async((()=>{this.expirationYear_=selectedYear.toString();this.expirationMonth_=this.creditCard.expirationMonth;this.$.dialog.showModal()}))},close(){this.$.dialog.close()},onCancelButtonTap_(){this.$.dialog.cancel()},onSaveButtonTap_(){if(!this.saveEnabled_()){return}this.creditCard.expirationYear=this.expirationYear_;this.creditCard.expirationMonth=this.expirationMonth_;this.trimCreditCard_();this.fire("save-credit-card",this.creditCard);this.close()},onMonthChange_(){this.expirationMonth_=this.monthList_[this.$.month.selectedIndex]},onYearChange_(){this.expirationYear_=this.yearList_[this.$.year.selectedIndex]},saveEnabled_(){return(this.creditCard.name&&this.creditCard.name.trim()||this.creditCard.cardNumber&&this.creditCard.cardNumber.trim())&&!this.expired_&&!this.nicknameInvalid_},onExpiredChanged_(){const ERROR_ID="expired-error";const errorElement=this.$$(`#${ERROR_ID}`);if(this.expired_){errorElement.setAttribute("role","alert");this.$$(`#month`).setAttribute("aria-errormessage",ERROR_ID);this.$$(`#year`).setAttribute("aria-errormessage",ERROR_ID)}else{errorElement.removeAttribute("role");this.$$(`#month`).removeAttribute("aria-errormessage");this.$$(`#year`).removeAttribute("aria-errormessage")}},validateNickname_(){this.nicknameInvalid_=NICKNAME_INVALID_REGEX.test(this.creditCard.nickname)},computeNicknameCharCount_(nickname){return(nickname||"").length},getExpirationAriaInvalid_(){return this.expired_?"true":"false"},trimCreditCard_(){if(this.creditCard.name){this.creditCard.name=this.creditCard.name.trim()}if(this.creditCard.cardNumber){this.creditCard.cardNumber=this.creditCard.cardNumber.trim()}if(this.creditCard.nickname){this.creditCard.nickname=this.creditCard.nickname.trim()}}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({is:"settings-credit-card-list-entry",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared passwords-shared" scope="settings-credit-card-list-entry">.expiration-column {
  align-items: center;
        display: flex;
        flex: 1;
}

#creditCardExpiration {
  flex: 1;
}

.payments-label {
  color: var(--cr-secondary-text-color);
        margin-inline-start: 16px;
}

</style>
    <div class="list-item">
      <div class="type-column">
        <span id="creditCardLabel">[[creditCard.metadata.summaryLabel]]</span>
        <span class="payments-label" hidden$="[[creditCard.metadata.isLocal]]">
          <span hidden$="[[creditCard.metadata.isCached]]">
            Google Pay
          </span>
          <span hidden$="[[!creditCard.metadata.isCached]]">
            ‏Google Pay (تم النسخ إلى Chrome)
          </span>
        </span>
      </div>
      <div class="expiration-column">
        <div id="creditCardExpiration">
            [[creditCard.expirationMonth]]/[[creditCard.expirationYear]]
        </div>
        <template is="dom-if" if="[[showDots_(creditCard.metadata)]]">
          <cr-icon-button class="icon-more-vert" id="creditCardMenu" title="مزيد من الإجراءات" on-click="onDotsMenuClick_">
          </cr-icon-button>
        </template>
        <template is="dom-if" if="[[!showDots_(creditCard.metadata)]]">
          <cr-icon-button class="icon-external" id="remoteCreditCardLink" title="‏طُرق الدفع المُستخدَمة في Google Pay" role="link" on-click="onRemoteEditClick_"></cr-icon-button>
        </template>
      </div>
    </div>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{creditCard:Object},onDotsMenuClick_(){this.fire("dots-card-menu-click",{creditCard:this.creditCard,anchorElement:this.$$("#creditCardMenu")})},onRemoteEditClick_(){this.fire("remote-card-menu-click")},showDots_(){return!!(this.creditCard.metadata.isLocal||this.creditCard.metadata.isCached)}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-upi-id-list-entry",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared passwords-shared" scope="settings-upi-id-list-entry">.expiration-column {
  align-items: center;
        display: flex;
        flex: 1;
}

#upiIdExpiration {
  flex: 1;
}

.payments-label {
  color: var(--cr-secondary-text-color);
        margin-inline-start: 16px;
}

</style>
    <div class="list-item">
      <div class="type-column">
        <span id="upiIdLabel">[[upiId]]</span>
        <span class="payments-label">‏معرّف واجهة الدفعات الموحّدة (UPI)</span>
      </div>
      <div class="expiration-column">
        <div id="upiIdExpiration">
          مطلقًا
        </div>
        <!-- TODO(crbug.com/986289) Implement button for deleting a row. -->
      </div>
    </div>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{upiId:String}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-payments-list",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared passwords-shared" scope="settings-payments-list">.expiration-column {
  align-items: center;
        display: flex;
        flex: 1;
}

.list-separator {
  border-top: var(--cr-separator-line);
        width: 100%;
}

</style>
    <div id="creditCardsHeading" class="list-item column-header" hidden$="[[
          !showAnyPaymentMethods_(creditCards, upiIds, enableUpiIds_)]]">
      <div class="type-column">النوع</div>
      <div class="expiration-column">تاريخ انتهاء الصلاحية</div>
    </div>
    <div class="vertical-list list-with-header">
      <template is="dom-repeat" items="[[creditCards]]">
        <settings-credit-card-list-entry credit-card="[[item]]">
        </settings-credit-card-list-entry>
      </template>
    </div>
    <template is="dom-if" if="[[
          showCreditCardUpiSeparator_(creditCards, upiIds, enableUpiIds_)]]">
      <div class="list-separator"></div>
    </template>
    <template is="dom-if" if="[[showUpiIds_(upiIds, enableUpiIds_)]]">
      <div class="vertical-list list-with-header">
        <template is="dom-repeat" items="[[upiIds]]">
          <settings-upi-id-list-entry upi-id="[[item]]">
          </settings-upi-id-list-entry>
        </template>
      </div>
    </template>
    <div id="noPaymentMethodsLabel" class="list-item" hidden$="[[
          showAnyPaymentMethods_(creditCards, upiIds, enableUpiIds_)]]">
      ستظهر هنا طرق الدفع المحفوظة
    </div>
<!--_html_template_end_-->`,properties:{creditCards:Array,upiIds:Array,enableUpiIds_:{type:Boolean,value(){return loadTimeData.getBoolean("showUpiIdSettings")}}},hasSome_(list){return!!(list&&list.length)},showCreditCards_(){return this.hasSome_(this.creditCards)},showCreditCardUpiSeparator_(){return this.showCreditCards_()&&this.showUpiIds_()},showUpiIds_(){return this.enableUpiIds_&&this.hasSome_(this.upiIds)},showAnyPaymentMethods_(){return this.showCreditCards_()||this.showUpiIds_()}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style cr-input-style cr-shared-style" scope="settings-textarea">textarea {
  display: block;
        resize: none;
}

#input-container {
  background-color: var(--cr-input-background-color);
}

#underline {
  position: static;
}

</style>
    <div id="label" class="cr-form-field-label" hidden="[[!label]]">
      [[label]]
    </div>
    <div id="input-container">
      <!-- The textarea is limited to |rows| height. If the content exceeds the
           bounds, it scrolls by default. No space or comments are allowed
           before the closing tag. -->
      <textarea id="input" autofocus="[[autofocus]]" rows="[[rows]]" value="{{value::input}}" aria-label$="[[label]]" on-focus="onInputFocusChange_" on-blur="onInputFocusChange_" on-change="onInputChange_" disabled="[[disabled]]"></textarea>
      <div id="underline"></div>
    </div>
<!--_html_template_end_-->`,is:"settings-textarea",properties:{autofocus:{type:Boolean,value:false,reflectToAttribute:true},disabled:{type:Boolean,value:false,reflectToAttribute:true,observer:"onDisabledChanged_"},rows:{type:Number,value:3,reflectToAttribute:true},label:{type:String,value:""},value:{type:String,value:"",notify:true}},onInputChange_(e){this.fire("change",{sourceEvent:e})},onInputFocusChange_(){if(this.shadowRoot.activeElement===this.$.input){this.setAttribute("focused_","")}else{this.removeAttribute("focused_")}},onDisabledChanged_(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"settings-address-edit-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared md-select" scope="settings-address-edit-dialog">:host {
  white-space: nowrap;
}

.address-row {
  display: flex;
}

.address-column {
  margin-inline-end: 16px;
        width: calc((var(--settings-input-max-width) - 16px) / 2);
}

#select-row {
  display: block;
        outline: none;
        
        transform: translate3d(0, 0, 0);
}

.md-select {
  --md-select-width: var(--settings-input-max-width);
}

.long {
  width: var(--settings-input-max-width);
}

cr-input {
  --cr-input-error-display: none;
}

cr-input:not(.last-row), settings-textarea, .md-select {
  margin-bottom: var(--cr-form-field-bottom-spacing);
}

#dialog::part(body-container) {
  max-height: 450px;
}

@media all and (max-height: 714px) {
#dialog::part(body-container) {
  max-height: 270px;
}

}

</style>
    <cr-dialog id="dialog" close-text="إغلاق">
      <div slot="title">[[title_]]</div>
      <div slot="body">
        <div id="select-row" class="address-row" tabindex="0" on-focus="onCountryRowFocus_" on-pointerdown="onCountryRowPointerDown_">
          <label id="select-label" class="cr-form-field-label">
            البلد/المنطقة
          </label>
          <select class="md-select" aria-labelledby="select-label" value="[[countryCode_]]" on-change="onCountryChange_" tabindex="-1" autofocus="">
            <option value=""></option>
            <template is="dom-repeat" items="[[countries_]]">
              <option value="[[getCode_(item)]]" disabled="[[isDivision_(item)]]">
                [[getName_(item)]]
              </option>
            </template>
          </select>
        </div>
        <template is="dom-repeat" items="[[addressWrapper_]]">
          <div class="address-row">
            <template is="dom-repeat" items="[[item]]">
              <template is="dom-if" if="[[item.isTextArea]]">
                <settings-textarea label="[[item.component.fieldName]]" value="{{item.value}}" on-value-changed="updateCanSave_" class$="address-column [[long_(item)]]" spellcheck="false" maxlength="1000">
                </settings-textarea>
              </template>
              <template is="dom-if" if="[[!item.isTextArea]]">
                <cr-input type="text" label="[[item.component.fieldName]]" value="{{item.value}}" spellcheck="false" on-value-changed="updateCanSave_" maxlength="1000" class$="address-column [[long_(item)]]">
                </cr-input>
              </template>
            </template>
          </div>
        </template>
        <div class="address-row">
          <cr-input id="phoneInput" type="text" label="هاتف" class="address-column last-row" on-value-changed="updateCanSave_" value="{{phoneNumber_}}" spellcheck="false" maxlength="1000">
          </cr-input>
          <cr-input id="emailInput" type="text" label="البريد الإلكتروني" on-value-changed="updateCanSave_" value="{{email_}}" class="address-column long last-row" spellcheck="false" maxlength="1000">
          </cr-input>
        </div>
      </div>
      <div slot="button-container">
        <cr-button id="cancelButton" class="cancel-button" on-click="onCancelTap_">
          إلغاء
        </cr-button>
        <cr-button id="saveButton" class="action-button" disabled="[[!canSave_]]" on-click="onSaveButtonTap_">
          حفظ
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{address:Object,title_:String,countries_:Array,countryCode_:{type:String,observer:"onUpdateCountryCode_"},addressWrapper_:Object,phoneNumber_:String,email_:String,canSave_:Boolean},attached(){this.countryInfo=CountryDetailManagerImpl.getInstance();this.countryInfo.getCountryList().then((countryList=>{this.countries_=countryList;this.title_=this.i18n(this.address.guid?"editAddressTitle":"addAddressTitle");this.phoneNumber_=this.address.phoneNumbers?this.address.phoneNumbers[0]:"";this.email_=this.address.emailAddresses?this.address.emailAddresses[0]:"";this.async((()=>{if(this.countryCode_===this.address.countryCode){this.updateAddressWrapper_()}else{this.countryCode_=this.address.countryCode}}))}))},long_(setting){return setting.component.isLongField?"long":""},updateAddressWrapper_(){const countryCode=this.countryCode_||this.countries_[0].countryCode;this.countryInfo.getAddressFormat(countryCode).then((format=>{this.addressWrapper_=format.components.map((component=>component.row.map((c=>new AddressComponentUI(this.address,c)))));flush();this.updateCanSave_();this.fire("on-update-address-wrapper");const dialog=this.$.dialog;if(!dialog.open){dialog.showModal()}}))},updateCanSave_(){const inputs=this.$.dialog.querySelectorAll(".address-column, select");for(let i=0;i<inputs.length;++i){if(inputs[i].value){this.canSave_=true;this.fire("on-update-can-save");return}}this.canSave_=false;this.fire("on-update-can-save")},getCode_(country){return country.countryCode||"SPACER"},getName_(country){return country.name||"------"},isDivision_(country){return!country.countryCode},onCancelTap_(){this.$.dialog.cancel()},onSaveButtonTap_(){if(!this.canSave_){return}if(!this.address.countryCode){this.address.countryCode=this.countries_[0].countryCode}this.address.phoneNumbers=this.phoneNumber_?[this.phoneNumber_]:[];this.address.emailAddresses=this.email_?[this.email_]:[];this.fire("save-address",this.address);this.$.dialog.close()},onUpdateCountryCode_(countryCode){this.address.countryCode=countryCode;this.updateAddressWrapper_()},onCountryChange_(){const countrySelect=this.$$("select");this.countryCode_=countrySelect.value},onCountryRowFocus_(){const countrySelect=this.$$("select");countrySelect.focus()},onCountryRowPointerDown_(e){if(e.path[0].tagName!=="SELECT"){e.preventDefault()}}});class AddressComponentUI{constructor(address,component){Object.defineProperty(this,"value",{get(){return this.getValue_()},set(newValue){this.setValue_(newValue)}});this.address_=address;this.component=component;this.isTextArea=component.field===chrome.autofillPrivate.AddressField.ADDRESS_LINES}getValue_(){const address=this.address_;switch(this.component.field){case chrome.autofillPrivate.AddressField.FULL_NAME:return address.fullNames?address.fullNames[0]:undefined;case chrome.autofillPrivate.AddressField.COMPANY_NAME:return address.companyName;case chrome.autofillPrivate.AddressField.ADDRESS_LINES:return address.addressLines;case chrome.autofillPrivate.AddressField.ADDRESS_LEVEL_1:return address.addressLevel1;case chrome.autofillPrivate.AddressField.ADDRESS_LEVEL_2:return address.addressLevel2;case chrome.autofillPrivate.AddressField.ADDRESS_LEVEL_3:return address.addressLevel3;case chrome.autofillPrivate.AddressField.POSTAL_CODE:return address.postalCode;case chrome.autofillPrivate.AddressField.SORTING_CODE:return address.sortingCode;case chrome.autofillPrivate.AddressField.COUNTRY_CODE:return address.countryCode;default:assertNotReached()}}setValue_(value){const address=this.address_;switch(this.component.field){case chrome.autofillPrivate.AddressField.FULL_NAME:address.fullNames=[value];break;case chrome.autofillPrivate.AddressField.COMPANY_NAME:address.companyName=value;break;case chrome.autofillPrivate.AddressField.ADDRESS_LINES:address.addressLines=value;break;case chrome.autofillPrivate.AddressField.ADDRESS_LEVEL_1:address.addressLevel1=value;break;case chrome.autofillPrivate.AddressField.ADDRESS_LEVEL_2:address.addressLevel2=value;break;case chrome.autofillPrivate.AddressField.ADDRESS_LEVEL_3:address.addressLevel3=value;break;case chrome.autofillPrivate.AddressField.POSTAL_CODE:address.postalCode=value;break;case chrome.autofillPrivate.AddressField.SORTING_CODE:address.sortingCode=value;break;case chrome.autofillPrivate.AddressField.COUNTRY_CODE:address.countryCode=value;break;default:assertNotReached()}}}class CountryDetailManagerImpl{getCountryList(){return new Promise((function(callback){chrome.autofillPrivate.getCountryList(callback)}))}getAddressFormat(countryCode){return new Promise((function(callback){chrome.autofillPrivate.getAddressComponents(countryCode,callback)}))}}addSingletonGetter(CountryDetailManagerImpl);// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-address-remove-confirmation-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><cr-dialog show-on-attach="" id="dialog" close-text="إغلاق">
  <div slot="title">إزالة العنوان</div>
  <div slot="body">هل تريد فعلاً إزالة هذا العنوان؟</div>
  <div slot="button-container">
    <cr-button class="cancel-button" on-click="onCancelClick" id="cancel">
      إلغاء
    </cr-button>
    <cr-button class="action-button" on-click="onRemoveClick" id="remove">
      إزالة
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`,wasConfirmed(){return this.$.dialog.getNative().returnValue==="success"},onRemoveClick(){this.$.dialog.close()},onCancelClick(){this.$.dialog.cancel()}});// Copyright 2016 The Chromium Authors. All rights reserved.
class AutofillManager{setPersonalDataManagerListener(listener){}removePersonalDataManagerListener(listener){}getAddressList(callback){}saveAddress(address){}removeAddress(guid){}}class AutofillManagerImpl{setPersonalDataManagerListener(listener){chrome.autofillPrivate.onPersonalDataChanged.addListener(listener)}removePersonalDataManagerListener(listener){chrome.autofillPrivate.onPersonalDataChanged.removeListener(listener)}getAddressList(callback){chrome.autofillPrivate.getAddressList(callback)}saveAddress(address){chrome.autofillPrivate.saveAddress(address)}removeAddress(guid){chrome.autofillPrivate.removeEntry(assert(guid))}}addSingletonGetter(AutofillManagerImpl);Polymer({is:"settings-autofill-section",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared passwords-shared iron-flex" scope="settings-autofill-section">#addressList .start {
  display: flex;
        overflow: hidden;
}

#addressSummary {
  display: flex;
        flex: 1;
        overflow: hidden;
}

</style>
    <settings-toggle-button id="autofillProfileToggle" aria-label="العناوين والمزيد" no-extension-indicator="" label="حفظ العناوين وملؤها" sub-label="تتضمّن معلومات مثل أرقام الهواتف وعناوين البريد الإلكتروني وعناوين الشحن." pref="{{prefs.autofill.profile_enabled}}">
    </settings-toggle-button>
    <template is="dom-if" if="[[prefs.autofill.profile_enabled.extensionId]]">
      <div class="cr-row continuation">
        <extension-controlled-indicator class="flex" id="autofillExtensionIndicator" extension-id="[[prefs.autofill.profile_enabled.extensionId]]" extension-name="[[prefs.autofill.profile_enabled.controlledByName]]" extension-can-be-disabled="[[
                prefs.autofill.profile_enabled.extensionCanBeDisabled]]">
        </extension-controlled-indicator>
      </div>
    </template>
    <div class="cr-row continuation">
      <h2 class="flex">العناوين</h2>
      <cr-button id="addAddress" class="header-aligned-button" on-click="onAddAddressTap_" hidden$="[[!prefs.autofill.profile_enabled.value]]">
        إضافة
      </cr-button>
    </div>
    <div class="list-frame">
      <div id="addressList" class="vertical-list">
        <template is="dom-repeat" items="[[addresses]]">
          <div class="list-item">
            <div class="start">
              <span id="addressSummary">
                <span class="ellipses">
                  [[item.metadata.summaryLabel]]
                </span>
                <span class="ellipses">
                  [[item.metadata.summarySublabel]]
                </span>
              </span>
            </div>
            <template is="dom-if" if="[[item.metadata.isLocal]]">
              <cr-icon-button class="icon-more-vert" id="addressMenu" on-click="onAddressMenuTap_" title="مزيد من الإجراءات">
              </cr-icon-button>
            </template>
            <template is="dom-if" if="[[!item.metadata.isLocal]]">
              <cr-icon-button class="icon-external" on-click="onRemoteEditAddressTap_"></cr-icon-button>
            </template>
          </div>
        </template>
      </div>
      <div id="noAddressesLabel" class="list-item" hidden$="[[hasSome_(addresses)]]">
        ستظهر هنا العناوين المحفوظة
      </div>
    </div>
    <cr-action-menu id="addressSharedMenu" role-description="قائمة">
      <button id="menuEditAddress" class="dropdown-item" on-click="onMenuEditAddressTap_">تعديل</button>
      <button id="menuRemoveAddress" class="dropdown-item" on-click="onMenuRemoveAddressTap_">إزالة</button>
    </cr-action-menu>
    <template is="dom-if" if="[[showAddressDialog_]]" restamp="">
      <settings-address-edit-dialog address="[[activeAddress]]" on-close="onAddressDialogClose_">
      </settings-address-edit-dialog>
    </template>
    <template is="dom-if" if="[[showAddressRemoveConfirmationDialog_]]" restamp="">
      <settings-address-remove-confirmation-dialog on-close="onAddressRemoveConfirmationDialogClose_">
      </settings-address-remove-confirmation-dialog>
    </template>
<!--_html_template_end_-->`,properties:{addresses:Array,activeAddress:Object,showAddressDialog_:Boolean,showAddressRemoveConfirmationDialog_:Boolean},listeners:{"save-address":"saveAddress_"},activeDialogAnchor_:null,autofillManager_:null,setPersonalDataListener_:null,attached(){const setAddressesListener=addressList=>{this.addresses=addressList};const setPersonalDataListener=(addressList,cardList)=>{this.addresses=addressList};this.setPersonalDataListener_=setPersonalDataListener;this.autofillManager_=AutofillManagerImpl.getInstance();this.autofillManager_.getAddressList(setAddressesListener);this.autofillManager_.setPersonalDataManagerListener(setPersonalDataListener);chrome.metricsPrivate.recordUserAction("AutofillAddressesViewed")},detached(){this.autofillManager_.removePersonalDataManagerListener(this.setPersonalDataListener_)},onAddressMenuTap_(e){const menuEvent=e;const item=menuEvent.model.item;this.activeAddress=Object.assign({},item);const dotsButton=e.target;this.$.addressSharedMenu.showAt(dotsButton);this.activeDialogAnchor_=dotsButton},onAddAddressTap_(e){e.preventDefault();this.activeAddress={};this.showAddressDialog_=true;this.activeDialogAnchor_=this.$.addAddress},onAddressDialogClose_(){this.showAddressDialog_=false;focusWithoutInk(assert(this.activeDialogAnchor_));this.activeDialogAnchor_=null},onMenuEditAddressTap_(e){e.preventDefault();this.showAddressDialog_=true;this.$.addressSharedMenu.close()},onRemoteEditAddressTap_(){window.open(loadTimeData.getString("manageAddressesUrl"))},onAddressRemoveConfirmationDialogClose_:function(){if(this.$$("settings-address-remove-confirmation-dialog").wasConfirmed()){this.autofillManager_.removeAddress(this.activeAddress.guid)}this.showAddressRemoveConfirmationDialog_=false;focusWithoutInk(assert(this.activeDialogAnchor_));this.activeDialogAnchor_=null},onMenuRemoveAddressTap_(){this.showAddressRemoveConfirmationDialog_=true;this.$.addressSharedMenu.close()},hasSome_(list){return!!(list&&list.length)},saveAddress_(event){this.autofillManager_.saveAddress(event.detail)}});// Copyright 2018 The Chromium Authors. All rights reserved.
class PaymentsManager{setPersonalDataManagerListener(listener){}removePersonalDataManagerListener(listener){}getCreditCardList(callback){}removeCreditCard(guid){}clearCachedCreditCard(guid){}saveCreditCard(creditCard){}migrateCreditCards(){}logServerCardLinkClicked(){}setCreditCardFIDOAuthEnabledState(enabled){}getUpiIdList(callback){}}class PaymentsManagerImpl{setPersonalDataManagerListener(listener){chrome.autofillPrivate.onPersonalDataChanged.addListener(listener)}removePersonalDataManagerListener(listener){chrome.autofillPrivate.onPersonalDataChanged.removeListener(listener)}getCreditCardList(callback){chrome.autofillPrivate.getCreditCardList(callback)}removeCreditCard(guid){chrome.autofillPrivate.removeEntry(assert(guid))}clearCachedCreditCard(guid){chrome.autofillPrivate.maskCreditCard(assert(guid))}saveCreditCard(creditCard){chrome.autofillPrivate.saveCreditCard(creditCard)}migrateCreditCards(){chrome.autofillPrivate.migrateCreditCards()}logServerCardLinkClicked(){chrome.autofillPrivate.logServerCardLinkClicked()}setCreditCardFIDOAuthEnabledState(enabled){chrome.autofillPrivate.setCreditCardFIDOAuthEnabledState(enabled)}getUpiIdList(callback){chrome.autofillPrivate.getUpiIdList(callback)}}addSingletonGetter(PaymentsManagerImpl);Polymer({is:"settings-payments-section",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex passwords-shared" scope="settings-payments-section">.expiration-column {
  align-items: center;
        display: flex;
        flex: 1;
}

#migrateCreditCards {
  border-bottom: var(--cr-separator-line);
        border-top: none;
}

#migrateCreditCardsButton {
  margin: 0 auto;
}

</style>
    <settings-toggle-button id="autofillCreditCardToggle" aria-label="طرق الدفع" no-extension-indicator="" label="حفظ طرق الدفع وملؤها" sub-label="تعبئة نماذج الدفع باستخدام طرق الدفع المحفوظة" pref="{{prefs.autofill.credit_card_enabled}}">
    </settings-toggle-button>
    <settings-toggle-button id="canMakePaymentToggle" aria-label="السماح للمواقع الإلكترونية بالتحقُّق ممّا إذا كانت لديك طرق دفع محفوظة أم لا" label="السماح للمواقع الإلكترونية بالتحقُّق ممّا إذا كانت لديك طرق دفع محفوظة أم لا" pref="{{prefs.payments.can_make_payment_enabled}}" on-settings-boolean-control-change="onCanMakePaymentChange_">
    </settings-toggle-button>
    <template is="dom-if" if="[[shouldShowFidoToggle_(
            prefs.autofill.credit_card_enabled.value,
            userIsFidoVerifiable_)]]">
      <settings-toggle-button id="autofillCreditCardFIDOAuthToggle" aria-label="طرق الدفع" no-extension-indicator="" label="Windows Hello" sub-label="‏استخدام Windows Hello للتأكد من البطاقات بشكلٍ أسرع" pref="{{prefs.autofill.credit_card_fido_auth_enabled}}" on-change="setFIDOAuthenticationEnabledState_">
      </settings-toggle-button>
    </template>
    <template is="dom-if" if="[[prefs.autofill.credit_card_enabled.extensionId]]">
      <div class="cr-row continuation">
        <extension-controlled-indicator class="flex" id="autofillExtensionIndicator" extension-id="[[prefs.autofill.credit_card_enabled.extensionId]]" extension-name="[[
                prefs.autofill.credit_card_enabled.controlledByName]]" extension-can-be-disabled="[[
                prefs.autofill.credit_card_enabled.extensionCanBeDisabled]]">
        </extension-controlled-indicator>
      </div>
    </template>

    <div id="manageLink" class="cr-row first">
      <!-- This span lays out the link correctly, relative to the text. -->
      <div class="cr-padded-text">‏لإضافة طرق الدفع في Google Pay أو إدارتها، يُرجى الانتقال إلى <a href="https://pay.google.com/payments/home?utm_source=chrome&utm_medium=settings&utm_campaign=chrome-payment#paymentMethods" target="_blank">حسابك على Google</a></div>
    </div>

    <div class="cr-row continuation">
      <h2 class="flex">طرق الدفع</h2>
      <cr-button id="addCreditCard" class="header-aligned-button" on-click="onAddCreditCardTap_" hidden$="[[!prefs.autofill.credit_card_enabled.value]]">
        إضافة
      </cr-button>
    </div>
    <cr-link-row id="migrateCreditCards" hidden$="[[!checkIfMigratable_(creditCards,
            prefs.autofill.credit_card_enabled.value)]]" on-click="onMigrateCreditCardsClick_" label="‏حفظ البطاقات في حسابك على Google" sub-label="[[migratableCreditCardsInfo_]]"></cr-link-row>
    <settings-payments-list id="paymentsList" class="list-frame" credit-cards="[[creditCards]]" upi-ids="[[upiIds]]">
    </settings-payments-list>

    <cr-action-menu id="creditCardSharedMenu" role-description="قائمة">
      <button id="menuEditCreditCard" class="dropdown-item" on-click="onMenuEditCreditCardTap_">تعديل</button>
      <button id="menuRemoveCreditCard" class="dropdown-item" hidden$="[[!activeCreditCard.metadata.isLocal]]" on-click="onMenuRemoveCreditCardTap_">إزالة</button>
      <button id="menuClearCreditCard" class="dropdown-item" on-click="onMenuClearCreditCardTap_" hidden$="[[!activeCreditCard.metadata.isCached]]">
        محو النسخة
      </button>
    </cr-action-menu>
    <template is="dom-if" if="[[showCreditCardDialog_]]" restamp="">
      <settings-credit-card-edit-dialog credit-card="[[activeCreditCard]]" on-close="onCreditCardDialogClose_">
      </settings-credit-card-edit-dialog>
    </template>
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior,I18nBehavior],properties:{creditCards:{type:Array,value:()=>[]},upiIds:{type:Array,value:()=>[]},userIsFidoVerifiable_:{type:Boolean,value(){return loadTimeData.getBoolean("fidoAuthenticationAvailableForAutofill")}},activeCreditCard:Object,showCreditCardDialog_:Boolean,migratableCreditCardsInfo_:String,migrationEnabled_:{type:Boolean,value(){return loadTimeData.getBoolean("migrationEnabled")},readOnly:true}},listeners:{"save-credit-card":"saveCreditCard_","dots-card-menu-click":"onCreditCardDotsMenuTap_","remote-card-menu-click":"onRemoteEditCreditCardTap_"},activeDialogAnchor_:null,PaymentsManager_:null,setPersonalDataListener_:null,attached(){const setCreditCardsListener=cardList=>{this.creditCards=cardList};if(window.PublicKeyCredential){window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then((r=>{this.userIsFidoVerifiable_=this.userIsFidoVerifiable_&&r}))}const setPersonalDataListener=(addressList,cardList)=>{this.creditCards=cardList};const setUpiIdsListener=upiIdList=>{this.upiIds=upiIdList};this.setPersonalDataListener_=setPersonalDataListener;this.paymentsManager_=PaymentsManagerImpl.getInstance();this.paymentsManager_.getCreditCardList(setCreditCardsListener);this.paymentsManager_.getUpiIdList(setUpiIdsListener);this.paymentsManager_.setPersonalDataManagerListener(setPersonalDataListener);chrome.metricsPrivate.recordUserAction("AutofillCreditCardsViewed")},detached(){this.paymentsManager_.removePersonalDataManagerListener(this.setPersonalDataListener_)},onCreditCardDotsMenuTap_(e){this.activeCreditCard=e.detail.creditCard;this.$.creditCardSharedMenu.showAt(e.detail.anchorElement);this.activeDialogAnchor_=e.detail.anchorElement},onAddCreditCardTap_(e){e.preventDefault();const date=new Date;const expirationMonth=date.getMonth()+1;this.activeCreditCard={expirationMonth:expirationMonth.toString(),expirationYear:date.getFullYear().toString()};this.showCreditCardDialog_=true;this.activeDialogAnchor_=this.$.addCreditCard},onCreditCardDialogClose_(){this.showCreditCardDialog_=false;focusWithoutInk(assert(this.activeDialogAnchor_));this.activeDialogAnchor_=null;this.activeCreditCard=null},onMenuEditCreditCardTap_(e){e.preventDefault();if(this.activeCreditCard.metadata.isLocal){this.showCreditCardDialog_=true}else{this.onRemoteEditCreditCardTap_()}this.$.creditCardSharedMenu.close()},onRemoteEditCreditCardTap_(){this.paymentsManager_.logServerCardLinkClicked();window.open(loadTimeData.getString("manageCreditCardsUrl"))},onMenuRemoveCreditCardTap_(){this.paymentsManager_.removeCreditCard(this.activeCreditCard.guid);this.$.creditCardSharedMenu.close();this.activeCreditCard=null},onMenuClearCreditCardTap_(){this.paymentsManager_.clearCachedCreditCard(this.activeCreditCard.guid);this.$.creditCardSharedMenu.close();this.activeCreditCard=null},onMigrateCreditCardsClick_(){this.paymentsManager_.migrateCreditCards()},onCanMakePaymentChange_(){MetricsBrowserProxyImpl.getInstance().recordSettingsPageHistogram(PrivacyElementInteractions.PAYMENT_METHOD)},saveCreditCard_(event){this.paymentsManager_.saveCreditCard(event.detail)},shouldShowFidoToggle_(creditCardEnabled,userIsFidoVerifiable){return creditCardEnabled&&userIsFidoVerifiable},setFIDOAuthenticationEnabledState_(){this.paymentsManager_.setCreditCardFIDOAuthEnabledState(this.$$("#autofillCreditCardFIDOAuthToggle").checked)},checkIfMigratable_(creditCards,creditCardEnabled){if(!this.migrationEnabled_){return false}if(!creditCardEnabled){return false}const numberOfMigratableCreditCard=creditCards.filter((card=>card.metadata.isMigratable)).length;if(numberOfMigratableCreditCard===0){return false}this.migratableCreditCardsInfo_=numberOfMigratableCreditCard===1?this.i18n("migratableCardsInfoSingle"):this.i18n("migratableCardsInfoMultiple");return true}});// Copyright 2019 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="cr-tabs">:host {
  --cr-tabs-height: 48px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        font-size: var(--cr-tabs-font-size, 14px);
        font-weight: 500;
        height: var(--cr-tabs-height);
        position: relative;
        user-select: none;
}

.tab {
  align-items: center;
        color: var(--cr-secondary-text-color);
        display: flex;
        flex: auto;
        height: 100%;
        justify-content: center;
        opacity: .8;
        transition: opacity 100ms cubic-bezier(.4, 0, 1, 1);
}

:host(:not(.keyboard-focus)) .tab {
  outline: none;
}

.selected {
  color: var(--google-blue-600);
        opacity: 1;
}

@media (prefers-color-scheme: dark) {
.selected {
  color: var(--google-blue-refresh-300);
}

}

.selected:focus {
  font-weight: 700;
}

#selectionBar {
  --cr-tabs-selection-bar-width: 2px;
        border-bottom-color: var(--google-blue-600);
        border-bottom-style: solid;
        border-bottom-width: var(--cr-tabs-selection-bar-width);
        height: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: calc(var(--cr-tabs-height) - var(--cr-tabs-selection-bar-width));
        transform: scale(0);
        transform-origin: left center;
        transition: transform;
}

@media (prefers-color-scheme: dark) {
#selectionBar {
  border-bottom-color: var(--google-blue-refresh-300);
}

}

#selectionBar.expand {
  transition-duration: 150ms;
        transition-timing-function: cubic-bezier(.4, 0, 1, 1);
}

#selectionBar.contract {
  transition-duration: 180ms;
        transition-timing-function: cubic-bezier(0, 0, .2, 1);
}

</style>
    <template is="dom-repeat" items="[[tabNames]]" on-dom-change="updateUi_">
      <div class="tab" role="tab" on-click="onTabClick_">[[item]]</div>
    </template>
    <div id="selectionBar"></div>
<!--_html_template_end_-->`,is:"cr-tabs",properties:{tabNames:{type:Array,value:()=>[]},selected:{type:Number,notify:true,observer:"updateUi_"}},hostAttributes:{role:"tablist"},listeners:{keydown:"onKeyDown_",mousedown:"onMouseDown_"},isRtl_:false,lastSelected_:null,attached(){this.isRtl_=this.matches(":host-context([dir=rtl]) cr-tabs")},onMouseDown_(){this.classList.remove("keyboard-focus")},onKeyDown_(e){this.classList.add("keyboard-focus");const count=this.tabNames.length;let newSelection;if(e.key==="Home"){newSelection=0}else if(e.key==="End"){newSelection=count-1}else if(e.key==="ArrowLeft"||e.key==="ArrowRight"){const delta=e.key==="ArrowLeft"?this.isRtl_?1:-1:this.isRtl_?-1:1;newSelection=(count+this.selected+delta)%count}else{return}e.preventDefault();e.stopPropagation();this.selected=newSelection},onSelectionBarTransitionEnd_(){this.$.selectionBar.classList.replace("expand","contract");const tab=this.$$(`.tab:nth-of-type(${this.selected+1})`);if(!tab){this.$.selectionBar.style.transform="scaleX(0)";return}this.updateSelectionBar_(tab.offsetLeft,tab.offsetWidth)},onTabClick_({model:{index:index}}){this.selected=index},updateSelectionBar_(left,width){const containerWidth=this.offsetWidth;const leftPercent=100*left/containerWidth;const widthRatio=width/containerWidth;if(this.$.selectionBar.style.transform==="translateX(0%) scaleX(1)"&&leftPercent===0&&widthRatio===1){this.onSelectionBarTransitionEnd_();return}this.$.selectionBar.style.transform=`translateX(${leftPercent}%) scaleX(${widthRatio})`},updateUi_(){const tabs=this.shadowRoot.querySelectorAll(".tab");if(tabs.length===0){return}tabs.forEach(((tab,i)=>{const isSelected=this.selected===i;if(isSelected){tab.focus()}tab.classList.toggle("selected",isSelected);tab.setAttribute("aria-selected",isSelected);tab.setAttribute("tabindex",isSelected?0:-1)}));if(this.selected===undefined){return}this.$.selectionBar.classList.remove("expand","contract");const oldValue=this.lastSelected_;this.lastSelected_=this.selected;if(oldValue===null||oldValue===this.selected){setTimeout((()=>{const{offsetLeft:offsetLeft,offsetWidth:offsetWidth}=tabs[this.selected];this.updateSelectionBar_(offsetLeft,offsetWidth)}));return}this.$.selectionBar.classList.add("expand");this.$.selectionBar.addEventListener("transitionend",(()=>this.onSelectionBarTransitionEnd_()),{once:true});const{offsetLeft:newLeft,offsetWidth:newWidth}=tabs[this.selected];const{offsetLeft:oldLeft,offsetWidth:oldWidth}=tabs[oldValue];const left=Math.min(newLeft,oldLeft);const right=Math.max(newLeft+newWidth,oldLeft+oldWidth);this.updateSelectionBar_(left,right-left)}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"settings-history-deletion-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-history-deletion-dialog"></style>

<cr-dialog id="dialog" close-text="إغلاق" show-on-attach="">
  <div slot="title">‏بيانات Chrome التي تم محوها</div>
  <div slot="body">‏تمت إزالة البيانات المحددة من Chrome والأجهزة التي تمت مزامنتها. قد يحتوي حسابك على Google على نماذج أخرى من سجل التصفح، مثل عمليات البحث والنشاط من خدمات Google الأخرى في <a target="_blank" href="https://myactivity.google.com/myactivity/?utm_source=chrome_n">myactivity.google.com</a>.</div>
  <div slot="button-container">
    <cr-button class="action-button" on-click="onOkClick_">
      حسنًا
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`,onOkClick_(){this.$.dialog.close()}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-passwords-deletion-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><cr-dialog id="dialog" close-text="إغلاق" show-on-attach="">
  <div slot="title">Some passwords were not deleted</div>
  <div slot="body">We were not able to delete all passwords stored in your Google Account. Try again or visit <a target="_blank" href="https://passwords.google.com">passwords.google.com</a>.</div>
  <div slot="button-container">
    <cr-button class="action-button" on-click="onOkClick_">
      حسنًا
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`,onOkClick_(){this.$.dialog.close()}});// Copyright 2016 The Chromium Authors. All rights reserved.
let InstalledApp;class ClearBrowsingDataBrowserProxy{clearBrowsingData(dataTypes,timePeriod,installedApps){}getInstalledApps(timePeriod){}initialize(){}}class ClearBrowsingDataBrowserProxyImpl{clearBrowsingData(dataTypes,timePeriod,installedApps){return sendWithPromise("clearBrowsingData",dataTypes,timePeriod,installedApps)}getInstalledApps(timePeriod){return sendWithPromise("getInstalledApps",timePeriod)}initialize(){return sendWithPromise("initializeClearBrowsingData")}}addSingletonGetter(ClearBrowsingDataBrowserProxyImpl);// Copyright 2019 The Chromium Authors. All rights reserved.
Polymer({is:"installed-app-checkbox",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="installed-app-checkbox">site-favicon {
  --site-favicon-height: 20px;
        --site-favicon-width: 20px;
}

#outerRow {
  align-items: center;
        display: flex;
        min-height: var(--settings-row-two-line-min-height);
        width: 100%;
}

#innerRow {
  display: flex;
        flex-direction: row;
}

cr-checkbox {
  width: 100%;
}

site-favicon {
  padding-inline-end: 10px;
}

#innerRow secondary {
  padding-inline-start: 4px;
}

</style>

    <div id="outerRow">
      <cr-checkbox id="checkbox" checked="{{installed_app.isChecked}}" disabled="[[disabled]]">
        <div id="innerRow">
          <site-favicon url="[[installed_app.registerableDomain]]">
          </site-favicon>
          <div class="label">[[installed_app.appName]]</div>
          <div class="secondary label">
            &nbsp;([[installed_app.registerableDomain]])
          </div>
        </div>
      </cr-checkbox>
    </div>
<!--_html_template_end_-->`,properties:{installed_app:Object,disabled:{type:Boolean,value:false}}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-checkbox",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-checkbox">#outerRow {
  align-items: center;
        display: flex;
        min-height: var(--settings-row-two-line-min-height);
        width: 100%;
}

#outerRow[noSubLabel] {
  min-height: var(--settings-row-min-height);
}

cr-checkbox {
  margin-bottom: 4px;
        margin-top: var(--settings-checkbox-margin-top, 4px);
        width: 100%;
}

cr-policy-pref-indicator {
  margin-inline-start: var(--settings-controlled-by-spacing);
}

</style>
    <div id="outerRow" nosublabel$="[[!hasSubLabel_(subLabel, subLabelHtml)]]">
      <cr-checkbox id="checkbox" checked="{{checked}}" on-change="notifyChangedByUserInteraction" disabled="[[controlDisabled(disabled, pref.*)]]" aria-label="[[label]]">
        <div id="label" class="label">[[label]] <slot></slot></div>
        <div id="subLabel" class="secondary label">
          <div inner-h-t-m-l="[[subLabelHtml]]"></div>
          [[subLabel]]
        </div>
      </cr-checkbox>
      <template is="dom-if" if="[[pref.controlledBy]]">
        <cr-policy-pref-indicator pref="[[pref]]" icon-aria-label="[[label]]">
        </cr-policy-pref-indicator>
      </template>
    </div>
<!--_html_template_end_-->`,behaviors:[SettingsBooleanControlBehavior],properties:{subLabelHtml:{type:String,value:"",observer:"onSubLabelHtmlChanged_"}},observers:["onSubLabelChanged_(subLabel, subLabelHtml)"],onSubLabelChanged_(){this.$.checkbox.ariaDescription=this.$.subLabel.textContent},onSubLabelHtmlChanged_(){const links=this.root.querySelectorAll(".secondary.label a");links.forEach((link=>{link.addEventListener("click",this.stopPropagation)}))},stopPropagation(event){event.stopPropagation()},hasSubLabel_(subLabel,subLabelHtml){return!!subLabel||!!subLabelHtml}});// Copyright 2015 The Chromium Authors. All rights reserved.
function closeDialog(dialog,isLast){if(!isLast){dialog.addEventListener("close",(e=>{e.stopPropagation()}),{once:true})}dialog.close()}function replaceDialog(oldDialog,newDialog){closeDialog(oldDialog,false);if(!newDialog.open){newDialog.showModal()}}Polymer({is:"settings-clear-browsing-data-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-clear-browsing-data-dialog">:host {
  --body-container-height: 322px;
}

#clearBrowsingDataDialog {
  --border-top-color: var(--paper-grey-300);
        --cr-dialog-top-container-min-height: 42px;
        --cr-dialog-body-border-top: 1px solid var(--border-top-color);
}

@media (prefers-color-scheme: dark) {
#clearBrowsingDataDialog {
  --border-top-color: var(--cr-separator-color);
}

}

#clearBrowsingDataDialog:not(.fully-rendered) {
  visibility: hidden;
}

#clearBrowsingDataDialog [slot=title] {
  padding-bottom: 8px;
}

#clearBrowsingDataDialog::part(body-container) {
  height: var(--body-container-height);
        min-height: 200px;
}

#clearBrowsingDataDialog [slot=body] {
  padding-top: 8px;
}

#clearBrowsingDataDialog [slot=footer] {
  background: var(--paper-grey-50);
        border-top: none;
        padding: 0;
}

@media (prefers-color-scheme: dark) {
#clearBrowsingDataDialog [slot=footer] {
  background: rgb(50, 54, 57);
}

}

.row {
  align-items: center;
        display: flex;
        min-height: 40px;
}

paper-spinner-lite {
  margin-bottom: auto;
        margin-inline-end: 16px;
        margin-top: auto;
}

settings-checkbox, installed-app-checkbox {
  --settings-row-two-line-min-height: 48px;
}

#basic-tab settings-checkbox + settings-checkbox {
  --settings-checkbox-margin-top: 12px;
}

cr-tabs {
  --cr-tabs-font-size: 100%;
        --cr-tabs-height: 40px;
}

.time-range-row {
  margin-bottom: 12px;
}

.time-range-select {
  margin-inline-start: 12px;
}

[slot=title] .secondary {
  font-size: calc(13 / 15 * 100%);
        padding-top: 8px;
}

.divider {
  border-top: var(--cr-separator-line);
        margin: 0 16px;
}

#footer-description {
  color: var(--cr-secondary-text-color);
        padding: 16px;
}

#clearingDataAlert {
  clip: rect(0, 0, 0, 0);
        position: fixed;
}

</style>

    <cr-dialog id="clearBrowsingDataDialog" close-text="إغلاق" ignore-popstate="" has-tabs="" ignore-enter-key="">
      <div slot="title">
        <div>محو بيانات التصفُّح</div>
      </div>
      <div slot="header">
        <cr-tabs tab-names="[[tabsNames_]]" selected="{{prefs.browser.last_clear_browsing_data_tab.value}}" on-selected-changed="recordTabChange_"></cr-tabs>
      </div>
      <div slot="body">
        <iron-pages id="tabs" selected="[[prefs.browser.last_clear_browsing_data_tab.value]]" on-selected-item-changed="updateClearButtonState_">
          <div id="basic-tab">
            <div class="row time-range-row">
              <span class="time-range-label" aria-hidden="true">
                النطاق الزمني
              </span>
              <settings-dropdown-menu id="clearFromBasic" class="time-range-select" label="النطاق الزمني" pref="{{prefs.browser.clear_data.time_period_basic}}" menu-options="[[clearFromOptions_]]">
              </settings-dropdown-menu>
            </div>
            <!-- Note: whether these checkboxes are checked are ignored if
                 deleting history is disabled (i.e. supervised users, policy),
                 so it's OK to have a hidden checkbox that's also checked (as
                 the C++ accounts for whether a user is allowed to delete
                 history independently). -->
            <settings-checkbox id="browsingCheckboxBasic" pref="{{prefs.browser.clear_data.browsing_history_basic}}" label="سجلّ التصفّح" sub-label-html="[[browsingCheckboxLabel_(
                    isSignedIn_, isSyncingHistory_, syncStatus.hasError,
                    'محو السجلّ وعمليات الإكمال التلقائي في شريط العناوين.',
                    '‏يتم محو السجلّ وعمليات الإكمال التلقائي في شريط العناوين. وقد يتضمّن حسابك على Google نماذج أخرى من سجلّ التصفّح في <a target=\\'_blank\\' href=\\'https://myactivity.google.com/myactivity/?utm_source=chrome_cbd\\'>myactivity.google.com</a>.',
                    '‏يمسح السجل من كل الأجهزة التي تم تسجيل الدخول عليها. وقد يتضمن حسابك في Google نماذج أخرى من سجل التصفح في <a target=\\'_blank\\' href=\\'https://myactivity.google.com/myactivity/?utm_source=chrome_cbd\\'>myactivity.google.com</a>.')]]" disabled="[[clearingInProgress_]]" hidden="[[isSupervised_]]" no-set-pref="">
            </settings-checkbox>
            <settings-checkbox id="cookiesCheckboxBasic" class="cookies-checkbox" pref="{{prefs.browser.clear_data.cookies_basic}}" label="ملفات تعريف الارتباط وبيانات الموقع الإلكتروني الأخرى" sub-label="[[cookiesCheckboxLabel_(
                    shouldShowCookieException_,
                    'يخرجك من معظم المواقع الإلكترونية.',
                    '‏يؤدي هذا الخيار إلى تسجيل خروجك من معظم المواقع الإلكترونية. وسيستمر تسجيل دخولك إلى حسابك على Google بحيث يمكن محو بياناتك التي تمت مزامنتها.')]]" disabled="[[clearingInProgress_]]" no-set-pref="">
            </settings-checkbox>
            <settings-checkbox id="cacheCheckboxBasic" class="cache-checkbox" pref="{{prefs.browser.clear_data.cache_basic}}" label="الصور والملفات المخزنة مؤقتًا" sub-label="[[counters_.cache_basic]]" disabled="[[clearingInProgress_]]" no-set-pref="">
            </settings-checkbox>
          </div>
          <div id="advanced-tab">
            <div class="row time-range-row">
              <span class="time-range-label" aria-hidden="true">
                النطاق الزمني
              </span>
              <settings-dropdown-menu id="clearFrom" class="time-range-select" label="النطاق الزمني" pref="{{prefs.browser.clear_data.time_period}}" menu-options="[[clearFromOptions_]]">
              </settings-dropdown-menu>
            </div>
            <settings-checkbox id="browsingCheckbox" pref="{{prefs.browser.clear_data.browsing_history}}" label="سجلّ التصفّح" sub-label="[[counters_.browsing_history]]" disabled="[[clearingInProgress_]]" hidden="[[isSupervised_]]" no-set-pref="">
            </settings-checkbox>
            <settings-checkbox id="downloadCheckbox" pref="{{prefs.browser.clear_data.download_history}}" label="سجل التنزيل" sub-label="[[counters_.download_history]]" disabled="[[clearingInProgress_]]" hidden="[[isSupervised_]]" no-set-pref="">
            </settings-checkbox>
            <settings-checkbox id="cookiesCheckbox" class="cookies-checkbox" pref="{{prefs.browser.clear_data.cookies}}" label="ملفات تعريف الارتباط وبيانات الموقع الإلكتروني الأخرى" sub-label="[[counters_.cookies]]" disabled="[[clearingInProgress_]]" no-set-pref="">
            </settings-checkbox>
            <settings-checkbox id="cacheCheckbox" class="cache-checkbox" pref="{{prefs.browser.clear_data.cache}}" label="الصور والملفات المخزنة مؤقتًا" sub-label="[[counters_.cache]]" disabled="[[clearingInProgress_]]" no-set-pref="">
            </settings-checkbox>
            <settings-checkbox pref="{{prefs.browser.clear_data.passwords}}" label="كلمات المرور وبيانات تسجيل الدخول الأخرى" sub-label="[[counters_.passwords]]" disabled="[[clearingInProgress_]]" no-set-pref="">
            </settings-checkbox>
            <settings-checkbox pref="{{prefs.browser.clear_data.form_data}}" label="الملء التلقائي للبيانات" sub-label="[[counters_.form_data]]" disabled="[[clearingInProgress_]]" no-set-pref="">
            </settings-checkbox>
            <settings-checkbox pref="{{prefs.browser.clear_data.site_settings}}" label="إعدادات الموقع الإلكتروني" sub-label="[[counters_.site_settings]]" disabled="[[clearingInProgress_]]" no-set-pref="">
            </settings-checkbox>
            <settings-checkbox pref="{{prefs.browser.clear_data.hosted_apps_data}}" label="بيانات التطبيق المستضافة" sub-label="[[counters_.hosted_apps_data]]" disabled="[[clearingInProgress_]]" no-set-pref="">
            </settings-checkbox>
          </div>
        </iron-pages>
      </div>
      <div slot="button-container">
        <paper-spinner-lite active="[[clearingInProgress_]]">
        </paper-spinner-lite>
        <cr-button class="cancel-button" disabled="[[clearingInProgress_]]" on-click="onCancelTap_">إلغاء</cr-button>
        <cr-button id="clearBrowsingDataConfirm" class="action-button" on-click="onClearBrowsingDataClick_" disabled="[[isClearButtonDisabled_(clearingInProgress_,
                                               clearButtonDisabled_)]]">
            محو البيانات
        </cr-button>

        <!-- The alert must be inside the dialog for it to be read while the
             dialog is open. -->
        <div id="clearingDataAlert" role="alert">
          [[clearingDataAlertString_]]
        </div>
      </div>
      <template is="dom-if" if="[[shouldShowFooter_(syncStatus.signedIn)]]" restamp="">
        <div slot="footer">
          <settings-sync-account-control sync-status="[[syncStatus]]" prefs="{{prefs}}" hide-buttons="">
          </settings-sync-account-control>
          <div class="divider"></div>
          <div id="footer-description" on-click="onSyncDescriptionLinkClicked_">
            <span id="sync-info" hidden="[[syncStatus.hasError]]">
              ‏لمحو بيانات التصفُّح من هذا الجهاز فقط والاحتفاظ بها في حسابك على Google، يُرجى <a href="#" target="_blank">تسجيل الخروج</a>.
            </span>
            <span id="sync-paused-info" hidden="[[!isSyncPaused_]]">
              ‏لمحو بيانات التصفُّح من جميع أجهزتك التي تمت مزامنتها ومن حسابك على Google، يُرجى <a href="#" target="_blank">تسجيل الدخول</a>.
            </span>
            <span id="sync-passphrase-error-info" hidden="[[!hasPassphraseError_]]">
              ‏لمحو بيانات التصفُّح من جميع أجهزتك التي تمت مزامنتها ومن حسابك على Google، يُرجى <a href="#" target="_blank">إدخال عبارة المرور</a>.
            </span>
            <span id="sync-other-error-info" hidden="[[!hasOtherSyncError_]]">
              ‏لمحو بيانات التصفُّح من جميع أجهزتك التي تمت مزامنتها ومن حسابك على Google، يُرجى <a href="#" target="_blank">الانتقال إلى إعدادات المزامنة</a>.
            </span>
          </div>
        </div>
      </template>
    </cr-dialog>

    <cr-dialog id="installedAppsDialog" close-text="إغلاق" ignore-popstate="" show-scroll-borders="" on-close="hideInstalledApps_">
      <div slot="title">
        هل تريد محو البيانات من هذه التطبيقات أيضًا؟
      </div>
      <div slot="body">
        <template is="dom-repeat" items="[[installedApps_]]">
          <div class="row">
            <installed-app-checkbox installed_app="[[item]]" disabled="[[clearingInProgress_]]">
            </installed-app-checkbox>
          </div>
        </template>
      </div>
      <div slot="button-container">
        <paper-spinner-lite active="[[clearingInProgress_]]">
        </paper-spinner-lite>
        <cr-button class="cancel-button" disabled="[[clearingInProgress_]]" on-click="hideInstalledApps_">
          إلغاء
        </cr-button>
        <cr-button id="installedAppsConfirm" class="action-button" disabled="[[clearingInProgress_]]" on-click="onInstalledAppsConfirmClick_">
          محو
        </cr-button>
      </div>
    </cr-dialog>

    <template is="dom-if" if="[[showHistoryDeletionDialog_]]" restamp="">
      <settings-history-deletion-dialog id="historyNotice" on-close="onHistoryDeletionDialogClose_">
      </settings-history-deletion-dialog>
    </template>

    <template is="dom-if" if="[[showPasswordsDeletionDialog_]]" restamp="">
      <settings-passwords-deletion-dialog id="passwordsNotice" on-close="onPasswordsDeletionDialogClose_">
      </settings-passwords-deletion-dialog>
    </template>
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior,RouteObserverBehavior],properties:{prefs:{type:Object,notify:true},syncStatus:Object,counters_:{type:Object,value(){return{}}},clearFromOptions_:{readOnly:true,type:Array,value:[{value:0,name:loadTimeData.getString("clearPeriodHour")},{value:1,name:loadTimeData.getString("clearPeriod24Hours")},{value:2,name:loadTimeData.getString("clearPeriod7Days")},{value:3,name:loadTimeData.getString("clearPeriod4Weeks")},{value:4,name:loadTimeData.getString("clearPeriodEverything")}]},clearingInProgress_:{type:Boolean,value:false},clearingDataAlertString_:{type:String,value:""},clearButtonDisabled_:{type:Boolean,value:false},isSupervised_:{type:Boolean,value(){return loadTimeData.getBoolean("isSupervised")}},showHistoryDeletionDialog_:{type:Boolean,value:false},showPasswordsDeletionDialogLater_:{type:Boolean,value:false},showPasswordsDeletionDialog_:{type:Boolean,value:false},isSignedIn_:{type:Boolean,value:false},isSyncingHistory_:{type:Boolean,value:false},shouldShowCookieException_:{type:Boolean,value:false},isSyncPaused_:{type:Boolean,value:false,computed:"computeIsSyncPaused_(syncStatus)"},hasPassphraseError_:{type:Boolean,value:false,computed:"computeHasPassphraseError_(syncStatus)"},hasOtherSyncError_:{type:Boolean,value:false,computed:"computeHasOtherError_(syncStatus, isSyncPaused_, hasPassphraseError_)"},tabsNames_:{type:Array,value:()=>[loadTimeData.getString("basicPageTitle"),loadTimeData.getString("advancedPageTitle")]},installedApps_:{type:Array,value:()=>[]},installedAppsFlagEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("installedAppsInCbd")}},listeners:{"settings-boolean-control-change":"updateClearButtonState_"},browserProxy_:null,syncBrowserProxy_:null,ready(){this.syncBrowserProxy_=SyncBrowserProxyImpl.getInstance();this.syncBrowserProxy_.getSyncStatus().then(this.handleSyncStatus_.bind(this));this.addWebUIListener("sync-status-changed",this.handleSyncStatus_.bind(this));this.addWebUIListener("update-sync-state",this.updateSyncState_.bind(this));this.addWebUIListener("update-counter-text",this.updateCounterText_.bind(this))},attached(){this.browserProxy_=ClearBrowsingDataBrowserProxyImpl.getInstance();this.browserProxy_.initialize().then((()=>{this.$.clearBrowsingDataDialog.showModal()}))},handleSyncStatus_(syncStatus){this.syncStatus=syncStatus},isClearButtonDisabled_(clearingInProgress,clearButtonDisabled){return clearingInProgress||clearButtonDisabled},updateClearButtonState_(){const tab=this.$.tabs.selectedItem;if(!tab){return}this.clearButtonDisabled_=this.getSelectedDataTypes_(tab).length===0},currentRouteChanged(currentRoute){if(currentRoute===routes.CLEAR_BROWSER_DATA){chrome.metricsPrivate.recordUserAction("ClearBrowsingData_DialogCreated")}},updateSyncState_(signedIn,syncing,shouldShowCookieException){this.isSignedIn_=signedIn;this.isSyncingHistory_=syncing;this.shouldShowCookieException_=shouldShowCookieException;this.$.clearBrowsingDataDialog.classList.add("fully-rendered")},browsingCheckboxLabel_(isSignedIn,isSyncingHistory,hasSyncError,historySummary,historySummarySignedIn,historySummarySynced){if(isSyncingHistory&&!hasSyncError){return historySummarySynced}else if(isSignedIn&&!this.isSyncPaused_){return historySummarySignedIn}return historySummary},cookiesCheckboxLabel_(shouldShowCookieException,cookiesSummary,cookiesSummarySignedIn){if(shouldShowCookieException){return cookiesSummarySignedIn}return cookiesSummary},updateCounterText_(prefName,text){const matches=prefName.match(/^browser\.clear_data\.(\w+)$/);this.set("counters_."+assert(matches[1]),text)},getSelectedDataTypes_(tab){const checkboxes=tab.querySelectorAll("settings-checkbox");const dataTypes=[];checkboxes.forEach((checkbox=>{if(checkbox.checked&&!checkbox.hidden){dataTypes.push(checkbox.pref.key)}}));return dataTypes},getInstalledApps_:async function(){const tab=this.$.tabs.selectedItem;const timePeriod=tab.querySelector(".time-range-select").pref.value;this.installedApps_=await this.browserProxy_.getInstalledApps(timePeriod)},shouldShowInstalledApps_(){if(!this.installedAppsFlagEnabled_){return false}const haveInstalledApps=this.installedApps_.length>0;chrome.send("metricsHandler:recordBooleanHistogram",["History.ClearBrowsingData.InstalledAppsDialogShown",haveInstalledApps]);return haveInstalledApps},recordInstalledAppsInteractions_:function(){if(this.installedApps_.length===0){return}const uncheckedAppCount=this.installedApps_.filter((app=>!app.isChecked)).length;chrome.metricsPrivate.recordBoolean("History.ClearBrowsingData.InstalledAppExcluded",!!uncheckedAppCount);chrome.metricsPrivate.recordCount("History.ClearBrowsingData.InstalledDeselectedNum",uncheckedAppCount);chrome.metricsPrivate.recordPercentage("History.ClearBrowsingData.InstalledDeselectedPercent",Math.round(100*uncheckedAppCount/this.installedApps_.length))},clearBrowsingData_:async function(){this.clearingInProgress_=true;this.clearingDataAlertString_=loadTimeData.getString("clearingData");const tab=this.$.tabs.selectedItem;const dataTypes=this.getSelectedDataTypes_(tab);const timePeriod=tab.querySelector(".time-range-select").pref.value;if(tab.id==="basic-tab"){chrome.metricsPrivate.recordUserAction("ClearBrowsingData_BasicTab")}else{chrome.metricsPrivate.recordUserAction("ClearBrowsingData_AdvancedTab")}this.shadowRoot.querySelectorAll("settings-checkbox[no-set-pref]").forEach((checkbox=>checkbox.sendPrefChange()));this.recordInstalledAppsInteractions_();const{showHistoryNotice:showHistoryNotice,showPasswordsNotice:showPasswordsNotice}=await this.browserProxy_.clearBrowsingData(dataTypes,timePeriod,this.installedApps_);this.clearingInProgress_=false;IronA11yAnnouncer.requestAvailability();this.fire("iron-announce",{text:loadTimeData.getString("clearedData")});this.showHistoryDeletionDialog_=showHistoryNotice;this.showPasswordsDeletionDialog_=showPasswordsNotice&&!showHistoryNotice;this.showPasswordsDeletionDialogLater_=showPasswordsNotice&&showHistoryNotice;const isLastDialog=!showHistoryNotice&&!showPasswordsNotice;if(this.$.clearBrowsingDataDialog.open){closeDialog(this.$.clearBrowsingDataDialog,isLastDialog)}if(this.$.installedAppsDialog.open){closeDialog(this.$.installedAppsDialog,isLastDialog)}},onCancelTap_(){this.$.clearBrowsingDataDialog.cancel()},onHistoryDeletionDialogClose_(e){this.showHistoryDeletionDialog_=false;if(this.showPasswordsDeletionDialogLater_){e.stopPropagation();this.showPasswordsDeletionDialogLater_=false;this.showPasswordsDeletionDialog_=true}},onPasswordsDeletionDialogClose_(e){this.showPasswordsDeletionDialog_=false},recordTabChange_(event){if(event.detail.value===0){chrome.metricsPrivate.recordUserAction("ClearBrowsingData_SwitchTo_BasicTab")}else{chrome.metricsPrivate.recordUserAction("ClearBrowsingData_SwitchTo_AdvancedTab")}},onSyncDescriptionLinkClicked_(e){if(e.target.tagName==="A"){e.preventDefault();if(!this.syncStatus.hasError){chrome.metricsPrivate.recordUserAction("ClearBrowsingData_Sync_Pause");this.syncBrowserProxy_.pauseSync()}else if(this.isSyncPaused_){chrome.metricsPrivate.recordUserAction("ClearBrowsingData_Sync_SignIn");this.syncBrowserProxy_.startSignIn()}else{if(this.hasPassphraseError_){chrome.metricsPrivate.recordUserAction("ClearBrowsingData_Sync_NavigateToPassphrase")}else{chrome.metricsPrivate.recordUserAction("ClearBrowsingData_Sync_NavigateToError")}Router.getInstance().navigateTo(routes.SYNC)}}},computeIsSyncPaused_(){return!!this.syncStatus.hasError&&this.syncStatus.statusAction===StatusAction.REAUTHENTICATE},computeHasPassphraseError_(){return!!this.syncStatus.hasError&&this.syncStatus.statusAction===StatusAction.ENTER_PASSPHRASE},computeHasOtherError_(){return this.syncStatus!==undefined&&!!this.syncStatus.hasError&&!this.isSyncPaused_&&!this.hasPassphraseError_},shouldShowFooter_(){let showFooter=false;showFooter=!!this.syncStatus&&!!this.syncStatus.signedIn;return showFooter},onClearBrowsingDataClick_:async function(){await this.getInstalledApps_();if(this.shouldShowInstalledApps_()){replaceDialog(this.$.clearBrowsingDataDialog,this.$.installedAppsDialog)}else{await this.clearBrowsingData_()}},hideInstalledApps_(){replaceDialog(this.$.installedAppsDialog,this.$.clearBrowsingDataDialog)},onInstalledAppsConfirmClick_:async function(){await this.clearBrowsingData_()}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"settings-search-engine-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-search-engine-dialog"></style>
    <cr-dialog id="dialog" close-text="إغلاق">
      <div slot="title">[[dialogTitle_]]</div>
      <div slot="body" spellcheck="false">
         <cr-input id="searchEngine" label="محرك البحث" error-message="غير صالح" value="{{searchEngine_}}" on-input="validate_" autofocus="">
        </cr-input>
        <cr-input id="keyword" label="الكلمة المفتاحية" error-message="غير صالح" value="{{keyword_}}" on-focus="validate_" on-input="validate_">
        </cr-input>
        <cr-input id="queryUrl" label="‏عنوان URL الذي يحتوي على %s بدلاً من طلب البحث" error-message="غير صالح" value="{{queryUrl_}}" on-focus="validate_" on-input="validate_" disabled$="[[model.urlLocked]]">
        </cr-input>
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="cancel_" id="cancel">
            إلغاء</cr-button>
        <cr-button id="actionButton" class="action-button" on-click="onActionButtonTap_">
          [[actionButtonText_]]
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior],properties:{model:Object,searchEngine_:String,keyword_:String,queryUrl_:String,dialogTitle_:String,actionButtonText_:String},browserProxy_:null,DEFAULT_MODEL_INDEX:-1,created(){this.browserProxy_=SearchEnginesBrowserProxyImpl.getInstance()},ready(){if(this.model){this.dialogTitle_=loadTimeData.getString("searchEnginesEditSearchEngine");this.actionButtonText_=loadTimeData.getString("save");this.searchEngine_=this.model.name;this.keyword_=this.model.keyword;this.queryUrl_=this.model.url}else{this.dialogTitle_=loadTimeData.getString("searchEnginesAddSearchEngine");this.actionButtonText_=loadTimeData.getString("add")}this.addEventListener("cancel",(()=>{this.browserProxy_.searchEngineEditCancelled()}));this.addWebUIListener("search-engines-changed",this.enginesChanged_.bind(this))},attached(){this.async(this.updateActionButtonState_.bind(this));this.browserProxy_.searchEngineEditStarted(this.model?this.model.modelIndex:this.DEFAULT_MODEL_INDEX);this.$.dialog.showModal()},enginesChanged_(searchEnginesInfo){if(this.model){const engineWasRemoved=["defaults","others","extensions"].every((engineType=>searchEnginesInfo[engineType].every((e=>e.id!==this.model.id))));if(engineWasRemoved){this.cancel_();return}}[this.$.searchEngine,this.$.keyword,this.$.queryUrl].forEach((element=>this.validateElement_(element)))},cancel_(){this.$.dialog.cancel()},onActionButtonTap_(){this.browserProxy_.searchEngineEditCompleted(this.searchEngine_,this.keyword_,this.queryUrl_);this.$.dialog.close()},validateElement_(inputElement){if(inputElement.value===""){inputElement.invalid=false;this.updateActionButtonState_();return}this.browserProxy_.validateSearchEngineInput(inputElement.id,inputElement.value).then((isValid=>{inputElement.invalid=!isValid;this.updateActionButtonState_()}))},validate_(event){const inputElement=event.target;this.validateElement_(inputElement)},updateActionButtonState_(){const allValid=[this.$.searchEngine,this.$.keyword,this.$.queryUrl].every((function(inputElement){return!inputElement.invalid&&inputElement.value.length>0}));this.$.actionButton.disabled=!allValid}});// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const template$1=document.createElement("template");template$1.innerHTML=`<dom-module id="search-engine-entry">\x3c!--_html_template_start_--\x3e\n\n  <template>\n    <style scope="search-engine-entry">site-favicon {\n  margin-inline-end: 8px;\n        min-width: 16px;\n}\n\n</style>\n  </template>\n\x3c!--_html_template_end_--\x3e</dom-module>\n`;document.body.appendChild(template$1.content.cloneNode(true));// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-search-engine-entry",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared search-engine-entry" scope="settings-search-engine-entry">:host([is-default]) .list-item {
  font-weight: 500;
}

#name-column {
  align-items: center;
        display: flex;
}

#name-column, #keyword-column {
  flex: 3;
        word-break: break-word;
}

#keyword-column > div {
  margin-inline-end: 8px;
}

#url-column {
  flex: 4;
}

</style>

    <div class="list-item" focus-row-container="">
      <div id="name-column">
        <site-favicon favicon-url="[[engine.iconURL]]" url="[[engine.url]]">
        </site-favicon>
        <div>[[engine.displayName]]</div>
      </div>
      <div id="keyword-column"><div>[[engine.keyword]]</div></div>
      <div id="url-column" class="text-elide">[[engine.url]]</div>
      <cr-icon-button class="icon-more-vert" on-click="onDotsTap_" title="مزيد من الإجراءات" focus-row-control="" focus-type="cr-menu-button"></cr-icon-button>
      <cr-action-menu role-description="قائمة">
        <button class="dropdown-item" on-click="onMakeDefaultTap_" disabled$="[[!engine.canBeDefault]]" id="makeDefault">
          جعل الخيار تلقائيًا
        </button>
        <button class="dropdown-item" on-click="onEditTap_" disabled$="[[!engine.canBeEdited]]" id="edit">
          تعديل
        </button>
        <button class="dropdown-item" on-click="onDeleteTap_" disabled$="[[!engine.canBeRemoved]]" id="delete">
          إزالة من القائمة
        </button>
      </cr-action-menu>
    </div>
    <template is="dom-if" if="[[engine.extension]]">
      <extension-controlled-indicator extension-id="[[engine.extension.id]]" extension-name="[[engine.extension.name]]" extension-can-be-disabled="[[engine.extension.canBeDisabled]]">
      </extension-controlled-indicator>
    </template>
<!--_html_template_end_-->`,behaviors:[FocusRowBehavior],properties:{engine:Object,isDefault:{reflectToAttribute:true,type:Boolean,computed:"computeIsDefault_(engine)"}},browserProxy_:null,created(){this.browserProxy_=SearchEnginesBrowserProxyImpl.getInstance()},closePopupMenu_(){this.$$("cr-action-menu").close()},computeIsDefault_(){return this.engine.default},onDeleteTap_(){this.browserProxy_.removeSearchEngine(this.engine.modelIndex);this.closePopupMenu_()},onDotsTap_(){this.$$("cr-action-menu").showAt(assert(this.$$("cr-icon-button")),{anchorAlignmentY:AnchorAlignment.AFTER_END})},onEditTap_(e){e.preventDefault();this.closePopupMenu_();this.fire("edit-search-engine",{engine:this.engine,anchorElement:assert(this.$$("cr-icon-button"))})},onMakeDefaultTap_(){this.closePopupMenu_();this.browserProxy_.setDefaultSearchEngine(this.engine.modelIndex)}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-search-engines-list",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-search-engines-list">#headers {
  display: flex;
        padding: 10px 0;
}

#headers .name, #headers .keyword {
  flex: 3;
}

#headers .url {
  flex: 4;
}

settings-search-engine-entry {
  border-top: var(--cr-separator-line);
}

:host([fixed-height]) #container {
  max-height: calc((var(--settings-row-min-height) +
                          var(--cr-separator-height)) * 6);
}

.icon-placeholder {
  margin-inline-end: 0;
        margin-inline-start: var(--cr-icon-button-margin-start);
        width: var(--cr-icon-ripple-size);
}

</style>
    <div id="outer" class="list-frame">
      <div id="headers" class="column-header">
        <div class="name">محرك البحث</div>
        <div class="keyword">الكلمة المفتاحية</div>
        <div class="url">‏عنوان URL للاستعلام</div>
        <div class="icon-placeholder"></div>
      </div>
      <div id="container" class="scroll-container" scrollable$="[[fixedHeight]]">
        <iron-list items="[[engines]]" scroll-target="[[scrollTarget]]" scroll-offset="[[scrollOffset]]" preserve-focus="" risk-selection="">
          <template>
            <settings-search-engine-entry engine="[[item]]" focus-row-index="[[index]]" tabindex$="[[tabIndex]]" iron-list-tab-index="[[tabIndex]]" last-focused="{{lastFocused_}}" list-blurred="{{listBlurred_}}">
            </settings-search-engine-entry>
          </template>
        </iron-list>
      </div>
    </div>
<!--_html_template_end_-->`,properties:{engines:Array,scrollTarget:Object,scrollOffset:Number,lastFocused_:Object,listBlurred_:Boolean,fixedHeight:{type:Boolean,value:false,reflectToAttribute:true}}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"settings-omnibox-extension-entry",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared search-engine-entry" scope="settings-omnibox-extension-entry">.name-column {
  align-items: center;
        display: flex;
        flex: 3;
        word-break: break-word;
}

.keyword-column {
  flex: 7;
}

</style>
    <div class="list-item" focus-row-container="">
      <div class="name-column">
        <site-favicon favicon-url="[[engine.iconURL]]"></site-favicon>
        <span>[[engine.displayName]]</span>
      </div>
      <div class="keyword-column">[[engine.keyword]]</div>
      <cr-icon-button class="icon-more-vert" on-click="onDotsTap_" title="مزيد من الإجراءات" focus-row-control="" focus-type="menu">
      </cr-icon-button>
      <cr-action-menu role-description="قائمة">
        <button class="dropdown-item" on-click="onManageTap_" id="manage">
          إدارة محرّكات البحث
        </button>
        <button class="dropdown-item" on-click="onDisableTap_" id="disable">
          إيقاف
        </button>
      </cr-action-menu>
    </div>
<!--_html_template_end_-->`,properties:{engine:Object},behaviors:[FocusRowBehavior],browserProxy_:null,created(){this.browserProxy_=ExtensionControlBrowserProxyImpl.getInstance()},onManageTap_(){this.closePopupMenu_();this.browserProxy_.manageExtension(this.engine.extension.id)},onDisableTap_(){this.closePopupMenu_();this.browserProxy_.disableExtension(this.engine.extension.id)},closePopupMenu_(){this.$$("cr-action-menu").close()},onDotsTap_(){this.$$("cr-action-menu").showAt(assert(this.$$("cr-icon-button")),{anchorAlignmentY:AnchorAlignment.AFTER_END})}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-search-engines-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-search-engines-page">settings-omnibox-extension-entry {
  border-top: var(--cr-separator-line);
}

</style>
    <div class="cr-row first">
      <h2>محرّكات البحث التلقائية</h2>
    </div>
    <div class="no-search-results list-frame" hidden="[[matchingDefaultEngines_.length]]">
      لم يتم العثور على أي نتائج بحث
    </div>
    <settings-search-engines-list fixed-height="" hidden="[[!matchingDefaultEngines_.length]]" engines="[[matchingDefaultEngines_]]">
    </settings-search-engines-list>
    <template is="dom-if" if="[[showDialog_]]" restamp="">
      <settings-search-engine-dialog model="[[dialogModel_]]" on-close="onCloseDialog_">
      </settings-search-engine-dialog>
    </template>

    <div class="cr-row first">
      <h2 class="flex">محرّكات البحث الأخرى</h2>
      <cr-button class="secondary-button header-aligned-button" on-click="onAddSearchEngineTap_" id="addSearchEngine">
        إضافة
      </cr-button>
    </div>
    <div id="noOtherEngines" class="list-frame" hidden="[[otherEngines.length]]">
      ستظهر هنا محركات البحث المحفوظة الأخرى
    </div>
    <div class="no-search-results list-frame" hidden="[[!showNoResultsMessage_(
            otherEngines, matchingOtherEngines_)]]">
      لم يتم العثور على أي نتائج بحث
    </div>
    <settings-search-engines-list id="otherEngines" hidden="[[!matchingOtherEngines_.length]]" engines="[[matchingOtherEngines_]]" scroll-target="[[subpageScrollTarget]]">
    </settings-search-engines-list>
    <template is="dom-if" if="[[showExtensionsList_]]">
      <div class="cr-row first">
        <h2>محركات البحث المضافة بواسطة الإضافات</h2>
      </div>
      <div class="no-search-results list-frame" hidden="[[matchingExtensions_.length]]">
        لم يتم العثور على أي نتائج بحث
      </div>
      <iron-list id="extensions" class="extension-engines list-frame" items="[[matchingExtensions_]]" preserve-focus="" risk-selection="">
        <template>
          <settings-omnibox-extension-entry engine="[[item]]" focus-row-index="[[index]]" tabindex$="[[tabIndex]]" iron-list-tab-index="[[tabIndex]]" last-focused="{{omniboxExtensionlastFocused_}}" list-blurred="{{omniboxExtensionListBlurred_}}">
          </settings-omnibox-extension-entry>
        </template>
      </iron-list>
    </template>
<!--_html_template_end_-->`,behaviors:[GlobalScrollTargetBehavior,WebUIListenerBehavior],properties:{defaultEngines:Array,otherEngines:Array,extensions:Array,subpageRoute:{type:Object,value:routes.SEARCH_ENGINES},showExtensionsList_:{type:Boolean,computed:"computeShowExtensionsList_(extensions)"},filter:{type:String,value:""},matchingDefaultEngines_:{type:Array,computed:"computeMatchingEngines_(defaultEngines, filter)"},matchingOtherEngines_:{type:Array,computed:"computeMatchingEngines_(otherEngines, filter)"},matchingExtensions_:{type:Array,computed:"computeMatchingEngines_(extensions, filter)"},omniboxExtensionlastFocused_:Object,omniboxExtensionListBlurred_:Boolean,dialogModel_:{type:Object,value:null},dialogAnchorElement_:{type:Object,value:null},showDialog_:{type:Boolean,value:false}},observers:["extensionsChanged_(extensions, showExtensionsList_)"],listeners:{"edit-search-engine":"onEditSearchEngine_"},ready(){SearchEnginesBrowserProxyImpl.getInstance().getSearchEnginesList().then(this.enginesChanged_.bind(this));this.addWebUIListener("search-engines-changed",this.enginesChanged_.bind(this));afterNextRender(this,(function(){this.$.otherEngines.scrollOffset=this.$.otherEngines.offsetTop}))},openDialog_(searchEngine,anchorElement){this.dialogModel_=searchEngine;this.dialogAnchorElement_=anchorElement;this.showDialog_=true},onCloseDialog_(){this.showDialog_=false;const anchor=this.dialogAnchorElement_;focusWithoutInk(anchor);this.dialogModel_=null;this.dialogAnchorElement_=null},onEditSearchEngine_(e){this.openDialog_(e.detail.engine,e.detail.anchorElement)},extensionsChanged_(){if(this.showExtensionsList_&&this.$.extensions){this.$.extensions.notifyResize()}},enginesChanged_(searchEnginesInfo){this.defaultEngines=searchEnginesInfo.defaults;this.otherEngines=searchEnginesInfo.others.sort(((a,b)=>a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())));this.extensions=searchEnginesInfo.extensions},onAddSearchEngineTap_(e){e.preventDefault();this.openDialog_(null,assert(this.$.addSearchEngine))},computeShowExtensionsList_(){return this.extensions.length>0},computeMatchingEngines_(list){if(this.filter===""){return list}const filter=this.filter.toLowerCase();return list.filter((e=>[e.displayName,e.name,e.keyword,e.url].some((term=>term.toLowerCase().includes(filter)))))},showNoResultsMessage_(list,filteredList){return list.length>0&&filteredList.length===0}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"add-site-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="add-site-dialog">#incognito {
  padding-bottom: 10px;
}

</style>
    <cr-dialog id="dialog" close-text="إغلاق">
      <div slot="title">إضافة موقع إلكتروني</div>
      <div slot="body">
        <cr-input id="site" label="الموقع" placeholder="[*.]example.com" value="{{site_}}" on-input="validate_" error-message="{{errorMessage_}}" spellcheck="false" autofocus=""></cr-input>
        <cr-checkbox id="incognito" hidden$="[[!showIncognitoSessionOnly_(hasIncognito,
                contentSetting)]]">
          جلسة التصفح المتخفي الحالية فقط
        </cr-checkbox>
        <cr-checkbox id="thirdParties" hidden$="[[shouldHideThirdPartyCookieCheckbox_(category)]]">
          تضمين ملفات تعريف الارتباط التابعة لجهات خارجية على هذا الموقع الإلكتروني
        </cr-checkbox>
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onCancelTap_">
          إلغاء
        </cr-button>
        <cr-button class="action-button" id="add" on-click="onSubmit_" disabled="">
          إضافة
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[SiteSettingsBehavior,WebUIListenerBehavior],properties:{category:String,contentSetting:String,hasIncognito:{type:Boolean,observer:"hasIncognitoChanged_"},site_:String,errorMessage_:String},attached(){assert(this.category);assert(this.contentSetting);assert(typeof this.hasIncognito!=="undefined");this.$.dialog.showModal()},validate_(){if(this.$.site.value.trim()===""){this.$.site.invalid=false;this.$.add.disabled=true;return}this.browserProxy.isPatternValidForType(this.site_,this.category).then((({isValid:isValid,reason:reason})=>{this.$.site.invalid=!isValid;this.$.add.disabled=!isValid;this.errorMessage_=reason||""}))},onCancelTap_(){this.$.dialog.cancel()},onSubmit_(){assert(!this.$.add.disabled);let primaryPattern=this.site_;let secondaryPattern=SITE_EXCEPTION_WILDCARD;if(this.$.thirdParties.checked){primaryPattern=SITE_EXCEPTION_WILDCARD;secondaryPattern=this.site_}this.browserProxy.setCategoryPermissionForPattern(primaryPattern,secondaryPattern,this.category,this.contentSetting,this.$.incognito.checked);this.$.dialog.close()},showIncognitoSessionOnly_(){return this.hasIncognito&&!loadTimeData.getBoolean("isGuest")&&this.contentSetting!==ContentSetting.SESSION_ONLY},hasIncognitoChanged_(){if(!this.hasIncognito){this.$.incognito.checked=false}},shouldHideThirdPartyCookieCheckbox_(){return this.category!==ContentSettingsTypes.COOKIES}});// Copyright 2017 The Chromium Authors. All rights reserved.
Polymer({is:"settings-edit-exception-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-edit-exception-dialog"></style>
    <cr-dialog id="dialog">
      <div slot="title">تعديل موقع إلكتروني</div>
      <div slot="body">
        <cr-input label="الموقع" value="{{origin_}}" placeholder="[*.]example.com" on-input="validate_" error-message="{{errorMessage_}}" invalid="[[invalid_]]" autofocus="" spellcheck="false">
        </cr-input>
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onCancelTap_" id="cancel">إلغاء</cr-button>
        <cr-button id="actionButton" class="action-button" on-click="onActionButtonTap_" disabled="[[invalid_]]">
          حفظ
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,properties:{model:{type:Object,observer:"modelChanged_"},origin_:String,errorMessage_:String,invalid_:{type:Boolean,value:false}},browserProxy_:null,attached(){this.browserProxy_=SiteSettingsPrefsBrowserProxyImpl.getInstance();this.origin_=this.model.origin;this.$.dialog.showModal()},onCancelTap_(){this.$.dialog.close()},onActionButtonTap_(){if(this.model.origin!==this.origin_){this.browserProxy_.resetCategoryPermissionForPattern(this.model.origin,this.model.embeddingOrigin,this.model.category,this.model.incognito);this.browserProxy_.setCategoryPermissionForPattern(this.origin_,SITE_EXCEPTION_WILDCARD,this.model.category,this.model.setting,this.model.incognito)}this.$.dialog.close()},validate_(){if(this.$$("cr-input").value.trim()===""){this.invalid_=true;return}this.browserProxy_.isPatternValidForType(this.origin_,this.model.category).then((({isValid:isValid,reason:reason})=>{this.invalid_=!isValid;this.errorMessage_=reason||""}))},modelChanged_(){if(!this.model){this.$.dialog.cancel()}}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({is:"site-list-entry",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="site-list-entry">:host {
  padding-inline-end: 4px;
}

.settings-row {
  flex: 1
}

cr-policy-pref-indicator::part(tooltip) {
  display: none;
}

</style>
    <div class="list-item" focus-row-container="">
      <div class="settings-row" actionable$="[[allowNavigateToSiteDetail_]]" on-click="onOriginTap_">
        <site-favicon url="[[model.origin]]"></site-favicon>
        <div class="middle no-min-width">
          <div class="text-elide">
            <span class="url-directionality">
              [[computeDisplayName_(model)]]</span>
          </div>

          <!-- This div must not contain extra whitespace. -->
          <div class="secondary text-elide" id="siteDescription">[[computeSiteDescription_(model)]]</div>
        </div>
        <template is="dom-if" if="[[allowNavigateToSiteDetail_]]">
          <cr-icon-button class="subpage-arrow" aria-label$="[[computeDisplayName_(model)]]" aria-describedby="siteDescription" aria-roledescription="زر صفحة فرعية" focus-type="site-details" focus-row-control=""></cr-icon-button>
          <div class="separator"></div>
        </template>
      </div>
      <template is="dom-if" if="[[showPolicyPrefIndicator_]]">
        <cr-policy-pref-indicator pref="[[model]]" icon-aria-label="[[label]]" on-mouseenter="onShowTooltip_" on-focus="onShowTooltip_" focus-row-control="" focus-type="policy">
        </cr-policy-pref-indicator>
      </template>
      <template is="dom-if" if="[[model.incognito]]">
        <cr-tooltip-icon id="incognitoTooltip" icon-aria-label="ستتم إزالة هذا الاستثناء تلقائيًا بعد الخروج من جلسة التصفح المتخفي الحالية" icon-class="settings20:incognito" focus-row-control="" focus-type="incognito" on-mouseenter="onShowIncognitoTooltip_" on-focus="onShowIncognitoTooltip_"></cr-tooltip-icon>
      </template>
      <cr-icon-button id="resetSite" class="icon-delete-gray" hidden="[[shouldHideResetButton_(model, readOnlyList)]]" on-click="onResetButtonTap_" aria-label="إزالة" focus-row-control="" focus-type="reset"></cr-icon-button>
      <cr-icon-button id="actionMenuButton" class="icon-more-vert" hidden="[[shouldHideActionMenu_(model, readOnlyList)]]" on-click="onShowActionMenuTap_" title="مزيد من الإجراءات" focus-row-control="" focus-type="menu"></cr-icon-button>
    </div>
<!--_html_template_end_-->`,behaviors:[SiteSettingsBehavior,FocusRowBehavior],properties:{readOnlyList:{type:Boolean,value:false},model:{type:Object,observer:"onModelChanged_"},chooserType:{type:String,value:ChooserType.NONE},chooserObject:{type:Object,value:null},showPolicyPrefIndicator_:{type:Boolean,computed:"computeShowPolicyPrefIndicator_(model)"},allowNavigateToSiteDetail_:{type:Boolean,value:false}},onShowTooltip_(){const indicator=assert(this.$$("cr-policy-pref-indicator"));const text=indicator.indicatorTooltip_;this.fire("show-tooltip",{target:indicator,text:text})},onShowIncognitoTooltip_:function(){const tooltip=assert(this.$$("#incognitoTooltip"));const text=loadTimeData.getString("incognitoSiteExceptionDesc");this.fire("show-tooltip",{target:tooltip,text:text})},shouldHideResetButton_(){if(this.model===undefined){return false}return this.model.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED||!(this.readOnlyList||!!this.model.embeddingOrigin)},shouldHideActionMenu_(){if(this.model===undefined){return false}return this.model.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED||this.readOnlyList||!!this.model.embeddingOrigin},onOriginTap_(){if(!this.allowNavigateToSiteDetail_){return}Router.getInstance().navigateTo(routes.SITE_SETTINGS_SITE_DETAILS,new URLSearchParams("site="+this.model.origin))},computeDisplayName_(){if(this.model.embeddingOrigin&&this.model.category===ContentSettingsTypes.COOKIES&&this.model.origin.trim()===SITE_EXCEPTION_WILDCARD){return this.model.embeddingOrigin}return this.model.displayName},computeSiteDescription_(){let description="";if(this.model.isEmbargoed){assert(!this.model.embeddingOrigin,"Embedding origin should be empty for embargoed origin.");description=loadTimeData.getString("siteSettingsSourceEmbargo")}else if(this.model.embeddingOrigin){if(this.model.category===ContentSettingsTypes.COOKIES&&this.model.origin.trim()===SITE_EXCEPTION_WILDCARD){description=loadTimeData.getString("siteSettingsCookiesThirdPartyExceptionLabel")}else{description=loadTimeData.getStringF("embeddedOnHost",this.sanitizePort(this.model.embeddingOrigin))}}else if(this.category===ContentSettingsTypes.GEOLOCATION){description=loadTimeData.getString("embeddedOnAnyHost")}return description},computeShowPolicyPrefIndicator_(){return this.model.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED&&!!this.model.controlledBy},onResetButtonTap_(){if(this.chooserType!==ChooserType.NONE&&this.chooserObject!==null){this.browserProxy.resetChooserExceptionForSite(this.chooserType,this.model.origin,this.model.embeddingOrigin,this.chooserObject);return}this.browserProxy.resetCategoryPermissionForPattern(this.model.origin,this.model.embeddingOrigin,this.model.category,this.model.incognito)},onShowActionMenuTap_(){if(this.chooserType!==ChooserType.NONE){return}this.fire("show-action-menu",{anchor:this.$.actionMenuButton,model:this.model})},onModelChanged_(){if(!this.model){this.allowNavigateToSiteDetail_=false;return}this.browserProxy.isOriginValid(this.model.origin).then((valid=>{this.allowNavigateToSiteDetail_=valid}))}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"site-list",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="site-list"></style>
    <div id="category">
      <div class="cr-row first">
        <h2 class$="flex [[getCssClass_(enableContentSettingsRedesign_)]]">
          [[categoryHeader]]
        </h2>
        <cr-button id="addSite" class="header-aligned-button" hidden$="[[!showAddSiteButton_]]" on-click="onAddSiteTap_">
          إضافة
        </cr-button>
      </div>

      <cr-action-menu role-description="قائمة">
        <button class="dropdown-item" id="allow" on-click="onAllowTap_" hidden$="[[!showAllowAction_]]">
          سماح
        </button>
        <button class="dropdown-item" id="block" on-click="onBlockTap_" hidden$="[[!showBlockAction_]]">
          حظر
        </button>
        <button class="dropdown-item" id="sessionOnly" on-click="onSessionOnlyTap_" hidden$="[[!showSessionOnlyActionForSite_(actionMenuSite_)]]">
          محو عند الخروج
        </button>
        <button class="dropdown-item" id="edit" on-click="onEditTap_">
          تعديل
        </button>
        <button class="dropdown-item" id="reset" on-click="onResetTap_">
          إزالة
        </button>
      </cr-action-menu>

      <div class="list-frame" hidden$="[[hasSites_(sites.*)]]">
        <div class="list-item secondary">لم تتم إضافة أي مواقع</div>
      </div>
      <div class="list-frame" hidden$="[[!showNoSearchResults_(searchFilter, sites.*)]]">
        <div class="list-item secondary">لم يتم العثور على أي نتائج بحث</div>
      </div>
      <div class="list-frame menu-content vertical-list" id="listContainer" hidden$="[[!hasSites_(sites.*)]]">
        <iron-list items="[[getFilteredSites_(searchFilter, sites.*)]]" preserve-focus="" risk-selection="">
          <template>
            <site-list-entry model="[[item]]" read-only-list="[[readOnlyList]]" on-show-action-menu="onShowActionMenu_" tabindex$="[[tabIndex]]" first$="[[!index]]" iron-list-tab-index="[[tabIndex]]" last-focused="{{lastFocused_}}" list-blurred="{{listBlurred_}}" on-show-tooltip="onShowTooltip_" focus-row-index="[[index]]">
            </site-list-entry>
          </template>
        </iron-list>
      </div>
    </div>
    <paper-tooltip id="tooltip" hidden="[[!tooltipText_]]]" fit-to-visible-bounds="" manual-mode="" position="top">
      [[tooltipText_]]
    </paper-tooltip>
    <template is="dom-if" if="[[showEditExceptionDialog_]]" restamp="">
      <settings-edit-exception-dialog model="[[actionMenuSite_]]" on-close="onEditExceptionDialogClosed_">
      </settings-edit-exception-dialog>
    </template>
    <template is="dom-if" if="[[showAddSiteDialog_]]" restamp="">
      <add-site-dialog has-incognito="[[hasIncognito_]]" category="[[category]]" content-setting="[[categorySubtype]]" on-close="onAddSiteDialogClosed_">
      </add-site-dialog>
    </template>
<!--_html_template_end_-->`,behaviors:[SiteSettingsBehavior,WebUIListenerBehavior,ListPropertyUpdateBehavior],properties:{readOnlyList:{type:Boolean,value:false},categoryHeader:String,enableContentSettingsRedesign_:{type:Boolean,value(){return loadTimeData.getBoolean("enableContentSettingsRedesign")}},actionMenuSite_:Object,showEditExceptionDialog_:Boolean,sites:{type:Array,value(){return[]}},categorySubtype:{type:String,value:INVALID_CATEGORY_SUBTYPE},hasIncognito_:Boolean,showAddSiteButton_:{type:Boolean,computed:"computeShowAddSiteButton_(readOnlyList, category, "+"categorySubtype)"},showAddSiteDialog_:Boolean,showAllowAction_:Boolean,showBlockAction_:Boolean,showSessionOnlyAction_:Boolean,actions_:{readOnly:true,type:Object,values:{ALLOW:"Allow",BLOCK:"Block",RESET:"Reset",SESSION_ONLY:"SessionOnly"}},lastFocused_:Object,listBlurred_:Boolean,tooltipText_:String,searchFilter:String},activeDialogAnchor_:null,observers:["configureWidget_(category, categorySubtype)"],ready(){this.addWebUIListener("contentSettingSitePermissionChanged",this.siteWithinCategoryChanged_.bind(this));this.addWebUIListener("onIncognitoStatusChanged",this.onIncognitoStatusChanged_.bind(this));this.browserProxy.updateIncognitoStatus()},siteWithinCategoryChanged_(category,site){if(category===this.category){this.configureWidget_()}},onIncognitoStatusChanged_(hasIncognito){this.hasIncognito_=hasIncognito;if(this.categorySubtype===ContentSetting.SESSION_ONLY){return}this.populateList_()},configureWidget_(){if(this.category===undefined){return}if(this.browserProxy_===undefined){this.browserProxy_=SiteSettingsPrefsBrowserProxyImpl.getInstance()}this.setUpActionMenu_();this.populateList_();if(this.categorySubtype===ContentSetting.SESSION_ONLY){this.$.category.hidden=this.category!==ContentSettingsTypes.COOKIES}},hasSites_(){return this.sites.length>0},computeShowAddSiteButton_(){return!(this.readOnlyList||this.category===ContentSettingsTypes.FILE_SYSTEM_WRITE&&this.categorySubtype===ContentSetting.ALLOW)},showNoSearchResults_(){return this.sites.length>0&&this.getFilteredSites_().length===0},onAddSiteTap_(){assert(!this.readOnlyList);this.showAddSiteDialog_=true},onAddSiteDialogClosed_(){this.showAddSiteDialog_=false;focusWithoutInk(assert(this.$.addSite))},onShowTooltip_(e){this.tooltipText_=e.detail.text;const target=e.detail.target;const tooltip=this.$.tooltip;tooltip.target=target;tooltip.updatePosition();const hide=()=>{this.$.tooltip.hide();target.removeEventListener("mouseleave",hide);target.removeEventListener("blur",hide);target.removeEventListener("click",hide);this.$.tooltip.removeEventListener("mouseenter",hide)};target.addEventListener("mouseleave",hide);target.addEventListener("blur",hide);target.addEventListener("click",hide);this.$.tooltip.addEventListener("mouseenter",hide);this.$.tooltip.show()},populateList_(){this.browserProxy_.getExceptionList(this.category).then((exceptionList=>{this.processExceptions_(exceptionList);this.closeActionMenu_()}))},processExceptions_(exceptionList){let sites=exceptionList.filter((site=>site.setting!==ContentSetting.DEFAULT&&site.setting===this.categorySubtype)).map((site=>this.expandSiteException(site)));this.updateList("sites",(x=>x.origin),sites)},setUpActionMenu_(){this.showAllowAction_=this.categorySubtype!==ContentSetting.ALLOW;this.showBlockAction_=this.categorySubtype!==ContentSetting.BLOCK;this.showSessionOnlyAction_=this.categorySubtype!==ContentSetting.SESSION_ONLY&&this.category===ContentSettingsTypes.COOKIES},showSessionOnlyActionForSite_(){if(!this.actionMenuSite_||this.actionMenuSite_.incognito){return false}return this.showSessionOnlyAction_},setContentSettingForActionMenuSite_(contentSetting){assert(this.actionMenuSite_);this.browserProxy.setCategoryPermissionForPattern(this.actionMenuSite_.origin,this.actionMenuSite_.embeddingOrigin,this.category,contentSetting,this.actionMenuSite_.incognito)},onAllowTap_(){this.setContentSettingForActionMenuSite_(ContentSetting.ALLOW);this.closeActionMenu_()},onBlockTap_(){this.setContentSettingForActionMenuSite_(ContentSetting.BLOCK);this.closeActionMenu_()},onSessionOnlyTap_(){this.setContentSettingForActionMenuSite_(ContentSetting.SESSION_ONLY);this.closeActionMenu_()},onEditTap_(){this.$$("cr-action-menu").close();this.showEditExceptionDialog_=true},onEditExceptionDialogClosed_(){this.showEditExceptionDialog_=false;this.actionMenuSite_=null;if(this.activeDialogAnchor_){this.activeDialogAnchor_.focus();this.activeDialogAnchor_=null}},onResetTap_(){const site=this.actionMenuSite_;assert(site);this.browserProxy.resetCategoryPermissionForPattern(site.origin,site.embeddingOrigin,this.category,site.incognito);this.closeActionMenu_()},onShowActionMenu_(e){this.activeDialogAnchor_=e.detail.anchor;this.actionMenuSite_=e.detail.model;this.$$("cr-action-menu").showAt(this.activeDialogAnchor_)},closeActionMenu_(){this.actionMenuSite_=null;this.activeDialogAnchor_=null;const actionMenu=this.$$("cr-action-menu");if(actionMenu.open){actionMenu.close()}},getFilteredSites_(){if(!this.searchFilter){return this.sites.slice()}const propNames=["displayName","origin"];const searchFilter=this.searchFilter.toLowerCase();return this.sites.filter((site=>propNames.some((propName=>site[propName].toLowerCase().includes(searchFilter)))))},getCssClass_(){return this.enableContentSettingsRedesign_?"secondary":""}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-do-not-track-toggle",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-do-not-track-toggle"></style>
    <settings-toggle-button id="toggle" class="hr" label="إرسال طلب &quot;عدم التعقب&quot; مع زيارات التصفح" pref="{{prefs.enable_do_not_track}}" on-settings-boolean-control-change="onToggleChange_" no-set-pref="">
    </settings-toggle-button>
    <template is="dom-if" if="[[showDialog_]]" on-dom-change="onDomChange_" restamp="">
      <cr-dialog id="confirmDialog" close-text="إغلاق" on-cancel="onDialogCancel_" on-close="onDialogClosed_">
        <div slot="title">عدم التعقب</div>
        <div slot="body">إن تفعيل ميزة "عدم التعقب" يعني أنه سيتم تضمين طلب في حركة بيانات التصفّح. ويعتمد أي تأثير يحدث على ما إذا كان الموقع الإلكتروني سيستجيب للطلب، وعلى كيفية تفسير الطلب. على سبيل المثال، قد تستجيب بعض المواقع الإلكترونية لهذا الطلب عبر عرض إعلانات لا تستند إلى المواقع الإلكترونية الأخرى التي زرتها، بينما ستظل العديد من المواقع الإلكترونية تجمع بيانات تصفّحك وتستخدمها - مثلاً لتحسين الأمان وتقديم محتوى وخدمات وإعلانات واقتراحات على المواقع الإلكترونية وإعداد تقارير بالإحصاءات. <a target="_blank" href="https://support.google.com/chrome/?p=settings_do_not_track">مزيد من المعلومات</a></div>
        <div slot="button-container">
          <cr-button class="cancel-button" on-click="onDialogCancel_">
            إلغاء
          </cr-button>
          <cr-button class="action-button" on-click="onDialogConfirm_">
            التأكيد
          </cr-button>
        </div>
      </cr-dialog>
    </template>
<!--_html_template_end_-->`,properties:{prefs:{type:Object,notify:true},showDialog_:{type:Boolean,value:false}},onDomChange_(){if(this.showDialog_){this.$$("#confirmDialog").showModal()}},onToggleChange_(event){MetricsBrowserProxyImpl.getInstance().recordSettingsPageHistogram(PrivacyElementInteractions.DO_NOT_TRACK);const target=event.target;if(!target.checked){target.sendPrefChange();return}this.showDialog_=true},closeDialog_(){this.$$("#confirmDialog").close();this.showDialog_=false},onDialogClosed_(){focusWithoutInk(this.$.toggle)},onDialogConfirm_(){this.$.toggle.sendPrefChange();this.closeDialog_()},onDialogCancel_(){this.$.toggle.resetToPrefValue();this.closeDialog_()}});// Copyright 2020 The Chromium Authors. All rights reserved.
const CookiePrimarySetting={ALLOW_ALL:0,BLOCK_THIRD_PARTY_INCOGNITO:1,BLOCK_THIRD_PARTY:2,BLOCK_ALL:3};const NetworkPredictionOptions={ALWAYS:0,WIFI_ONLY:1,NEVER:2,DEFAULT:1};Polymer({is:"settings-cookies-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-cookies-page">img {
  width: 100%;
}

#generalControls {
  padding: 0 var(--cr-section-padding);
}

.bullet-line {
  align-items: center;
        display: flex;
        min-height: var(--settings-row-two-line-min-height);
}

.bullet-line.one-line {
  min-height: var(--settings-row-min-height);
}

.bullet-line > div {
  padding-inline-start: var(--cr-radio-button-size);
}

settings-collapse-radio-button {
  --settings-collapse-toggle-min-height: var(--settings-row-min-height);
}

settings-collapse-radio-button:not(:first-of-type) {
  --settings-collapse-separator-line: var(--cr-separator-line);
}

settings-collapse-radio-button .bullet-line:last-child {
  padding-bottom: 12px;
}

#exceptionHeader {
  padding: 0 var(--cr-section-padding);
}

</style>
    <picture>
      <source srcset="chrome://settings/images/cookies_banner_dark.svg" media="(prefers-color-scheme: dark">
      <img id="banner" alt="" src="chrome://settings/images/cookies_banner.svg">
    </picture>
    <div id="generalControls">
      <h2>إعدادات عامة</h2>
      <settings-radio-group id="primarySettingGroup" pref="{{prefs.generated.cookie_primary_setting}}" selectable-elements="cr-radio-button, settings-collapse-radio-button" on-change="onCookiePrimarySettingChanged_">
        <settings-collapse-radio-button id="allowAll" pref="[[prefs.generated.cookie_primary_setting]]" name="[[cookiePrimarySettingEnum_.ALLOW_ALL]]" label="السماح بملفّات تعريف الارتباط كلّها">
          <div slot="collapse">
            <div class="bullet-line">
              <iron-icon icon="settings:cookie"></iron-icon>
              <div class="secondary">يسمح هذا الإجراء للمواقع الإلكترونية باستخدام ملفات تعريف الارتباط لتحسين تجربة التصفُّح، مثل إبقائك مُسجِّلاً الدخول أو تذكُّر عناصر في سلة التسوق.</div>
            </div>
            <div class="bullet-line">
              <iron-icon icon="settings:cookie"></iron-icon>
              <div class="secondary">يسمح هذا الإجراء للمواقع الإلكترونية باستخدام ملفات تعريف الارتباط للاطّلاع على نشاط التصفُّح الخاص بك على المواقع الإلكترونية المختلفة، وذلك لتقديم إعلانات مخصَّصة لك مثلاً.</div>
            </div>
          </div>
        </settings-collapse-radio-button>
        <settings-collapse-radio-button id="blockThirdPartyIncognito" pref="[[prefs.generated.cookie_primary_setting]]" name="[[cookiePrimarySettingEnum_.BLOCK_THIRD_PARTY_INCOGNITO]]" label="حظر ملفات تعريف الارتباط التابعة لجهات خارجية في وضع التصفّح المتخفي">
          <div slot="collapse">
            <div class="bullet-line">
              <iron-icon icon="settings:cookie"></iron-icon>
              <div class="secondary">
                    يسمح هذا الإجراء للمواقع الإلكترونية باستخدام ملفات تعريف الارتباط لتحسين تجربة التصفُّح، مثل إبقائك مُسجِّلاً الدخول أو تذكُّر عناصر في سلة التسوق.
              </div>
            </div>
            <div class="bullet-line">
              <iron-icon icon="settings:block"></iron-icon>
              <div class="secondary">
                    في وضع التصفُّح المتخفي، لا يمكن للمواقع الإلكترونية استخدام ملفات تعريف الارتباط للاطّلاع على نشاط التصفّح على المواقع الإلكترونية المختلفة، بهدف تقديم إعلانات مخصّصة لك مثلاً. وقد تتوقف الميزات على بعض المواقع الإلكترونية.
              </div>
            </div>
          </div>
        </settings-collapse-radio-button>
        <settings-collapse-radio-button id="blockThirdParty" pref="[[prefs.generated.cookie_primary_setting]]" name="[[cookiePrimarySettingEnum_.BLOCK_THIRD_PARTY]]" label="حظر ملفات تعريف الارتباط للجهات الخارجية">
          <div slot="collapse">
            <div class="bullet-line">
              <iron-icon icon="settings:cookie"></iron-icon>
              <div class="secondary">يسمح هذا الإجراء للمواقع الإلكترونية باستخدام ملفات تعريف الارتباط لتحسين تجربة التصفُّح، مثل إبقائك مُسجِّلاً الدخول أو تذكُّر عناصر في سلة التسوق.</div>
            </div>
            <div class="bullet-line">
              <iron-icon icon="settings:block"></iron-icon>
              <div class="secondary">لن يسمح هذا الإجراء للمواقع الإلكترونية باستخدام ملفات تعريف الارتباط للاطّلاع على نشاط التصفّح على المواقع الإلكترونية المختلفة، بهدف تقديم إعلانات مخصّصة لك مثلاً. وقد تتوقف الميزات على بعض المواقع الإلكترونية.</div>
            </div>
          </div>
        </settings-collapse-radio-button>
        <settings-collapse-radio-button id="blockAll" pref="[[blockAllPref_]]" name="[[cookiePrimarySettingEnum_.BLOCK_ALL]]" label="حظر كل ملفات تعريف الارتباط (غير مُستحسَن)">
          <div slot="collapse">
            <div class="bullet-line">
              <iron-icon icon="settings:block"></iron-icon>
              <div class="secondary">يمنع هذا الإجراء المواقع الإلكترونية من استخدام ملفات تعريف الارتباط لتحسين تجربة التصفُّح، مثل إبقائك مُسجِّلاً الدخول أو تذكُّر عناصر في سلة التسوق.</div>
            </div>
            <div class="bullet-line">
              <iron-icon icon="settings:block"></iron-icon>
              <div class="secondary">لن يسمح هذا الإجراء للمواقع الإلكترونية باستخدام ملفات تعريف الارتباط للاطّلاع على نشاط التصفُّح على المواقع الإلكترونية المختلفة، وذلك لتقديم إعلانات مخصَّصة لك مثلاً.</div>
            </div>
            <div class="bullet-line one-line">
              <iron-icon icon="settings:block"></iron-icon>
              <div class="secondary">قد تتوقف الميزات عن العمل في العديد من المواقع الإلكترونية.</div>
            </div>
          </div>
        </settings-collapse-radio-button>
      </settings-radio-group>
    </div>
    <settings-toggle-button id="clearOnExit" class="hr" pref="{{prefs.generated.cookie_session_only}}" label="‏محو بيانات الموقع وملفات تعريف الارتباط عند الخروج من Chrome" on-settings-boolean-control-change="onClearOnExitChange_">
    </settings-toggle-button>
    <settings-do-not-track-toggle id="doNotTrack" prefs="{{prefs}}">
    </settings-do-not-track-toggle>
    <settings-toggle-button id="networkPrediction" class="hr" hidden="[[!pageVisibility.networkPrediction]]" label="التحميل المُسبق للصفحات للحصول على أداء أسرع أثناء التصفّح والبحث" sub-label="يتيح الجلب المُسبق للمعلومات من الصفحات بما في ذلك الصفحات التي لم تزُرها بعد. وقد تتضمّن المعلومات المجلوبة ملفات تعريف الارتباط في حال كنت تسمح بملفات تعريف الارتباط." pref="{{prefs.net.network_prediction_options}}" numeric-unchecked-value="[[networkPredictionUncheckedValue_]]" on-settings-boolean-control-change="onNetworkPredictionChange_">
    </settings-toggle-button>
    <cr-link-row id="site-data-trigger" class="hr" on-click="onSiteDataClick_" label="عرض جميع ملفات تعريف الارتباط وبيانات الموقع الإلكتروني
" role-description="زر صفحة فرعية">
    </cr-link-row>
    <div id="exceptionHeader" hidden="[[!enableContentSettingsRedesign_]]">
      <h2>الإعدادات المخصَّصة</h2>
    </div>
    <site-list id="allowExceptionsList" category="[[cookiesContentSettingType_]]" category-subtype="[[contentSetting_.ALLOW]]" category-header="المواقع الإلكترونية التي يمكنها استخدام ملفات تعريف الارتباط دائمًا" read-only-list="[[exceptionListsReadOnly_]]" search-filter="[[searchTerm]]">
    </site-list>
    <site-list id="sessionOnlyExceptionsList" category="[[cookiesContentSettingType_]]" category-subtype="[[contentSetting_.SESSION_ONLY]]" category-header="محو ملفات تعريف الارتباط عند إغلاق النوافذ دائمًا" read-only-list="[[exceptionListsReadOnly_]]" search-filter="[[searchTerm]]">
    </site-list>
    <site-list id="blockExceptionsList" category="[[cookiesContentSettingType_]]" category-subtype="[[contentSetting_.BLOCK]]" category-header="المواقع الإلكترونية التي لا يمكنها استخدام ملفات تعريف الارتباط" read-only-list="[[exceptionListsReadOnly_]]" search-filter="[[searchTerm]]">
    </site-list>
<!--_html_template_end_-->`,behaviors:[PrefsBehavior,WebUIListenerBehavior],properties:{prefs:{type:Object,notify:true},searchTerm:{type:String,notify:true,value:""},cookiePrimarySettingEnum_:{type:Object,value:CookiePrimarySetting},enableContentSettingsRedesign_:{type:Boolean,value(){return loadTimeData.getBoolean("enableContentSettingsRedesign")}},networkPredictionUncheckedValue_:{type:Number,value:NetworkPredictionOptions.NEVER},contentSetting_:{type:Object,value:ContentSetting},cookiesContentSettingType_:{type:String,value:ContentSettingsTypes.COOKIES},exceptionListsReadOnly_:{type:Boolean,value:false},blockAllPref_:{type:Object,value(){return{}}},focusConfig:{type:Object,observer:"focusConfigChanged_"}},observers:[`onGeneratedPrefsUpdated_(prefs.generated.cookie_session_only,\n      prefs.generated.cookie_primary_setting)`],metricsBrowserProxy_:null,ready(){this.metricsBrowserProxy_=MetricsBrowserProxyImpl.getInstance()},focusConfigChanged_(newConfig,oldConfig){assert(!oldConfig);assert(routes.SITE_SETTINGS_SITE_DATA);this.focusConfig.set(routes.SITE_SETTINGS_SITE_DATA.path,(()=>{focusWithoutInk(assert(this.$$("#site-data-trigger")))}))},onSiteDataClick_(){Router.getInstance().navigateTo(routes.SITE_SETTINGS_SITE_DATA)},onGeneratedPrefsUpdated_(){const sessionOnlyPref=this.getPref("generated.cookie_session_only");this.exceptionListsReadOnly_=sessionOnlyPref.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED;this.set("blockAllPref_",Object.assign(this.getPref("generated.cookie_primary_setting"),{controlledBy:sessionOnlyPref.controlledBy,controlledByName:sessionOnlyPref.controlledByName}))},onCookiePrimarySettingChanged_(){const selection=Number(this.$.primarySettingGroup.selected);if(selection===CookiePrimarySetting.ALLOW_ALL){this.metricsBrowserProxy_.recordSettingsPageHistogram(PrivacyElementInteractions.COOKIES_ALL)}else if(selection===CookiePrimarySetting.BLOCK_THIRD_PARTY_INCOGNITO){this.metricsBrowserProxy_.recordSettingsPageHistogram(PrivacyElementInteractions.COOKIES_INCOGNITO)}else if(selection===CookiePrimarySetting.BLOCK_THIRD_PARTY){this.metricsBrowserProxy_.recordSettingsPageHistogram(PrivacyElementInteractions.COOKIES_THIRD)}else{this.metricsBrowserProxy_.recordSettingsPageHistogram(PrivacyElementInteractions.COOKIES_BLOCK)}},onClearOnExitChange_(){this.metricsBrowserProxy_.recordSettingsPageHistogram(PrivacyElementInteractions.COOKIES_SESSION)},onNetworkPredictionChange_(){this.metricsBrowserProxy_.recordSettingsPageHistogram(PrivacyElementInteractions.NETWORK_PREDICTION)}});// Copyright 2019 The Chromium Authors. All rights reserved.
Polymer({is:"settings-security-keys-pin-field",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-security-keys-pin-field">cr-input {
  display: inline-block;
        padding-inline-end: 2em;
        --cr-input-width: 8em;
}

</style>

    <p>يُرجى إدخال رقم التعريف الشخصي لمفتاح الأمان. في حال كنت لا تعرف رقم التعريف الشخصي، عليك إعادة ضبط مفتاح الأمان.</p>
    <cr-input id="pin" value="{{value_}}" min-length="[[minPinLength]]" max-length="255" spellcheck="false" on-input="onPINInput_" invalid="[[isNonEmpty_(error_)]]" label="رقم التعريف الشخصي" tabindex="0" type$="[[inputType_(inputVisible_)]]" error-message="[[error_]]">
      <cr-icon-button slot="suffix" id="showButton" class$="[[showButtonClass_(inputVisible_)]]" title="[[showButtonTitle_(inputVisible_)]]" focus-row-control="" focus-type="showPassword" on-click="showButtonClick_"></cr-icon-button>
    </cr-input>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{minPinLength:{value:4,type:Number},error_:{type:String,observer:"errorChanged_"},value_:String,inputVisible_:{type:Boolean,value:false}},attached(){afterNextRender(this,(function(){IronA11yAnnouncer.requestAvailability()}))},focus(){this.$.pin.focus()},validate_(){const error=this.isValidPIN_(this.value_);if(error!==""){this.error_=error;return false}return true},trySubmit(submitFunc){if(!this.validate_()){this.focus();return Promise.reject()}return submitFunc(this.value_).then((retries=>{if(retries!=null){this.showIncorrectPINError_(retries);this.focus();return Promise.reject()}}))},showIncorrectPINError_(retries){let error;if(1<retries&&retries<=3){error=this.i18n("securityKeysPINIncorrectRetriesPl",retries.toString())}else if(retries===1){error=this.i18n("securityKeysPINIncorrectRetriesSin")}else{error=this.i18n("securityKeysPINIncorrect")}this.error_=error},onPINInput_(){this.error_=""},isNonEmpty_(s){return s!==""},inputType_(){return this.inputVisible_?"text":"password"},showButtonClass_(){return"icon-visibility"+(this.inputVisible_?"-off":"")},showButtonTitle_(){return this.i18n(this.inputVisible_?"securityKeysHidePINs":"securityKeysShowPINs")},showButtonClick_(){this.inputVisible_=!this.inputVisible_},isValidPIN_(pin){const utf8Encoded=(new TextEncoder).encode(pin);if(utf8Encoded.length<this.minPinLength){return this.i18n("securityKeysPINTooShort")}if(utf8Encoded.length>63||utf8Encoded[utf8Encoded.length-1]===0){return this.i18n("securityKeysPINTooLong")}let length=0;for(const codepoint of pin){length++}if(length<this.minPinLength){return this.i18n("securityKeysPINTooShort")}return""},errorChanged_(){this.fire("iron-announce",{text:this.error_})}});// Copyright 2019 The Chromium Authors. All rights reserved.
const Ctap2Status={OK:0,ERR_INVALID_OPTION:44,ERR_KEEPALIVE_CANCEL:45};const SampleStatus={OK:0};class SecurityKeysPINBrowserProxyImpl{startSetPIN(){return sendWithPromise("securityKeyStartSetPIN")}setPIN(oldPIN,newPIN){return sendWithPromise("securityKeySetPIN",oldPIN,newPIN)}close(){return chrome.send("securityKeyPINClose")}}class SecurityKeysCredentialBrowserProxyImpl{startCredentialManagement(){return sendWithPromise("securityKeyCredentialManagementStart")}providePIN(pin){return sendWithPromise("securityKeyCredentialManagementPIN",pin)}enumerateCredentials(){return sendWithPromise("securityKeyCredentialManagementEnumerate")}deleteCredentials(ids){return sendWithPromise("securityKeyCredentialManagementDelete",ids)}close(){return chrome.send("securityKeyCredentialManagementClose")}}class SecurityKeysResetBrowserProxyImpl{reset(){return sendWithPromise("securityKeyReset")}completeReset(){return sendWithPromise("securityKeyCompleteReset")}close(){return chrome.send("securityKeyResetClose")}}class SecurityKeysBioEnrollProxyImpl{startBioEnroll(){return sendWithPromise("securityKeyBioEnrollStart")}providePIN(pin){return sendWithPromise("securityKeyBioEnrollProvidePIN",pin)}enumerateEnrollments(){return sendWithPromise("securityKeyBioEnrollEnumerate")}startEnrolling(){return sendWithPromise("securityKeyBioEnrollStartEnrolling")}cancelEnrollment(){return chrome.send("securityKeyBioEnrollCancel")}deleteEnrollment(id){return sendWithPromise("securityKeyBioEnrollDelete",id)}renameEnrollment(id,name){return sendWithPromise("securityKeyBioEnrollRename",id,name)}close(){return chrome.send("securityKeyBioEnrollClose")}}addSingletonGetter(SecurityKeysPINBrowserProxyImpl);addSingletonGetter(SecurityKeysCredentialBrowserProxyImpl);addSingletonGetter(SecurityKeysResetBrowserProxyImpl);addSingletonGetter(SecurityKeysBioEnrollProxyImpl);// Copyright 2019 The Chromium Authors. All rights reserved.
const CredentialManagementDialogPage={INITIAL:"initial",PIN_PROMPT:"pinPrompt",CREDENTIALS:"credentials",ERROR:"error"};Polymer({is:"settings-security-keys-credential-management-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-security-keys-credential-management-dialog">paper-spinner-lite {
  padding-bottom: 12px;
}

#header {
  display: flex;
}

.site {
  flex: 3;
}

.user {
  flex: 2;
}

.list-item .site {
  align-items: center;
        display: flex;
}

.list-item .site, .list-item .user {
  word-break: break-word;
}

site-favicon {
  margin-inline-end: 8px;
        min-width: 16px;
}

.checkbox-placeholder {
  width: var(--cr-icon-ripple-size);
}

</style>

    <cr-dialog id="dialog" close-text="إلغاء" ignore-popstate="" on-close="onDialogClosed_">
      <div slot="title">بيانات تسجيل الدخول على مفتاح الأمان</div>

      <div slot="body">
        <iron-pages attr-for-selected="id" selected="[[dialogPage_]]" on-iron-select="onIronSelect_">
          <div id="initial">
            <p>للمواصلة، يُرجى إدخال مفتاح الأمان ولمسه.</p>
            <paper-spinner-lite active=""></paper-spinner-lite>
          </div>

          <div id="pinPrompt">
            <settings-security-keys-pin-field id="pin" min-pin-length="[[minPinLength_]]">
            </settings-security-keys-pin-field>
          </div>

          <div id="credentials">
            <div id="header" class="list-item column-header">
              <div class="checkbox-placeholder"></div>
              <div class="site">موقع إلكتروني</div>
              <div class="user">اسم المستخدم</div>
            </div>

            <div id="container">
              <iron-list id="credentialList" items="[[credentials_]]" class="cr-separators list-with-header">
                <template>
                  <div class="list-item">
                    <cr-checkbox on-change="checkedCredentialsChanged_" data-id$="[[item.id]]" checked="[[credentialIsChecked_(item.id)]]" disabled="[[deleteInProgress_]]"></cr-checkbox>
                    <div class="site" aria-label="[[item.relyingPartyId]]">
                      <site-favicon url="[[item.relyingPartyId]]">
                      </site-favicon>
                      <div>[[item.relyingPartyId]]</div>
                    </div>
                    <div class="user">[[formatUser_(item)]]</div>
                  </div>
                </template>
              </iron-list>
            </div>
          </div>

          <div id="error">[[errorMsg_]]</div>
        </iron-pages>
      </div>

      <div slot="button-container">
        <cr-button id="cancelButton" class="cancel-button" on-click="close_" hidden="[[!cancelButtonVisible_]]">
          إلغاء
        </cr-button>
        <cr-button id="confirmButton" class="action-button" on-click="confirmButtonClick_" disabled="[[confirmButtonDisabled_]]" hidden="[[!confirmButtonVisible_]]">
          [[confirmButtonLabel_]]
        </cr-button>
        <cr-button id="closeButton" class="action-button" on-click="close_" hidden="[[!closeButtonVisible_]]">
          إغلاق
        </cr-button>
      </div>
    </cr-dialog>

<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{dialogPage_:{type:String,value:CredentialManagementDialogPage.INITIAL,observer:"dialogPageChanged_"},credentials_:Array,errorMsg_:String,cancelButtonVisible_:Boolean,confirmButtonVisible_:Boolean,confirmButtonDisabled_:Boolean,confirmButtonLabel_:String,closeButtonVisible_:Boolean,deleteInProgress_:Boolean,minPinLength_:Number},browserProxy_:null,checkedCredentialIds_:null,showSetPINButton_:false,attached(){this.$.dialog.showModal();this.addWebUIListener("security-keys-credential-management-finished",this.onError_.bind(this));this.checkedCredentialIds_=new Set;this.browserProxy_=SecurityKeysCredentialBrowserProxyImpl.getInstance();this.browserProxy_.startCredentialManagement().then((([minPinLength])=>{this.minPinLength_=minPinLength;this.dialogPage_=CredentialManagementDialogPage.PIN_PROMPT}))},onError_(error,requiresPINChange=false){this.errorMsg_=error;this.showSetPINButton_=requiresPINChange;this.dialogPage_=CredentialManagementDialogPage.ERROR},submitPIN_(){this.confirmButtonDisabled_=true;this.$.pin.trySubmit((pin=>this.browserProxy_.providePIN(pin))).then((()=>{this.browserProxy_.enumerateCredentials().then(this.onCredentials_.bind(this))}),(()=>{this.confirmButtonDisabled_=false}))},onCredentials_(credentials){if(!credentials.length){this.onError_(this.i18n("securityKeysCredentialManagementNoCredentials"));return}this.credentials_=credentials;this.$.credentialList.fire("iron-resize");this.dialogPage_=CredentialManagementDialogPage.CREDENTIALS},dialogPageChanged_(){switch(this.dialogPage_){case CredentialManagementDialogPage.INITIAL:this.cancelButtonVisible_=true;this.confirmButtonVisible_=false;this.closeButtonVisible_=false;break;case CredentialManagementDialogPage.PIN_PROMPT:this.cancelButtonVisible_=true;this.confirmButtonLabel_=this.i18n("continue");this.confirmButtonDisabled_=false;this.confirmButtonVisible_=true;this.closeButtonVisible_=false;this.$.pin.focus();break;case CredentialManagementDialogPage.CREDENTIALS:this.cancelButtonVisible_=true;this.confirmButtonLabel_=this.i18n("delete");this.confirmButtonDisabled_=true;this.confirmButtonVisible_=true;this.closeButtonVisible_=false;break;case CredentialManagementDialogPage.ERROR:this.cancelButtonVisible_=true;this.confirmButtonLabel_=this.i18n("securityKeysSetPinButton");this.confirmButtonVisible_=this.showSetPINButton_;this.closeButtonVisible_=false;break;default:assertNotReached()}this.fire("credential-management-dialog-ready-for-testing")},confirmButtonClick_(){switch(this.dialogPage_){case CredentialManagementDialogPage.PIN_PROMPT:this.submitPIN_();break;case CredentialManagementDialogPage.CREDENTIALS:this.deleteSelectedCredentials_();break;case CredentialManagementDialogPage.ERROR:this.$.dialog.close();this.fire("credential-management-set-pin");break;default:assertNotReached()}},close_(){this.$.dialog.close()},formatUser_(credential){if(this.isEmpty_(credential.userDisplayName)){return credential.userName}return`${credential.userDisplayName} (${credential.userName})`},onDialogClosed_(){this.browserProxy_.close()},isEmpty_(str){return!str||str.length===0},onIronSelect_(e){e.stopPropagation()},checkedCredentialsChanged_(e){const credentialId=e.target.dataset.id;if(e.target.checked){this.checkedCredentialIds_.add(credentialId)}else{this.checkedCredentialIds_.delete(credentialId)}this.confirmButtonDisabled_=this.checkedCredentialIds_.size===0},credentialIsChecked_(credentialId){return this.checkedCredentialIds_.has(credentialId)},deleteSelectedCredentials_(){assert(this.dialogPage_===CredentialManagementDialogPage.CREDENTIALS);assert(this.credentials_&&this.credentials_.length>0);assert(this.checkedCredentialIds_.size>0);this.confirmButtonDisabled_=true;this.deleteInProgress_=true;this.browserProxy_.deleteCredentials(Array.from(this.checkedCredentialIds_)).then((error=>{this.confirmButtonDisabled_=false;this.deleteInProgress_=false;this.onError_(error)}))}});const template$2=html`<iron-iconset-svg name="cr-fingerprint-icon" size="32">
  <svg>
    <defs>
      <g id="enrollment-done" viewBox="0 0 93 104">
        <path fill="#3E82F1" d="M75.346031,12.4513714 C65.426031,7.33637143 56.8487739,5.16637143 46.5674024,5.16637143 C36.3374024,5.16637143 26.6237739,7.595 17.7896596,12.4513714 C16.5487739,13.1227429 14.9987739,12.6577429 14.276031,11.4177429 C13.6046596,10.1777429 14.0696596,8.57637143 15.3096596,7.905 C24.9196596,2.68637143 35.4596596,0 46.5674024,0 C57.5732882,0 67.1824024,2.42774286 77.7232882,7.85274286 C79.0146596,8.525 79.4796596,10.075 78.8074024,11.315 C78.3424024,12.245 77.4646596,12.7613714 76.5346596,12.7613714 C76.121031,12.7613714 75.7074024,12.6577429 75.346031,12.4513714 Z">
        </path>
        <path fill="#32A753" d="M1.10147387,39.4213714 C-0.0871547017,38.595 -0.344897559,36.9927429 0.480588155,35.805 C5.59647387,28.5713714 12.1055882,22.8877429 19.8555882,18.91 C36.0801024,10.54 56.8492167,10.4877429 73.1242167,18.8577429 C80.8742167,22.8363714 87.3851024,28.4677429 92.4992167,35.65 C93.3264739,36.7863714 93.0678453,38.44 91.8801024,39.2663714 C90.6914739,40.0927429 89.0892167,39.835 88.2628453,38.6463714 C83.6128453,32.1363714 77.7228453,27.0213714 70.7478453,23.4563714 C55.9192167,15.8613714 36.9578453,15.8613714 22.1805882,23.5077429 C15.1551024,27.125 9.26421673,32.2913714 4.61421673,38.8013714 C4.20147387,39.525 3.42647387,39.8863714 2.59921673,39.8863714 C2.0828453,39.8863714 1.56647387,39.7313714 1.10147387,39.4213714 Z">
        </path>
        <path fill="#F9BB00" d="M33.0827567,101.473097 C28.5877567,96.9780971 26.1600139,94.0844686 22.6977567,87.8330971 C19.1327567,81.4780971 17.2727567,73.7280971 17.2727567,65.4094686 C17.2727567,50.0644686 30.3963853,37.5617257 46.5163853,37.5617257 C62.6354996,37.5617257 75.7600139,50.0644686 75.7600139,65.4094686 C75.7600139,66.8567257 74.6227567,67.9930971 73.1763853,67.9930971 C71.7300139,67.9930971 70.5927567,66.8567257 70.5927567,65.4094686 C70.5927567,52.9067257 59.7941282,42.7280971 46.5163853,42.7280971 C33.2377567,42.7280971 22.4391282,52.9067257 22.4391282,65.4094686 C22.4391282,72.8494686 24.0927567,79.7217257 27.2441282,85.3017257 C30.5513853,91.2430971 32.8241282,93.7744686 36.8027567,97.8044686 C37.7850139,98.8380971 37.7850139,100.439469 36.8027567,101.473097 C36.2350139,101.989469 35.5627567,102.248097 34.8913853,102.248097 C34.2191282,102.248097 33.5477567,101.989469 33.0827567,101.473097 Z">
        </path>
        <path fill="#E74133" d="M55.9193939,88.0911057 C48.221651,82.8733629 43.6230224,74.3997343 43.6230224,65.4097343 C43.6230224,63.9633629 44.7593939,62.8261057 46.2057653,62.8261057 C47.6530224,62.8261057 48.7893939,63.9633629 48.7893939,65.4097343 C48.7893939,72.6947343 52.5093939,79.5661057 58.8130224,83.8033629 C62.4807653,86.2833629 66.7693939,87.4711057 71.9357653,87.4711057 C73.1757653,87.4711057 75.2421367,87.3161057 77.3093939,86.9547343 C78.7052796,86.6961057 80.0480224,87.6261057 80.3057653,89.0733629 C80.5643939,90.4683629 79.6343939,91.8111057 78.1880224,92.0697343 C75.2421367,92.6383629 72.6593939,92.6897343 71.9357653,92.6897343 C65.7880224,92.6897343 60.3630224,91.1397343 55.9193939,88.0911057 Z">
        </path>
        <path fill="#3E82F1" d="M60.8797482,103.229557 C52.6647482,100.955929 47.2911196,97.9081857 41.6597482,92.3795571 C34.4261196,85.1981857 30.4483767,75.6395571 30.4483767,65.4095571 C30.4483767,57.0395571 37.5783767,50.2195571 46.3611196,50.2195571 C55.1447482,50.2195571 62.2738624,57.0395571 62.2738624,65.4095571 C62.2738624,70.9381857 67.0797482,75.4331857 73.0211196,75.4331857 C78.962491,75.4331857 83.767491,70.9381857 83.767491,65.4095571 C83.767491,45.9309286 66.9761196,30.1218143 46.3097482,30.1218143 C31.6361196,30.1218143 18.2033767,38.2845571 12.157491,50.9431857 C10.142491,55.1281857 9.10974816,60.0359286 9.10974816,65.4095571 C9.10974816,69.4395571 9.47111958,75.7945571 12.5711196,84.0609286 C13.087491,85.4045571 12.4161196,86.9031857 11.0733767,87.3681857 C9.72974816,87.8845571 8.23111958,87.1609286 7.76611958,85.8695571 C5.23474816,79.1018143 3.99474816,72.3845571 3.99474816,65.4095571 C3.99474816,59.2095571 5.18249101,53.5781857 7.50749101,48.6695571 C14.3797482,34.2545571 29.6211196,24.9031857 46.3097482,24.9031857 C69.817491,24.9031857 88.9347482,43.0381857 88.9347482,65.3581857 C88.9347482,73.7281857 81.8047482,80.5481857 73.0211196,80.5481857 C64.237491,80.5481857 57.107491,73.7281857 57.107491,65.3581857 C57.107491,59.8295571 52.3033767,55.3345571 46.3611196,55.3345571 C40.4197482,55.3345571 35.6147482,59.8295571 35.6147482,65.3581857 C35.6147482,74.1931857 39.0238624,82.4595571 45.2761196,88.6595571 C50.1847482,93.5168143 54.8861196,96.2031857 62.1711196,98.2181857 C63.5661196,98.5795571 64.3411196,100.026814 63.9797482,101.369557 C63.7211196,102.558186 62.6361196,103.333186 61.5511196,103.333186 C61.3447482,103.333186 61.0861196,103.280929 60.8797482,103.229557 Z">
        </path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg>
`;document.head.appendChild(template$2.content);// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const LOTTIE_JS_URL="chrome://resources/lottie/lottie_worker.min.js";Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-lottie">canvas {
  height: 100%;
        width: 100%;
}

</style>
    <canvas id="canvas" hidden="[[hidden]]"></canvas>
<!--_html_template_end_-->`,is:"cr-lottie",properties:{animationUrl:{type:String,value:"",observer:"animationUrlChanged_"},autoplay:{type:Boolean,value:false},hidden:{type:Boolean,value:false},singleLoop:{type:Boolean,value:false}},canvasElement_:null,isAnimationLoaded_:false,offscreenCanvas_:null,hasTransferredCanvas_:false,resizeObserver_:null,worker_:null,xhr_:null,attached(){this.sendXmlHttpRequest_(LOTTIE_JS_URL,"blob",function(response){if(this.isAttached){this.worker_=new Worker(URL.createObjectURL(response));this.worker_.onmessage=this.onMessage_.bind(this);this.initialize_()}}.bind(this))},detached(){if(this.resizeObserver_){this.resizeObserver_.disconnect()}if(this.worker_){this.worker_.terminate();this.worker_=null}if(this.xhr_){this.xhr_.abort();this.xhr_=null}},setPlay(shouldPlay){if(this.isAnimationLoaded_){this.worker_.postMessage({control:{play:shouldPlay}})}else{this.autoplay=shouldPlay}},initialize_(){this.canvasElement_=this.$.canvas;this.offscreenCanvas_=this.canvasElement_.transferControlToOffscreen();this.resizeObserver_=new ResizeObserver(this.onCanvasElementResized_.bind(this));this.resizeObserver_.observe(this.canvasElement_);if(this.isAnimationLoaded_){return}this.sendXmlHttpRequest_(this.animationUrl,"json",this.initAnimation_.bind(this))},animationUrlChanged_(animationUrl,oldAnimationUrl){if(!this.worker_){return}if(this.xhr_){this.xhr_.abort();this.xhr_=null}if(this.isAnimationLoaded_){this.worker_.postMessage({control:{stop:true}});this.isAnimationLoaded_=false}this.sendXmlHttpRequest_(this.animationUrl,"json",this.initAnimation_.bind(this))},getCanvasDrawBufferSize_(){const canvasElement=this.$.canvas;const devicePixelRatio=window.devicePixelRatio;const clientRect=canvasElement.getBoundingClientRect();const drawSize={width:clientRect.width*devicePixelRatio,height:clientRect.height*devicePixelRatio};return drawSize},isValidUrl_(maybeValidUrl){const url=new URL(maybeValidUrl,document.location.href);return url.protocol==="chrome:"||url.protocol==="data:"&&url.pathname.startsWith("application/json;")},sendXmlHttpRequest_(url,responseType,successCallback){assert(this.isValidUrl_(url),"Invalid scheme or data url used.");assert(!this.xhr_);this.xhr_=new XMLHttpRequest;this.xhr_.open("GET",url,true);this.xhr_.responseType=responseType;this.xhr_.send();this.xhr_.onreadystatechange=()=>{if(this.xhr_.readyState===4&&this.xhr_.status===200){const response=this.xhr_.response;this.xhr_=null;successCallback(response)}}},onCanvasElementResized_(){if(this.isAnimationLoaded_){this.worker_.postMessage({drawSize:this.getCanvasDrawBufferSize_()})}},initAnimation_(animationData){const message=[{animationData:animationData,drawSize:this.getCanvasDrawBufferSize_(),params:{loop:!this.singleLoop,autoplay:this.autoplay}}];if(!this.hasTransferredCanvas_){message[0].canvas=this.offscreenCanvas_;message.push([this.offscreenCanvas_]);this.hasTransferredCanvas_=true}this.worker_.postMessage(...message)},onMessage_(event){if(event.data.name==="initialized"&&event.data.success){this.isAnimationLoaded_=true;this.fire("cr-lottie-initialized")}else if(event.data.name==="playing"){this.fire("cr-lottie-playing")}else if(event.data.name==="paused"){this.fire("cr-lottie-paused")}else if(event.data.name==="stopped"){this.fire("cr-lottie-stopped")}else if(event.data.name==="resized"){this.fire("cr-lottie-resized",event.data.size)}}});// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const FINGEPRINT_TICK_DARK_URL="chrome://theme/IDR_FINGERPRINT_COMPLETE_TICK_DARK";const FINGEPRINT_TICK_LIGHT_URL="chrome://theme/IDR_FINGERPRINT_COMPLETE_TICK";const ANIMATE_TICKS_MS=20;const ANIMATE_DURATION_MS=200;const DEFAULT_CANVAS_CIRCLE_RADIUS=114;const ICON_HEIGHT=118;const ICON_WIDTH=106;const CHECK_MARK_SIZE=53;const FINGERPRINT_SCAN_SUCCESS_MS=500;const CANVAS_CIRCLE_STROKE_WIDTH=4;const CANVAS_CIRCLE_BACKGROUND_COLOR="rgba(218, 220, 224, 1.0)";const CANVAS_CIRCLE_PROGRESS_COLOR="rgba(66, 133, 224, 1.0)";Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-fingerprint-progress-arc">:host {
  user-select: none;
}

.translucent {
  opacity: 0.3;
}

#canvasDiv {
  height: 240px;
        overflow: hidden;
        position: relative;
        width:  460px;
}

cr-lottie {
  display: inline-block;
        position: absolute;
}

#enrollmentDone {
  position: absolute;
}

</style>

    <div id="canvasDiv">
      <canvas id="canvas" height="240" width="460"></canvas>
      <cr-lottie id="scanningAnimation" aria-hidden="true" autoplay="[[autoplay]]">
      </cr-lottie>
      <iron-icon id="enrollmentDone" icon="cr-fingerprint-icon:enrollment-done" hidden="">
      </iron-icon>
    </div>
<!--_html_template_end_-->`,is:"cr-fingerprint-progress-arc",properties:{circleRadius:{type:Number,value:DEFAULT_CANVAS_CIRCLE_RADIUS},autoplay:{type:Boolean,value:false},scale_:{type:Number,value:1},isComplete_:Boolean},canvasCircleStrokeWidth:CANVAS_CIRCLE_STROKE_WIDTH,canvasCircleBackgroundColor:CANVAS_CIRCLE_BACKGROUND_COLOR,canvasCircleProgressColor:CANVAS_CIRCLE_PROGRESS_COLOR,progressAnimationIntervalId_:undefined,updateTimerId_:undefined,darkModeQuery_:undefined,darkModeListener_:undefined,attached(){this.scale_=this.circleRadius/DEFAULT_CANVAS_CIRCLE_RADIUS;this.updateImages_();this.darkModeListener_=this.updateAnimationAsset_.bind(this);this.darkModeQuery_=window.matchMedia("(prefers-color-scheme: dark)");this.darkModeQuery_.addListener(this.darkModeListener_);this.updateAnimationAsset_()},detached(){this.darkModeQuery_.removeListener(this.darkModeListener_);this.darkModeListener_=undefined},drawArc(startAngle,endAngle,color){const c=this.$.canvas;const ctx=c.getContext("2d");ctx.beginPath();ctx.arc(c.width/2,c.height/2,this.circleRadius,startAngle,endAngle);ctx.lineWidth=this.canvasCircleStrokeWidth;ctx.strokeStyle=color;ctx.stroke()},drawBackgroundCircle(){this.drawArc(0,2*Math.PI,this.canvasCircleBackgroundColor)},setProgress(prevPercentComplete,currPercentComplete,isComplete){if(this.isComplete_){return}this.isComplete_=isComplete;this.cancelAnimations_();const slice=2*Math.PI/100;const startAngle=prevPercentComplete*slice;const endAngle=isComplete?2*Math.PI:Math.min(2*Math.PI,currPercentComplete*slice);let currentAngle=startAngle;const step=(endAngle-startAngle)/(ANIMATE_DURATION_MS/ANIMATE_TICKS_MS);const doAnimate=()=>{if(currentAngle>=endAngle){if(this.progressAnimationIntervalId_){clearInterval(this.progressAnimationIntervalId_);this.progressAnimationIntervalId_=undefined}currentAngle=endAngle}this.clearCanvas_();this.drawArc(start,start+currentAngle,this.canvasCircleProgressColor);this.drawArc(start+currentAngle,currentAngle<=0?7*Math.PI/2:start,this.canvasCircleBackgroundColor);currentAngle+=step};this.progressAnimationIntervalId_=setInterval(doAnimate,ANIMATE_TICKS_MS);const start=3*Math.PI/2;if(isComplete){this.animateScanComplete_()}else{this.animateScanProgress_()}},setPlay(shouldPlay){const scanningAnimation=this.$.scanningAnimation;scanningAnimation.setPlay(shouldPlay)},updateAnimationAsset_(){const scanningAnimation=this.$.scanningAnimation;if(this.isComplete_){scanningAnimation.animationUrl=this.darkModeQuery_.matches?FINGEPRINT_TICK_DARK_URL:FINGEPRINT_TICK_LIGHT_URL;return}scanningAnimation.animationUrl="chrome://theme/IDR_FINGERPRINT_ICON_ANIMATION"},cancelAnimations_(){if(this.progressAnimationIntervalId_){clearInterval(this.progressAnimationIntervalId_);this.progressAnimationIntervalId_=undefined}if(this.updateTimerId_){window.clearTimeout(this.updateTimerId_);this.updateTimerId_=undefined}},animateScanComplete_(){const scanningAnimation=this.$.scanningAnimation;scanningAnimation.singleLoop=true;scanningAnimation.classList.remove("translucent");this.updateAnimationAsset_();this.resizeCheckMark_(scanningAnimation);this.$.enrollmentDone.hidden=false},animateScanProgress_(){this.$.enrollmentDone.hidden=false;this.updateTimerId_=window.setTimeout((()=>{this.$.enrollmentDone.hidden=true}),FINGERPRINT_SCAN_SUCCESS_MS)},clearCanvas_(){const c=this.$.canvas;const ctx=c.getContext("2d");ctx.clearRect(0,0,c.width,c.height)},reset(){this.cancelAnimations_();this.clearCanvas_();this.isComplete_=false;this.drawBackgroundCircle();this.$.enrollmentDone.hidden=true;const scanningAnimation=this.$.scanningAnimation;scanningAnimation.singleLoop=false;scanningAnimation.classList.add("translucent");this.updateAnimationAsset_();this.resizeAndCenterIcon_(scanningAnimation);scanningAnimation.hidden=false},updateImages_(){this.resizeAndCenterIcon_(this.$.scanningAnimation);this.resizeAndCenterIcon_(this.$.enrollmentDone)},resizeAndCenterIcon_(target){target.style.width=ICON_WIDTH*this.scale_+"px";target.style.height=ICON_HEIGHT*this.scale_+"px";const left=this.$.canvas.width/2-ICON_WIDTH*this.scale_/2;const top=this.$.canvas.height/2-ICON_HEIGHT*this.scale_/2;target.style.left=left+"px";target.style.top=top+"px"},resizeCheckMark_(target){target.style.width=CHECK_MARK_SIZE*this.scale_+"px";target.style.height=CHECK_MARK_SIZE*this.scale_+"px";const top=this.$.canvas.height/2+this.circleRadius-CHECK_MARK_SIZE*this.scale_;const left=this.$.canvas.width/2+this.circleRadius-CHECK_MARK_SIZE*this.scale_;target.style.left=left+"px";target.style.top=top+"px"},isComplete(){return this.isComplete_}});// Copyright 2019 The Chromium Authors. All rights reserved.
const BioEnrollDialogPage={INITIAL:"initial",PIN_PROMPT:"pinPrompt",ENROLLMENTS:"enrollments",ENROLL:"enroll",CHOOSE_NAME:"chooseName",ERROR:"error"};Polymer({is:"settings-security-keys-bio-enroll-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-security-keys-bio-enroll-dialog">div[slot='body'] {
  padding-inline-end: 16px;
}

#header {
  display: flex;
}

#header .header-label {
  flex: auto;
}

iron-icon {
  padding-inline-end: 12px;
}

.list-item .name {
  word-break: break-word;
}

.name {
  flex: 3;
}

#container {
  padding-inline-start: var(--cr-section-padding);
}

</style>

    <cr-dialog id="dialog" close-text="إلغاء" ignore-popstate="" on-close="onDialogClosed_">
      <div slot="title">[[dialogTitle_(dialogPage_)]]</div>

      <div slot="body">
        <iron-pages attr-for-selected="id" selected="[[dialogPage_]]" on-iron-select="onIronSelect_">
          <div id="initial">
            <p>للمواصلة، يُرجى إدخال مفتاح الأمان ولمسه.</p>
            <paper-spinner-lite style="padding-bottom: 16px;" active="">
            </paper-spinner-lite>
          </div>

          <div id="pinPrompt">
            <settings-security-keys-pin-field id="pin" min-pin-length="[[minPinLength_]]">
            </settings-security-keys-pin-field>
          </div>

          <div id="enrollments">
            <div id="header" class="list-item column-header">
              <h2 class="header-label">[[enrollmentsHeader_(enrollments_)]]</h2>

              <cr-button id="addButton" on-click="addButtonClick_" class="secondary-button header-aligned-button">
                إضافة
              </cr-button>
            </div>

            <div id="container">
              <iron-list id="enrollmentList" items="[[enrollments_]]" class="cr-separators">
                <template>
                  <div class="list-item" first$="[[!index]]">
                    <iron-icon icon="cr-fingerprint-icon:enrollment-done">
                    </iron-icon>
                    <div class="name" aria-label="[[item.name]]">
                      [[item.name]]
                    </div>
                    <cr-icon-button class="icon-clear" aria-label="حذف بصمة الإصبع هذه" on-click="deleteEnrollment_" disabled="[[deleteInProgress_]]">
                    </cr-icon-button>
                  </div>
                </template>
              </iron-list>
            </div>
          </div>

          <div id="enroll">
            <p>[[progressArcLabel_]]</p>
            <cr-fingerprint-progress-arc id="arc" autoplay="">
            </cr-fingerprint-progress-arc>
          </div>

          <div id="chooseName">
            <p>يُرجى إدخال اسم لبصمة الإصبع هذه</p>
            <cr-input type="text" id="enrollmentName" value="{{recentEnrollmentName_}}" label="الاسم" on-input="onEnrollmentNameInput_" spellcheck="false">
            </cr-input>
          </div>

          <div id="error">[[errorMsg_]]</div>
        </iron-pages>
      </div>

      <div slot="button-container">
        <cr-button id="cancelButton" class="cancel-button" on-click="cancel_" hidden="[[!cancelButtonVisible_]]" disabled="[[cancelButtonDisabled_]]">
          إلغاء
        </cr-button>
        <cr-button id="confirmButton" class="action-button" hidden="[[!confirmButtonVisible_]]" disabled="[[confirmButtonDisabled_]]" on-click="confirmButtonClick_">
          [[confirmButtonLabel_]]
        </cr-button>
        <cr-button id="doneButton" class="action-button" on-click="done_" hidden="[[!doneButtonVisible_]]">
          تم
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{cancelButtonDisabled_:Boolean,cancelButtonVisible_:Boolean,confirmButtonDisabled_:Boolean,confirmButtonVisible_:Boolean,confirmButtonLabel_:String,deleteInProgress_:Boolean,dialogPage_:{type:String,value:BioEnrollDialogPage.INITIAL,observer:"dialogPageChanged_"},doneButtonVisible_:Boolean,enrollments_:Array,minPinLength_:Number,progressArcLabel_:String,recentEnrollmentName_:String},browserProxy_:null,maxSamples_:-1,recentEnrollmentId_:"",showSetPINButton_:false,attached(){afterNextRender(this,(function(){IronA11yAnnouncer.requestAvailability()}));this.$.dialog.showModal();this.addWebUIListener("security-keys-bio-enroll-error",this.onError_.bind(this));this.addWebUIListener("security-keys-bio-enroll-status",this.onEnrollmentSample_.bind(this));this.browserProxy_=SecurityKeysBioEnrollProxyImpl.getInstance();this.browserProxy_.startBioEnroll().then((([minPinLength])=>{this.minPinLength_=minPinLength;this.dialogPage_=BioEnrollDialogPage.PIN_PROMPT}))},onError_(error,requiresPINChange=false){this.errorMsg_=error;this.showSetPINButton_=requiresPINChange;this.dialogPage_=BioEnrollDialogPage.ERROR},submitPIN_(){this.confirmButtonDisabled_=true;this.$.pin.trySubmit((pin=>this.browserProxy_.providePIN(pin))).then((()=>{this.showEnrollmentsPage_()}),(()=>{this.confirmButtonDisabled_=false}))},onEnrollments_(enrollments){this.enrollments_=enrollments.slice().sort(((a,b)=>a.name.localeCompare(b.name)));this.$.enrollmentList.fire("iron-resize");this.dialogPage_=BioEnrollDialogPage.ENROLLMENTS},dialogPageChanged_(){switch(this.dialogPage_){case BioEnrollDialogPage.INITIAL:this.cancelButtonVisible_=true;this.cancelButtonDisabled_=false;this.confirmButtonVisible_=false;this.doneButtonVisible_=false;break;case BioEnrollDialogPage.PIN_PROMPT:this.cancelButtonVisible_=true;this.cancelButtonDisabled_=false;this.confirmButtonVisible_=true;this.confirmButtonLabel_=this.i18n("continue");this.confirmButtonDisabled_=false;this.doneButtonVisible_=false;this.$.pin.focus();break;case BioEnrollDialogPage.ENROLLMENTS:this.cancelButtonVisible_=false;this.confirmButtonVisible_=false;this.doneButtonVisible_=true;break;case BioEnrollDialogPage.ENROLL:this.cancelButtonVisible_=true;this.cancelButtonDisabled_=false;this.confirmButtonVisible_=false;this.doneButtonVisible_=false;break;case BioEnrollDialogPage.CHOOSE_NAME:this.cancelButtonVisible_=false;this.confirmButtonVisible_=true;this.confirmButtonLabel_=this.i18n("continue");this.confirmButtonDisabled_=!this.recentEnrollmentName_.length;this.doneButtonVisible_=false;this.$.enrollmentName.focus();break;case BioEnrollDialogPage.ERROR:this.cancelButtonVisible_=true;this.confirmButtonVisible_=this.showSetPINButton_;this.confirmButtonLabel_=this.i18n("securityKeysSetPinButton");this.doneButtonVisible_=false;break;default:assertNotReached()}this.fire("bio-enroll-dialog-ready-for-testing")},addButtonClick_(){assert(this.dialogPage_===BioEnrollDialogPage.ENROLLMENTS);this.maxSamples_=-1;this.$.arc.reset();this.progressArcLabel_=this.i18n("securityKeysBioEnrollmentEnrollingLabel");this.recentEnrollmentId_="";this.recentEnrollmentName_="";this.dialogPage_=BioEnrollDialogPage.ENROLL;this.browserProxy_.startEnrolling().then((response=>{this.onEnrollmentComplete_(response)}))},onEnrollmentSample_(response){if(response.status!==SampleStatus.OK){this.progressArcLabel_=this.i18n("securityKeysBioEnrollmentTryAgainLabel");this.fire("iron-announce",{text:this.progressArcLabel_});return}this.progressArcLabel_=this.i18n("securityKeysBioEnrollmentEnrollingLabel");assert(response.remaining>=0);if(this.maxSamples_===-1){this.maxSamples_=response.remaining+1}this.$.arc.setProgress(100*(this.maxSamples_-response.remaining-1)/this.maxSamples_,100*(this.maxSamples_-response.remaining)/this.maxSamples_,false)},onEnrollmentComplete_(response){if(response.code===Ctap2Status.ERR_KEEPALIVE_CANCEL){this.showEnrollmentsPage_();return}if(response.code!==Ctap2Status.OK){this.onError_(this.i18n("securityKeysBioEnrollmentEnrollingFailedLabel"));return}this.maxSamples_=Math.max(this.maxSamples_,1);this.$.arc.setProgress(100*(this.maxSamples_-1)/this.maxSamples_,100,true);assert(response.enrollment);this.recentEnrollmentId_=response.enrollment.id;this.recentEnrollmentName_=response.enrollment.name;this.cancelButtonVisible_=false;this.confirmButtonVisible_=true;this.confirmButtonDisabled_=false;this.progressArcLabel_=this.i18n("securityKeysBioEnrollmentEnrollingCompleteLabel");this.$.confirmButton.focus();this.fire("iron-announce",{text:this.progressArcLabel_});this.fire("bio-enroll-dialog-ready-for-testing")},confirmButtonClick_(){switch(this.dialogPage_){case BioEnrollDialogPage.PIN_PROMPT:this.submitPIN_();break;case BioEnrollDialogPage.ENROLL:assert(!!this.recentEnrollmentId_.length);this.dialogPage_=BioEnrollDialogPage.CHOOSE_NAME;break;case BioEnrollDialogPage.CHOOSE_NAME:this.renameNewEnrollment_();break;case BioEnrollDialogPage.ERROR:this.$.dialog.close();this.fire("bio-enroll-set-pin");break;default:assertNotReached()}},renameNewEnrollment_(){assert(this.dialogPage_===BioEnrollDialogPage.CHOOSE_NAME);this.confirmButtonDisabled_=true;this.browserProxy_.renameEnrollment(this.recentEnrollmentId_,this.recentEnrollmentName_).then((enrollments=>{this.onEnrollments_(enrollments)}))},showEnrollmentsPage_(){this.browserProxy_.enumerateEnrollments().then((enrollments=>{this.onEnrollments_(enrollments)}))},cancel_(){if(this.dialogPage_===BioEnrollDialogPage.ENROLL){this.cancelButtonDisabled_=true;this.browserProxy_.cancelEnrollment()}else{this.done_()}},done_(){this.$.dialog.close()},onDialogClosed_(){this.browserProxy_.close()},onIronSelect_(e){e.stopPropagation()},deleteEnrollment_(event){if(this.deleteInProgress_){return}this.deleteInProgress_=true;const enrollment=this.enrollments_[event.model.index];this.browserProxy_.deleteEnrollment(enrollment.id).then((enrollments=>{this.deleteInProgress_=false;this.onEnrollments_(enrollments)}))},onEnrollmentNameInput_(){this.confirmButtonDisabled_=!this.recentEnrollmentName_.length},dialogTitle_(dialogPage){if(dialogPage===BioEnrollDialogPage.ENROLL||dialogPage===BioEnrollDialogPage.CHOOSE_NAME){return this.i18n("securityKeysBioEnrollmentAddTitle")}return this.i18n("securityKeysBioEnrollmentDialogTitle")},enrollmentsHeader_(enrollments){return this.i18n(enrollments&&enrollments.length?"securityKeysBioEnrollmentEnrollmentsLabel":"securityKeysBioEnrollmentNoEnrollmentsLabel")}});// Copyright 2019 The Chromium Authors. All rights reserved.
const SetPINDialogPage={INITIAL:"initial",NO_PIN_SUPPORT:"noPINSupport",REINSERT:"reinsert",LOCKED:"locked",ERROR:"error",PIN_PROMPT:"pinPrompt",SUCCESS:"success"};Polymer({is:"settings-security-keys-set-pin-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-security-keys-set-pin-dialog">cr-input {
  display: inline-block;
        --cr-input-width: 8em;
}

#newPIN {
  padding-inline-end: 2em;
}

#newPINRow {
  display: flex;
        flex-direction: row;
}

paper-spinner-lite {
  padding-bottom: 12px;
}

</style>

    <cr-dialog id="dialog" close-text="إغلاق" ignore-popstate="" on-close="closeDialog_">
      <div slot="title">[[title_]]</div>
      <div slot="body">
        <iron-pages attr-for-selected="id" selected="[[shown_]]" on-iron-select="onIronSelect_">
          <div id="initial">
            <p>للمواصلة، يُرجى إدخال مفتاح الأمان ولمسه.</p>
            <paper-spinner-lite active=""></paper-spinner-lite>
          </div>

          <div id="noPINSupport">
            <p>لا يوفّر مفتاح الأمان هذا أرقام التعريف الشخصية</p>
          </div>

          <div id="pinPrompt">
            <div id="currentPINEntry" hidden="[[!showCurrentEntry_]]">
              <p>يُرجى إدخال رقم التعريف الشخصي الحالي لتغييره. في حال كنت لا تعرف رقم التعريف الشخصي، عليك إعادة ضبط مفتاح الأمان، ثم إنشاء رقم تعريف شخصي جديد.</p>

              <div id="currentPINRow">
                <cr-input id="currentPIN" value="{{currentPIN_}}" min-length="[[currentMinPinLength_]]" max-length="255" spellcheck="false" on-input="onCurrentPINInput_" invalid="[[isNonEmpty_(currentPINError_)]]" label="رمز رقم التعريف الشخصي الحالي" tabindex="0" type$="[[inputType_(pinsVisible_)]]" error-message="[[currentPINError_]]">
                  <cr-icon-button slot="suffix" id="showPINsButton" class$="[[showPINsClass_(pinsVisible_)]]" title="[[showPINsTitle_(pinsVisible_)]]" focus-row-control="" focus-type="showPassword" on-click="showPINsClick_"></cr-icon-button>
                </cr-input>

              </div>
            </div>

            <p>[[newPINDialogDescription_]]</p>

            <div id="newPINRow">
              <cr-input id="newPIN" value="{{newPIN_}}" min-length="[[newMinPinLength_]]" max-length="255" spellcheck="false" on-input="onNewPINInput_" label="رقم التعريف الشخصي" tabindex="0" type$="[[inputType_(pinsVisible_)]]" invalid="[[isNonEmpty_(newPINError_)]]" error-message="[[newPINError_]]">
                <!-- If a show/hide icon is included in this row, this div is
                     needed to ensure that the cr-input is the same height
                     as the one to the right. Otherwise they don't vertically
                     align -->
                <div style="height: 36px" slot="suffix" hidden="[[showCurrentEntry_]]"></div>
              </cr-input>
              <cr-input id="confirmPIN" value="{{confirmPIN_}}" min-length="[[newMinPinLength_]]" max-length="255" spellcheck="false" on-input="onConfirmPINInput_" label="تأكيد رقم التعريف الشخصي" tabindex="0" invalid="[[isNonEmpty_(confirmPINError_)]]" type$="[[inputType_(pinsVisible_)]]" error-message="[[confirmPINError_]]">
                <cr-icon-button slot="suffix" class$="[[showPINsClass_(pinsVisible_)]]" title="[[showPINsTitle_(pinsVisible_)]]" hidden="[[showCurrentEntry_]]" focus-row-control="" focus-type="showPassword" on-click="showPINsClick_"></cr-icon-button>
              </cr-input>
            </div>
          </div>

          <div id="success">
            <p>تم إنشاء رقم التعريف الشخصي</p>
          </div>

          <div id="error">
            <p>[[pinFailed_(errorCode_)]]</p>
          </div>

          <div id="locked">
            <p>تم قفل مفتاح الأمان بسبب إدخال رقم التعريف الشخصي غير الصحيح عدّة مرات. يجب إعادة ضبط مفتاح الأمان.</p>
          </div>

          <div id="reinsert">
            <p>تم قفل مفتاح الأمان بسبب إدخال رقم التعريف الشخصي غير الصحيح عدّة مرات. لفتح قفله، يمكنك إزالته وإعادة إدخاله.</p>
          </div>
        </iron-pages>
      </div>

      <div slot="button-container">
        <cr-button id="closeButton" class$="[[maybeActionButton_(complete_)]]" on-click="closeDialog_">
          [[closeText_(complete_)]]
        </cr-button>
        <cr-button id="pinSubmit" class="action-button" on-click="pinSubmitNew_" disabled="[[!setPINButtonValid_]]" hidden="[[complete_]]">
          حفظ
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{currentPINValid_:Boolean,newPINValid_:Boolean,confirmPINValid_:Boolean,setPINButtonValid_:{type:Boolean,value:false},newPIN_:{type:String,value:""},confirmPIN_:{type:String,value:""},currentPIN_:{type:String,value:""},currentMinPinLength_:Number,newMinPinLength_:{type:Number,observer:"newMinPinLengthChanged_"},retries_:Number,errorCode_:Number,showCurrentEntry_:{type:Boolean,value:false},currentPINError_:{type:String,value:""},newPINError_:{type:String,value:""},confirmPINError_:{type:String,value:""},complete_:{type:Boolean,value:false},shown_:{type:String,value:SetPINDialogPage.INITIAL},pinsVisible_:{type:Boolean,value:false},title_:String,newPINDialogDescription_:String},browserProxy_:null,attached(){this.title_=this.i18n("securityKeysSetPINInitialTitle");this.browserProxy_=SecurityKeysPINBrowserProxyImpl.getInstance();this.$.dialog.showModal();afterNextRender(this,(function(){IronA11yAnnouncer.requestAvailability()}));this.browserProxy_.startSetPIN().then((({done:done,error:error,currentMinPinLength:currentMinPinLength,newMinPinLength:newMinPinLength,retries:retries})=>{if(done){if(error===1){this.shown_=SetPINDialogPage.NO_PIN_SUPPORT;this.finish_()}else if(error===52){this.shown_=SetPINDialogPage.REINSERT;this.finish_()}else if(error===50){this.shown_=SetPINDialogPage.LOCKED;this.finish_()}else{this.errorCode_=error;this.shown_=SetPINDialogPage.ERROR;this.finish_()}}else if(retries===0){this.shown_=SetPINDialogPage.LOCKED;this.finish_()}else{this.currentPINValid_=true;this.newPINValid_=true;this.confirmPINValid_=true;this.setPINButtonValid_=true;this.currentMinPinLength_=currentMinPinLength;this.newMinPinLength_=newMinPinLength;this.retries_=retries;let focusTarget;if(this.retries_===null){this.showCurrentEntry_=false;focusTarget=this.$.newPIN;this.title_=this.i18n("securityKeysSetPINCreateTitle")}else{this.showCurrentEntry_=true;focusTarget=this.$.currentPIN;this.title_=this.i18n("securityKeysSetPINChangeTitle")}this.shown_=SetPINDialogPage.PIN_PROMPT;window.setTimeout((function(){focusTarget.focus()}),0);this.fire("ui-ready")}}))},closeDialog_(){this.$.dialog.close();this.finish_()},finish_(){if(this.complete_){return}this.complete_=true;this.$.dialog.focus();this.browserProxy_.close()},onIronSelect_(e){e.stopPropagation()},onCurrentPINInput_(){this.currentPINError_=""},onNewPINInput_(){this.newPINError_=""},onConfirmPINInput_(){this.confirmPINError_=""},isValidPIN_(pin,minLength){const utf8Encoded=(new TextEncoder).encode(pin);if(utf8Encoded.length<minLength){return this.i18n("securityKeysPINTooShort")}if(utf8Encoded.length>63||utf8Encoded[utf8Encoded.length-1]===0){return this.i18n("securityKeysPINTooLong")}let length=0;for(const codepoint of pin){length++}if(length<minLength){return this.i18n("securityKeysPINTooShort")}return""},mismatchError_(retries){if(1<retries&&retries<=3){return this.i18n("securityKeysPINIncorrectRetriesPl",retries.toString())}if(retries===1){return this.i18n("securityKeysPINIncorrectRetriesSin")}return this.i18n("securityKeysPINIncorrect")},focusOn_(focusTarget){let preFocusTarget=this.$.newPIN;if(preFocusTarget===focusTarget){preFocusTarget=this.$.currentPIN}window.setTimeout((function(){preFocusTarget.focus();focusTarget.focus()}),0)},pinSubmitNew_(){if(this.showCurrentEntry_){this.currentPINError_=this.isValidPIN_(this.currentPIN_,this.currentMinPinLength_);if(this.currentPINError_!==""){this.focusOn_(this.$.currentPIN);this.fire("iron-announce",{text:this.currentPINError_});this.fire("ui-ready");return}}this.newPINError_=this.isValidPIN_(this.newPIN_,this.newMinPinLength_);if(this.newPINError_!==""){this.focusOn_(this.$.newPIN);this.fire("iron-announce",{text:this.newPINError_});this.fire("ui-ready");return}if(this.newPIN_!==this.confirmPIN_){this.confirmPINError_=this.i18n("securityKeysPINMismatch");this.focusOn_(this.$.confirmPIN);this.fire("iron-announce",{text:this.confirmPINError_});this.fire("ui-ready");return}this.setPINButtonValid_=false;this.browserProxy_.setPIN(this.currentPIN_,this.newPIN_).then((({done:done,error:error})=>{if(error===0){this.shown_=SetPINDialogPage.SUCCESS;this.finish_()}else if(error===52){this.shown_=SetPINDialogPage.REINSERT;this.finish_()}else if(error===50){this.shown_=SetPINDialogPage.LOCKED;this.finish_()}else if(error===49){this.currentPINValid_=false;this.retries_--;this.currentPINError_=this.mismatchError_(this.retries_);this.setPINButtonValid_=true;this.focusOn_(this.$.currentPIN);this.fire("iron-announce",{text:this.currentPINError_});this.fire("ui-ready")}else{this.errorCode_=error;this.shown_=SetPINDialogPage.ERROR;this.finish_()}}))},showPINsClick_(){this.pinsVisible_=!this.pinsVisible_},isNonEmpty_(s){return s!==""},pinFailed_(){if(this.errorCode_===null){return""}return this.i18n("securityKeysPINError",this.errorCode_.toString())},maybeActionButton_(){return this.complete_?"action-button":"cancel-button"},closeText_(){return this.i18n(this.complete_?"ok":"cancel")},newMinPinLengthChanged_(){PluralStringProxyImpl.getInstance().getPluralString("securityKeysNewPIN",this.newMinPinLength_).then((string=>this.newPINDialogDescription_=string))},showPINsClass_(){return"icon-visibility"+(this.pinsVisible_?"-off":"")},showPINsTitle_(){return this.i18n(this.pinsVisible_?"securityKeysHidePINs":"securityKeysShowPINs")},inputType_(){return this.pinsVisible_?"text":"password"}});// Copyright 2019 The Chromium Authors. All rights reserved.
const ResetDialogPage={INITIAL:"initial",NO_RESET:"noReset",RESET_FAILED:"resetFailed",RESET_CONFIRM:"resetConfirm",RESET_SUCCESS:"resetSuccess",RESET_NOT_ALLOWED:"resetNotAllowed"};Polymer({is:"settings-security-keys-reset-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-security-keys-reset-dialog">paper-spinner-lite {
  padding-bottom: 12px;
}

</style>
    <cr-dialog id="dialog" close-text="إغلاق" ignore-popstate="" on-close="closeDialog_">
      <div slot="title">[[title_]]</div>
      <div slot="body">
        <iron-pages attr-for-selected="id" selected="[[shown_]]" on-iron-select="onIronSelect_">
          <div id="initial">
            <p>للمواصلة، يُرجى إزالة مفتاح الأمان من جهازك، ثم إعادة إدخاله ولمسه.</p>
            <paper-spinner-lite active=""></paper-spinner-lite>
          </div>

          <div id="noReset">
            <p>تعذّرت إعادة ضبط مفتاح الأمان هذا</p>
          </div>

          <div id="resetFailed">
            <p>[[resetFailed_(errorCode_)]]</p>
          </div>

          <div id="resetConfirm">
            <p>يُرجى لمس مفتاح الأمان مرة أخرى لتأكيد إعادة الضبط. سيتم حذف جميع المعلومات المحفوظة في مفتاح الأمان، بما في ذلك رقم التعريف الشخصي الخاص به.</p>
          </div>

          <div id="resetSuccess">
            <p>تمت إعادة ضبط مفتاح الأمان</p>
          </div>

          <div id="resetNotAllowed">
            <p>تعذّرت إعادة ضبط مفتاح الأمان هذا. يمكنك محاولة إعادة ضبط هذا المفتاح فورًا بعد إدخاله.</p>
          </div>
        </iron-pages>
      </div>
      <div slot="button-container">
        <cr-button id="button" class$="[[maybeActionButton_(complete_)]]" on-click="closeDialog_">
          [[closeText_(complete_)]]
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{errorCode_:Number,complete_:{type:Boolean,value:false},shown_:{type:String,value:ResetDialogPage.INITIAL},title_:String},browserProxy_:null,attached(){this.title_=this.i18n("securityKeysResetTitle");this.browserProxy_=SecurityKeysResetBrowserProxyImpl.getInstance();this.$.dialog.showModal();this.browserProxy_.reset().then((code=>{if(code===1){this.shown_=ResetDialogPage.NO_RESET;this.finish_()}else if(code!==0){this.errorCode_=code;this.shown_=ResetDialogPage.RESET_FAILED;this.finish_()}else{this.title_=this.i18n("securityKeysResetConfirmTitle");this.shown_=ResetDialogPage.RESET_CONFIRM;this.browserProxy_.completeReset().then((code=>{this.title_=this.i18n("securityKeysResetTitle");if(code===0){this.shown_=ResetDialogPage.RESET_SUCCESS}else if(code===48){this.shown_=ResetDialogPage.RESET_NOT_ALLOWED}else{this.errorCode_=code;this.shown_=ResetDialogPage.RESET_FAILED}this.finish_()}))}}))},closeDialog_(){this.$.dialog.close();this.finish_()},finish_(){if(this.complete_){return}this.complete_=true;this.browserProxy_.close()},onIronSelect_(e){e.stopPropagation()},resetFailed_(code){if(code===null){return""}return this.i18n("securityKeysResetError",code.toString())},closeText_(complete){return this.i18n(complete?"ok":"cancel")},maybeActionButton_(complete){return complete?"action-button":"cancel-button"}});// Copyright 2019 The Chromium Authors. All rights reserved.
Polymer({is:"security-keys-subpage",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="security-keys-subpage"></style>

    <cr-link-row id="setPINButton" label="إنشاء رقم التعريف الشخصي" sub-label="‏حماية مفتاح الأمان باستخدام رقم التعريف الشخصي (PIN)" on-click="onSetPIN_"></cr-link-row>
    <cr-link-row id="credentialManagementButton" class="hr" label="بيانات تسجيل الدخول" sub-label="يمكنك عرض بيانات تسجيل الدخول المخزّنة على مفتاح الأمان وحذفها." on-click="onCredentialManagement_"></cr-link-row>
    <template is="dom-if" if="[[enableBioEnrollment_]]">
      <cr-link-row id="bioEnrollButton" class="hr" label="بصمات الأصابع" sub-label="يمكنك إضافة بصمات الأصابع المحفوظة على مفتاح الأمان وحذفها." on-click="onBioEnroll_"></cr-link-row>
    </template>
    <cr-link-row id="resetButton" class="hr" label="إعادة ضبط مفتاح الأمان" sub-label="سيؤدي هذا الإجراء إلى حذف جميع البيانات على مفتاح الأمان، بما في ذلك رقم التعريف الشخصي الخاص به" on-click="onReset_"></cr-link-row>

    <template is="dom-if" if="[[showSetPINDialog_]]" restamp="">
      <settings-security-keys-set-pin-dialog on-close="onSetPINDialogClosed_">
      </settings-security-keys-set-pin-dialog>
    </template>

    <template is="dom-if" if="[[showCredentialManagementDialog_]]" restamp="">
      <settings-security-keys-credential-management-dialog on-credential-management-set-pin="onSetPIN_" on-close="onCredentialManagementDialogClosed_">
      </settings-security-keys-credential-management-dialog>
    </template>

    <template is="dom-if" if="[[showResetDialog_]]" restamp="">
      <settings-security-keys-reset-dialog on-close="onResetDialogClosed_">
      </settings-security-keys-reset-dialog>
    </template>

    <template is="dom-if" if="[[showBioEnrollDialog_]]" restamp="">
      <settings-security-keys-bio-enroll-dialog on-bio-enroll-set-pin="onSetPIN_" on-close="onBioEnrollDialogClosed_">
      </settings-security-keys-bio-enroll-dialog>
    </template>

<!--_html_template_end_-->`,properties:{enableBioEnrollment_:{type:Boolean,readOnly:true,value(){return loadTimeData.getBoolean("enableSecurityKeysBioEnrollment")}},showSetPINDialog_:{type:Boolean,value:false},showCredentialManagementDialog_:{type:Boolean,value:false},showResetDialog_:{type:Boolean,value:false},showBioEnrollDialog_:{type:Boolean,value:false}},onSetPIN_(){this.showSetPINDialog_=true},onSetPINDialogClosed_(){this.showSetPINDialog_=false;focusWithoutInk(this.$.setPINButton)},onCredentialManagement_(){this.showCredentialManagementDialog_=true},onCredentialManagementDialogClosed_(){this.showCredentialManagementDialog_=false;focusWithoutInk(assert(this.$$("#credentialManagementButton")))},onReset_(){this.showResetDialog_=true},onResetDialogClosed_(){this.showResetDialog_=false;focusWithoutInk(this.$.resetButton)},onBioEnroll_(){this.showBioEnrollDialog_=true},onBioEnrollDialogClosed_(){this.showBioEnrollDialog_=false;focusWithoutInk(assert(this.$$("#bioEnrollButton")))}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-disable-safebrowsing-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><cr-dialog id="dialog" close-text="إغلاق">
      <div slot="title">هل تريد إيقاف &quot;التصفُّح الآمن&quot;؟</div>
      <div slot="body">يحميك &quot;التصفُّح الآمن&quot; من المهاجمين الذين قد يحاولون خداعك لاتّخاذ إجراءات خطيرة، مثل تثبيت البرامج الضارة أو الكشف عن معلومات شخصية، مثل كلمات المرور أو أرقام الهواتف أو بطاقات الائتمان. وفي حال إيقاف &quot;التصفُّح الآمن&quot;، ننصحك بتوخّي الحذر عند تصفُّح مواقع إلكترونية غير مألوفة أو غير آمنة.</div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onDialogCancel_">
          إلغاء
        </cr-button>
        <cr-button class="action-button" on-click="onDialogConfirm_">
          إيقاف
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,attached(){this.$.dialog.showModal()},wasConfirmed(){return this.$.dialog.getNative().returnValue==="success"},onDialogCancel_(){this.$.dialog.cancel()},onDialogConfirm_(){this.$.dialog.close()}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"secure-dns-input",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="secure-dns-input">:host {
  cursor: auto;
        display: block;
        width: 100%;
}

cr-input {
  width: 100%;
        --cr-input-width: 75%;
}

</style>
    <!-- Max length of 100 KB to prevent browser from freezing. -->
    <cr-input id="input" value="{{value}}" placeholder="إدخال مزوّد مخصّص" invalid="[[showError_]]" error-message="[[errorText_]]" maxlength="102400" spellcheck="false" on-input="onInput_" on-blur="validate">
    </cr-input>
<!--_html_template_end_-->`,properties:{value:String,showError_:Boolean,errorText_:String},browserProxy_:null,created:function(){this.browserProxy_=PrivacyPageBrowserProxyImpl.getInstance()},onInput_:function(){this.showError_=false},validate:async function(){this.showError_=false;const valueToValidate=this.value;const templates=await this.browserProxy_.parseCustomDnsEntry(valueToValidate);const valid=templates.length>0;let successfulProbe=false;for(const template of templates){if(await this.browserProxy_.probeCustomDnsTemplate(template)){successfulProbe=true;break}}if(valueToValidate===this.value&&this.value!==""&&!successfulProbe){this.errorText_=loadTimeData.getString(valid?"secureDnsCustomConnectionError":"secureDnsCustomFormatError");this.showError_=true}this.fire("value-update",{isValid:valid,text:valueToValidate})},focus:function(){this.$.input.focus()},isInvalid:function(){return!!this.showError_}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-secure-dns",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared md-select" scope="settings-secure-dns">#automaticRadioButton {
  align-items: flex-start;
        padding: 6px 0;
        --cr-radio-button-disc-margin-block-start: calc(
            (1.54em  - var(--cr-radio-button-size)) / 2);
}

#secureResolverSelectRadioButton {
  align-items: flex-start;
        --cr-radio-button-disc-margin-block-start: calc(
            (1.54em  + 12px  -
             var(--cr-radio-button-size)) / 2);
}

#secureRadioButtonItem {
  align-items: baseline;
}

#secureRadioButtonItemInner {
  margin-inline-start: 0.5em;
        width: 80%;
}

#privacyPolicy {
  display: none;
        padding: 8px ;
}

#secureDnsInput {
  margin-top: 6px;
}

</style>
    <settings-toggle-button id="secureDnsToggle" class="hr" pref="{{secureDnsToggle_}}" label="‏استخدام &quot;نظام أسماء النطاقات&quot; (DNS) الآمن" sub-label="[[secureDnsDescription_]]" on-change="onToggleChanged_">
    </settings-toggle-button>
    <cr-radio-group id="secureDnsRadioGroup" class="list-frame" selected="{{secureDnsRadio_}}" on-selected-changed="onRadioSelectionChanged_" hidden="[[!showRadioGroup_]]">
      <cr-radio-button id="automaticRadioButton" class="list-item" name="[[secureDnsModeEnum_.AUTOMATIC]]" label="من خلال مقدِّم الخدمة الحالي">
        <div class="secondary">
          قد لا يكون نظام أسماء النطاقات الآمن متاحًا طوال الوقت.
        </div>
      </cr-radio-button>
      <cr-radio-button id="secureResolverSelectRadioButton" class="list-item" name="[[secureDnsModeEnum_.SECURE]]" aria-label="من خلال مقدِّم خدمة من اختيارك">
        <div id="secureRadioButtonItem" class="list-item">
          مع
          <div id="secureRadioButtonItemInner">
            <select id="secureResolverSelect" class="md-select" aria-label="خيارات مقدِّم الخدمة" on-click="stopEventPropagation_" on-change="onDropdownSelectionChanged_">
              <template is="dom-repeat" items="[[resolverOptions_]]">
                <option value="[[item.value]]">[[item.name]]</option>
              </template>
            </select>
            <div id="privacyPolicy" class="secondary" inner-h-t-m-l="[[privacyPolicyString_]]"></div>
            <secure-dns-input id="secureDnsInput" value="[[secureDnsInputValue_]]" on-value-update="onSecureDnsInputEvaluated_" on-click="stopEventPropagation_">
          </secure-dns-input></div>
        
      
    
<!--_html_template_end_--></div></cr-radio-button></cr-radio-group>`,behaviors:[WebUIListenerBehavior,PrefsBehavior],properties:{prefs:{type:Object,notify:true},secureDnsModeEnum_:{type:Object,value:SecureDnsMode},secureDnsDescription_:String,secureDnsToggle_:{type:Object,value(){return{type:chrome.settingsPrivate.PrefType.BOOLEAN,value:false}}},showRadioGroup_:Boolean,secureDnsRadio_:{type:String,value:SecureDnsMode.AUTOMATIC},resolverOptions_:Array,lastResolverOption_:String,privacyPolicyString_:String,secureDnsInputValue_:String},browserProxy_:null,created:function(){this.browserProxy_=PrivacyPageBrowserProxyImpl.getInstance()},attached:function(){this.browserProxy_.getSecureDnsResolverList().then((resolvers=>{this.resolverOptions_=resolvers;this.lastResolverOption_=this.resolverOptions_[0].value;this.browserProxy_.getSecureDnsSetting().then(this.onSecureDnsPrefsChanged_.bind(this));this.addWebUIListener("secure-dns-setting-changed",this.onSecureDnsPrefsChanged_.bind(this))}))},onSecureDnsPrefsChanged_:function(setting){switch(setting.mode){case SecureDnsMode.SECURE:this.set("secureDnsToggle_.value",true);this.secureDnsRadio_=SecureDnsMode.SECURE;this.updateTemplatesRepresentation_(setting.templates);this.updatePrivacyPolicyLine_();break;case SecureDnsMode.AUTOMATIC:this.set("secureDnsToggle_.value",true);this.secureDnsRadio_=SecureDnsMode.AUTOMATIC;break;case SecureDnsMode.OFF:this.set("secureDnsToggle_.value",false);break;default:assertNotReached("Received unknown secure DNS mode")}this.updateManagementView_(setting.managementMode)},onToggleChanged_:function(){this.showRadioGroup_=this.secureDnsToggle_.value;if(this.secureDnsRadio_===SecureDnsMode.SECURE&&!this.$.secureResolverSelect.value){this.$.secureDnsInput.focus()}this.updateDnsPrefs_(this.secureDnsToggle_.value?this.secureDnsRadio_:SecureDnsMode.OFF)},onRadioSelectionChanged_:function(event){if(event.detail.value===SecureDnsMode.SECURE&&!this.$.secureResolverSelect.value){this.$.secureDnsInput.focus()}this.updateDnsPrefs_(event.detail.value)},updateDnsPrefs_:function(mode,templates=""){switch(mode){case SecureDnsMode.SECURE:if(!this.$.secureResolverSelect.value){if(!templates){return}this.setPrefValue("dns_over_https.templates",templates)}else{this.setPrefValue("dns_over_https.templates",this.$.secureResolverSelect.value)}this.setPrefValue("dns_over_https.mode",mode);break;case SecureDnsMode.AUTOMATIC:case SecureDnsMode.OFF:this.setPrefValue("dns_over_https.mode",mode);this.setPrefValue("dns_over_https.templates","");break;default:assertNotReached("Received unknown secure DNS mode")}},stopEventPropagation_:function(event){event.stopPropagation()},onDropdownSelectionChanged_:function(){if(this.secureDnsRadio_===SecureDnsMode.SECURE){this.updateDnsPrefs_(SecureDnsMode.SECURE)}this.updatePrivacyPolicyLine_();if(!this.$.secureResolverSelect.value){this.$.secureDnsInput.focus()}this.browserProxy_.recordUserDropdownInteraction(this.lastResolverOption_,this.$.secureResolverSelect.value);this.lastResolverOption_=this.$.secureResolverSelect.value},updateManagementView_:function(managementMode){if(this.prefs===undefined){return}const pref={key:"",type:chrome.settingsPrivate.PrefType.BOOLEAN,value:this.secureDnsToggle_.value};if(this.getPref("dns_over_https.mode").enforcement===chrome.settingsPrivate.Enforcement.ENFORCED){pref.enforcement=chrome.settingsPrivate.Enforcement.ENFORCED;pref.controlledBy=this.getPref("dns_over_https.mode").controlledBy;this.secureDnsDescription_=loadTimeData.getString("secureDnsDescription")}else{switch(managementMode){case SecureDnsUiManagementMode.NO_OVERRIDE:this.secureDnsDescription_=loadTimeData.getString("secureDnsDescription");break;case SecureDnsUiManagementMode.DISABLED_MANAGED:pref.enforcement=chrome.settingsPrivate.Enforcement.ENFORCED;this.secureDnsDescription_=loadTimeData.getString("secureDnsDisabledForManagedEnvironment");break;case SecureDnsUiManagementMode.DISABLED_PARENTAL_CONTROLS:pref.enforcement=chrome.settingsPrivate.Enforcement.ENFORCED;this.secureDnsDescription_=loadTimeData.getString("secureDnsDisabledForParentalControl");break;default:assertNotReached("Received unknown secure DNS management mode "+managementMode)}}this.secureDnsToggle_=pref;if(this.secureDnsToggle_.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED){this.showRadioGroup_=false}else{this.showRadioGroup_=this.secureDnsToggle_.value}},updateTemplatesRepresentation_:function(secureDnsTemplates){if(secureDnsTemplates.length===1){const resolver=this.resolverOptions_.slice(1).find((r=>r.value===secureDnsTemplates[0]));if(resolver){this.$.secureResolverSelect.value=resolver.value;this.lastResolverOption_=resolver.value;return}}this.$.secureResolverSelect.value="";this.lastResolverOption_="";if(secureDnsTemplates.length>0){this.secureDnsInputValue_=secureDnsTemplates.join(" ")}},updatePrivacyPolicyLine_:function(){if(!this.$.secureResolverSelect.value){this.$.privacyPolicy.style.display="none";this.$.secureDnsInput.style.display="block";return}this.$.privacyPolicy.style.display="block";this.$.secureDnsInput.style.display="none";const resolver=this.resolverOptions_.find((r=>r.value===this.$.secureResolverSelect.value));if(!resolver){return}this.privacyPolicyString_=loadTimeData.substituteString(loadTimeData.getString("secureDnsSecureDropdownModePrivacyPolicy"),resolver.policy)},onSecureDnsInputEvaluated_:function(event){if(event.detail.isValid){this.updateDnsPrefs_(this.secureDnsRadio_,event.detail.text)}else if(this.secureDnsRadio_===SecureDnsMode.SECURE){this.secureDnsRadio_=SecureDnsMode.AUTOMATIC}}});// Copyright 2019 The Chromium Authors. All rights reserved.
const SafeBrowsingSetting={ENHANCED:0,STANDARD:1,DISABLED:2};Polymer({is:"settings-security-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared" scope="settings-security-page">img {
  width: 100%;
}

#safeBrowsingSection {
  padding: 0 var(--cr-section-padding);
}

.bullet-line {
  align-items: center;
        display: flex;
        min-height: var(--settings-row-min-height);
}

.bullet-line > div {
  padding-inline-start: var(--cr-radio-button-size);
}

settings-collapse-radio-button:not(:first-of-type) {
  --settings-collapse-separator-line: var(--cr-separator-line);
}

settings-collapse-radio-button[hidden] + settings-collapse-radio-button {
  --settings-collapse-separator-line: 0;
}

settings-collapse-radio-button .bullet-line:last-child {
  padding-bottom: 12px;
}

settings-toggle-button {
  padding-inline-end: 0;
        padding-inline-start: 0;
}

settings-toggle-button:not([disabled]) {
  pointer-events: all;
}

#safeBrowsingEnhanced .bullet-line:last-of-type {
  padding-bottom: 12px;
}

</style>
    <picture>
      <source srcset="chrome://settings/images/safe_browsing_banner_dark.svg" media="(prefers-color-scheme: dark">
      <img id="banner" alt="" src="chrome://settings/images/safe_browsing_banner.svg">
    </picture>
    <div id="safeBrowsingSection">
      <h2>التصفح الآمن</h2>
      <settings-radio-group id="safeBrowsingRadioGroup" no-set-pref="" pref="{{prefs.generated.safe_browsing}}" selectable-elements="cr-radio-button, settings-collapse-radio-button" on-change="onSafeBrowsingRadioChange_">
        <settings-collapse-radio-button id="safeBrowsingEnhanced" name="[[safeBrowsingSettingEnum_.ENHANCED]]" pref="[[prefs.generated.safe_browsing]]" label="حماية مُحسّنة" sub-label="‏يوفّر حماية استباقية وسريعة من الإضافات وعمليات التنزيل والمواقع الإلكترونية الضارة، ويُحذّرك من عمليات اختراق كلمة المرور. يتطلّب إرسال بيانات التصفّح إلى Google." hidden="[[!safeBrowsingEnhancedEnabled_]]" on-expand-clicked="onEnhancedProtectionExpandButtonClicked_" no-automatic-collapse="">
          <div slot="collapse">
            <div class="bullet-line">
              <iron-icon icon="cr:security"></iron-icon>
              <div class="secondary">
                توقُّع الأحداث الخطيرة قبل حدوثها والتحذير منها
              </div>
            </div>
            <div class="bullet-line">
              <iron-icon icon="settings20:googleg"></iron-icon>
              <div class="secondary">
                ‏يوفّر لك هذا الوضع حماية في Chrome، ويمكن استخدامه لتحسين مستوى أمانك في تطبيقات Google الأخرى عندما تكون مسجلًا دخولك.
              </div>
            </div>
            <div class="bullet-line">
              <iron-icon icon="settings:public"></iron-icon>
              <div class="secondary">
                تحسين الأمان من أجلك ومن أجل جميع المستخدمين على الإنترنت
              </div>
            </div>
            <div class="bullet-line">
              <iron-icon icon="settings20:vpn-key"></iron-icon>
              <div class="secondary">
                التحذير إذا تم الكشف عن كلمات المرور في عملية اختراق بيانات
              </div>
            </div>
            <div class="bullet-line last-collapse-item">
              <iron-icon icon="settings20:data"></iron-icon>
              <div class="secondary cr-padded-text">
                ‏إرسال عناوين URL إلى التصفّح الآمن للتحقّق منها: ويُرسل أيضًا عددًا قليلًا من الصفحات وعمليات التنزيل ونشاط الإضافة ومعلومات النظام للمساعدة في اكتشاف التهديدات الجديدة. ويربط مؤقتًا هذه البيانات مع حسابك على Google أثناء تسجيل الدخول لحمايتك على تطبيقات Google.
              </div>
            </div>
          </div>
        </settings-collapse-radio-button>
        <settings-collapse-radio-button id="safeBrowsingStandard" name="[[safeBrowsingSettingEnum_.STANDARD]]" pref="[[prefs.generated.safe_browsing]]" label="الحماية العادية" sub-label="يوفّر لك حماية عادية من الإضافات وعمليات التنزيل والمواقع الإلكترونية الضارة." info-opened="{{infoOpened_}}" on-expand-clicked="onStandardProtectionExpandButtonClicked_" no-automatic-collapse="">
          <div slot="collapse">
            <div class="bullet-line">
              <iron-icon icon="cr:security"></iron-icon>
              <div class="secondary">
                  اكتشاف الأحداث الخطيرة عند حدوثها والتحذير منها
              </div>
            </div>
            <div class="bullet-line">
              <iron-icon icon="settings20:data"></iron-icon>
              <div class="secondary cr-padded-text">
                  ‏يعمل على التحقّق من عناوين URL التي تحتوي على قائمة بمواقع إلكترونية غير آمنة مُخزّنة في Chrome. وإذا حاول موقع إلكتروني سرقة كلمة المرور أو إذا نزّلت ملفًا ضارًا، قد يرسل متصفّح Chrome أيضًا عناوين URL تتضمّن أجزاء من محتوى الصفحة إلى &quot;التصفّح الآمن&quot;.
              </div>
            </div>
          </div>
          <div slot="noSelectionCollapse">
            <settings-toggle-button id="safeBrowsingReportingToggle" pref="{{prefs.safebrowsing.scout_reporting_enabled}}" label="المساعدة في تحسين الأمان على الإنترنت من أجل الجميع" sub-label="‏إرسال عناوين URL الخاصّة ببعض الصفحات التي تزورها، وعدد محدود من معلومات النظام، وبعض أنواع محتوى الصفحات إلى Google، وذلك للمساعدة على اكتشاف التهديدات الجديدة وتوفير الحماية لجميع المستخدمين على الويب" on-change="onSafeBrowsingExtendedReportingChange_" disabled="[[getDisabledExtendedSafeBrowsing_(
                              prefs.generated.safe_browsing.*)]]">
            </settings-toggle-button>
            <settings-toggle-button id="passwordsLeakToggle" label="التحذير إذا تم الكشف عن كلمات المرور في عملية اختراق بيانات" pref="{{prefs.generated.password_leak_detection}}" sub-label="[[getPasswordsLeakToggleSubLabel_(
                              prefs.profile.password_manager_leak_detection.*,
                              prefs.generated.password_leak_detection.*)]]">
            </settings-toggle-button>
          </div>
        </settings-collapse-radio-button>
        <settings-collapse-radio-button id="safeBrowsingDisabled" no-collapse="" name="[[safeBrowsingSettingEnum_.DISABLED]]" pref="[[prefs.generated.safe_browsing]]" label="بلا حماية (غير مُستحسَن)" sub-label="‏لا يوفّر لك هذا الوضع حماية من الإضافات أو عمليات التنزيل أو المواقع الإلكترونية الضارة. وستظل تستفيد من ميزة &quot;التصفّح الآمن&quot; عند توفّرها في خدمات Google الأخرى، مثل Gmail و&quot;بحث Google&quot;.">
        </settings-collapse-radio-button>
      </settings-radio-group>
    </div>
    <div class="cr-row first">
      <h2>الإعدادات المتقدّمة</h2>
    </div>
    <template is="dom-if" if="[[showSecureDnsSetting_]]">
      <settings-secure-dns prefs="{{prefs}}"></settings-secure-dns>
    </template>
    <template is="dom-if" if="[[enableSecurityKeysSubpage_]]">
        <cr-link-row id="security-keys-subpage-trigger" class="hr" label="إدارة مفاتيح الأمان" sub-label="إعادة ضبط مفاتيح الأمان وإنشاء أرقام التعريف الشخصية" on-click="onSecurityKeysClick_" role-description="زر صفحة فرعية"></cr-link-row>
    </template>

    <cr-link-row id="manageCertificates" class="hr" external="" label="تنظيم الشهادات" sub-label="‏إدارة إعدادات وشهادات HTTPS/طبقة المقابس الآمنة" on-click="onManageCertificatesClick_"></cr-link-row>

    <cr-link-row id="advanced-protection-program-link" class="hr" label="‏برنامج الحماية المتقدّمة من Google" sub-label="‏يحمي حسابات Google الشخصية لأي شخص معرّض لخطر الهجمات الموجّهة" on-click="onAdvancedProtectionProgramLinkClick_" external="">
    </cr-link-row>
    <template is="dom-if" if="[[showDisableSafebrowsingDialog_]]" restamp="">
      <settings-disable-safebrowsing-dialog prefs="{{prefs}}" on-close="onDisableSafebrowsingDialogClose_">
      </settings-disable-safebrowsing-dialog>
    </template>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,PrefsBehavior,RouteObserverBehavior],properties:{prefs:{type:Object,notify:true},showSecureDnsSetting_:{type:Boolean,readOnly:true,value:function(){return loadTimeData.getBoolean("showSecureDnsSetting")}},safeBrowsingSettingEnum_:{type:Object,value:SafeBrowsingSetting},safeBrowsingEnhancedEnabled_:{type:Boolean,readOnly:true,value:function(){return loadTimeData.getBoolean("safeBrowsingEnhancedEnabled")}},enableSecurityKeysSubpage_:{type:Boolean,readOnly:true,value(){return loadTimeData.getBoolean("enableSecurityKeysSubpage")}},focusConfig:{type:Object,observer:"focusConfigChanged_"},showDisableSafebrowsingDialog_:Boolean},focusConfigChanged_(newConfig,oldConfig){assert(!oldConfig);if(routes.SECURITY_KEYS){this.focusConfig.set(routes.SECURITY_KEYS.path,(()=>{focusWithoutInk(assert(this.$$("#security-keys-subpage-trigger")))}))}},browserProxy_:null,metricsBrowserProxy_:null,ready(){const prefValue=this.getPref("generated.safe_browsing").value;if(prefValue===SafeBrowsingSetting.ENHANCED){this.$.safeBrowsingEnhanced.expanded=true}else if(prefValue===SafeBrowsingSetting.STANDARD){this.$.safeBrowsingStandard.expanded=true}this.browserProxy_=PrivacyPageBrowserProxyImpl.getInstance();this.metricsBrowserProxy_=MetricsBrowserProxyImpl.getInstance()},currentRouteChanged(route){if(route===routes.SECURITY){this.metricsBrowserProxy_.recordSafeBrowsingInteractionHistogram(SafeBrowsingInteractions.SAFE_BROWSING_SHOWED);const queryParams=Router.getInstance().getQueryParameters();const section=queryParams.get("q");if(section==="enhanced"){this.$.safeBrowsingEnhanced.expanded=true;this.$.safeBrowsingStandard.expanded=false}}},updateCollapsedButtons_(){this.$.safeBrowsingEnhanced.updateCollapsed();this.$.safeBrowsingStandard.updateCollapsed()},onSafeBrowsingRadioChange_:function(){const selected=Number.parseInt(this.$.safeBrowsingRadioGroup.selected,10);const prefValue=this.getPref("generated.safe_browsing").value;if(prefValue!==selected){this.recordInteractionHistogramOnRadioChange_(selected);this.recordActionOnRadioChange_(selected)}if(selected===SafeBrowsingSetting.DISABLED){this.showDisableSafebrowsingDialog_=true}else{this.updateCollapsedButtons_();this.$.safeBrowsingRadioGroup.sendPrefChange()}},getDisabledExtendedSafeBrowsing_(){return this.getPref("generated.safe_browsing").value!==SafeBrowsingSetting.STANDARD},getPasswordsLeakToggleSubLabel_(){let subLabel=this.i18n("passwordsLeakDetectionGeneralDescription");if(this.getPref("profile.password_manager_leak_detection").value&&!this.getPref("generated.password_leak_detection").value){subLabel+=" "+this.i18n("passwordsLeakDetectionSignedOutEnabledDescription")}return subLabel},onManageCertificatesClick_(){this.browserProxy_.showManageSSLCertificates();this.metricsBrowserProxy_.recordSettingsPageHistogram(PrivacyElementInteractions.MANAGE_CERTIFICATES)},onAdvancedProtectionProgramLinkClick_(){window.open(loadTimeData.getString("advancedProtectionURL"))},onSecurityKeysClick_(){Router.getInstance().navigateTo(routes.SECURITY_KEYS)},onSafeBrowsingExtendedReportingChange_(){this.metricsBrowserProxy_.recordSettingsPageHistogram(PrivacyElementInteractions.IMPROVE_SECURITY)},onDisableSafebrowsingDialogClose_(){const confirmed=this.$$("settings-disable-safebrowsing-dialog").wasConfirmed();this.recordInteractionHistogramOnSafeBrowsingDialogClose_(confirmed);this.recordActionOnSafeBrowsingDialogClose_(confirmed);if(confirmed){this.$.safeBrowsingRadioGroup.sendPrefChange();this.updateCollapsedButtons_()}else{this.$.safeBrowsingRadioGroup.resetToPrefValue()}this.showDisableSafebrowsingDialog_=false;focusWithoutInk(assert(this.$.safeBrowsingDisabled))},onEnhancedProtectionExpandButtonClicked_(){this.recordInteractionHistogramOnExpandButtonClicked_(SafeBrowsingSetting.ENHANCED);this.recordActionOnExpandButtonClicked_(SafeBrowsingSetting.ENHANCED)},onStandardProtectionExpandButtonClicked_(){this.recordInteractionHistogramOnExpandButtonClicked_(SafeBrowsingSetting.STANDARD);this.recordActionOnExpandButtonClicked_(SafeBrowsingSetting.STANDARD)},recordInteractionHistogramOnRadioChange_(safeBrowsingSetting){let action;if(safeBrowsingSetting===SafeBrowsingSetting.ENHANCED){action=SafeBrowsingInteractions.SAFE_BROWSING_ENHANCED_PROTECTION_CLICKED}else if(safeBrowsingSetting===SafeBrowsingSetting.STANDARD){action=SafeBrowsingInteractions.SAFE_BROWSING_STANDARD_PROTECTION_CLICKED}else{action=SafeBrowsingInteractions.SAFE_BROWSING_DISABLE_SAFE_BROWSING_CLICKED}this.metricsBrowserProxy_.recordSafeBrowsingInteractionHistogram(action)},recordInteractionHistogramOnExpandButtonClicked_(safeBrowsingSetting){this.metricsBrowserProxy_.recordSafeBrowsingInteractionHistogram(safeBrowsingSetting===SafeBrowsingSetting.ENHANCED?SafeBrowsingInteractions.SAFE_BROWSING_ENHANCED_PROTECTION_EXPAND_ARROW_CLICKED:SafeBrowsingInteractions.SAFE_BROWSING_STANDARD_PROTECTION_EXPAND_ARROW_CLICKED)},recordInteractionHistogramOnSafeBrowsingDialogClose_(confirmed){this.metricsBrowserProxy_.recordSafeBrowsingInteractionHistogram(confirmed?SafeBrowsingInteractions.SAFE_BROWSING_DISABLE_SAFE_BROWSING_DIALOG_CONFIRMED:SafeBrowsingInteractions.SAFE_BROWSING_DISABLE_SAFE_BROWSING_DIALOG_DENIED)},recordActionOnRadioChange_(safeBrowsingSetting){let actionName;if(safeBrowsingSetting===SafeBrowsingSetting.ENHANCED){actionName="SafeBrowsing.Settings.EnhancedProtectionClicked"}else if(safeBrowsingSetting===SafeBrowsingSetting.STANDARD){actionName="SafeBrowsing.Settings.StandardProtectionClicked"}else{actionName="SafeBrowsing.Settings.DisableSafeBrowsingClicked"}this.metricsBrowserProxy_.recordAction(actionName)},recordActionOnExpandButtonClicked_(safeBrowsingSetting){this.metricsBrowserProxy_.recordAction(safeBrowsingSetting===SafeBrowsingSetting.ENHANCED?"SafeBrowsing.Settings.EnhancedProtectionExpandArrowClicked":"SafeBrowsing.Settings.StandardProtectionExpandArrowClicked")},recordActionOnSafeBrowsingDialogClose_(confirmed){this.metricsBrowserProxy_.recordAction(confirmed?"SafeBrowsing.Settings.DisableSafeBrowsingDialogConfirmed":"SafeBrowsing.Settings.DisableSafeBrowsingDialogDenied")}});// Copyright 2020 The Chromium Authors. All rights reserved.
const template$3=html`<!--_html_template_start_--><iron-iconset-svg name="all-sites" size="20">
  <svg>
    <defs>
      <g id="logout" width="24px" height="24px" viewBox="0 0 24 24" fill="#757575">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
        <path d="M0 0h24v24H0z" fill="none"></path>
      </g>

      <g id="offline" viewBox="0 0 24 24" width="24px" height="24px" fill="#757575">
        <path clip-path="url(#b)" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg>
<!--_html_template_end_-->`;document.head.appendChild(template$3.content);// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const template$4=document.createElement("template");template$4.innerHTML=`<dom-module id="clear-storage-dialog-shared">\x3c!--_html_template_start_--\x3e\n\n  <template>\n    <style scope="clear-storage-dialog-shared">.detail-list {\n  margin-top: 12px;\n}\n\n.detail {\n  align-items: center;\n        display: flex;\n        margin-top: 8px;\n}\n\n.detail iron-icon {\n  margin-inline-end: 16px;\n}\n\n</style>\n  </template>\n\x3c!--_html_template_end_--\x3e</dom-module>\n`;document.body.appendChild(template$4.content.cloneNode(true));// Copyright 2016 The Chromium Authors. All rights reserved.
const cookieInfo={cookie:[["name","cookieName"],["content","cookieContent"],["domain","cookieDomain"],["path","cookiePath"],["sendfor","cookieSendFor"],["accessibleToScript","cookieAccessibleToScript"],["created","cookieCreated"],["expires","cookieExpires"]],app_cache:[["origin","appCacheOrigin"],["size","localStorageSize"],["modified","localStorageLastModified"]],database:[["origin","databaseOrigin"],["size","localStorageSize"],["modified","localStorageLastModified"]],local_storage:[["origin","localStorageOrigin"],["size","localStorageSize"],["modified","localStorageLastModified"]],indexed_db:[["origin","indexedDbOrigin"],["size","indexedDbSize"],["modified","indexedDbLastModified"]],file_system:[["origin","fileSystemOrigin"],["persistent","fileSystemPersistentUsage"],["temporary","fileSystemTemporaryUsage"]],service_worker:[["origin","serviceWorkerOrigin"],["size","serviceWorkerSize"]],shared_worker:[["worker","sharedWorkerWorker"],["name","sharedWorkerName"]],cache_storage:[["origin","cacheStorageOrigin"],["size","cacheStorageSize"],["modified","cacheStorageLastModified"]],flash_lso:[["domain","cookieDomain"]],media_license:[["origin","mediaLicenseOrigin"],["size","mediaLicenseSize"],["modified","mediaLicenseLastModified"]]};const getCookieData=function(data){const out=[];const fields=cookieInfo[data.type];for(let i=0;i<fields.length;i++){const field=fields[i];const key=field[0];if(data[key].length>0){const entry={label:loadTimeData.getString(field[1]),content:data[key]};out.push(entry)}}return out};// Copyright 2017 The Chromium Authors. All rights reserved.
let CookieList;let LocalDataItem;class LocalDataBrowserProxy{getDisplayList(filter){}removeAll(){}removeShownItems(){}removeItem(id){}getCookieDetails(site){}getNumCookiesString(numCookies){}reloadCookies(){}removeCookie(path){}removeAllThirdPartyCookies(){}}class LocalDataBrowserProxyImpl{getDisplayList(filter){return sendWithPromise("localData.getDisplayList",filter)}removeAll(){return sendWithPromise("localData.removeAll")}removeShownItems(){chrome.send("localData.removeShownItems")}removeItem(id){chrome.send("localData.removeItem",[id])}getCookieDetails(site){return sendWithPromise("localData.getCookieDetails",site)}getNumCookiesString(numCookies){return sendWithPromise("localData.getNumCookiesString",numCookies)}reloadCookies(){return sendWithPromise("localData.reload")}removeCookie(path){chrome.send("localData.removeCookie",[path])}removeAllThirdPartyCookies(){return sendWithPromise("localData.removeThirdPartyCookies")}}addSingletonGetter(LocalDataBrowserProxyImpl);// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({is:"site-entry",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared" scope="site-entry">:host {
  padding: 0 var(--cr-section-padding);
}

.row-aligned {
  align-items: center;
        display: flex;
}

#toggleButton {
  min-height: var(--settings-row-min-height);
}

.site-representation {
  display: flex;
}

.second-line {
  margin-top: 0.1em;
}

.data-unit {
  direction: ltr;
        unicode-bidi: isolate;
}

.list-frame {
  padding-inline-end: 0;
}

.spacing {
  padding-inline-start: 1ch;
}

</style>
    <div id="collapseParent" focus-row-container="">
      <div class$="list-item [[getClassForIndex_(listIndex)]]">
        <div id="toggleButton" class="start row-aligned two-line" on-click="onSiteEntryTap_" actionable="" aria-expanded="false">
          <site-favicon url="[[getSiteGroupIcon_(siteGroup)]]"></site-favicon>
          <div class="middle text-elide" id="displayName">
            <div class="site-representation">
              <span class="url-directionality">[[displayName_]]</span>
              <span class="secondary" hidden$="[[!siteGroupScheme_(siteGroup)]]">
                &nbsp;—&nbsp;
              </span>
              <span class="secondary" hidden$="[[!siteGroupScheme_(siteGroup)]]">
                [[siteGroupScheme_(siteGroup)]]
              </span>
            </div>
            <div class="second-line secondary">
              <span class="data-unit">[[overallUsageString_]]</span>
              <span id="cookies" hidden$="[[!siteGroup.numCookies]]">
                · [[cookieString_]]
              </span>
            </div>
          </div>
          <cr-icon-button id="expandIcon" class="icon-expand-more" hidden$="[[!grouped_(siteGroup)]]" aria-label$="[[displayName_]]" aria-describedby="displayName" focus-row-control="" focus-type="expand"></cr-icon-button>
          <cr-icon-button class="subpage-arrow" hidden$="[[grouped_(siteGroup)]]" aria-label$="[[displayName_]]" aria-describedby="displayName" focus-row-control="" focus-type="show-detail"></cr-icon-button>
        </div>
        <div class="row-aligned">
          <div class="separator"></div>
          <cr-icon-button class="icon-more-vert" id="overflowMenuButton" title="مزيد من الإجراءات" on-click="showOverflowMenu_" focus-row-control="" focus-type="more-actions"></cr-icon-button>
        </div>
      </div>

      <cr-lazy-render id="originList">
        <template>
          <iron-collapse id="collapseChild" no-animation="">
            <div class="list-frame">
              <template is="dom-repeat" items="[[siteGroup.origins]]">
                <div class="list-item hr">
                  <div class="start row-aligned list-item origin-link" on-click="onOriginTap_" actionable="">
                    <site-favicon url="[[item.origin]]"></site-favicon>
                    <div class="site-representation middle text-elide">
                      <span id="originSiteRepresentation" class="url-directionality">
                        [[originRepresentation(item.origin)]]
                      </span>
                      <span class="secondary" hidden$="[[!originScheme_(item)]]">
                        &nbsp;
                        —
                        &nbsp;
                      </span>
                      <span class="secondary" hidden$="[[!originScheme_(item)]]">
                        [[originScheme_(item)]]
                      </span>
                      <!--Define a spacing span so that when the direction is
                         rtl, the spacing is still showing correctly. This is
                         because the data-unit class is set to be ltr so the
                         padding will be in wrong place if we put padding in
                         that span.-->
                      <span class="spacing" hidden$="[[!item.usage]]"></span>
                      <span class="secondary data-unit" hidden$="[[!item.usage]]">
                        [[originUsagesItem_(originUsages_.*, index)]]
                      </span>
                      <span class="secondary" hidden$="[[!item.numCookies]]">
                          &nbsp;·
                          [[originCookiesItem_(cookiesNum_.*, index)]]
                      </span>
                    </div>
                    <cr-icon-button class="subpage-arrow" aria-labelledby$="originSiteRepresentation" aria-roledescription="زر صفحة فرعية" focus-row-control="" focus-type="detailed-sites">
                    </cr-icon-button>
                  </div>
                  <div class="row-aligned" hidden$="[[!storagePressureUIEnabled_]]">
                    <div class="separator"></div>
                    <cr-icon-button class="icon-more-vert" id="originOverflowMenuButton" data-origin$="[[item.origin]]" data-context="origin" title="مزيد من الإجراءات" on-click="showOverflowMenu_" focus-row-control="" focus-type="more-actions">
                    </cr-icon-button>
                  </div>
                </div>
              </template>
            </div>
          </iron-collapse>
      </template>
    </cr-lazy-render>
    </div>
<!--_html_template_end_-->`,behaviors:[SiteSettingsBehavior,FocusRowBehavior],properties:{siteGroup:{type:Object,observer:"onSiteGroupChanged_"},displayName_:String,cookieString_:String,listIndex:{type:Number,value:-1},overallUsageString_:String,originUsages_:{type:Array,value(){return[]}},cookiesNum_:{type:Array,value(){return[]}},sortMethod:{type:String,observer:"updateOrigins_"}},localDataBrowserProxy_:null,button_:null,created(){this.localDataBrowserProxy_=LocalDataBrowserProxyImpl.getInstance()},detached(){if(this.button_){this.unlisten(this.button_,"keydown","onButtonKeydown_")}},onButtonKeydown_(e){if(e.shiftKey&&e.key==="Tab"){this.focus()}},grouped_(siteGroup){if(!siteGroup){return false}if(siteGroup.origins.length>1||siteGroup.numCookies>siteGroup.origins[0].numCookies){return true}return false},siteGroupRepresentation_(siteGroup){if(!siteGroup){return""}if(this.grouped_(siteGroup)){if(siteGroup.etldPlus1!==""){return siteGroup.etldPlus1}}return this.originRepresentation(siteGroup.origins[0].origin)},onSiteGroupChanged_(siteGroup){if(this.button_){this.unlisten(this.button_,"keydown","onButtonKeydown_")}this.button_=this.root.querySelector("#toggleButton *:not([hidden])");this.listen(assert(this.button_),"keydown","onButtonKeydown_");if(!this.grouped_(siteGroup)){const collapseChild=this.$.originList.getIfExists();if(collapseChild&&collapseChild.opened){this.toggleCollapsible_()}}if(!siteGroup){return}this.calculateUsageInfo_(siteGroup);this.getCookieNumString_(siteGroup.numCookies).then((string=>{this.cookieString_=string}));this.updateOrigins_(this.sortMethod);this.displayName_=this.siteGroupRepresentation_(siteGroup)},siteGroupScheme_(siteGroup){if(!siteGroup||this.grouped_(siteGroup)){return""}return this.originScheme_(siteGroup.origins[0])},originScheme_(origin){const url=this.toUrl(origin.origin);const scheme=url.protocol.replace(new RegExp(":*$"),"");const HTTPS_SCHEME="https";if(scheme===HTTPS_SCHEME){return""}return scheme},getSiteGroupIcon_(siteGroup){const origins=siteGroup.origins;assert(origins);assert(origins.length>=1);if(origins.length===1){return origins[0].origin}for(const originInfo of origins){if(this.toUrl(originInfo.origin).host==="www."+siteGroup.etldPlus1){return originInfo.origin}}const getMaxStorage=(max,originInfo)=>max.usage>originInfo.usage||max.usage===originInfo.usage&&max.numCookies>originInfo.numCookies?max:originInfo;return origins.reduce(getMaxStorage,origins[0]).origin},calculateUsageInfo_(siteGroup){let overallUsage=0;this.siteGroup.origins.forEach(((originInfo,i)=>{overallUsage+=originInfo.usage}));this.browserProxy.getFormattedBytes(overallUsage).then((string=>{this.overallUsageString_=string}))},getCookieNumString_(numCookies){if(numCookies===0){return Promise.resolve("")}return this.localDataBrowserProxy_.getNumCookiesString(numCookies)},originUsagesItem_(change,index){return change.base[index]},originCookiesItem_(change,index){return change.base[index]},navigateToSiteDetails_(origin){this.fire("site-entry-selected",{item:this.siteGroup,index:this.listIndex});Router.getInstance().navigateTo(routes.SITE_SETTINGS_SITE_DETAILS,new URLSearchParams("site="+origin))},onOriginTap_(e){this.navigateToSiteDetails_(this.siteGroup.origins[e.model.index].origin);this.browserProxy.recordAction(AllSitesAction2.ENTER_SITE_DETAILS);chrome.metricsPrivate.recordUserAction("AllSites_EnterSiteDetails")},onSiteEntryTap_(){if(!this.grouped_(this.siteGroup)){this.navigateToSiteDetails_(this.siteGroup.origins[0].origin);this.browserProxy.recordAction(AllSitesAction2.ENTER_SITE_DETAILS);chrome.metricsPrivate.recordUserAction("AllSites_EnterSiteDetails");return}this.toggleCollapsible_();this.scrollIntoViewIfNeeded()},toggleCollapsible_(){const collapseChild=this.$.originList.get();collapseChild.toggle();this.$.toggleButton.setAttribute("aria-expanded",collapseChild.opened);this.$.expandIcon.toggleClass("icon-expand-more");this.$.expandIcon.toggleClass("icon-expand-less");this.fire("iron-resize")},showOverflowMenu_(e){this.fire("open-menu",{target:e.target,index:this.listIndex,item:this.siteGroup,origin:e.target.dataset.origin,actionScope:e.target.dataset.context})},getIndexBoundToOriginList_(siteGroup,index){return Math.max(0,Math.min(index,siteGroup.origins.length-1))},getClassForIndex_(index){return index>0?"hr":""},updateOrigins_(sortMethod){if(!sortMethod||!this.siteGroup||!this.grouped_(this.siteGroup)){return null}const origins=this.siteGroup.origins.slice();origins.sort(this.sortFunction_(sortMethod));this.set("siteGroup.origins",origins);this.originUsages_=new Array(origins.length);origins.forEach(((originInfo,i)=>{this.browserProxy.getFormattedBytes(originInfo.usage).then((string=>{this.set(`originUsages_.${i}`,string)}))}));this.cookiesNum_=new Array(this.siteGroup.origins.length);origins.forEach(((originInfo,i)=>{this.getCookieNumString_(originInfo.numCookies).then((string=>{this.set(`cookiesNum_.${i}`,string)}))}))},sortFunction_(sortMethod){if(sortMethod===SortMethod.MOST_VISITED){return(origin1,origin2)=>origin2.engagement-origin1.engagement}else if(sortMethod===SortMethod.STORAGE){return(origin1,origin2)=>origin2.usage-origin1.usage||origin2.numCookies-origin1.numCookies}else if(sortMethod===SortMethod.NAME){return(origin1,origin2)=>origin1.origin.localeCompare(origin2.origin)}}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"all-sites",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared md-select clear-storage-dialog-shared" scope="all-sites">#sort {
  align-items: center;
        display: flex;
        margin: 0 var(--cr-icon-button-margin-start);
        margin-bottom: 8px;
        padding: 0 var(--cr-section-padding);
}

#sortMethod {
  margin-inline-start: 1em;
}

.list-frame.without-heading {
  padding-inline-start: var(--cr-section-padding);
}

#clearAllContainer {
  align-items: center;
        display: flex;
        height: var(--cr-section-two-line-min-height);
        justify-content: space-between;
        margin: 0 var(--cr-icon-button-margin-start);
        padding-inline-end: var(--cr-section-padding);
        padding-inline-start: var(--cr-section-padding);
}

</style>
    <div id="sort">
      <label id="sortLabel">ترتيب بحسب</label>
      <select id="sortMethod" class="md-select" aria-labelledby="sortLabel" on-change="onSortMethodChanged_">
        <option value="[[sortMethods_.MOST_VISITED]]">
          الأكثر زيارة
        </option>
        <option value="[[sortMethods_.STORAGE]]">
          البيانات المُخزَّنة
        </option>
        <option value="[[sortMethods_.NAME]]">
          الاسم
        </option>
      </select>
    </div>
    <div id="clearAllContainer" hidden$="[[!storagePressureFlagEnabled_]]">
      <div id="clearLabel">
        مساحة التخزين المستخدمة من قِبل المواقع الإلكترونية: [[totalUsage_]]
      </div>
      <div id="clearAllButton">
        <cr-button type="button" on-click="onConfirmClearAllData_">
          محو جميع البيانات
        </cr-button>
      </div>
    </div>
    <div class="list-frame" hidden$="[[!siteGroupMapEmpty_(siteGroupMap)]]">
      <div class="list-item secondary">ستظهر المواقع التي تزورها هنا.</div>
    </div>
    <div class="list-frame" hidden$="[[!noSearchResultFound_(filteredList_)]]">
      <div class="list-item secondary">لم يتم العثور على أي مواقع</div>
    </div>
    <div class="list-frame without-heading" id="listContainer">
      <iron-list id="allSitesList" items="[[filteredList_]]" scroll-target="[[subpageScrollTarget]]">
        <template>
          <site-entry site-group="[[item]]" list-index="[[index]]" iron-list-tab-index="[[tabIndex]]" focus-row-index="[[index]]" tabindex$="[[tabIndex]]" last-focused="{{lastFocused_}}" list-blurred="{{listBlurred_}}" sort-method="[[sortMethod_]]">
          </site-entry>
        </template>
      </iron-list>
    </div>

    <!-- Overflow menu. -->
    <cr-lazy-render id="menu">
      <template>
        <cr-action-menu role-description="قائمة">
          <button class="dropdown-item" role="menuitem" on-click="onConfirmResetSettings_">
            إعادة ضبط الأذونات
          </button>
          <button class="dropdown-item" role="menuitem" on-click="onConfirmClearData_">
            محو البيانات
          </button>
        </cr-action-menu>
      </template>
    </cr-lazy-render>

    <!-- Confirm reset settings dialog. -->
    <cr-lazy-render id="confirmResetSettings">
      <template>
        <cr-dialog close-text="إغلاق">
          <div slot="title">
            هل تريد إعادة ضبط أذونات المواقع الإلكترونية هذه؟
          </div>
          <div slot="body">
            [[getResetPermissionsLabel_(actionMenuModel_)]]
          </div>
          <div slot="button-container">
            <cr-button class="cancel-button" on-click="onCloseDialog_">
              إلغاء
            </cr-button>
            <cr-button class="action-button" on-click="onResetSettings_">
              إعادة الضبط
            </cr-button>
          </div>
        </cr-dialog>
      </template>
    </cr-lazy-render>

    <!-- Confirm clear data dialog. -->
    <cr-lazy-render id="confirmClearData">
      <template>
        <cr-dialog close-text="إغلاق">
          <div slot="title">
            هل تريد محو بيانات الموقع الإلكتروني؟
          </div>
          <div slot="body">
            [[getClearDataLabel_(
                actionMenuModel_, storagePressureFlagEnabled_)]]
          </div>
          <div slot="button-container">
            <cr-button class="cancel-button" on-click="onCloseDialog_">
              إلغاء
            </cr-button>
            <cr-button class="action-button" on-click="onClearData_">
              محو
            </cr-button>
          </div>
        </cr-dialog>
      </template>
    </cr-lazy-render>

    <!-- New version of confirm clear data dialog to show if storage
         pressure UI flag is enabled. -->
    <cr-lazy-render id="confirmClearDataNew">
      <template>
        <cr-dialog close-text="إغلاق">
          <div slot="title">
            هل تريد محو بيانات الموقع الإلكتروني؟
          </div>
          <div slot="body">
            [[getClearDataLabel_(
                actionMenuModel_, storagePressureFlagEnabled_)]]
            <div class="detail-list">
              <div class="detail">
                <iron-icon icon="all-sites:logout"></iron-icon>
                [[getLogoutLabel_()]]
              </div>
              <div class="detail">
                <iron-icon icon="all-sites:offline"></iron-icon>
                سيتم محو أي بيانات متوفرة بلا اتصال بالإنترنت.
              </div>
            </div>
          </div>
          <div slot="button-container">
            <cr-button class="cancel-button" on-click="onCloseDialog_">
              إلغاء
            </cr-button>
            <cr-button class="action-button" on-click="onClearData_">
              محو
            </cr-button>
          </div>
        </cr-dialog>
      </template>
    </cr-lazy-render>

    <!-- Confirm clear all data dialog. -->
    <cr-lazy-render id="confirmClearAllData">
      <template>
        <cr-dialog close-text="إغلاق">
          <div slot="title">
            هل تريد محو جميع البيانات؟
          </div>
          <div slot="body">
            <div>[[getClearAllDataLabel_(totalUsage_)]]</div>
            <div class="detail-list">
              <div class="detail">
                <iron-icon icon="all-sites:logout"></iron-icon>
                سيتم تسجيل خروجك من جميع المواقع الإلكترونية، بما في ذلك المواقع الإلكترونية في علامات التبويب المفتوحة.
              </div>
              <div class="detail">
                <iron-icon icon="all-sites:offline"></iron-icon>
                سيتم محو أي بيانات متوفرة بلا اتصال بالإنترنت.
              </div>
            </div>
          </div>
          <div slot="button-container">
            <cr-button class="cancel-button" on-click="onCloseDialog_">
              إلغاء
            </cr-button>
            <cr-button class="action-button" on-click="onClearAllData_">
              محو
            </cr-button>
          </div>
        </cr-dialog>
      </template>
    </cr-lazy-render>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,SiteSettingsBehavior,WebUIListenerBehavior,RouteObserverBehavior,GlobalScrollTargetBehavior],properties:{siteGroupMap:{type:Object,value(){return new Map}},filteredList_:{type:Array},subpageRoute:{type:Object,value:routes.SITE_SETTINGS_ALL,readOnly:true},filter:{type:String,value:"",observer:"forceListUpdate_"},sortMethods_:{type:Object,value:SortMethod,readOnly:true},selectedItem_:Object,lastFocused_:Object,listBlurred_:Boolean,actionMenuModel_:Object,clearAllData_:Boolean,sortMethod_:String,totalUsage_:{type:String,value:"0 B"}},localDataBrowserProxy_:null,created(){this.localDataBrowserProxy_=LocalDataBrowserProxyImpl.getInstance()},listeners:{"open-menu":"onOpenMenu_"},ready(){this.addWebUIListener("onStorageListFetched",this.onStorageListFetched.bind(this));this.addEventListener("site-entry-selected",(e=>{const event=e;this.selectedItem_=event.detail}));const sortParam=Router.getInstance().getQueryParameters().get("sort");if(Object.values(this.sortMethods_).includes(sortParam)){this.$.sortMethod.value=sortParam}this.sortMethod_=this.$.sortMethod.value},attached(){afterNextRender(this,(()=>{this.$.allSitesList.scrollOffset=this.$.allSitesList.offsetTop}))},currentRouteChanged(currentRoute){GlobalScrollTargetBehaviorImpl.currentRouteChanged.call(this,currentRoute);if(currentRoute===routes.SITE_SETTINGS_ALL){this.populateList_()}},populateList_(){const contentTypes=this.getCategoryList();if(!contentTypes.includes(ContentSettingsTypes.COOKIES)){contentTypes.push(ContentSettingsTypes.COOKIES)}this.browserProxy.getAllSites(contentTypes).then((response=>{const newMap=new Map(this.siteGroupMap);response.forEach((siteGroup=>{newMap.set(siteGroup.etldPlus1,siteGroup)}));this.siteGroupMap=newMap;this.updateTotalUsage_();this.forceListUpdate_()}))},onStorageListFetched(list){const newMap=new Map(this.siteGroupMap);list.forEach((storageSiteGroup=>{newMap.set(storageSiteGroup.etldPlus1,storageSiteGroup)}));this.siteGroupMap=newMap;this.updateTotalUsage_();this.forceListUpdate_();this.focusOnLastSelectedEntry_()},updateTotalUsage_(){let usageSum=0;for(const[etldPlus1,siteGroup]of this.siteGroupMap){siteGroup.origins.forEach((origin=>{usageSum+=origin.usage}))}this.browserProxy.getFormattedBytes(usageSum).then((totalUsage=>{this.totalUsage_=totalUsage}))},filterPopulatedList_(siteGroupMap,searchQuery){const result=[];for(const[etldPlus1,siteGroup]of siteGroupMap){if(siteGroup.origins.find((originInfo=>originInfo.origin.includes(searchQuery)))){result.push(siteGroup)}}return this.sortSiteGroupList_(result)},sortSiteGroupList_(siteGroupList){const sortMethod=this.$.sortMethod.value;if(!this.sortMethods_){return siteGroupList}if(sortMethod===SortMethod.MOST_VISITED){siteGroupList.sort(this.mostVisitedComparator_)}else if(sortMethod===SortMethod.STORAGE){siteGroupList.sort(this.storageComparator_)}else if(sortMethod===SortMethod.NAME){siteGroupList.sort(this.nameComparator_)}return siteGroupList},mostVisitedComparator_(siteGroup1,siteGroup2){const getMaxEngagement=(max,originInfo)=>max>originInfo.engagement?max:originInfo.engagement;const score1=siteGroup1.origins.reduce(getMaxEngagement,0);const score2=siteGroup2.origins.reduce(getMaxEngagement,0);return score2-score1},storageComparator_(siteGroup1,siteGroup2){const getOverallUsage=siteGroup=>{let usage=0;siteGroup.origins.forEach((originInfo=>{usage+=originInfo.usage}));return usage};const siteGroup1Size=getOverallUsage(siteGroup1);const siteGroup2Size=getOverallUsage(siteGroup2);return siteGroup2Size-siteGroup1Size||siteGroup2.numCookies-siteGroup1.numCookies},nameComparator_(siteGroup1,siteGroup2){return siteGroup1.etldPlus1.localeCompare(siteGroup2.etldPlus1)},onSortMethodChanged_(){this.sortMethod_=this.$.sortMethod.value;this.filteredList_=this.sortSiteGroupList_(this.filteredList_);this.$.allSitesList.fire("iron-resize")},forceListUpdate_(){this.filteredList_=this.filterPopulatedList_(this.siteGroupMap,this.filter);this.$.allSitesList.fire("iron-resize")},siteGroupMapEmpty_(){return!this.siteGroupMap.size},noSearchResultFound_(){return!this.filteredList_.length&&!this.siteGroupMapEmpty_()},focusOnLastSelectedEntry_(){if(!this.selectedItem_||this.siteGroupMap.size===0){return}const index=Math.max(0,Math.min(this.selectedItem_.index,this.siteGroupMap.size));this.$.allSitesList.focusItem(index);this.selectedItem_=null},onOpenMenu_(e){const index=e.detail.index;const list=this.$["allSitesList"];if(index<list.firstVisibleIndex||index>list.lastVisibleIndex){list.scrollToIndex(index)}const target=e.detail.target;this.actionMenuModel_=e.detail;const menu=this.$.menu.get();menu.showAt(target)},onConfirmResetSettings_(e){e.preventDefault();const scope=this.actionMenuModel_.actionScope==="origin"?"Origin":"SiteGroup";const scopes=[ALL_SITES_DIALOG.RESET_PERMISSIONS,scope,"DialogOpened"];this.recordUserAction_(scopes);this.$.confirmResetSettings.get().showModal()},onConfirmClearData_(e){e.preventDefault();const{actionScope:actionScope,index:index,origin:origin}=this.actionMenuModel_;const{origins:origins,hasInstalledPWA:hasInstalledPWA}=this.filteredList_[index];const scope=actionScope==="origin"?"Origin":"SiteGroup";const appInstalled=actionScope==="origin"?(origins.find((o=>o.origin===origin))||{}).isInstalled:hasInstalledPWA;const installed=appInstalled?"Installed":"";const scopes=[ALL_SITES_DIALOG.CLEAR_DATA,scope,installed,"DialogOpened"];this.recordUserAction_(scopes);this.$.confirmClearDataNew.get().showModal()},onConfirmClearAllData_(e){e.preventDefault();this.clearAllData_=true;const anyAppsInstalled=this.filteredList_.some((g=>g.hasInstalledPWA));const scopes=[ALL_SITES_DIALOG.CLEAR_DATA,"All"];const installed=anyAppsInstalled?"Installed":"";this.recordUserAction_([...scopes,installed,"DialogOpened"]);this.$.confirmClearAllData.get().showModal()},onCloseDialog_(e){chrome.metricsPrivate.recordUserAction("AllSites_DialogClosed");e.target.closest("cr-dialog").close();this.actionMenuModel_=null;this.$.menu.get().close()},getClearDataLabel_:function(){if(this.actionMenuModel_===null){return""}const{index:index,origin:origin}=this.actionMenuModel_;const{origins:origins,hasInstalledPWA:hasInstalledPWA}=this.filteredList_[index];if(origin){const{isInstalled:isInstalled=false}=origins.find((o=>o.origin===origin))||{};const messageId=isInstalled?"siteSettingsOriginDeleteConfirmationInstalled":"siteSettingsOriginDeleteConfirmation";return loadTimeData.substituteString(this.i18n(messageId),this.originRepresentation(origin))}else{let messageId;if(hasInstalledPWA){const multipleAppsInstalled=(this.filteredList_[index].origins||[]).filter((o=>o.isInstalled)).length>1;messageId=multipleAppsInstalled?"siteSettingsSiteGroupDeleteConfirmationInstalledPlural":"siteSettingsSiteGroupDeleteConfirmationInstalled"}else{messageId="siteSettingsSiteGroupDeleteConfirmationNew"}const displayName=this.actionMenuModel_.item.etldPlus1||this.originRepresentation(this.actionMenuModel_.item.origins[0].origin);return loadTimeData.substituteString(this.i18n(messageId),displayName)}},getResetPermissionsLabel_:function(){if(this.actionMenuModel_===null){return""}if(this.actionMenuModel_.actionScope==="origin"){return loadTimeData.substituteString(this.i18n("siteSettingsSiteResetConfirmation"),this.originRepresentation(this.actionMenuModel_.origin))}return loadTimeData.substituteString(this.i18n("siteSettingsSiteGroupResetConfirmation"),this.actionMenuModel_.item.etldPlus1||this.originRepresentation(this.actionMenuModel_.item.origins[0].origin))},getClearAllDataLabel_:function(){const anyAppsInstalled=this.filteredList_.some((g=>g.hasInstalledPWA));const messageId=anyAppsInstalled?"siteSettingsClearAllStorageConfirmationInstalled":"siteSettingsClearAllStorageConfirmation";return loadTimeData.substituteString(this.i18n(messageId),this.totalUsage_)},getLogoutLabel_:function(){return this.actionMenuModel_.actionScope==="origin"?this.i18n("siteSettingsSiteClearStorageSignOut"):this.i18n("siteSettingsSiteGroupDeleteSignOut")},recordUserAction_:function(scopes){chrome.metricsPrivate.recordUserAction(["AllSites",...scopes].filter(Boolean).join("_"))},resetPermissionsForOrigin_:function(origin){const contentSettingsTypes=this.getCategoryList();this.browserProxy.setOriginPermissions(origin,contentSettingsTypes,ContentSetting.DEFAULT)},onResetSettings_:function(e){const{actionScope:actionScope,index:index,origin:origin}=this.actionMenuModel_;const siteGroupToUpdate=this.filteredList_[index];const updatedSiteGroup={etldPlus1:siteGroupToUpdate.etldPlus1,numCookies:siteGroupToUpdate.numCookies,origins:[]};if(actionScope==="origin"){this.browserProxy.recordAction(AllSitesAction2.RESET_ORIGIN_PERMISSIONS);this.recordUserAction_([ALL_SITES_DIALOG.RESET_PERMISSIONS,"Origin","Confirm"]);this.resetPermissionsForOrigin_(origin);updatedSiteGroup.origins=siteGroupToUpdate.origins;const updatedOrigin=updatedSiteGroup.origins.find((o=>o.origin===origin));updatedOrigin.hasPermissionSettings=false;if(updatedOrigin.numCookies<=0||updatedOrigin.usage<=0){updatedSiteGroup.origins=updatedSiteGroup.origins.filter((o=>o.origin!==origin))}}else{this.browserProxy.recordAction(AllSitesAction2.RESET_SITE_GROUP_PERMISSIONS);this.recordUserAction_([ALL_SITES_DIALOG.RESET_PERMISSIONS,"SiteGroup","Confirm"]);if(this.actionMenuModel_.item.etldPlus1!==siteGroupToUpdate.etldPlus1){return}siteGroupToUpdate.origins.forEach((originEntry=>{this.resetPermissionsForOrigin_(originEntry.origin);if(originEntry.numCookies>0||originEntry.usage>0){originEntry.hasPermissionSettings=false;updatedSiteGroup.origins.push(originEntry)}}))}if(updatedSiteGroup.origins.length>0){this.set("filteredList_."+index,updatedSiteGroup)}else if(siteGroupToUpdate.numCookies>0){const originPlaceHolder={origin:`http://${siteGroupToUpdate.etldPlus1}/`,engagement:0,usage:0,numCookies:siteGroupToUpdate.numCookies,hasPermissionSettings:false};updatedSiteGroup.origins.push(originPlaceHolder);this.set("filteredList_."+index,updatedSiteGroup)}else{this.splice("filteredList_",index,1)}this.$.allSitesList.fire("iron-resize");this.onCloseDialog_(e)},clearDataForSiteGroupIndex_:function(index){const siteGroupToUpdate=this.filteredList_[index];const updatedSiteGroup={etldPlus1:siteGroupToUpdate.etldPlus1,hasInstalledPWA:siteGroupToUpdate.hasInstalledPWA,numCookies:0,origins:[]};this.browserProxy.clearEtldPlus1DataAndCookies(siteGroupToUpdate.etldPlus1);for(let i=0;i<siteGroupToUpdate.origins.length;++i){const updatedOrigin=Object.assign({},siteGroupToUpdate.origins[i]);if(updatedOrigin.hasPermissionSettings){updatedOrigin.numCookies=0;updatedOrigin.usage=0;updatedSiteGroup.origins.push(updatedOrigin)}}this.updateSiteGroup_(index,updatedSiteGroup)},clearDataForOrigin_:function(index,origin){this.browserProxy.clearOriginDataAndCookies(this.toUrl(origin).href);const siteGroupToUpdate=this.filteredList_[index];const updatedSiteGroup={etldPlus1:siteGroupToUpdate.etldPlus1,numCookies:0,origins:[]};const updatedOrigin=siteGroupToUpdate.origins.find((o=>o.origin===origin));if(updatedOrigin.hasPermissionSettings){updatedOrigin.numCookies=0;updatedOrigin.usage=0;updatedSiteGroup.origins=siteGroupToUpdate.origins}else{updatedSiteGroup.origins=siteGroupToUpdate.origins.filter((o=>o.origin!==origin))}updatedSiteGroup.hasInstalledPWA=updatedSiteGroup.origins.some((o=>o.isInstalled));this.updateSiteGroup_(index,updatedSiteGroup)},updateSiteGroup_:function(index,updatedSiteGroup){if(updatedSiteGroup.origins.length>0){this.set("filteredList_."+index,updatedSiteGroup)}else{this.splice("filteredList_",index,1)}this.siteGroupMap.delete(updatedSiteGroup.etldPlus1)},onClearData_:function(e){const{index:index,actionScope:actionScope,origin:origin}=this.actionMenuModel_;const scopes=[ALL_SITES_DIALOG.CLEAR_DATA];if(actionScope==="origin"){this.browserProxy.recordAction(AllSitesAction2.CLEAR_ORIGIN_DATA);const{origins:origins}=this.filteredList_[index];scopes.push("Origin");const installed=(origins.find((o=>o.origin===origin))||{}).isInstalled?"Installed":"";this.recordUserAction_([...scopes,installed,"Confirm"]);this.clearDataForOrigin_(index,origin)}else{this.browserProxy.recordAction(AllSitesAction2.CLEAR_SITE_GROUP_DATA);scopes.push("SiteGroup");const{hasInstalledPWA:hasInstalledPWA}=this.filteredList_[index];const installed=hasInstalledPWA?"Installed":"";this.recordUserAction_([...scopes,installed,"Confirm"]);this.clearDataForSiteGroupIndex_(index)}this.$.allSitesList.fire("iron-resize");this.updateTotalUsage_();this.onCloseDialog_(e)},onClearAllData_(e){this.browserProxy.recordAction(AllSitesAction2.CLEAR_ALL_DATA);const scopes=[ALL_SITES_DIALOG.CLEAR_DATA,"All"];const anyAppsInstalled=this.filteredList_.some((g=>g.hasInstalledPWA));const installed=anyAppsInstalled?"Installed":"";this.recordUserAction_([...scopes,installed,"Confirm"]);for(let index=this.filteredList_.length-1;index>=0;index--){this.clearDataForSiteGroupIndex_(index)}this.$.allSitesList.fire("iron-resize");this.totalUsage_="0 B";this.onCloseDialog_(e)}});// Copyright 2015 The Chromium Authors. All rights reserved.
const categoryLabels={app_cache:loadTimeData.getString("cookieAppCache"),cache_storage:loadTimeData.getString("cookieCacheStorage"),database:loadTimeData.getString("cookieDatabaseStorage"),file_system:loadTimeData.getString("cookieFileSystem"),flash_lso:loadTimeData.getString("cookieFlashLso"),indexed_db:loadTimeData.getString("cookieDatabaseStorage"),local_storage:loadTimeData.getString("cookieLocalStorage"),service_worker:loadTimeData.getString("cookieServiceWorker"),shared_worker:loadTimeData.getString("cookieSharedWorker"),media_license:loadTimeData.getString("cookieMediaLicense")};Polymer({is:"site-data-details-subpage",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared md-select iron-flex" scope="site-data-details-subpage">[first] {
  border-top: none;
}

.secondary, .start {
  max-width: 100%;
        word-break: break-word;
}

</style>
    <template is="dom-repeat" items="[[entries_]]">
      <div class="cr-row" first$="[[!index]]">
        <cr-expand-button class="flex" expanded="{{item.expanded_}}">
          [[getEntryDescription_(item)]]
        </cr-expand-button>
        <div class="separator"></div>
        <cr-icon-button class="icon-clear" data-id-path$="[[item.idPath]]" on-click="onRemove_"></cr-icon-button>
      </div>
      <iron-collapse class="list-frame vertical-list" opened="[[item.expanded_]]">
        <template is="dom-repeat" items="[[getCookieNodes_(item)]]">
          <div class="list-item two-line">
            <div class="start">
              [[item.label]]
              <div class="secondary">[[item.content]]</div>
            </div>
          </div>
        </template>
      </iron-collapse>
    </template>
<!--_html_template_end_-->`,behaviors:[RouteObserverBehavior,WebUIListenerBehavior],properties:{entries_:Array,pageTitle:{type:String,notify:true},site_:String,siteId_:String},browserProxy_:null,ready(){this.browserProxy_=LocalDataBrowserProxyImpl.getInstance();this.addWebUIListener("on-tree-item-removed",this.getCookieDetails_.bind(this))},currentRouteChanged(route){if(Router.getInstance().getCurrentRoute()!==routes.SITE_SETTINGS_DATA_DETAILS){return}const site=Router.getInstance().getQueryParameters().get("site");if(!site){return}this.site_=site;this.pageTitle=loadTimeData.getStringF("siteSettingsCookieSubpage",site);this.getCookieDetails_()},getCookieDetails_(){if(!this.site_){return}this.browserProxy_.getCookieDetails(this.site_).then(this.onCookiesLoaded_.bind(this),this.onCookiesLoadFailed_.bind(this))},getCookieNodes_(node){return getCookieData(node)},onCookiesLoaded_(cookies){this.siteId_=cookies.id;this.entries_=cookies.children;this.entries_.forEach((function(e){e.expanded_=false}))},onCookiesLoadFailed_(){this.siteId_="";this.entries_=[]},getEntryDescription_(item){if(item.type==="cookie"){return item.title}if(item.type==="quota"){return item.totalUsage}return categoryLabels[item.type]},onRemove_(event){MetricsBrowserProxyImpl.getInstance().recordSettingsPageHistogram(PrivacyElementInteractions.COOKIE_DETAILS_REMOVE_ITEM);this.browserProxy_.removeCookie(event.currentTarget.dataset.idPath)},removeAll(){MetricsBrowserProxyImpl.getInstance().recordSettingsPageHistogram(PrivacyElementInteractions.COOKIE_DETAILS_REMOVE_ALL);this.browserProxy_.removeCookie(this.siteId_)}});// Copyright 2020 The Chromium Authors. All rights reserved.
Polymer({is:"settings-recent-site-permissions",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared" scope="settings-recent-site-permissions">site-favicon {
  padding-inline-end: 24px;
}

.link-button[disabled] {
  cursor: auto;
        pointer-events: none;
}

.incognito-icon {
  cursor: auto;
        pointer-events: auto;
}

.display-name {
  flex: 1;
        max-width: 100%;
}

</style>
    <div id="noPermissionsText" class="list-frame" hidden$="[[!noRecentPermissions]]">
      <div class="list-item secondary">لم يتم تغيير أذونات مؤخرًا.</div>
    </div>
    <template is="dom-repeat" id="recentPermissionsList" items="[[recentSitePermissionsList_]]" on-dom-change="onDomChange_">
      <div class$="cr-row link-button [[getClassForIndex_(index)]]" on-click="onRecentSitePermissionClick_" actionable="" disabled$="[[item.incognito]]">
        <site-favicon url="[[item.origin]]"></site-favicon>
        <div id="displayName_[[index]]" class="display-name cr-padded-text">
          <div class="site-representation">
            <span class="url-directionality">[[getDisplayName_(item)]]</span>
            <span class="secondary" hidden$="[[!getSiteScheme_(item)]]">
            &nbsp;—&nbsp;
            </span>
            <span class="secondary" hidden$="[[!getSiteScheme_(item)]]">
              [[getSiteScheme_(item)]]
            </span>
          </div>
          <div class="second-line secondary">
              [[getPermissionsText_(item)]]
          </div>
        </div>
        <cr-icon-button id="siteEntryButton_[[index]]" class="subpage-arrow" hidden$="[[item.incognito]]" aria-label$="[[getDisplayName_(item)]]" aria-describedby$="displayName_[[index]]" focus-row-control="" focus-type="show-detail"></cr-icon-button>
        <cr-tooltip-icon id="incognitoInfoIcon_[[index]]" class="incognito-icon" hidden$="[[!item.incognito]]" disabled$="[[item.incognito]]" icon-aria-label="ستتم إزالة هذا الاستثناء تلقائيًا بعد الخروج من جلسة التصفح المتخفي الحالية" icon-class="settings20:incognito" on-click="onShowIncognitoTooltip_" on-mouseenter="onShowIncognitoTooltip_" on-focus="onShowIncognitoTooltip_"></cr-tooltip-icon>
      </div>
    </template>
    <paper-tooltip id="tooltip" fit-to-visible-bounds="" manual-mode="" position="top">
      ستتم إزالة هذا الاستثناء تلقائيًا بعد الخروج من جلسة التصفح المتخفي الحالية
    </paper-tooltip>
<!--_html_template_end_-->`,behaviors:[RouteObserverBehavior,SiteSettingsBehavior,WebUIListenerBehavior,I18nBehavior],properties:{noRecentPermissions:{type:Boolean,computed:"computeNoRecentPermissions_(recentSitePermissionsList_)",notify:true},shouldFocusAfterPopulation_:Boolean,recentSitePermissionsList_:{type:Array,value:()=>[]},focusConfig:{type:Object,observer:"focusConfigChanged_"}},lastSelected_:null,focusConfigChanged_(newConfig,oldConfig){assert(!oldConfig);this.focusConfig.set(routes.SITE_SETTINGS_SITE_DETAILS.path+"_"+routes.SITE_SETTINGS.path,(()=>{this.shouldFocusAfterPopulation_=true}))},currentRouteChanged(currentRoute){if(currentRoute.path===routes.SITE_SETTINGS.path){this.populateList_()}},ready(){this.addWebUIListener("onIncognitoStatusChanged",this.onIncognitoStatusChanged_.bind(this));this.browserProxy.updateIncognitoStatus()},getI18nContentTypeString_(contentSettingsType){switch(contentSettingsType){case ContentSettingsTypes.COOKIES:return this.i18n("siteSettingsCookies");case ContentSettingsTypes.IMAGES:return this.i18n("siteSettingsImages");case ContentSettingsTypes.JAVASCRIPT:return this.i18n("siteSettingsJavascript");case ContentSettingsTypes.SOUND:return this.i18n("siteSettingsSound");case ContentSettingsTypes.POPUPS:return this.i18n("siteSettingsPopups");case ContentSettingsTypes.GEOLOCATION:return this.i18n("siteSettingsLocation");case ContentSettingsTypes.NOTIFICATIONS:return this.i18n("siteSettingsNotifications");case ContentSettingsTypes.MIC:return this.i18n("siteSettingsMic");case ContentSettingsTypes.CAMERA:return this.i18n("siteSettingsCamera");case ContentSettingsTypes.PROTOCOL_HANDLERS:return this.i18n("siteSettingsHandlers");case ContentSettingsTypes.AUTOMATIC_DOWNLOADS:return this.i18n("siteSettingsAutomaticDownloads");case ContentSettingsTypes.BACKGROUND_SYNC:return this.i18n("siteSettingsBackgroundSync");case ContentSettingsTypes.MIDI_DEVICES:return this.i18n("siteSettingsMidiDevices");case ContentSettingsTypes.USB_DEVICES:return this.i18n("siteSettingsUsbDevices");case ContentSettingsTypes.SERIAL_PORTS:return this.i18n("siteSettingsSerialPorts");case ContentSettingsTypes.BLUETOOTH_DEVICES:return this.i18n("siteSettingsBluetoothDevices");case ContentSettingsTypes.ZOOM_LEVELS:return this.i18n("siteSettingsZoomLevels");case ContentSettingsTypes.PROTECTED_CONTENT:return this.i18n("siteSettingsProtectedContent");case ContentSettingsTypes.ADS:return this.i18n("siteSettingsAds");case ContentSettingsTypes.CLIPBOARD:return this.i18n("siteSettingsClipboard");case ContentSettingsTypes.SENSORS:return this.i18n("siteSettingsSensors");case ContentSettingsTypes.PAYMENT_HANDLER:return this.i18n("siteSettingsPaymentHandler");case ContentSettingsTypes.MIXEDSCRIPT:return this.i18n("siteSettingsInsecureContent");case ContentSettingsTypes.BLUETOOTH_SCANNING:return this.i18n("siteSettingsBluetoothScanning");case ContentSettingsTypes.FILE_SYSTEM_WRITE:return this.i18n("siteSettingsFileSystemWrite");case ContentSettingsTypes.HID_DEVICES:return this.i18n("siteSettingsHidDevices");case ContentSettingsTypes.AR:return this.i18n("siteSettingsAr");case ContentSettingsTypes.VR:return this.i18n("siteSettingsVr");case ContentSettingsTypes.WINDOW_PLACEMENT:return this.i18n("siteSettingsWindowPlacement");case ContentSettingsTypes.FONT_ACCESS:return this.i18n("fonts");case ContentSettingsTypes.IDLE_DETECTION:return this.i18n("siteSettingsIdleDetection");default:return""}},getI18nPermissionChangeString_({setting:setting,source:source,type:type},sentenceStart){let change;if(setting===ContentSetting.ALLOW){change="Allowed"}else if(setting===ContentSetting.BLOCK){if(source===SiteSettingSource.EMBARGO){change="Autoblocked"}else if(source===SiteSettingSource.PREFERENCE){change="Blocked"}else{return""}}const suffix=sentenceStart?"SentenceStart":"";const msgId=`recentPermissionChange${change}${suffix}`;return this.i18n(msgId,this.getI18nContentTypeString_(type))},getDisplayName_(recentSitePermissions){const url=this.toUrl(recentSitePermissions.origin);return url.host},getSiteScheme_({origin:origin}){const url=this.toUrl(origin);const scheme=url.protocol.slice(0,-1);return scheme==="https"?"":scheme},getPermissionsText_({recentPermissions:recentPermissions,incognito:incognito}){const displayStrings=recentPermissions.map(((rp,i)=>this.getI18nPermissionChangeString_(rp,i===0)));if(recentPermissions.length===1&&!incognito){return displayStrings[0]}const itemsPart=["OneItem","TwoItems","ThreeItems","OverThreeItems"][Math.min(recentPermissions.length,4)-1];const suffix=incognito?"Incognito":"";const i18nStringID=`recentPermissions${itemsPart}${suffix}`;return this.i18n(i18nStringID,...displayStrings)},getClassForIndex_(index){return index===0?"first":""},computeNoRecentPermissions_(){return this.recentSitePermissionsList_.length===0},onIncognitoStatusChanged_(hasIncognito){if(hasIncognito===false&&this.recentSitePermissionsList_.some((p=>p.incognito))){this.populateList_()}},onRecentSitePermissionClick_(e){const origin=this.recentSitePermissionsList_[e.model.index].origin;Router.getInstance().navigateTo(routes.SITE_SETTINGS_SITE_DETAILS,new URLSearchParams({site:origin}));this.browserProxy.recordAction(AllSitesAction2.ENTER_SITE_DETAILS);this.lastSelected_={index:e.model.index,origin:e.model.item.origin,incognito:e.model.item.incognito}},onShowIncognitoTooltip_(e){e.stopPropagation();const target=e.target;const tooltip=this.$.tooltip;tooltip.target=target;tooltip.updatePosition();const hide=()=>{tooltip.hide();target.removeEventListener("mouseleave",hide);target.removeEventListener("blur",hide);target.removeEventListener("click",hide);tooltip.removeEventListener("mouseenter",hide)};target.addEventListener("mouseleave",hide);target.addEventListener("blur",hide);target.addEventListener("click",hide);tooltip.addEventListener("mouseenter",hide);tooltip.show()},focusLastSelected_(){if(this.noRecentPermissions){return}const currentIndex=this.recentSitePermissionsList_.findIndex((permissions=>permissions.origin===this.lastSelected_.origin&&permissions.incognito===this.lastSelected_.incognito));const fallbackIndex=Math.min(this.lastSelected_.index,this.recentSitePermissionsList_.length-1);const index=currentIndex>-1?currentIndex:fallbackIndex;if(this.recentSitePermissionsList_[index].incognito){focusWithoutInk(assert(this.$$(`#incognitoInfoIcon_${index}`).getFocusableElement()))}else{focusWithoutInk(assert(this.$$(`#siteEntryButton_${index}`)))}},async populateList_(){this.recentSitePermissionsList_=await this.browserProxy.getRecentSitePermissions(this.getCategoryList(),3)},onDomChange_(){if(this.shouldFocusAfterPopulation_){this.focusLastSelected_();this.shouldFocusAfterPopulation_=false}}});// Copyright 2020 The Chromium Authors. All rights reserved.
function defaultSettingLabel(setting,enabled,disabled,other){if(setting===ContentSetting.BLOCK){return disabled}if(setting===ContentSetting.ALLOW){return enabled}return other||enabled}Polymer({is:"settings-site-settings-list",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-site-settings-list">cr-link-row {
  --cr-icon-button-margin-start: 20px;
}

cr-link-row:first-of-type {
  border-top: none;
}

</style>
    <template is="dom-repeat" items="[[categoryList]]">
      <cr-link-row class="hr two-line" data-route$="[[item.route]]" id="[[item.id]]" label="[[i18n(item.label)]]" on-click="onClick_" start-icon="[[item.icon]]" sub-label="[[item.subLabel]]" role-description="زر صفحة فرعية"></cr-link-row>
    </template>
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior,I18nBehavior],properties:{categoryList:Array,focusConfig:{type:Object,observer:"focusConfigChanged_"}},browserProxy:null,focusConfigChanged_(newConfig,oldConfig){assert(!oldConfig);for(const item of this.categoryList){this.focusConfig.set(item.route.path,(()=>this.async((()=>{focusWithoutInk(assert(this.$$(`#${item.id}`)))}))))}},ready(){this.browserProxy_=SiteSettingsPrefsBrowserProxyImpl.getInstance();Promise.all(this.categoryList.map((item=>this.refreshDefaultValueLabel_(item.id)))).then((()=>{this.fire("site-settings-list-labels-updated-for-testing")}));this.addWebUIListener("contentSettingCategoryChanged",this.refreshDefaultValueLabel_.bind(this));const hasProtocolHandlers=this.categoryList.some((item=>item.id===ContentSettingsTypes.PROTOCOL_HANDLERS));if(hasProtocolHandlers){this.addWebUIListener("setHandlersEnabled",(enabled=>{this.updateDefaultValueLabel_(ContentSettingsTypes.PROTOCOL_HANDLERS,enabled?ContentSetting.ALLOW:ContentSetting.BLOCK)}));this.browserProxy_.observeProtocolHandlersEnabledState()}const hasCookies=this.categoryList.some((item=>item.id===ContentSettingsTypes.COOKIES));if(hasCookies){this.browserProxy_.getCookieSettingDescription().then(this.updateCookiesLabel_.bind(this));this.addWebUIListener("cookieSettingDescriptionChanged",this.updateCookiesLabel_.bind(this))}},refreshDefaultValueLabel_(category){if(category===ContentSettingsTypes.ZOOM_LEVELS||category===ContentSettingsTypes.PROTECTED_CONTENT||category==="pdfDocuments"){return Promise.resolve()}if(category===ContentSettingsTypes.COOKIES){return Promise.resolve()}return this.browserProxy_.getDefaultValueForContentType(category).then((defaultValue=>{this.updateDefaultValueLabel_(category,defaultValue.setting)}))},updateDefaultValueLabel_(category,setting){const element=this.$$(`#${category}`);if(!element){return}const index=this.$$("dom-repeat").indexForElement(element);const dataItem=this.categoryList[index];this.set(`categoryList.${index}.subLabel`,defaultSettingLabel(setting,dataItem.enabledLabel?this.i18n(dataItem.enabledLabel):"",dataItem.disabledLabel?this.i18n(dataItem.disabledLabel):"",dataItem.otherLabel?this.i18n(dataItem.otherLabel):null))},updateCookiesLabel_(label){const index=this.$$("dom-repeat").indexForElement(this.$$("#cookies"));this.set(`categoryList.${index}.subLabel`,label)},onClick_(event){Router.getInstance().navigateTo(this.categoryList[event.model.index].route)}});// Copyright 2015 The Chromium Authors. All rights reserved.
const Id=ContentSettingsTypes;let categoryItemMap=null;function getCategoryItemMap(){if(categoryItemMap!==null){return categoryItemMap}const categoryList=[{route:routes.SITE_SETTINGS_ADS,id:Id.ADS,label:"siteSettingsAds",icon:"settings:ads",enabledLabel:"siteSettingsAllowed",disabledLabel:"siteSettingsAdsBlock",shouldShow:()=>loadTimeData.getBoolean("enableSafeBrowsingSubresourceFilter")},{route:routes.SITE_SETTINGS_AR,id:Id.AR,label:"siteSettingsAr",icon:"settings:vr-headset",enabledLabel:"siteSettingsArAsk",disabledLabel:"siteSettingsArBlock"},{route:routes.SITE_SETTINGS_AUTOMATIC_DOWNLOADS,id:Id.AUTOMATIC_DOWNLOADS,label:"siteSettingsAutomaticDownloads",icon:"cr:file-download",enabledLabel:"siteSettingsAutoDownloadAsk",disabledLabel:"siteSettingsAutoDownloadBlock"},{route:routes.SITE_SETTINGS_BACKGROUND_SYNC,id:Id.BACKGROUND_SYNC,label:"siteSettingsBackgroundSync",icon:"cr:sync",enabledLabel:"siteSettingsAllowRecentlyClosedSites",disabledLabel:"siteSettingsBackgroundSyncBlocked"},{route:routes.SITE_SETTINGS_BLUETOOTH_DEVICES,id:Id.BLUETOOTH_DEVICES,label:"siteSettingsBluetoothDevices",icon:"settings:bluetooth",enabledLabel:"siteSettingsBluetoothDevicesAsk",disabledLabel:"siteSettingsBluetoothDevicesBlock",shouldShow:()=>loadTimeData.getBoolean("enableWebBluetoothNewPermissionsBackend")},{route:routes.SITE_SETTINGS_BLUETOOTH_SCANNING,id:Id.BLUETOOTH_SCANNING,label:"siteSettingsBluetoothScanning",icon:"settings:bluetooth-scanning",enabledLabel:"siteSettingsBluetoothScanningAsk",disabledLabel:"siteSettingsBluetoothScanningBlock",shouldShow:()=>loadTimeData.getBoolean("enableExperimentalWebPlatformFeatures")},{route:routes.SITE_SETTINGS_CAMERA,id:Id.CAMERA,label:"siteSettingsCamera",icon:"cr:videocam",enabledLabel:"siteSettingsAskBeforeAccessing",disabledLabel:"siteSettingsBlocked"},{route:routes.SITE_SETTINGS_CLIPBOARD,id:Id.CLIPBOARD,label:"siteSettingsClipboard",icon:"settings:clipboard",enabledLabel:"siteSettingsAskBeforeAccessing",disabledLabel:"siteSettingsBlocked"},{route:routes.COOKIES,id:Id.COOKIES,label:"siteSettingsCookies",icon:"settings:cookie",enabledLabel:"siteSettingsCookiesAllowed",disabledLabel:"siteSettingsBlocked",otherLabel:"deleteDataPostSession"},{route:routes.SITE_SETTINGS_LOCATION,id:Id.GEOLOCATION,label:"siteSettingsLocation",icon:"cr:location-on",enabledLabel:"siteSettingsAskBeforeAccessing",disabledLabel:"siteSettingsBlocked"},{route:routes.SITE_SETTINGS_HID_DEVICES,id:Id.HID_DEVICES,label:"siteSettingsHidDevices",icon:"settings:hid-device",enabledLabel:"siteSettingsHidDevicesAsk",disabledLabel:"siteSettingsHidDevicesBlock"},{route:routes.SITE_SETTINGS_IDLE_DETECTION,id:Id.IDLE_DETECTION,label:"siteSettingsIdleDetection",icon:"settings:person",enabledLabel:"siteSettingsIdleDetectionAsk",disabledLabel:"siteSettingsIdleDetectionBlock"},{route:routes.SITE_SETTINGS_IMAGES,id:Id.IMAGES,label:"siteSettingsImages",icon:"settings:photo",enabledLabel:"siteSettingsShowAll",disabledLabel:"siteSettingsDontShowImages"},{route:routes.SITE_SETTINGS_JAVASCRIPT,id:Id.JAVASCRIPT,label:"siteSettingsJavascript",icon:"settings:code",enabledLabel:"siteSettingsAllowed",disabledLabel:"siteSettingsBlocked"},{route:routes.SITE_SETTINGS_MICROPHONE,id:Id.MIC,label:"siteSettingsMic",icon:"cr:mic",enabledLabel:"siteSettingsAskBeforeAccessing",disabledLabel:"siteSettingsBlocked"},{route:routes.SITE_SETTINGS_MIDI_DEVICES,id:Id.MIDI_DEVICES,label:"siteSettingsMidiDevices",icon:"settings:midi",enabledLabel:"siteSettingsMidiDevicesAsk",disabledLabel:"siteSettingsMidiDevicesBlock"},{route:routes.SITE_SETTINGS_MIXEDSCRIPT,id:Id.MIXEDSCRIPT,label:"siteSettingsInsecureContent",icon:"settings:insecure-content",disabledLabel:"siteSettingsInsecureContentBlock"},{route:routes.SITE_SETTINGS_FILE_SYSTEM_WRITE,id:Id.FILE_SYSTEM_WRITE,label:"siteSettingsFileSystemWrite",icon:"settings:save-original",enabledLabel:"siteSettingsFileSystemWriteAsk",disabledLabel:"siteSettingsFileSystemWriteBlock"},{route:routes.SITE_SETTINGS_FONT_ACCESS,id:Id.FONT_ACCESS,label:"fonts",icon:"settings:font-access",enabledLabel:"siteSettingsFontAccessAsk",disabledLabel:"siteSettingsFontAccessBlock",shouldShow:()=>loadTimeData.getBoolean("enableFontAccessContentSetting")},{route:routes.SITE_SETTINGS_NOTIFICATIONS,id:Id.NOTIFICATIONS,label:"siteSettingsNotifications",icon:"settings:notifications",enabledLabel:"siteSettingsAskBeforeSending",disabledLabel:"siteSettingsBlocked"},{route:routes.SITE_SETTINGS_PAYMENT_HANDLER,id:Id.PAYMENT_HANDLER,label:"siteSettingsPaymentHandler",icon:"settings:payment-handler",enabledLabel:"siteSettingsPaymentHandlerAllow",disabledLabel:"siteSettingsPaymentHandlerBlock",shouldShow:()=>loadTimeData.getBoolean("enablePaymentHandlerContentSetting")},{route:routes.SITE_SETTINGS_PDF_DOCUMENTS,id:"pdfDocuments",label:"siteSettingsPdfDocuments",icon:"settings:pdf"},{route:routes.SITE_SETTINGS_POPUPS,id:Id.POPUPS,label:"siteSettingsPopups",icon:"cr:open-in-new",enabledLabel:"siteSettingsAllowed",disabledLabel:"siteSettingsBlocked"},{route:routes.SITE_SETTINGS_PROTECTED_CONTENT,id:Id.PROTECTED_CONTENT,label:"siteSettingsProtectedContent",icon:"settings:protected-content"},{route:routes.SITE_SETTINGS_HANDLERS,id:Id.PROTOCOL_HANDLERS,label:"siteSettingsHandlers",icon:"settings:protocol-handler",enabledLabel:"siteSettingsHandlersAsk",disabledLabel:"siteSettingsHandlersBlocked",shouldShow:()=>!loadTimeData.getBoolean("isGuest")},{route:routes.SITE_SETTINGS_SENSORS,id:Id.SENSORS,label:"siteSettingsSensors",icon:"settings:sensors",enabledLabel:"siteSettingsSensorsAllow",disabledLabel:"siteSettingsSensorsBlock"},{route:routes.SITE_SETTINGS_SERIAL_PORTS,id:Id.SERIAL_PORTS,label:"siteSettingsSerialPorts",icon:"settings:serial-port",enabledLabel:"siteSettingsSerialPortsAsk",disabledLabel:"siteSettingsSerialPortsBlock"},{route:routes.SITE_SETTINGS_SOUND,id:Id.SOUND,label:"siteSettingsSound",icon:"settings:volume-up",enabledLabel:"siteSettingsSoundAllow",disabledLabel:"siteSettingsSoundBlock"},{route:routes.SITE_SETTINGS_USB_DEVICES,id:Id.USB_DEVICES,label:"siteSettingsUsbDevices",icon:"settings:usb",enabledLabel:"siteSettingsUsbDevicesAsk",disabledLabel:"siteSettingsUsbDevicesBlock"},{route:routes.SITE_SETTINGS_VR,id:Id.VR,label:"siteSettingsVr",icon:"settings:vr-headset",enabledLabel:"siteSettingsVrAsk",disabledLabel:"siteSettingsVrBlock"},{route:routes.SITE_SETTINGS_WINDOW_PLACEMENT,id:Id.WINDOW_PLACEMENT,label:"siteSettingsWindowPlacement",icon:"settings:window-placement",enabledLabel:"siteSettingsWindowPlacementAsk",disabledLabel:"siteSettingsWindowPlacementBlock",shouldShow:()=>loadTimeData.getBoolean("enableExperimentalWebPlatformFeatures")},{route:routes.SITE_SETTINGS_ZOOM_LEVELS,id:Id.ZOOM_LEVELS,label:"siteSettingsZoomLevels",icon:"settings:zoom-in"}];categoryItemMap=new Map(categoryList.map((item=>[item.id,item])));return categoryItemMap}function buildItemListFromIds(orderedIdList){const map=getCategoryItemMap();const orderedList=[];for(const id of orderedIdList){const item=map.get(id);if(item.shouldShow===undefined||item.shouldShow()){orderedList.push(item)}}return orderedList}Polymer({is:"settings-site-settings-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared" scope="settings-site-settings-page">.no-min-height {
  min-height: 0;
}

img {
  width: 100%;
}

</style>
    <picture>
      <source srcset="chrome://settings/images/permissions_banner_dark.svg" media="(prefers-color-scheme: dark">
      <img id="banner" alt="" src="chrome://settings/images/permissions_banner.svg">
    </picture>
    <div class="cr-row first">
      <h2>الأنشطة الحديثة</h2>
    </div>
    <settings-recent-site-permissions id="recentSitePermissions" no-recent-permissions="{{noRecentSitePermissions_}}" focus-config="[[focusConfig]]">
    </settings-recent-site-permissions>

    <cr-link-row data-route="SITE_SETTINGS_ALL" id="allSites" class$="[[getClassForSiteSettingsAllLink_(noRecentSitePermissions_)]]" label="عرض الأذونات والبيانات المُخزَّنة على المواقع" on-click="onSiteSettingsAllClick_" role-description="زر صفحة فرعية"></cr-link-row>
    <div class="cr-row first line-only">
      <h2>الأذونات</h2>
    </div>

    <settings-site-settings-list id="basicPermissionsList" category-list="[[lists_.permissionsBasic]]" focus-config="[[focusConfig]]">
    </settings-site-settings-list>
    <cr-expand-button class="cr-row" expanded="{{permissionsExpanded_}}">
      <div>أذونات إضافية</div>
    </cr-expand-button>
    <iron-collapse opened="[[permissionsExpanded_]]">
      <settings-site-settings-list id="advancedPermissionsList" category-list="[[lists_.permissionsAdvanced]]" focus-config="[[focusConfig]]">
      </settings-site-settings-list>
    </iron-collapse>

    <div class="cr-row first line-only">
      <h2>المحتوى</h2>
    </div>
    <settings-site-settings-list id="basicContentList" category-list="[[lists_.contentBasic]]" focus-config="[[focusConfig]]">
    </settings-site-settings-list>
    <cr-expand-button id="expandContent" class="cr-row" expanded="{{contentExpanded_}}">
      <div>إعدادات المحتوى الإضافية</div>
    </cr-expand-button>
    <iron-collapse opened="[[contentExpanded_]]">
      <settings-site-settings-list id="advancedContentList" category-list="[[lists_.contentAdvanced]]" focus-config="[[focusConfig]]">
      </settings-site-settings-list>
    </iron-collapse>
<!--_html_template_end_-->`,properties:{lists_:{type:Object,value:function(){return{permissionsBasic:buildItemListFromIds([Id.GEOLOCATION,Id.CAMERA,Id.MIC,Id.NOTIFICATIONS,Id.BACKGROUND_SYNC]),permissionsAdvanced:buildItemListFromIds([Id.SENSORS,Id.AUTOMATIC_DOWNLOADS,Id.PROTOCOL_HANDLERS,Id.MIDI_DEVICES,Id.USB_DEVICES,Id.SERIAL_PORTS,Id.BLUETOOTH_DEVICES,Id.FILE_SYSTEM_WRITE,Id.HID_DEVICES,Id.CLIPBOARD,Id.PAYMENT_HANDLER,Id.BLUETOOTH_SCANNING,Id.AR,Id.VR,Id.IDLE_DETECTION,Id.WINDOW_PLACEMENT,Id.FONT_ACCESS]),contentBasic:buildItemListFromIds([Id.COOKIES,Id.JAVASCRIPT,Id.IMAGES,Id.POPUPS]),contentAdvanced:buildItemListFromIds([Id.SOUND,Id.ADS,Id.ZOOM_LEVELS,"pdfDocuments",Id.PROTECTED_CONTENT,Id.MIXEDSCRIPT])}}},focusConfig:{type:Object,observer:"focusConfigChanged_"},permissionsExpanded_:Boolean,contentExpanded_:Boolean,noRecentSitePermissions_:Boolean},focusConfigChanged_(newConfig,oldConfig){assert(!oldConfig);this.focusConfig.set(routes.SITE_SETTINGS_ALL.path,(()=>{focusWithoutInk(assert(this.$$("#allSites")))}))},onSiteSettingsAllClick_(){Router.getInstance().navigateTo(routes.SITE_SETTINGS_ALL)},getClassForSiteSettingsAllLink_(){return this.noRecentSitePermissions_?"":"hr"}});// Copyright 2016 The Chromium Authors. All rights reserved.
const SubOptionMode={PREF:"pref",NONE:"none"};Polymer({is:"category-default-setting",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="category-default-setting">.indented {
  margin-inline-start: var(--cr-section-indent-width);
}

</style>
    <settings-toggle-button id="toggle" pref="{{controlParams_}}" label="[[optionLabel_]]" sub-label="[[optionDescription_]]" disabled$="[[isToggleDisabled_(category)]]">
    </settings-toggle-button>
    <template is="dom-if" if="[[showPrefSubOption_(subOptionMode)]]">
      <settings-toggle-button id="subOptionPrefToggle" class="indented" hidden="[[!controlParams_.value]]" pref="{{subOptionPref}}" label="[[subOptionLabel]]" sub-label="[[subOptionDescription]]">
      </settings-toggle-button>
    </template>
<!--_html_template_end_-->`,behaviors:[SiteSettingsBehavior,WebUIListenerBehavior],properties:{toggleOffLabel:String,toggleOnLabel:String,toggleOffDescription:String,toggleOnDescription:String,subOptionLabel:String,subOptionDescription:String,subOptionMode:String,subOptionPref:Boolean,controlParams_:{type:Object,value(){return{}}},optionLabel_:String,optionDescription_:String,priorDefaultContentSetting_:{type:Object,value(){return{}}}},observers:["onCategoryChanged_(category)","onChangePermissionControl_(category, controlParams_.value)"],ready(){this.addWebUIListener("contentSettingCategoryChanged",this.onCategoryChanged_.bind(this))},get categoryEnabled(){return!!assert(this.controlParams_).value},onChangePermissionControl_(){if(this.category===undefined||this.controlParams_.value===undefined){return}if(this.controlParams_.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED){return}switch(this.category){case ContentSettingsTypes.ADS:case ContentSettingsTypes.BACKGROUND_SYNC:case ContentSettingsTypes.IMAGES:case ContentSettingsTypes.JAVASCRIPT:case ContentSettingsTypes.MIXEDSCRIPT:case ContentSettingsTypes.SOUND:case ContentSettingsTypes.SENSORS:case ContentSettingsTypes.PAYMENT_HANDLER:case ContentSettingsTypes.POPUPS:case ContentSettingsTypes.PROTOCOL_HANDLERS:this.browserProxy.setDefaultValueForContentType(this.category,this.categoryEnabled?ContentSetting.ALLOW:ContentSetting.BLOCK);break;case ContentSettingsTypes.AUTOMATIC_DOWNLOADS:case ContentSettingsTypes.CAMERA:case ContentSettingsTypes.CLIPBOARD:case ContentSettingsTypes.FONT_ACCESS:case ContentSettingsTypes.GEOLOCATION:case ContentSettingsTypes.MIC:case ContentSettingsTypes.NOTIFICATIONS:case ContentSettingsTypes.MIDI_DEVICES:case ContentSettingsTypes.USB_DEVICES:case ContentSettingsTypes.SERIAL_PORTS:case ContentSettingsTypes.BLUETOOTH_DEVICES:case ContentSettingsTypes.BLUETOOTH_SCANNING:case ContentSettingsTypes.FILE_SYSTEM_WRITE:case ContentSettingsTypes.HID_DEVICES:case ContentSettingsTypes.VR:case ContentSettingsTypes.AR:case ContentSettingsTypes.WINDOW_PLACEMENT:case ContentSettingsTypes.IDLE_DETECTION:this.browserProxy.setDefaultValueForContentType(this.category,this.categoryEnabled?ContentSetting.ASK:ContentSetting.BLOCK);break;default:assertNotReached("Invalid category: "+this.category)}},updateControlParams_(update){if(this.priorDefaultContentSetting_.setting===update.setting&&this.priorDefaultContentSetting_.source===update.source){return}this.priorDefaultContentSetting_=update;const basePref={key:"controlParams",type:chrome.settingsPrivate.PrefType.BOOLEAN};if(update.source!==undefined&&update.source!==ContentSettingProvider.PREFERENCE){basePref.enforcement=chrome.settingsPrivate.Enforcement.ENFORCED;switch(update.source){case ContentSettingProvider.POLICY:basePref.controlledBy=chrome.settingsPrivate.ControlledBy.DEVICE_POLICY;break;case ContentSettingProvider.SUPERVISED_USER:basePref.controlledBy=chrome.settingsPrivate.ControlledBy.PARENT;break;case ContentSettingProvider.EXTENSION:basePref.controlledBy=chrome.settingsPrivate.ControlledBy.EXTENSION;break;default:basePref.controlledBy=chrome.settingsPrivate.ControlledBy.USER_POLICY;break}}const prefValue=this.computeIsSettingEnabled(update.setting);this.controlParams_=Object.assign({value:prefValue},basePref)},onCategoryChanged_(){this.browserProxy.getDefaultValueForContentType(this.category).then((defaultValue=>{this.updateControlParams_(defaultValue);const categoryEnabled=this.computeIsSettingEnabled(defaultValue.setting);this.optionLabel_=categoryEnabled?this.toggleOnLabel:this.toggleOffLabel;this.optionDescription_=categoryEnabled?this.toggleOnDescription:this.toggleOffDescription}))},isToggleDisabled_(){return this.category===ContentSettingsTypes.POPUPS&&loadTimeData.getBoolean("isGuest")},showPrefSubOption_(subOptionMode){return subOptionMode===SubOptionMode.PREF}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"category-setting-exceptions",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="category-setting-exceptions">#exceptionHeader {
  padding: 0 var(--cr-section-padding);
}

</style>
    <div id="exceptionHeader" hidden="[[!enableContentSettingsRedesign_]]">
      <h2>الإعدادات المخصَّصة</h2>
      <div id="exceptionHeaderSubLabel" class="secondary">
        تتبع المواقع الإلكترونية المُدرَجة أدناه إعدادات مُخصَّصة بدلاً من الإعدادات التلقائية.
      </div>
    </div>
    <site-list category="[[category]]" category-subtype="[[ContentSetting.BLOCK]]" category-header="[[blockHeader]]" read-only-list="[[getReadOnlyList_(readOnlyList, defaultManaged_)]]" search-filter="[[searchFilter]]" hidden$="[[!showBlockSiteList_]]">
    </site-list>
    <site-list category="[[category]]" category-subtype="[[ContentSetting.SESSION_ONLY]]" category-header="محو عند الخروج" read-only-list="[[getReadOnlyList_(readOnlyList, defaultManaged_)]]" search-filter="[[searchFilter]]">
    </site-list>
    <site-list category="[[category]]" category-subtype="[[ContentSetting.ALLOW]]" category-header="[[allowHeader]]" read-only-list="[[getReadOnlyList_(readOnlyList, defaultManaged_)]]" search-filter="[[searchFilter]]" hidden$="[[!showAllowSiteList_]]">
    </site-list>
<!--_html_template_end_-->`,behaviors:[SiteSettingsBehavior,WebUIListenerBehavior],properties:{category:String,readOnlyList:{type:Boolean,value:false},defaultManaged_:Boolean,blockHeader:String,enableContentSettingsRedesign_:{type:Boolean,value(){return loadTimeData.getBoolean("enableContentSettingsRedesign")}},allowHeader:String,searchFilter:String,showAllowSiteList_:{type:Boolean,computed:"computeShowAllowSiteList_(category)"},showBlockSiteList_:{type:Boolean,value:true}},observers:["updateDefaultManaged_(category)"],ready(){this.ContentSetting=ContentSetting;this.addWebUIListener("contentSettingCategoryChanged",this.updateDefaultManaged_.bind(this))},computeShowAllowSiteList_(){return this.category!==ContentSettingsTypes.FILE_SYSTEM_WRITE},updateDefaultManaged_(){if(this.category===undefined){return}this.browserProxy.getDefaultValueForContentType(this.category).then((update=>{this.defaultManaged_=update.source===SiteSettingSource.POLICY}))},getReadOnlyList_(){return this.readOnlyList||this.defaultManaged_}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({is:"chooser-exception-list-entry",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="chooser-exception-list-entry"></style>

    <div class="cr-row first">
      <h2 class="flex">[[exception.displayName]]</h2>
    </div>

    <div class="list-frame menu-content vertical-list" id="listContainer">
      <iron-list items="[[exception.sites]]" preserve-focus="" risk-selection="">
        <template>
          <site-list-entry model="[[item]]" tabindex$="[[tabIndex]]" first$="[[!index]]" focus-row-index="[[index]]" iron-list-tab-index="[[tabIndex]]" last-focused="{{lastFocused_}}" chooser-type="[[exception.chooserType]]" chooser-object="[[exception.object]]" read-only-list="">
          </site-list-entry>
        </template>
      </iron-list>
    </div>
<!--_html_template_end_-->`,behaviors:[SiteSettingsBehavior],properties:{exception:Object,lastFocused_:Object}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({is:"chooser-exception-list",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared" scope="chooser-exception-list"></style>

    <div class="list-frame" id="empty-list-message" hidden$="[[hasExceptions_(chooserExceptions.*)]]">
      <div class="list-item secondary">[[emptyListMessage_]]</div>
    </div>

    <template is="dom-repeat" items="[[chooserExceptions]]">
      <chooser-exception-list-entry exception="[[item]]" on-show-tooltip="onShowTooltip_">
      </chooser-exception-list-entry>
    </template>

    <paper-tooltip id="tooltip" manual-mode="" position="top">
      [[tooltipText_]]
    </paper-tooltip>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,ListPropertyUpdateBehavior,SiteSettingsBehavior,WebUIListenerBehavior],properties:{chooserExceptions:{type:Array,value(){return[]}},chooserType:{observer:"chooserTypeChanged_",type:String,value:ChooserType.NONE},emptyListMessage_:{type:String,value:""},hasIncognito_:Boolean,tooltipText_:String},attached(){this.addWebUIListener("contentSettingChooserPermissionChanged",this.objectWithinChooserTypeChanged_.bind(this));this.addWebUIListener("onIncognitoStatusChanged",this.onIncognitoStatusChanged_.bind(this));this.browserProxy.updateIncognitoStatus()},objectWithinChooserTypeChanged_(category,chooserType){if(category===this.category&&chooserType===this.chooserType){this.chooserTypeChanged_()}},onIncognitoStatusChanged_(hasIncognito){this.hasIncognito_=hasIncognito;this.populateList_()},chooserTypeChanged_(){if(this.chooserType===ChooserType.NONE){return}switch(this.chooserType){case ChooserType.USB_DEVICES:this.emptyListMessage_=this.i18n("noUsbDevicesFound");break;case ChooserType.SERIAL_PORTS:this.emptyListMessage_=this.i18n("noSerialPortsFound");break;case ChooserType.HID_DEVICES:this.emptyListMessage_=this.i18n("noHidDevicesFound");break;case ChooserType.BLUETOOTH_DEVICES:this.emptyListMessage_=this.i18n("noBluetoothDevicesFound");break;default:this.emptyListMessage_=""}this.populateList_()},hasExceptions_(){return this.chooserExceptions.length>0},onShowTooltip_(e){this.tooltipText_=e.detail.text;const target=e.detail.target;this.$.tooltip.target=target;const hide=()=>{this.$.tooltip.hide();target.removeEventListener("mouseleave",hide);target.removeEventListener("blur",hide);target.removeEventListener("click",hide);this.$.tooltip.removeEventListener("mouseenter",hide)};target.addEventListener("mouseleave",hide);target.addEventListener("blur",hide);target.addEventListener("click",hide);this.$.tooltip.addEventListener("mouseenter",hide);this.$.tooltip.show()},populateList_(){this.browserProxy.getChooserExceptionList(this.chooserType).then((exceptionList=>this.processExceptions_(exceptionList)))},processExceptions_(exceptionList){const exceptions=exceptionList.map((exception=>{const sites=exception.sites.map((site=>this.expandSiteException(site)));return Object.assign(exception,{sites:sites})}));if(!this.updateList("chooserExceptions",(x=>x.displayName),exceptions,true)){const siteUidGetter=x=>x.origin+x.embeddingOrigin+x.incognito;exceptions.forEach(((exception,index)=>{const propertyPath="chooserExceptions."+index+".sites";this.updateList(propertyPath,siteUidGetter,exception.sites)}),this)}}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"media-picker",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared md-select" scope="media-picker">:host {
  display: block;
}

</style>
    <div class="cr-row first" id="picker" hidden="">
      <select id="mediaPicker" class="md-select" on-change="onChange_" aria-label$="[[label]]">
        <template is="dom-repeat" items="[[devices]]">
          <option value$="[[item.id]]">[[item.name]]</option>
        </template>
      </select>
    </div>
<!--_html_template_end_-->`,behaviors:[SiteSettingsBehavior,WebUIListenerBehavior],properties:{type:String,label:String,devices:Array},ready(){this.addWebUIListener("updateDevicesMenu",this.updateDevicesMenu_.bind(this));this.browserProxy.getDefaultCaptureDevices(this.type)},updateDevicesMenu_(type,devices,defaultDevice){if(type!==this.type){return}this.$.picker.hidden=devices.length===0;if(devices.length>0){this.devices=devices;this.async((()=>{this.$.mediaPicker.value=defaultDevice}))}},onChange_(){this.browserProxy.setDefaultCaptureDevice(this.type,this.$.mediaPicker.value)}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"settings-pdf-documents",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-pdf-documents">.secondary {
  margin-top: 0;
}

</style>
    <settings-toggle-button id="toggle" class="two-line" label="‏تنزيل ملفات PDF بدلاً من فتحها تلقائيًا في Chrome" pref="{{prefs.plugins.always_open_pdf_externally}}">
    </settings-toggle-button>
<!--_html_template_end_-->`,properties:{prefs:{type:Object,notify:true}}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({is:"site-data-entry",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="site-data-entry"></style>
    <div class="cr-row continuation two-line" focus-row-container="" actionable="">
      <site-favicon url="[[model.site]]"></site-favicon>
      <div class="flex cr-row-gap">
        <span class="url-directionality">[[model.site]]</span>
        <div class="secondary">[[model.localData]]</div>
      </div>
      <cr-icon-button class="subpage-arrow" aria-label$="[[model.site]]" focus-row-control="" focus-type="showDetails"></cr-icon-button>
      <div class="separator"></div>
      <cr-icon-button class="icon-delete-gray" title$="[[i18n('siteSettingsCookieRemoveSite', model.site)]]" on-click="onRemove_" focus-row-control="" focus-type="remove">
      </cr-icon-button>
    </div>
<!--_html_template_end_-->`,behaviors:[FocusRowBehavior,I18nBehavior],properties:{model:Object},browserProxy_:null,ready(){this.browserProxy_=LocalDataBrowserProxyImpl.getInstance()},onRemove_(e){e.stopPropagation();MetricsBrowserProxyImpl.getInstance().recordSettingsPageHistogram(PrivacyElementInteractions.SITE_DATA_REMOVE_SITE);this.browserProxy_.removeItem(this.model.site)}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"site-data",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared" scope="site-data">paper-spinner-lite {
  height: var(--cr-icon-size);
        opacity: 0;
        transition-delay: 1s;
        width: var(--cr-icon-size);
}

paper-spinner-lite[active] {
  opacity: 1;
}

#removeShowingSites {
  margin-inline-start: auto;
}

</style>
    <div class="cr-row continuation">
      <paper-spinner-lite active="[[isLoading_]]"></paper-spinner-lite>
      <cr-button disabled$="[[isLoading_]]" id="removeShowingSites" on-click="onRemoveShowingSitesTap_" hidden$="[[!sites.length]]">
        [[computeRemoveLabel_(filter)]]
      </cr-button>
      <cr-button disabled$="[[isLoading_]]" id="removeThirdPartyCookies" class="cr-button-gap" on-click="onRemoveThirdPartyCookiesTap_" hidden$="[[!showRemoveThirdPartyCookies_(sites.length, filter)]]">
          إزالة ملفات تعريف الارتباط التابعة لجهات خارجية
      </cr-button>
    </div>
    <iron-list id="list" items="[[sites]]" preserve-focus="" scroll-target="[[subpageScrollTarget]]" class="cr-separators">
      <template>
        <site-data-entry id$="siteItem_[[item.site]]" actionable="" model="[[item]]" first$="[[!index]]" tabindex$="[[tabIndex]]" iron-list-tab-index="[[tabIndex]]" last-focused="{{lastFocused_}}" list-blurred="{{listBlurred_}}" on-click="onSiteClick_" on-remove-site="onRemoveSite_" focus-row-index="[[index]]">
        </site-data-entry>
      </template>
    </iron-list>

    <!-- Confirm Delete dialog -->
    <cr-dialog id="confirmDeleteDialog" close-text="إغلاق" on-close="onConfirmDeleteDialogClosed_">
      <div slot="title">
        محو بيانات الموقع
      </div>
      <div slot="body">سيؤدي هذا إلى حذف أي بيانات مخزنة على الجهاز لجميع المواقع المعروضة. هل ترغب في المتابعة؟</div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onCloseDialog_">
          إلغاء
        </cr-button>
        <cr-button class="action-button" on-click="onConfirmDelete_">
          محو الكل
        </cr-button>
      </div>
    </cr-dialog>

    <!-- Confirm Delete Third Party Cookies dialog -->
    <cr-dialog id="confirmDeleteThirdPartyDialog" close-text="إغلاق" on-close="onConfirmDeleteThirdPartyDialogClosed_">
      <div slot="title">
        حذف ملفات تعريف الارتباط التابعة لجهات خارجية
      </div>
      <div slot="body">
        سيؤدي هذا إلى حذف جميع ملفات تعريف الارتباط وبيانات الموقع الإلكتروني المتوفرة في سياقات تابعة لجهات خارجية. هل تريد المواصلة؟
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onCloseThirdPartyDialog_">
          إلغاء
        </cr-button>
        <cr-button class="action-button" on-click="onConfirmThirdPartyDelete_">
          حذف ملفات تعريف الارتباط التابعة لجهات خارجية
        </cr-button>
      </div>
    </cr-dialog>

<!--_html_template_end_-->`,behaviors:[I18nBehavior,ListPropertyUpdateBehavior,GlobalScrollTargetBehavior,WebUIListenerBehavior],properties:{filter:{observer:"onFilterChanged_",notify:true,type:String},focusConfig:{type:Object,observer:"focusConfigChanged_"},isLoading_:Boolean,sites:{type:Array,value(){return[]}},subpageRoute:{type:Object,value:routes.SITE_SETTINGS_SITE_DATA},lastFocused_:Object,listBlurred_:Boolean},browserProxy_:null,lastSelected_:null,created(){this.browserProxy_=LocalDataBrowserProxyImpl.getInstance()},ready(){this.addWebUIListener("on-tree-item-removed",this.updateSiteList_.bind(this))},currentRouteChanged(currentRoute,previousRoute){GlobalScrollTargetBehaviorImpl.currentRouteChanged.call(this,currentRoute);const searchQueryParam=Router.getInstance().getQueryParameters().get("searchSubpage");if(currentRoute===routes.SITE_SETTINGS_SITE_DATA&&!searchQueryParam){this.isLoading_=true;const ironList=this.$$("iron-list");ironList.scrollToIndex(0);this.browserProxy_.reloadCookies().then(this.updateSiteList_.bind(this))}},focusConfigChanged_(newConfig,oldConfig){assert(!oldConfig);if(routes.SITE_SETTINGS_DATA_DETAILS){const onNavigatedTo=()=>this.async((()=>{if(this.lastSelected_===null||this.sites.length===0){return}const lastSelectedSite=this.lastSelected_.item.site;const lastSelectedIndex=this.lastSelected_.index;this.lastSelected_=null;const indexFromId=this.sites.findIndex((site=>site.site===lastSelectedSite));const indexFallback=lastSelectedIndex<this.sites.length?lastSelectedIndex:this.sites.length-1;const index=indexFromId>-1?indexFromId:indexFallback;this.focusOnSiteSelectButton_(index)}));this.focusConfig.set(routes.SITE_SETTINGS_DATA_DETAILS.path,onNavigatedTo)}},focusOnSiteSelectButton_(index){const ironList=this.$$("iron-list");ironList.focusItem(index);const siteToSelect=this.sites[index].site.replace(/[.]/g,"\\.");const button=this.$$(`#siteItem_${siteToSelect}`).$$(".subpage-arrow");focusWithoutInk(assert(button))},onFilterChanged_(current,previous){if(previous===undefined&&!current){return}this.updateSiteList_()},updateSiteList_(){this.isLoading_=true;this.browserProxy_.getDisplayList(this.filter).then((listInfo=>{this.updateList("sites",(item=>item.site),listInfo.items);this.isLoading_=false;this.fire("site-data-list-complete")}))},computeRemoveLabel_(filter){if(filter.length===0){return loadTimeData.getString("siteSettingsCookieRemoveAll")}return loadTimeData.getString("siteSettingsCookieRemoveAllShown")},onCloseDialog_(){this.$.confirmDeleteDialog.close()},onCloseThirdPartyDialog_(){this.$.confirmDeleteThirdPartyDialog.close()},onConfirmDeleteDialogClosed_(){focusWithoutInk(assert(this.$.removeShowingSites))},onConfirmDeleteThirdPartyDialogClosed_(){focusWithoutInk(assert(this.$.removeAllThirdPartyCookies))},onRemoveShowingSitesTap_(e){e.preventDefault();this.$.confirmDeleteDialog.showModal()},onRemoveThirdPartyCookiesTap_(e){e.preventDefault();this.$.confirmDeleteThirdPartyDialog.showModal()},onConfirmDelete_(){this.$.confirmDeleteDialog.close();if(this.filter.length===0){MetricsBrowserProxyImpl.getInstance().recordSettingsPageHistogram(PrivacyElementInteractions.SITE_DATA_REMOVE_ALL);this.browserProxy_.removeAll().then((()=>{this.sites=[]}))}else{MetricsBrowserProxyImpl.getInstance().recordSettingsPageHistogram(PrivacyElementInteractions.SITE_DATA_REMOVE_FILTERED);this.browserProxy_.removeShownItems();this.fire("clear-subpage-search")}},onConfirmThirdPartyDelete_(){this.$.confirmDeleteThirdPartyDialog.close();this.browserProxy_.removeAllThirdPartyCookies().then((()=>{this.updateSiteList_()}))},onSiteClick_(event){this.focusOnSiteSelectButton_(event.model.index);Router.getInstance().navigateTo(routes.SITE_SETTINGS_DATA_DETAILS,new URLSearchParams("site="+event.model.item.site));this.lastSelected_=event.model},showRemoveThirdPartyCookies_(){return loadTimeData.getBoolean("enableRemovingAllThirdPartyCookies")&&this.sites.length>0&&this.filter.length===0}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"site-details-permission",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared md-select" scope="site-details-permission"></style>
    <div id="details" hidden$="[[shouldHideCategory_(category)]]">
      <div id="permissionItem" class$="list-item [[permissionInfoStringClass_(site.source, category,
                                                         site.setting)]]">
        <div>
          <iron-icon icon="[[icon]]">
          </iron-icon>
        </div>
        <div class="middle" id="permissionHeader" aria-hidden="true">
          [[label]]
          <div class="secondary" id="permissionSecondary" hidden$="[[!hasPermissionInfoString_(site.source, category,
                                                   site.setting)]]" inner-h-t-m-l="[[permissionInfoString_(
                site.source,
                category,
                site.setting,
                'القائمة المسموح بها داخليًا',
                'يعرض الموقع الإلكتروني إعلانات مضلِّلة أو غير مرغوب فيها',
                'الحظر في حال كان الموقع الإلكتروني يعرض إعلانات مضلِّلة أو غير مرغوب فيها',
                'تم الحظر تلقائيًا',
                'تم الحظر لحماية خصوصيتك',
                'تم الحظر مؤقتًا لحماية أمانك',
                'تم السماح بواسطة إحدى الإضافات',
                'تم الحظر بواسطة إحدى الإضافات',
                'يتم التحكّم في الإعداد بواسطة إحدى الإضافات',
                'تم السماح من قبل المشرف',
                'تم الحظر من قبل المشرف',
                'يتم التحكّم في الإعداد من قبل المشرف',
                'لتغيير هذا الإعداد، عليك أولاً <a target=&quot;_blank&quot; href=&quot;$1&quot;>تشغيل المُعرّفات</a>')]]">
          </div>
        </div>
        <select id="permission" class="md-select" aria-label$="[[label]]" aria-describedby="permissionSecondary" on-change="onPermissionSelectionChange_" disabled$="[[!isPermissionUserControlled_(site.source, category,
                                                      site.setting)]]">
          <option id="default" value$="[[ContentSetting.DEFAULT]]">
            [[defaultSettingString_(
                defaultSetting_,
                category,
                useAutomaticLabel)]]
          </option>
          <option id="allow" value$="[[ContentSetting.ALLOW]]" hidden$="[[!showAllowedSetting_(category)]]">
            سماح
          </option>
          <option id="block" value$="[[ContentSetting.BLOCK]]">
            [[blockSettingString_(
                category,
                'حظر',
                'كتم الصوت')]]
          </option>
          <option id="ask" value$="[[ContentSetting.ASK]]" hidden$="[[!showAskSetting_(category, site.setting,
                                          site.source)]]">
            طلب
          </option>
        </select>
      </div>
    </div>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,SiteSettingsBehavior,WebUIListenerBehavior],properties:{useAutomaticLabel:{type:Boolean,value:false},site:Object,defaultSetting_:String,label:String,icon:String},observers:["siteChanged_(site)"],attached(){this.addWebUIListener("contentSettingCategoryChanged",this.onDefaultSettingChanged_.bind(this))},shouldHideCategory_(category){return!this.getCategoryList().includes(category)},siteChanged_(site){if(site.source===SiteSettingSource.DEFAULT){this.defaultSetting_=site.setting;this.$.permission.value=ContentSetting.DEFAULT}else{this.updateDefaultPermission_(site);this.$.permission.value=site.setting}if(this.isNonDefaultAsk_(site.setting,site.source)){assert(this.$.permission.value===ContentSetting.ASK,"'Ask' should only show up when it's currently selected.")}},updateDefaultPermission_(site){this.browserProxy.getDefaultValueForContentType(this.category).then((defaultValue=>{this.defaultSetting_=defaultValue.setting}))},onDefaultSettingChanged_(category){if(category===this.category){this.updateDefaultPermission_(this.site)}},onPermissionSelectionChange_(){this.browserProxy.setOriginPermissions(this.site.origin,[this.category],this.$.permission.value)},useCustomSoundLabels_(category){return category===ContentSettingsTypes.SOUND},defaultSettingString_(defaultSetting,category,useAutomaticLabel){if(defaultSetting===undefined||category===undefined||useAutomaticLabel===undefined){return""}if(defaultSetting===ContentSetting.ASK||defaultSetting===ContentSetting.IMPORTANT_CONTENT){return this.i18n("siteSettingsActionAskDefault")}else if(defaultSetting===ContentSetting.ALLOW){if(this.useCustomSoundLabels_(category)&&useAutomaticLabel){return this.i18n("siteSettingsActionAutomaticDefault")}return this.i18n("siteSettingsActionAllowDefault")}else if(defaultSetting===ContentSetting.BLOCK){if(this.useCustomSoundLabels_(category)){return this.i18n("siteSettingsActionMuteDefault")}return this.i18n("siteSettingsActionBlockDefault")}assertNotReached(`No string for ${this.category}'s default of ${defaultSetting}`)},blockSettingString_(category,blockString,muteString){if(this.useCustomSoundLabels_(category)){return muteString}return blockString},hasPermissionInfoString_(source,category,setting){return this.permissionInfoString_(source,category,setting,null,null,null,null,null,null,null,null,null,null,null,null,null)!==""},permissionInfoStringClass_(source,category,setting){return this.hasPermissionInfoString_(source,category,setting)?"two-line":""},isPermissionUserControlled_(source){return!(source===SiteSettingSource.ALLOWLIST||source===SiteSettingSource.DRM_DISABLED||source===SiteSettingSource.POLICY||source===SiteSettingSource.EXTENSION||source===SiteSettingSource.KILL_SWITCH||source===SiteSettingSource.INSECURE_ORIGIN)},showAllowedSetting_(category){return!(category===ContentSettingsTypes.SERIAL_PORTS||category===ContentSettingsTypes.USB_DEVICES||category===ContentSettingsTypes.BLUETOOTH_SCANNING||category===ContentSettingsTypes.FILE_SYSTEM_WRITE||category===ContentSettingsTypes.HID_DEVICES||category===ContentSettingsTypes.BLUETOOTH_DEVICES)},showAskSetting_(category,setting,source){if(category===ContentSettingsTypes.SERIAL_PORTS||category===ContentSettingsTypes.USB_DEVICES||category===ContentSettingsTypes.HID_DEVICES||category===ContentSettingsTypes.BLUETOOTH_DEVICES){return true}if(category===ContentSettingsTypes.BLUETOOTH_SCANNING||category===ContentSettingsTypes.FILE_SYSTEM_WRITE){return true}return this.isNonDefaultAsk_(setting,source)},isNonDefaultAsk_(setting,source){if(setting!==ContentSetting.ASK||source===SiteSettingSource.DEFAULT){return false}assert(source===SiteSettingSource.EXTENSION||source===SiteSettingSource.POLICY||source===SiteSettingSource.PREFERENCE,"Only extensions, enterprise policy or preferences can change "+"the setting to ASK.");return true},permissionInfoString_(source,category,setting,allowlistString,adsBlacklistString,adsBlockString,embargoString,insecureOriginString,killSwitchString,extensionAllowString,extensionBlockString,extensionAskString,policyAllowString,policyBlockString,policyAskString,drmDisabledString){if(source===undefined||category===undefined||setting===undefined){return null}const extensionStrings={};extensionStrings[ContentSetting.ALLOW]=extensionAllowString;extensionStrings[ContentSetting.BLOCK]=extensionBlockString;extensionStrings[ContentSetting.ASK]=extensionAskString;const policyStrings={};policyStrings[ContentSetting.ALLOW]=policyAllowString;policyStrings[ContentSetting.BLOCK]=policyBlockString;policyStrings[ContentSetting.ASK]=policyAskString;if(source===SiteSettingSource.ALLOWLIST){return allowlistString}else if(source===SiteSettingSource.ADS_FILTER_BLACKLIST){assert(ContentSettingsTypes.ADS===category,"The ads filter blacklist only applies to Ads.");return adsBlacklistString}else if(category===ContentSettingsTypes.ADS&&setting===ContentSetting.BLOCK){return adsBlockString}else if(source===SiteSettingSource.DRM_DISABLED){assert(ContentSetting.BLOCK===setting,"If DRM is disabled, Protected Content must be blocked.");assert(ContentSettingsTypes.PROTECTED_CONTENT===category,"The DRM disabled source only applies to Protected Content.");if(!drmDisabledString){return null}return loadTimeData.sanitizeInnerHtml(loadTimeData.substituteString(drmDisabledString,routes.SITE_SETTINGS_PROTECTED_CONTENT.getAbsolutePath()))}else if(source===SiteSettingSource.EMBARGO){assert(ContentSetting.BLOCK===setting,"Embargo is only used to block permissions.");return embargoString}else if(source===SiteSettingSource.EXTENSION){return extensionStrings[setting]}else if(source===SiteSettingSource.INSECURE_ORIGIN){assert(ContentSetting.BLOCK===setting,"Permissions can only be blocked due to insecure origins.");return insecureOriginString}else if(source===SiteSettingSource.KILL_SWITCH){assert(ContentSetting.BLOCK===setting,"The permissions kill switch can only be used to block permissions.");return killSwitchString}else if(source===SiteSettingSource.POLICY){return policyStrings[setting]}else if(source===SiteSettingSource.DEFAULT||source===SiteSettingSource.PREFERENCE){return""}assertNotReached(`No string for ${category} setting source '${source}'`)}});// Copyright 2020 The Chromium Authors. All rights reserved.
class WebsiteUsageBrowserProxyImpl{fetchUsageTotal(host){chrome.send("fetchUsageTotal",[host])}clearUsage(origin){chrome.send("clearUsage",[origin])}}addSingletonGetter(WebsiteUsageBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"site-details",_template:html`<!--css-build:shadow--><!--_html_template_start_-->
    <!-- Confirm reset settings dialog. -->
    <cr-dialog id="confirmResetSettings" close-text="إغلاق" on-close="onResetSettingsDialogClosed_">
      <div slot="body">
        [[i18n('siteSettingsSiteResetConfirmation', pageTitle)]]
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onCloseDialog_">
          إلغاء
        </cr-button>
        <cr-button class="action-button" on-click="onResetSettings_">
          إعادة الضبط
        </cr-button>
      </div>
    </cr-dialog>

    <!-- Confirm clear storage dialog. -->
    <cr-dialog id="confirmClearStorage" close-text="إغلاق" on-close="onClearStorageDialogClosed_">
      
      <div slot="title">
        هل تريد محو بيانات الموقع الإلكتروني؟
      </div>
      <div slot="body">
        [[i18n('siteSettingsSiteClearStorageConfirmation', pageTitle)]]
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onCloseDialog_">
          إلغاء
        </cr-button>
        <cr-button class="action-button" on-click="onClearStorage_">
          محو
        </cr-button>
      </div>
    </cr-dialog>

    <!-- New version of confirm clear data dialog to show if storage
         pressure UI flag is enabled. -->
    <cr-dialog id="confirmClearStorageNew" close-text="إغلاق" on-close="onClearStorageDialogClosed_">
      <style include="clear-storage-dialog-shared cr-shared-style settings-shared action-link iron-flex" scope="site-details">.favicon-image {
  margin: 2px;
}

#storage {
  padding-inline-end: 0;
}

#storageText {
  display: flex;
}

#resetSettingsButton {
  margin-top: 24px;
}

#usageHeader {
  padding: 0 var(--cr-section-padding);
}

</style>
      <div slot="title">
        هل تريد محو بيانات الموقع الإلكتروني؟
      </div>
      <div slot="body">
        [[i18n('siteSettingsSiteClearStorageConfirmationNew', pageTitle)]]
        <div class="detail-list">
          <div class="detail">
            <iron-icon icon="all-sites:logout"></iron-icon>
            سيتم تسجيل خروجك من هذا الموقع الإلكتروني، بما في ذلك ضمن علامات التبويب المفتوحة.
          </div>
          <div class="detail">
            <iron-icon icon="all-sites:offline"></iron-icon>
            سيتم محو أي بيانات متوفرة بلا اتصال بالإنترنت.
          </div>
        </div>
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onCloseDialog_">
          إلغاء
        </cr-button>
        <cr-button class="action-button" on-click="onClearStorage_">
          محو
        </cr-button>
      </div>
    </cr-dialog>

    <div id="usage">
      <div id="usageHeader">
        <h2 class="first">الاستخدام</h2>
      </div>
      <div class="list-frame">
        <div class="list-item" id="noStorage" hidden$="[[hasUsage_(storedData_, numCookies_)]]">
          <div class="start">لا تتوفر بيانات استخدام</div>
        </div>
        <div class="list-item" id="storage" hidden$="[[!hasUsage_(storedData_, numCookies_)]]">
          <div class="start" id="storageText">
            <div hidden$="[[!storedData_]]">[[storedData_]]</div>
            <div hidden$="[[!hasDataAndCookies_(storedData_, numCookies_)]]">
              &nbsp;·&nbsp;
            </div>
            <div hidden$="[[!numCookies_]]">[[numCookies_]]</div>
          </div>
          <cr-button id="clearStorage" role="button" aria-disabled="false" on-click="onConfirmClearStorage_" aria-label="محو البيانات">
            محو البيانات
          </cr-button>
        </div>
      </div>
    </div>

    <div class="cr-row first">
      <h2 class="flex">الأذونات</h2>
      <cr-button id="resetSettingsButton" class="header-aligned-button" role="button" aria-disabled="false" on-click="onConfirmClearSettings_">
        إعادة ضبط الأذونات
      </cr-button>
    </div>
    <div class="list-frame">
      <site-details-permission category="[[ContentSettingsTypes.GEOLOCATION]]" icon="cr:location-on" label="الموقع الجغرافي">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.CAMERA]]" icon="cr:videocam" label="الكاميرا">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.MIC]]" icon="cr:mic" label="الميكروفون">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.SENSORS]]" icon="settings:sensors" label="مستشعرات الحركة">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.NOTIFICATIONS]]" icon="settings:notifications" label="الإشعارات">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.JAVASCRIPT]]" icon="settings:code" label="JavaScript">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.IMAGES]]" icon="settings:photo" label="الصور">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.POPUPS]]" icon="cr:open-in-new" label="النوافذ المنبثقة وإعادة التوجيه">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.ADS]]" icon="settings:ads" label="الإعلانات">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.BACKGROUND_SYNC]]" icon="cr:sync" label="المزامنة في الخلفية">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.SOUND]]" icon="settings:volume-up" label="الصوت" use-automatic-label="[[blockAutoplayEnabled]]">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.AUTOMATIC_DOWNLOADS]]" icon="cr:file-download" label="عمليات التنزيل التلقائية">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.MIDI_DEVICES]]" icon="settings:midi" label="‏أجهزة MIDI">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.USB_DEVICES]]" icon="settings:usb" label="‏أجهزة USB">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.SERIAL_PORTS]]" icon="settings:serial-port" label="المنافذ التسلسلية">
      </site-details-permission>
      <template is="dom-if" if="[[enableWebBluetoothNewPermissionsBackend_]]">
        <site-details-permission category="[[ContentSettingsTypes.BLUETOOTH_DEVICES]]" icon="settings:bluetooth" label="أجهزة بلوتوث">
        </site-details-permission>
      </template>
      <site-details-permission category="[[ContentSettingsTypes.FILE_SYSTEM_WRITE]]" icon="settings:save-original" label="تعديل الملف">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.HID_DEVICES]]" icon="settings:hid-device" label="‏أجهزة HID">
      </site-details-permission>

      <site-details-permission category="[[ContentSettingsTypes.CLIPBOARD]]" icon="settings:clipboard" label="الحافظة">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.PAYMENT_HANDLER]]" icon="settings:payment-handler" label="معالجات الدفع">
      </site-details-permission>
      <template is="dom-if" if="[[enableExperimentalWebPlatformFeatures_]]">
        <site-details-permission category="[[ContentSettingsTypes.BLUETOOTH_SCANNING]]" icon="settings:bluetooth-scanning" label="البحث عن بلوتوث">
        </site-details-permission>
      </template>
      <site-details-permission category="[[ContentSettingsTypes.MIXEDSCRIPT]]" icon="settings:insecure-content" label="محتوى غير آمن">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.AR]]" icon="settings:vr-headset" label="الواقع المعزّز">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.VR]]" icon="settings:vr-headset" label="الواقع الافتراضي">
      </site-details-permission>
      <site-details-permission category="[[ContentSettingsTypes.IDLE_DETECTION]]" icon="settings:person" label="متى تستخدم جهازك">
      </site-details-permission>
      <template is="dom-if" if="[[enableExperimentalWebPlatformFeatures_]]">
        <site-details-permission category="[[ContentSettingsTypes.WINDOW_PLACEMENT]]" icon="settings:window-placement" label="موضِع النافذة">
        </site-details-permission>
      </template>
      <template is="dom-if" if="[[enableFontAccessContentSetting_]]">
        <site-details-permission category="[[ContentSettingsTypes.FONT_ACCESS]]" icon="settings:font-access" label="الخطوط">
        </site-details-permission>
      </template>
    </div>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,SiteSettingsBehavior,RouteObserverBehavior,WebUIListenerBehavior],properties:{blockAutoplayEnabled:Boolean,pageTitle:{type:String,notify:true},origin_:String,storedData_:{type:String,value:""},numCookies_:{type:String,value:""},enableExperimentalWebPlatformFeatures_:{type:Boolean,value(){return loadTimeData.getBoolean("enableExperimentalWebPlatformFeatures")}},enableFontAccessContentSetting_:{type:Boolean,value(){return loadTimeData.getBoolean("enableFontAccessContentSetting")}},enableWebBluetoothNewPermissionsBackend_:{type:Boolean,value:()=>loadTimeData.getBoolean("enableWebBluetoothNewPermissionsBackend")}},fetchingForHost_:"",websiteUsageProxy_:null,attached(){this.websiteUsageProxy_=WebsiteUsageBrowserProxyImpl.getInstance();this.addWebUIListener("usage-total-changed",((host,data,cookies)=>{this.onUsageTotalChanged_(host,data,cookies)}));this.addWebUIListener("contentSettingSitePermissionChanged",this.onPermissionChanged_.bind(this));this.browserProxy.fetchBlockAutoplayStatus()},ready(){this.ContentSettingsTypes=ContentSettingsTypes},currentRouteChanged(route){if(route!==routes.SITE_SETTINGS_SITE_DETAILS){return}const site=Router.getInstance().getQueryParameters().get("site");if(!site){return}this.origin_=site;this.browserProxy.isOriginValid(this.origin_).then((valid=>{if(!valid){Router.getInstance().navigateToPreviousRoute()}else{this.fetchingForHost_=this.toUrl(this.origin_).hostname;this.storedData_="";this.websiteUsageProxy_.fetchUsageTotal(this.fetchingForHost_);this.updatePermissions_(this.getCategoryList())}}))},onPermissionChanged_(category,origin,embeddingOrigin){if(this.origin_===undefined||this.origin_===""||origin===undefined||origin===""){return}if(!this.getCategoryList().includes(category)){return}this.updatePermissions_([category])},onUsageTotalChanged_(host,usage,cookies){if(this.fetchingForHost_===host){this.storedData_=usage;this.numCookies_=cookies}},updatePermissions_(categoryList){const permissionsMap=Array.prototype.reduce.call(this.root.querySelectorAll("site-details-permission"),((map,element)=>{if(categoryList.includes(element.category)){map[element.category]=element}return map}),{});this.browserProxy.getOriginPermissions(this.origin_,categoryList).then((exceptionList=>{exceptionList.forEach(((exception,i)=>{if(permissionsMap[categoryList[i]]){permissionsMap[categoryList[i]].site=exception}}));assert(exceptionList.length>0);this.pageTitle=this.originRepresentation(exceptionList[0].displayName)}))},onCloseDialog_(e){e.target.closest("cr-dialog").close()},onConfirmClearSettings_(e){e.preventDefault();this.$.confirmResetSettings.showModal()},onConfirmClearStorage_(e){e.preventDefault();this.$.confirmClearStorageNew.showModal()},onResetSettings_(e){this.browserProxy.setOriginPermissions(this.origin_,this.getCategoryList(),ContentSetting.DEFAULT);this.onCloseDialog_(e)},onClearStorage_(e){MetricsBrowserProxyImpl.getInstance().recordSettingsPageHistogram(PrivacyElementInteractions.SITE_DETAILS_CLEAR_DATA);if(this.hasUsage_(this.storedData_,this.numCookies_)){this.websiteUsageProxy_.clearUsage(this.toUrl(this.origin_).href);this.storedData_="";this.numCookies_=""}this.onCloseDialog_(e)},hasUsage_(storage,cookies){return storage!==""||cookies!==""},hasDataAndCookies_(storage,cookies){return storage!==""&&cookies!==""},onResetSettingsDialogClosed_(){focusWithoutInk(assert(this.$$("#resetSettingsButton")))},onClearStorageDialogClosed_(){focusWithoutInk(assert(this.$$("#clearStorage")))}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"zoom-levels",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="zoom-levels">:host {
  display: block;
}

.zoom-label {
  color: var(--cr-secondary-text-color);
        margin-inline-end: 16px;
}

#empty {
  margin-top: 15px;
}

.list-item site-favicon {
  flex-shrink: 0;
}

.list-item .middle {
  overflow-x: hidden;
        text-overflow: ellipsis;
}

</style>
    <div class="list-frame vertical-list" id="listContainer">
      <iron-list id="list" preserve-focus="" items="[[sites_]]" class="cr-separators" risk-selection="">
        <template>
          <div class="list-item" first$="[[!index]]">
            <site-favicon url="[[item.originForFavicon]]"></site-favicon>
            <div class="middle">
              <span class="url-directionality">[[item.displayName]]</span>
            </div>
            <div class="zoom-label">[[item.zoom]]</div>
            <cr-icon-button class="icon-clear" on-click="removeZoomLevel_" title="إزالة مستوى التكبير أو التصغير" tabindex$="[[tabIndex]]"></cr-icon-button>
          </div>
        </template>
      </iron-list>
      <div id="empty" hidden$="[[!showNoSites_]]">
        لم يتم تكبير أو تصغير أي مواقع إلكترونية
      </div>
    </div>
<!--_html_template_end_-->`,behaviors:[ListPropertyUpdateBehavior,SiteSettingsBehavior,WebUIListenerBehavior],properties:{sites_:{type:Array,value:()=>[]},showNoSites_:{type:Boolean,value:false}},ready(){this.addWebUIListener("onZoomLevelsChanged",this.onZoomLevelsChanged_.bind(this));this.browserProxy.fetchZoomLevels()},onZoomLevelsChanged_(sites){this.updateList("sites_",(item=>item.origin),sites);this.showNoSites_=this.sites_.length===0},removeZoomLevel_(event){const site=this.sites_[event.model.index];this.browserProxy.removeZoomLevel(site.origin)}});// Copyright 2016 The Chromium Authors. All rights reserved.
const ImportDataStatus={INITIAL:"initial",IN_PROGRESS:"inProgress",SUCCEEDED:"succeeded",FAILED:"failed"};class ImportDataBrowserProxyImpl{initializeImportDialog(){return sendWithPromise("initializeImportDialog")}importData(sourceBrowserProfileIndex,types){chrome.send("importData",[sourceBrowserProfileIndex,types])}importFromBookmarksFile(){chrome.send("importFromBookmarksFile")}}addSingletonGetter(ImportDataBrowserProxyImpl);// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"settings-import-data-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared md-select" scope="settings-import-data-dialog">.description {
  align-items: center;
        display: flex;
        margin-top: 16px;
}

paper-spinner-lite {
  margin: 0 8px;
}

#successIcon {
  fill: var(--cr-checked-color);
        height: 80px;
        margin: auto;
        width: 100%;
}

.md-select {
  margin-top: 2px;
}

</style>
    <cr-dialog id="dialog" close-text="إغلاق" ignore-popstate="">
      <div slot="title">استيراد الإشارات المرجعية والإعدادات</div>
      <div slot="body">
        <div hidden$="[[!hasImportStatus_(
            importStatusEnum_.SUCCEEDED, importStatus_)]]">
          <iron-icon id="successIcon" icon="settings:check-circle">
          </iron-icon>
          <div hidden$="[[!prefs.import_dialog_bookmarks.value]]">
            <div class="description">الإشارات المرجعية والإعدادات جاهزة</div>
            <settings-toggle-button label="عرض شريط الإشارات" pref="{{prefs.bookmark_bar.show_on_all_tabs}}">
            </settings-toggle-button>
          </div>
        </div>

        <div hidden$="[[hasImportStatus_(
              importStatusEnum_.SUCCEEDED, importStatus_)]]">
          <select id="browserSelect" class="md-select" aria-label="من:" on-change="onBrowserProfileSelectionChange_">
            <template is="dom-repeat" items="[[browserProfiles_]]">
              <option value="[[item.index]]">
                [[getProfileDisplayName_(item.name, item.profileName)]]
              </option>
            </template>
          </select>
          <div class="description">اختيار العناصر المراد استيرادها:</div>
          <settings-checkbox id="importDialogHistory" hidden="[[!selected_.history]]" pref="{{prefs.import_dialog_history}}" label="سجلّ التصفّح" no-set-pref="">
          </settings-checkbox>
          <settings-checkbox id="importDialogBookmarks" hidden="[[!selected_.favorites]]" pref="{{prefs.import_dialog_bookmarks}}" label="المفضّلة/الإشارات" no-set-pref="">
          </settings-checkbox>
          <settings-checkbox id="importDialogSavedPasswords" hidden="[[!selected_.passwords]]" pref="{{prefs.import_dialog_saved_passwords}}" label="كلمات المرور المحفوظة" no-set-pref="">
          </settings-checkbox>
          <settings-checkbox id="importDialogSearchEngine" hidden="[[!selected_.search]]" pref="{{prefs.import_dialog_search_engine}}" label="محرّكات البحث" no-set-pref="">
          </settings-checkbox>
          <settings-checkbox id="importDialogAutofillFormData" hidden="[[!selected_.autofillFormData]]" pref="{{prefs.import_dialog_autofill_form_data}}" label="الملء التلقائي للبيانات" no-set-pref="">
          </settings-checkbox>
        </div>
      </div>
      <div slot="button-container">
        <paper-spinner-lite active="[[hasImportStatus_(
                importStatusEnum_.IN_PROGRESS, importStatus_)]]" hidden="[[hasImportStatus_(
                importStatusEnum_.SUCCEEDED, importStatus_)]]">
        </paper-spinner-lite>
        <cr-button id="cancel" class="cancel-button" hidden="[[hasImportStatus_(
                importStatusEnum_.SUCCEEDED, importStatus_)]]" disabled="[[hasImportStatus_(
                importStatusEnum_.IN_PROGRESS, importStatus_)]]" on-click="closeDialog_">
          إلغاء
        </cr-button>
        <cr-button id="import" class="action-button" hidden="[[hasImportStatus_(
                importStatusEnum_.SUCCEEDED, importStatus_)]]" disabled="[[shouldDisableImport_(
                importStatus_, noImportDataTypeSelected_)]]" on-click="onActionButtonTap_">
          [[getActionButtonText_(selected_)]]
        </cr-button>

        <cr-button id="done" class="action-button" hidden$="[[!hasImportStatus_(
                importStatusEnum_.SUCCEEDED, importStatus_)]]" on-click="closeDialog_">تم</cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior,PrefsBehavior],properties:{browserProfiles_:Array,selected_:{type:Object,observer:"updateImportDataTypesSelected_"},noImportDataTypeSelected_:{type:Boolean,value:false},importStatus_:{type:String,value:ImportDataStatus.INITIAL},importStatusEnum_:{type:Object,value:ImportDataStatus}},listeners:{"settings-boolean-control-change":"updateImportDataTypesSelected_"},browserProxy_:null,attached(){this.browserProxy_=ImportDataBrowserProxyImpl.getInstance();this.browserProxy_.initializeImportDialog().then((data=>{this.browserProfiles_=data;this.selected_=this.browserProfiles_[0];this.$.dialog.showModal()}));this.addWebUIListener("import-data-status-changed",(importStatus=>{this.importStatus_=importStatus;if(this.hasImportStatus_(ImportDataStatus.FAILED)){this.closeDialog_()}}))},getProfileDisplayName_(name,profileName){return profileName?`${name} - ${profileName}`:name},updateImportDataTypesSelected_(){const checkboxes=this.shadowRoot.querySelectorAll("settings-checkbox[checked]:not([hidden])");this.noImportDataTypeSelected_=checkboxes.length===0},hasImportStatus_(status){return this.importStatus_===status},isImportFromFileSelected_(){return this.selected_.index===this.browserProfiles_.length-1},getActionButtonText_(){return this.i18n(this.isImportFromFileSelected_()?"importChooseFile":"importCommit")},onBrowserProfileSelectionChange_(){this.selected_=this.browserProfiles_[this.$.browserSelect.selectedIndex]},onActionButtonTap_(){const checkboxes=this.shadowRoot.querySelectorAll("settings-checkbox");if(this.isImportFromFileSelected_()){this.browserProxy_.importFromBookmarksFile()}else{const types={};checkboxes.forEach((checkbox=>{types[checkbox.pref.key]=checkbox.checked&&!checkbox.hidden}));this.browserProxy_.importData(this.$.browserSelect.selectedIndex,types)}checkboxes.forEach((checkbox=>checkbox.sendPrefChange()))},closeDialog_(){this.$.dialog.close()},shouldDisableImport_(){return this.hasImportStatus_(ImportDataStatus.IN_PROGRESS)||this.noImportDataTypeSelected_}});// Copyright 2020 The Chromium Authors. All rights reserved.
class CrGridElement extends PolymerElement{static get is(){return"cr-grid"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-grid">:host {
  --cr-grid-gap: 0px;
}

#grid {
  display: grid;
    grid-column-gap: var(--cr-grid-gap);
    grid-row-gap: var(--cr-grid-gap);
    grid-template-columns: repeat(var(--cr-grid-columns), auto);
    width: fit-content;
}

::slotted(*) {
  align-self: center;
    justify-self: center;
}

</style>
<div id="grid" on-keydown="onKeyDown_">
  <slot id="items"></slot>
</div>
<!--_html_template_end_-->`}static get properties(){return{columns:{type:Number,value:1,observer:"onColumnsChange_"}}}onColumnsChange_(){this.updateStyles({"--cr-grid-columns":this.columns})}onKeyDown_(e){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)){e.preventDefault();const items=this.$.items.assignedElements().filter((el=>!!(el.offsetWidth||el.offsetHeight||el.getClientRects().length)));const currentIndex=items.indexOf(e.target);const isRtl=window.getComputedStyle(this)["direction"]==="rtl";const bottomRowColumns=items.length%this.columns;const direction=["ArrowRight","ArrowDown"].includes(e.key)?1:-1;const inEdgeRow=direction===1?currentIndex>=items.length-bottomRowColumns:currentIndex<this.columns;let delta=0;switch(e.key){case"ArrowLeft":case"ArrowRight":delta=direction*(isRtl?-1:1);break;case"ArrowUp":case"ArrowDown":delta=direction*(inEdgeRow?bottomRowColumns:this.columns);break}if(e.key==="ArrowUp"&&inEdgeRow&&currentIndex>=bottomRowColumns){delta-=this.columns}else if(e.key==="ArrowDown"&&!inEdgeRow&&currentIndex+delta>=items.length){delta+=bottomRowColumns}const mod=function(m,n){return(m%n+n)%n};const newIndex=mod(currentIndex+delta,items.length);items[newIndex].focus()}if(["Enter"," "].includes(e.key)){e.preventDefault();e.stopPropagation();e.target.click()}}}customElements.define(CrGridElement.is,CrGridElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class ThemeIconElement extends PolymerElement{static get is(){return"cr-theme-icon"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-theme-icon">:host {
  --cr-theme-icon-size: 72px;
    display: block;
}

:host, svg {
  height: var(--cr-theme-icon-size);
    width: var(--cr-theme-icon-size);
}

#ring {
  fill: rgba(var(--google-blue-600-rgb), 0.4);
    visibility: hidden;
}

#checkMark {
  visibility: hidden;
}

:host([selected]) #ring, :host([selected]) #checkMark {
  visibility: visible;
}

#circle {
  fill: url(#gradient);
    stroke: var(--cr-theme-icon-stroke-color,
        var(--cr-theme-icon-frame-color));
    stroke-width: 1;
}

#leftColor {
  stop-color: var(--cr-theme-icon-active-tab-color);
}

#rightColor {
  stop-color: var(--cr-theme-icon-frame-color);
}

#checkMark circle {
  fill: var(--google-blue-600);
}

#checkMark path {
  fill: white;
}

@media (prefers-color-scheme: dark) {
#checkMark circle {
  fill: var(--google-blue-refresh-300);
}

#checkMark path {
  fill: var(--google-grey-900);
}

}

</style>
<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="gradient" gradientUnits="objectBoundingBox" x1="50%" y1="0" x2="50.01%" y2="0">
      <stop id="leftColor" offset="0%"></stop>
      <stop id="rightColor" offset="100%"></stop>
    </linearGradient>
  </defs>
  <circle id="ring" cx="36" cy="36" r="36"></circle>
  <circle id="circle" cx="36" cy="36" r="32"></circle>
  <g id="checkMark" transform="translate(48.5, 3.5)">
    <circle cx="10" cy="10" r="10"></circle>
    <path d="m 2.9885708,9.99721 5.0109458,4.98792 0.00275,-0.003
        0.024151,0.0227 8.9741604,-9.01557 -1.431323,-1.42476 -7.5742214,7.6092
        -3.6031671,-3.58665 z">
    </path>
  </g>
</svg>
<!--_html_template_end_-->`}}customElements.define(ThemeIconElement.is,ThemeIconElement);// Copyright 2020 The Chromium Authors. All rights reserved.
function skColorToRgba(skColor){const a=skColor.value>>24&255;const r=skColor.value>>16&255;const g=skColor.value>>8&255;const b=skColor.value&255;return`rgba(${r}, ${g}, ${b}, ${(a/255).toFixed(2)})`}function hexColorToSkColor(hexColor){if(!/^#[0-9a-f]{6}$/.test(hexColor)){return{value:0}}const r=parseInt(hexColor.substring(1,3),16);const g=parseInt(hexColor.substring(3,5),16);const b=parseInt(hexColor.substring(5,7),16);return{value:4278190080+(r<<16)+(g<<8)+b}}const ThemeTypeSpec={$:mojo.internal.Enum()};const ThemeType={kDefault:0,kAutogenerated:1,kChrome:2,kThirdParty:3,MIN_VALUE:0,MAX_VALUE:3};const CustomizeThemesHandlerFactoryPendingReceiver=class{constructor(handle){this.handle=mojo.internal.interfaceSupport.getEndpointForReceiver(handle)}bindInBrowser(scope="context"){mojo.internal.interfaceSupport.bind(this.handle,"customize_themes.mojom.CustomizeThemesHandlerFactory",scope)}};const CustomizeThemesHandlerFactoryRemote=class{constructor(handle=undefined){this.proxy=new mojo.internal.interfaceSupport.InterfaceRemoteBase(CustomizeThemesHandlerFactoryPendingReceiver,handle);this.$=new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);this.onConnectionError=this.proxy.getConnectionErrorEventRouter()}createCustomizeThemesHandler(client,handler){this.proxy.sendMessage(161390412,CustomizeThemesHandlerFactory_CreateCustomizeThemesHandler_ParamsSpec.$,null,[client,handler])}};const CustomizeThemesHandlerFactory=class{static get $interfaceName(){return"customize_themes.mojom.CustomizeThemesHandlerFactory"}static getRemote(){let remote=new CustomizeThemesHandlerFactoryRemote;remote.$.bindNewPipeAndPassReceiver().bindInBrowser();return remote}};const CustomizeThemesHandlerPendingReceiver=class{constructor(handle){this.handle=mojo.internal.interfaceSupport.getEndpointForReceiver(handle)}bindInBrowser(scope="context"){mojo.internal.interfaceSupport.bind(this.handle,"customize_themes.mojom.CustomizeThemesHandler",scope)}};const CustomizeThemesHandlerRemote=class{constructor(handle=undefined){this.proxy=new mojo.internal.interfaceSupport.InterfaceRemoteBase(CustomizeThemesHandlerPendingReceiver,handle);this.$=new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);this.onConnectionError=this.proxy.getConnectionErrorEventRouter()}applyAutogeneratedTheme(frameColor){this.proxy.sendMessage(1883837862,CustomizeThemesHandler_ApplyAutogeneratedTheme_ParamsSpec.$,null,[frameColor])}applyChromeTheme(id){this.proxy.sendMessage(587618804,CustomizeThemesHandler_ApplyChromeTheme_ParamsSpec.$,null,[id])}applyDefaultTheme(){this.proxy.sendMessage(782521672,CustomizeThemesHandler_ApplyDefaultTheme_ParamsSpec.$,null,[])}initializeTheme(){this.proxy.sendMessage(690584312,CustomizeThemesHandler_InitializeTheme_ParamsSpec.$,null,[])}getChromeThemes(){return this.proxy.sendMessage(1722548908,CustomizeThemesHandler_GetChromeThemes_ParamsSpec.$,CustomizeThemesHandler_GetChromeThemes_ResponseParamsSpec.$,[])}confirmThemeChanges(){this.proxy.sendMessage(199293947,CustomizeThemesHandler_ConfirmThemeChanges_ParamsSpec.$,null,[])}revertThemeChanges(){this.proxy.sendMessage(276753951,CustomizeThemesHandler_RevertThemeChanges_ParamsSpec.$,null,[])}};const CustomizeThemesClientPendingReceiver=class{constructor(handle){this.handle=mojo.internal.interfaceSupport.getEndpointForReceiver(handle)}bindInBrowser(scope="context"){mojo.internal.interfaceSupport.bind(this.handle,"customize_themes.mojom.CustomizeThemesClient",scope)}};const CustomizeThemesClientRemote=class{constructor(handle=undefined){this.proxy=new mojo.internal.interfaceSupport.InterfaceRemoteBase(CustomizeThemesClientPendingReceiver,handle);this.$=new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);this.onConnectionError=this.proxy.getConnectionErrorEventRouter()}setTheme(theme){this.proxy.sendMessage(1133519288,CustomizeThemesClient_SetTheme_ParamsSpec.$,null,[theme])}};const CustomizeThemesClientCallbackRouter=class{constructor(){this.helper_internal_=new mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal(CustomizeThemesClientRemote);this.$=new mojo.internal.interfaceSupport.InterfaceReceiverHelper(this.helper_internal_);this.router_=new mojo.internal.interfaceSupport.CallbackRouter;this.setTheme=new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);this.helper_internal_.registerHandler(1133519288,CustomizeThemesClient_SetTheme_ParamsSpec.$,null,this.setTheme.createReceiverHandler(false));this.onConnectionError=this.helper_internal_.getConnectionErrorEventRouter()}removeListener(id){return this.router_.removeListener(id)}};const ThemeColorsSpec={$:{}};const ChromeThemeSpec={$:{}};const ThirdPartyThemeInfoSpec={$:{}};const ThemeSpec={$:{}};const CustomizeThemesHandlerFactory_CreateCustomizeThemesHandler_ParamsSpec={$:{}};const CustomizeThemesHandler_ApplyAutogeneratedTheme_ParamsSpec={$:{}};const CustomizeThemesHandler_ApplyChromeTheme_ParamsSpec={$:{}};const CustomizeThemesHandler_ApplyDefaultTheme_ParamsSpec={$:{}};const CustomizeThemesHandler_InitializeTheme_ParamsSpec={$:{}};const CustomizeThemesHandler_GetChromeThemes_ParamsSpec={$:{}};const CustomizeThemesHandler_GetChromeThemes_ResponseParamsSpec={$:{}};const CustomizeThemesHandler_ConfirmThemeChanges_ParamsSpec={$:{}};const CustomizeThemesHandler_RevertThemeChanges_ParamsSpec={$:{}};const CustomizeThemesClient_SetTheme_ParamsSpec={$:{}};const ThemeInfoSpec={$:{}};mojo.internal.Struct(ThemeColorsSpec.$,"ThemeColors",[mojo.internal.StructField("frame",0,0,SkColorSpec.$,null,false,0),mojo.internal.StructField("activeTab",8,0,SkColorSpec.$,null,false,0),mojo.internal.StructField("activeTabText",16,0,SkColorSpec.$,null,false,0)],[[0,32]]);mojo.internal.Struct(ChromeThemeSpec.$,"ChromeTheme",[mojo.internal.StructField("id",0,0,mojo.internal.Int32,0,false,0),mojo.internal.StructField("label",8,0,mojo.internal.String,null,false,0),mojo.internal.StructField("colors",16,0,ThemeColorsSpec.$,null,false,0)],[[0,32]]);mojo.internal.Struct(ThirdPartyThemeInfoSpec.$,"ThirdPartyThemeInfo",[mojo.internal.StructField("id",0,0,mojo.internal.String,null,false,0),mojo.internal.StructField("name",8,0,mojo.internal.String,null,false,0)],[[0,24]]);mojo.internal.Struct(ThemeSpec.$,"Theme",[mojo.internal.StructField("type",0,0,ThemeTypeSpec.$,0,false,0),mojo.internal.StructField("info",8,0,ThemeInfoSpec.$,null,false,0)],[[0,32]]);mojo.internal.Struct(CustomizeThemesHandlerFactory_CreateCustomizeThemesHandler_ParamsSpec.$,"CustomizeThemesHandlerFactory_CreateCustomizeThemesHandler_Params",[mojo.internal.StructField("client",0,0,mojo.internal.InterfaceProxy(CustomizeThemesClientRemote),null,false,0),mojo.internal.StructField("handler",8,0,mojo.internal.InterfaceRequest(CustomizeThemesHandlerPendingReceiver),null,false,0)],[[0,24]]);mojo.internal.Struct(CustomizeThemesHandler_ApplyAutogeneratedTheme_ParamsSpec.$,"CustomizeThemesHandler_ApplyAutogeneratedTheme_Params",[mojo.internal.StructField("frameColor",0,0,SkColorSpec.$,null,false,0)],[[0,16]]);mojo.internal.Struct(CustomizeThemesHandler_ApplyChromeTheme_ParamsSpec.$,"CustomizeThemesHandler_ApplyChromeTheme_Params",[mojo.internal.StructField("id",0,0,mojo.internal.Int32,0,false,0)],[[0,16]]);mojo.internal.Struct(CustomizeThemesHandler_ApplyDefaultTheme_ParamsSpec.$,"CustomizeThemesHandler_ApplyDefaultTheme_Params",[],[[0,8]]);mojo.internal.Struct(CustomizeThemesHandler_InitializeTheme_ParamsSpec.$,"CustomizeThemesHandler_InitializeTheme_Params",[],[[0,8]]);mojo.internal.Struct(CustomizeThemesHandler_GetChromeThemes_ParamsSpec.$,"CustomizeThemesHandler_GetChromeThemes_Params",[],[[0,8]]);mojo.internal.Struct(CustomizeThemesHandler_GetChromeThemes_ResponseParamsSpec.$,"CustomizeThemesHandler_GetChromeThemes_ResponseParams",[mojo.internal.StructField("chromeThemes",0,0,mojo.internal.Array(ChromeThemeSpec.$,false),null,false,0)],[[0,16]]);mojo.internal.Struct(CustomizeThemesHandler_ConfirmThemeChanges_ParamsSpec.$,"CustomizeThemesHandler_ConfirmThemeChanges_Params",[],[[0,8]]);mojo.internal.Struct(CustomizeThemesHandler_RevertThemeChanges_ParamsSpec.$,"CustomizeThemesHandler_RevertThemeChanges_Params",[],[[0,8]]);mojo.internal.Struct(CustomizeThemesClient_SetTheme_ParamsSpec.$,"CustomizeThemesClient_SetTheme_Params",[mojo.internal.StructField("theme",0,0,ThemeSpec.$,null,false,0)],[[0,16]]);mojo.internal.Union(ThemeInfoSpec.$,"ThemeInfo",{chromeThemeId:{ordinal:0,type:mojo.internal.Int32},autogeneratedThemeColors:{ordinal:1,type:ThemeColorsSpec.$},thirdPartyThemeInfo:{ordinal:2,type:ThirdPartyThemeInfoSpec.$}});// Copyright 2020 The Chromium Authors. All rights reserved.
class CustomizeThemesBrowserProxyImpl{constructor(){this.handler_=new CustomizeThemesHandlerRemote;this.callbackRouter_=new CustomizeThemesClientCallbackRouter;const factory=CustomizeThemesHandlerFactory.getRemote();factory.createCustomizeThemesHandler(this.callbackRouter_.$.bindNewPipeAndPassRemote(),this.handler_.$.bindNewPipeAndPassReceiver())}handler(){return this.handler_}callbackRouter(){return this.callbackRouter_}open(url){window.open(url,"_blank")}}addSingletonGetter(CustomizeThemesBrowserProxyImpl);// Copyright 2020 The Chromium Authors. All rights reserved.
class CustomizeThemesElement extends(mixinBehaviors([I18nBehavior],PolymerElement)){static get is(){return"cr-customize-themes"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style cr-icons cr-shared-style" scope="cr-customize-themes">:host {
  --cr-customize-themes-grid-gap: 20px;
    --cr-customize-themes-icon-size: 72px;
    display: inline-block;
}

#thirdPartyThemeContainer {
  max-width: 544px;
    width: 100%;
}

#thirdPartyTheme {
  align-items: center;
    border: 1px solid var(--google-grey-refresh-300);
    border-radius: 5px;
    color: var(--cr-primary-text-color);
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
    padding: 0 16px;
}

@media (prefers-color-scheme: dark) {
#thirdPartyTheme {
  border-color: var(--google-grey-refresh-700);
}

}

#thirdPartyBrushIcon {
  -webkit-mask-image: url(chrome://resources/cr_components/customize_themes/brush.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--cr-primary-text-color);
    margin-inline-end: 20px;
    min-height: 24px;
    min-width: 24px;
}

#thirdPartyThemeNameContainer {
  flex-grow: 1;
    margin-inline-end: 24px;
}

#thirdPartyThemeName {
  font-weight: bold;
}

#thirdPartyLink {
  --cr-icon-button-fill-color: var(--cr-primary-text-color);
    margin-inline-end: 24px;
}

#uninstallThirdPartyButton {
  margin: 16px 0;
}

#themesContainer {
  --cr-grid-gap: var(--cr-customize-themes-grid-gap);
}

#themesContainer > * {
  outline-width: 0;
}

:host-context(.focus-outline-visible) #themesContainer > *:focus {
  box-shadow: 0 0 0 2px rgba(var(--google-blue-600-rgb), .4);
}

#autogeneratedThemeContainer {
  position: relative;
}

#colorPicker {
  border: 0;
    height: var(--cr-customize-themes-icon-size);
    left: 0;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    visibility: hidden;
    width: var(--cr-customize-themes-icon-size);
}

#colorPickerIcon {
  -webkit-mask-image: url(chrome://resources/cr_components/customize_themes/colorize.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--google-grey-refresh-700);
    height: 20px;
    left: calc(50% - 10px);
    position: absolute;
    top: calc(50% - 10px);
    width: 20px;
}

cr-theme-icon {
  --cr-theme-icon-size: var(--cr-customize-themes-icon-size);
}

#autogeneratedTheme {
  --cr-theme-icon-frame-color: var(--google-grey-refresh-100);
    --cr-theme-icon-active-tab-color: white;
    --cr-theme-icon-stroke-color: var(--google-grey-refresh-300);
}

#defaultTheme {
  --cr-theme-icon-frame-color: rgb(222, 225, 230);
    --cr-theme-icon-active-tab-color: white;
}

@media (prefers-color-scheme: dark) {
#defaultTheme {
  --cr-theme-icon-frame-color: rgb(var(--google-grey-900-rgb));
      --cr-theme-icon-active-tab-color: rgb(50, 54, 57);
}

}

paper-tooltip {
  --paper-tooltip-delay-in: 100ms;
    --paper-tooltip-duration-in: 100ms;
    --paper-tooltip-duration-out: 100ms;
    --paper-tooltip-min-width: none;
    --paper-tooltip-padding: 5px 4px;
}

</style>
<div id="thirdPartyThemeContainer" hidden="[[!isThirdPartyTheme_(selectedTheme)]]">
  <div id="thirdPartyTheme">
    <div id="thirdPartyBrushIcon"></div>
    <div id="thirdPartyThemeNameContainer">
      <div id="thirdPartyThemeName">
        [[selectedTheme.info.thirdPartyThemeInfo.name]]
      </div>
      <div>[[i18n('thirdPartyThemeDescription')]]</div>
    </div>
    <cr-icon-button id="thirdPartyLink" class="icon-external" role="link" on-click="onThirdPartyLinkButtonClick_">
    </cr-icon-button>
    <cr-button id="uninstallThirdPartyButton" on-click="onUninstallThirdPartyThemeClick_">
      [[i18n('uninstallThirdPartyThemeButton')]]
    </cr-button>
  </div>
</div>
<cr-grid id="themesContainer" columns="6" role="radiogroup">
  <div aria-label="[[i18n('colorPickerLabel')]]" tabindex="0" on-click="onAutogeneratedThemeClick_" role="radio" aria-checked$="[[getThemeIconCheckedStatus_('autogenerated', selectedTheme)]]">
    <div id="autogeneratedThemeContainer">
      <cr-theme-icon id="autogeneratedTheme" selected$="[[isThemeIconSelected_('autogenerated', selectedTheme)]]">
      </cr-theme-icon>
      <div id="colorPickerIcon"></div>
      <input id="colorPicker" type="color" on-change="onCustomFrameColorChange_">
    </div>
    <paper-tooltip offset="0" fit-to-visible-bounds="">
      [[i18n('colorPickerLabel')]]
    </paper-tooltip>
  </div>
  <div aria-label="[[i18n('defaultThemeLabel')]]" tabindex="0" on-click="onDefaultThemeClick_" role="radio" aria-checked$="[[getThemeIconCheckedStatus_('default', selectedTheme)]]">
    <cr-theme-icon id="defaultTheme" selected$="[[isThemeIconSelected_('default', selectedTheme)]]">
    </cr-theme-icon>
    <paper-tooltip offset="0" fit-to-visible-bounds="">
      [[i18n('defaultThemeLabel')]]
    </paper-tooltip>
  </div>
  <template is="dom-repeat" id="themes" items="[[chromeThemes_]]">
    <div aria-label="[[item.label]]" tabindex="0" on-click="onChromeThemeClick_" class="chrome-theme-wrapper" role="radio" aria-checked$="[[getThemeIconCheckedStatus_(item.id, selectedTheme)]]">
      <cr-theme-icon style="--cr-theme-icon-frame-color:
              [[skColorToRgba_(item.colors.frame)]];
              --cr-theme-icon-active-tab-color:
              [[skColorToRgba_(item.colors.activeTab)]];" selected$="[[isThemeIconSelected_(item.id, selectedTheme)]]">
      </cr-theme-icon>
      <paper-tooltip offset="0" fit-to-visible-bounds="">
        [[item.label]]
      </paper-tooltip>
    </div>
  </template>
</cr-grid>
<!--_html_template_end_-->`}static get properties(){return{selectedTheme:{type:Object,observer:"onThemeChange_",notify:true},autoConfirmThemeChanges:{type:Boolean,value:false},chromeThemes_:Array}}constructor(){super();this.handler_=CustomizeThemesBrowserProxyImpl.getInstance().handler();this.callbackRouter_=CustomizeThemesBrowserProxyImpl.getInstance().callbackRouter();this.setThemeListenerId_=null}connectedCallback(){super.connectedCallback();this.handler_.initializeTheme();this.handler_.getChromeThemes().then((({chromeThemes:chromeThemes})=>{this.chromeThemes_=chromeThemes}));this.setThemeListenerId_=this.callbackRouter_.setTheme.addListener((theme=>{this.selectedTheme=theme}))}disconnectedCallback(){this.revertThemeChanges();this.callbackRouter_.removeListener(assert(this.setThemeListenerId_));super.disconnectedCallback()}confirmThemeChanges(){this.handler_.confirmThemeChanges()}revertThemeChanges(){this.handler_.revertThemeChanges()}onCustomFrameColorChange_(e){this.handler_.applyAutogeneratedTheme(hexColorToSkColor(e.target.value));if(this.autoConfirmThemeChanges){this.handler_.confirmThemeChanges()}}onAutogeneratedThemeClick_(){this.$.colorPicker.click()}onDefaultThemeClick_(){this.handler_.applyDefaultTheme();if(this.autoConfirmThemeChanges){this.handler_.confirmThemeChanges()}}onChromeThemeClick_(e){this.handler_.applyChromeTheme(this.$.themes.itemForElement(e.target).id);if(this.autoConfirmThemeChanges){this.handler_.confirmThemeChanges()}}onThemeChange_(){if(this.selectedTheme.type!==ThemeType.kAutogenerated){return}const rgbaFrameColor=skColorToRgba(this.selectedTheme.info.autogeneratedThemeColors.frame);const rgbaActiveTabColor=skColorToRgba(this.selectedTheme.info.autogeneratedThemeColors.activeTab);this.$.autogeneratedTheme.style.setProperty("--cr-theme-icon-frame-color",rgbaFrameColor);this.$.autogeneratedTheme.style.setProperty("--cr-theme-icon-stroke-color",rgbaFrameColor);this.$.autogeneratedTheme.style.setProperty("--cr-theme-icon-active-tab-color",rgbaActiveTabColor);this.$.colorPickerIcon.style.setProperty("background-color",skColorToRgba(this.selectedTheme.info.autogeneratedThemeColors.activeTabText))}onUninstallThirdPartyThemeClick_(e){this.handler_.applyDefaultTheme();this.handler_.confirmThemeChanges()}onThirdPartyLinkButtonClick_(){CustomizeThemesBrowserProxyImpl.getInstance().open(`https://chrome.google.com/webstore/detail/${this.selectedTheme.info.thirdPartyThemeInfo.id}`)}isThemeIconSelected_(id){if(!this.selectedTheme){return false}if(id==="autogenerated"){return this.selectedTheme.type===ThemeType.kAutogenerated}else if(id==="default"){return this.selectedTheme.type===ThemeType.kDefault}else{return this.selectedTheme.type===ThemeType.kChrome&&id===this.selectedTheme.info.chromeThemeId}}getThemeIconCheckedStatus_(id){return this.isThemeIconSelected_(id)?"true":"false"}isThirdPartyTheme_(){return this.selectedTheme.type===ThemeType.kThirdParty}skColorToRgba_(skColor){return skColorToRgba(skColor)}}customElements.define(CustomizeThemesElement.is,CustomizeThemesElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const template$5=html`<custom-style>
  <style is="custom-style" css-build="shadow">html {
  --shadow-transition_-_transition:  box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);;

      --shadow-none_-_box-shadow:  none;;

      

      --shadow-elevation-2dp_-_box-shadow:  0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);;

      --shadow-elevation-3dp_-_box-shadow:  0 3px 4px 0 rgba(0, 0, 0, 0.14),
                    0 1px 8px 0 rgba(0, 0, 0, 0.12),
                    0 3px 3px -2px rgba(0, 0, 0, 0.4);;

      --shadow-elevation-4dp_-_box-shadow:  0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12),
                    0 2px 4px -1px rgba(0, 0, 0, 0.4);;

      --shadow-elevation-6dp_-_box-shadow:  0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12),
                    0 3px 5px -1px rgba(0, 0, 0, 0.4);;

      --shadow-elevation-8dp_-_box-shadow:  0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12),
                    0 5px 5px -3px rgba(0, 0, 0, 0.4);;

      --shadow-elevation-12dp_-_box-shadow:  0 12px 16px 1px rgba(0, 0, 0, 0.14),
                    0 4px 22px 3px rgba(0, 0, 0, 0.12),
                    0 6px 7px -4px rgba(0, 0, 0, 0.4);;

      --shadow-elevation-16dp_-_box-shadow:  0 16px 24px 2px rgba(0, 0, 0, 0.14),
                    0  6px 30px 5px rgba(0, 0, 0, 0.12),
                    0  8px 10px -5px rgba(0, 0, 0, 0.4);;

      --shadow-elevation-24dp_-_box-shadow:  0 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0 9px 46px 8px rgba(0, 0, 0, 0.12),
                    0 11px 15px -7px rgba(0, 0, 0, 0.4);;
}

</style>
</custom-style>`;template$5.setAttribute("style","display: none;");document.head.appendChild(template$5.content);// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-profile-avatar-selector-grid">:host {
  display: inline-flex;
        flex-wrap: wrap;
        margin: calc(var(--avatar-spacing) / -2);
}

</style>
    <slot></slot>
<!--_html_template_end_-->`,is:"cr-profile-avatar-selector-grid",properties:{ignoreModifiedKeyEvents:{type:Boolean,value:false}},listeners:{keydown:"onKeyDown_"},onKeyDown_(e){const items=this.querySelectorAll(".avatar");switch(e.key){case"ArrowDown":case"ArrowUp":this.moveFocusRow_(items,e.key);e.preventDefault();return;case"ArrowLeft":case"ArrowRight":if(this.ignoreModifiedKeyEvents&&hasKeyModifiers(e)){return}this.moveFocusRow_(items,e.key);e.preventDefault();return}},moveFocusRow_(items,direction){let offset=direction==="ArrowDown"||direction==="ArrowRight"?1:-1;const style=getComputedStyle(this);const avatarSpacing=parseInt(style.getPropertyValue("--avatar-spacing"),10);const avatarSize=parseInt(style.getPropertyValue("--avatar-size"),10);const rowSize=Math.floor(this.clientWidth/(avatarSpacing+avatarSize));const rows=Math.ceil(items.length/rowSize);const gridSize=rows*rowSize;const focusIndex=Array.prototype.slice.call(items).findIndex((item=>this.parentNode.activeElement===item));let nextItem=null;if(direction==="ArrowDown"||direction==="ArrowUp"){for(let i=offset;Math.abs(i)<=rows;i+=offset){nextItem=items[(focusIndex+i*rowSize+gridSize)%gridSize];if(nextItem){break}}}else{if(style.direction==="rtl"){offset*=-1}let nextIndex=(focusIndex+offset)%items.length;if(nextIndex<0){nextIndex=items.length-1}nextItem=items[nextIndex]}nextItem.focus();assert(this.parentNode.activeElement===nextItem)}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style" scope="cr-profile-avatar-selector">:host {
  --avatar-size: 96px;
        --avatar-spacing: 24px;
        display: inline-flex;
}

#avatar-grid .avatar {
  --avatar-focus-color: var(--google-grey-refresh-700);
        --avatar-gap-color: white;
        --avatar-gap-width: 2px;
        --avatar-selected-color: var(--google-blue-500);

        background-position: center;
        background-repeat: no-repeat;
        border: 1px solid var(--paper-grey-300);
        border-radius: 100%;
        box-shadow: 0 0 0 var(--avatar-gap-width) var(--avatar-gap-color),
            0 0 0 calc(var(--avatar-gap-width) + var(--avatar-outline-width))
                var(--avatar-outline-color);
        display: flex;
        height: var(--avatar-size);
        margin: calc(var(--avatar-spacing) / 2);
        min-width: 0;
        padding: 0;
        transition: none !important;  
        width: var(--avatar-size);
}

@media (prefers-color-scheme: dark) {
#avatar-grid .avatar {
  --avatar-focus-color: var(--google-grey-refresh-500);
          --avatar-gap-color: var(--google-grey-800);
          --avatar-selected-color: var(--google-blue-refresh-300);
}

}

#avatar-grid .avatar.iron-selected {
  --avatar-outline-color: var(--avatar-selected-color);
        --avatar-outline-width: 2px !important;  
        border-color: var(--avatar-selected-color);
}

:host-context(.focus-outline-visible) #avatar-grid .avatar:not(.iron-selected):focus {
  --avatar-outline-color: var(--avatar-focus-color);
        --avatar-outline-width: 1px;
}

cr-button {
  background-size: var(--avatar-size);
}

paper-tooltip {
  --paper-tooltip-delay-in: 100ms;
        --paper-tooltip-duration-in: 100ms;
        --paper-tooltip-duration-out: 100ms;
        --paper-tooltip-min-width: none;
}

</style>
    <cr-profile-avatar-selector-grid id="avatar-grid" role="radiogroup" ignore-modified-key-events="[[ignoreModifiedKeyEvents]]">
      <template is="dom-repeat" items="[[avatars]]">
        <cr-button id="[[getAvatarId_(index)]]" aria-label="[[item.label]]" class$="avatar [[getSelectedClass_(item, selectedAvatar)]]" style$="background-image: [[getIconImageSet_(item.url)]]" on-click="onAvatarTap_" role="radio" aria-checked$="[[getCheckedAttribute_(item, selectedAvatar)]]">
        </cr-button>
        <paper-tooltip for="[[getAvatarId_(index)]]" offset="0" fit-to-visible-bounds="">
          [[item.label]]
        </paper-tooltip>
      </template>
    </cr-profile-avatar-selector-grid>
<!--_html_template_end_-->`,is:"cr-profile-avatar-selector",properties:{avatars:{type:Array,value(){return[]}},selectedAvatar:{type:Object,notify:true},ignoreModifiedKeyEvents:{type:Boolean,value:false}},getAvatarId_(index){return"avatarId"+index},getSelectedClass_(avatarItem){return this.isAvatarSelected(avatarItem)?"iron-selected":""},getCheckedAttribute_(avatarItem){return this.isAvatarSelected(avatarItem)?"true":"false"},isAvatarSelected(avatarItem){return!!avatarItem&&(avatarItem.selected||!!this.selectedAvatar&&this.selectedAvatar.index===avatarItem.index)},getIconImageSet_(iconUrl){return getImage(iconUrl)},onAvatarTap_(e){this.selectedAvatar=e.model.item}});// Copyright 2016 The Chromium Authors. All rights reserved.
const ProfileShortcutStatus={PROFILE_SHORTCUT_SETTING_HIDDEN:"profileShortcutSettingHidden",PROFILE_SHORTCUT_NOT_FOUND:"profileShortcutNotFound",PROFILE_SHORTCUT_FOUND:"profileShortcutFound"};class ManageProfileBrowserProxyImpl{getAvailableIcons(){return sendWithPromise("getAvailableIcons")}setProfileIconToGaiaAvatar(){chrome.send("setProfileIconToGaiaAvatar")}setProfileIconToDefaultAvatar(index){chrome.send("setProfileIconToDefaultAvatar",[index])}setProfileName(name){chrome.send("setProfileName",[name])}getProfileShortcutStatus(){return sendWithPromise("requestProfileShortcutStatus")}addProfileShortcut(){chrome.send("addProfileShortcut")}removeProfileShortcut(){chrome.send("removeProfileShortcut")}}addSingletonGetter(ManageProfileBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-manage-profile",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-manage-profile">cr-input {
  --cr-input-error-display: none;
}

#avatarSelector {
  margin: 16px 48px;
}

.cr-row.manage-profile-section {
  display: block;
        padding-bottom: 24px;
}

.cr-row:not(.first) {
  padding-top: 4px;
}

.content {
  --icon-grid-gap: 25px;
        --icon-size: 72px;
        padding-inline-start: var(--cr-section-indent-width);
        padding-top: 4px;
}

#name {
  width: 288px;
}

#themeSelector {
  --selected-border: 9px; 
        --cr-customize-themes-grid-gap: calc(var(--icon-grid-gap) -
            var(--selected-border));
        --cr-customize-themes-icon-size: calc(var(--icon-size) +
            var(--selected-border));
}

#profileAvatarSelector {
  --avatar-size: var(--icon-size);
        --avatar-spacing: var(--icon-grid-gap);
        --avatar-grid-columns: 6;
        padding: 4px;
        width: calc(var(--avatar-size) * var(--avatar-grid-columns) +
            var(--avatar-spacing) * (var(--avatar-grid-columns) - 1));
}

#outerRow {
  align-items: center;
        display: flex;
        min-height: var(--settings-row-two-line-min-height);
        padding: 0 var(--cr-section-padding);
}

#labelWrapper {
  padding: var(--cr-section-vertical-padding) 0;
}

</style>
    <template is="dom-if" if="[[!isNewProfilePicker_]]">
      <div class="cr-row first">
        <cr-input id="name" value="[[profileName]]" pattern="[[pattern_]]" on-change="onProfileNameChanged_" on-keydown="onProfileNameKeydown_" disabled="[[isProfileNameDisabled_(syncStatus)]]" maxlength="500" aria-label="الاسم" auto-validate="" required="" spellcheck="false">
        </cr-input>
      </div>
      <template is="dom-if" if="[[isProfileShortcutSettingVisible_]]">
        <div class="cr-row first">
          <div id="showShortcutLabel" class="flex cr-padded-text">
            عرض اختصار على سطح المكتب
          </div>
          <cr-toggle id="hasShortcutToggle" checked="{{hasProfileShortcut_}}" on-change="onHasProfileShortcutChange_" aria-labelledby="showShortcutLabel">
          </cr-toggle>
        </div>
      </template>
      <cr-profile-avatar-selector id="avatarSelector" avatars="[[availableIcons]]" selected-avatar="{{profileAvatar_}}" ignore-modified-key-events="">
      </cr-profile-avatar-selector>
  </template>

  <template is="dom-if" if="[[isNewProfilePicker_]]">
    <div class="cr-row first manage-profile-section">
      <h1 class="cr-title-text">اسم ملفك الشخصي</h1>
      <div class="content">
        <cr-input id="name" value="[[profileName]]" pattern="[[pattern_]]" on-change="onProfileNameChanged_" on-keydown="onProfileNameKeydown_" disabled="[[isProfileNameDisabled_(syncStatus)]]" maxlength="500" aria-label="الاسم" auto-validate="" required="" spellcheck="false">
        </cr-input>
      </div>
    </div>
    <div class="cr-row manage-profile-section">
      <h1 class="cr-title-text">اختيار لون المظهر</h1>
      <div class="content">
        <cr-customize-themes id="themeSelector" auto-confirm-theme-changes="">
        </cr-customize-themes>
     </div>
    </div>
    <div class="cr-row manage-profile-section">
      <h1 class="cr-title-text">اختيار صورة رمزية</h1>
      <div class="content">
        <cr-profile-avatar-selector id="profileAvatarSelector" avatars="[[availableIcons]]" selected-avatar="{{profileAvatar_}}" ignore-modified-key-events="">
        </cr-profile-avatar-selector>
     </div>
    </div>
    <template is="dom-if" if="[[isProfileShortcutSettingVisible_]]">
      <div id="outerRow" class="hr">
        <div class="flex" id="labelWrapper">
          <div>إنشاء اختصار على سطح المكتب</div>
          <div class="secondary">أنشِئ اختصارًا على سطح المكتب في جهازك للدخول إلى هذا الملف الشخصي مباشرةً.</div>
        </div>
        <cr-toggle id="hasShortcutToggle" checked="{{hasProfileShortcut_}}" on-change="onHasProfileShortcutChange_" aria-labelledby="labelWrapper">
        </cr-toggle>
      </div>
      <div class="hr"></div>
    </template>
  </template>
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior,RouteObserverBehavior],properties:{profileAvatar_:{type:Object,observer:"profileAvatarChanged_"},profileName:String,hasProfileShortcut_:Boolean,availableIcons:{type:Array,value(){return[]}},syncStatus:Object,isProfileShortcutSettingVisible_:Boolean,isNewProfilePicker_:{type:Boolean,value:()=>loadTimeData.getBoolean("newProfilePicker")},pattern_:{type:String,value:".*\\S.*"}},browserProxy_:null,created(){this.browserProxy_=ManageProfileBrowserProxyImpl.getInstance()},attached(){const setIcons=icons=>{this.availableIcons=icons};this.addWebUIListener("available-icons-changed",setIcons);this.browserProxy_.getAvailableIcons().then(setIcons)},currentRouteChanged(){if(Router.getInstance().getCurrentRoute()===routes.MANAGE_PROFILE){if(this.profileName){const profileNameInput=this.$$("#name");if(profileNameInput){profileNameInput.value=this.profileName}}if(loadTimeData.getBoolean("profileShortcutsEnabled")){this.browserProxy_.getProfileShortcutStatus().then((status=>{if(status===ProfileShortcutStatus.PROFILE_SHORTCUT_SETTING_HIDDEN){this.isProfileShortcutSettingVisible_=false;return}this.isProfileShortcutSettingVisible_=true;this.hasProfileShortcut_=status===ProfileShortcutStatus.PROFILE_SHORTCUT_FOUND}))}}},onProfileNameChanged_(event){if(event.target.invalid){return}this.browserProxy_.setProfileName(event.target.value)},onProfileNameKeydown_(event){if(event.key==="Escape"){event.target.value=this.profileName;event.target.blur()}},profileAvatarChanged_(){if(this.profileAvatar_.isGaiaAvatar){this.browserProxy_.setProfileIconToGaiaAvatar()}else{this.browserProxy_.setProfileIconToDefaultAvatar(this.profileAvatar_.index)}},isProfileNameDisabled_(syncStatus){return!!syncStatus.supervisedUser&&!syncStatus.childUser},onHasProfileShortcutChange_(event){if(this.hasProfileShortcut_){this.browserProxy_.addProfileShortcut()}else{this.browserProxy_.removeProfileShortcut()}}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-signout-dialog">.delete-profile-warning {
  padding-bottom: 10px;
        padding-inline-end: var(--cr-section-padding);
        
        padding-inline-start: var(--cr-section-indent-padding);
        padding-top: 10px;
}

#wideFooter {
  padding: 16px 0;
}

#dialog-body {
  padding-bottom: 2px;
}

</style>

    <cr-dialog id="dialog" ignore-enter-key="" close-text="إغلاق">
      <div slot="title">هل تريد إيقاف المزامنة والتخصيص؟</div>
      <div id="dialog-body" slot="body">
        <div inner-h-t-m-l="[[
            getDisconnectExplanationHtml_(syncStatus.domain)]]">
        </div>
      </div>
      <div slot="button-container">
        <cr-button id="disconnectCancel" class="cancel-button" on-click="onDisconnectCancel_">
          إلغاء
        </cr-button>
        <cr-button id="disconnectConfirm" class="action-button" hidden="[[syncStatus.domain]]" on-click="onDisconnectConfirm_">
          إيقاف
        </cr-button>
        <cr-button id="disconnectManagedProfileConfirm" class="action-button" hidden="[[!syncStatus.domain]]" on-click="onDisconnectConfirm_">
          محو ومتابعة
        </cr-button>
      </div>

      <template is="dom-if" if="[[!syncStatus.domain]]">
        <div id="wideFooter" slot="footer">
          <div class="cr-row first">
            <cr-checkbox id="deleteProfile" class="flex" checked="{{deleteProfile_}}">
              محو الإشارات المرجعية والسجلّ وكلمات المرور وغيرها من البيانات على هذا الجهاز
            </cr-checkbox>
            <cr-expand-button expanded="{{deleteProfileWarningVisible_}}" alt="عرض إحصاءات الملف الشخصي">
            </cr-expand-button>
          </div>
          <iron-collapse opened="[[deleteProfileWarningVisible_]]">
            <div class="delete-profile-warning">
              [[deleteProfileWarning_]]
            </div>
          </iron-collapse>
        </div>
      </template>

    </cr-dialog>
<!--_html_template_end_-->`,is:"settings-signout-dialog",behaviors:[WebUIListenerBehavior],properties:{syncStatus:{type:Object,observer:"syncStatusChanged_"},deleteProfile_:Boolean,deleteProfileWarningVisible_:Boolean,deleteProfileWarning_:String},attached(){this.addWebUIListener("profile-stats-count-ready",this.handleProfileStatsCount_.bind(this));ProfileInfoBrowserProxyImpl.getInstance().getProfileStatsCount();this.async((()=>{this.$.dialog.showModal()}))},wasConfirmed(){return this.$.dialog.getNative().returnValue==="success"},handleProfileStatsCount_(count){const username=this.syncStatus.signedInUsername||"";if(count===0){this.deleteProfileWarning_=loadTimeData.getStringF("deleteProfileWarningWithoutCounts",username)}else if(count===1){this.deleteProfileWarning_=loadTimeData.getStringF("deleteProfileWarningWithCountsSingular",username)}else{this.deleteProfileWarning_=loadTimeData.getStringF("deleteProfileWarningWithCountsPlural",count,username)}},syncStatusChanged_(){if(!this.syncStatus.signedIn&&this.$.dialog.open){this.$.dialog.close()}},getDisconnectExplanationHtml_(domain){if(domain){return loadTimeData.getStringF("syncDisconnectManagedProfileExplanation",'<span id="managed-by-domain-name">'+domain+"</span>")}return loadTimeData.getString("syncDisconnectExplanation")},onDisconnectCancel_(){this.$.dialog.cancel()},onDisconnectConfirm_(){this.$.dialog.close();const deleteProfile=!!this.syncStatus.domain||this.deleteProfile_;SyncBrowserProxyImpl.getInstance().signOut(deleteProfile)}});// Copyright 2018 The Chromium Authors. All rights reserved.
const SyncPrefsIndividualDataTypes=["appsSynced","extensionsSynced","preferencesSynced","autofillSynced","typedUrlsSynced","themesSynced","bookmarksSynced","readingListSynced","passwordsSynced","tabsSynced","paymentsIntegrationEnabled","wifiConfigurationsSynced"];const RadioButtonNames={SYNC_EVERYTHING:"sync-everything",CUSTOMIZE_SYNC:"customize-sync"};Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-sync-controls">#sync-data-types .list-item:not([hidden]) ~ .list-item:not([hidden]) {
  border-top: var(--cr-separator-line);
}

.list-item {
  display: flex;
}

.list-item > div {
  flex: 1;
}

</style>

    <div id="sync-data-radio" class="cr-row first">
      <cr-radio-group selected="[[selectedSyncDataRadio_(syncPrefs)]]" on-selected-changed="onSyncDataRadioSelectionChanged_">
        <cr-radio-button name="sync-everything">
          مزامنة كل شيء
        </cr-radio-button>
        <cr-radio-button name="customize-sync">
          تخصيص المزامنة
        </cr-radio-button>
      </cr-radio-group>
    </div>

    <div class="cr-row first">
      <h2 class="cr-title-text flex">مزامنة البيانات</h2>
    </div>

    <div class="list-frame" id="sync-data-types">
      <div class="list-item" hidden="[[!syncPrefs.appsRegistered]]">
        <div id="appCheckboxLabel">
          التطبيقات
        </div>
        <cr-toggle checked="{{syncPrefs.appsSynced}}" on-change="onSingleSyncDataTypeChanged_" disabled="[[syncPrefs.syncAllDataTypes]]" aria-labelledby="appCheckboxLabel">
        </cr-toggle>
      </div>

      <div class="list-item" hidden="[[!syncPrefs.bookmarksRegistered]]">
        <div id="bookmarksCheckboxLabel">
          الإشارات المرجعية
        </div>
        <cr-toggle checked="{{syncPrefs.bookmarksSynced}}" on-change="onSingleSyncDataTypeChanged_" disabled="[[syncPrefs.syncAllDataTypes]]" aria-labelledby="bookmarksCheckboxLabel">
        </cr-toggle>
      </div>

      <div class="list-item" hidden="[[!syncPrefs.extensionsRegistered]]">
        <div id="extensionsCheckboxLabel">
          الإضافات
        </div>
        <cr-toggle checked="{{syncPrefs.extensionsSynced}}" on-change="onSingleSyncDataTypeChanged_" disabled="[[syncPrefs.syncAllDataTypes]]" aria-labelledby="extensionsCheckboxLabel">
        </cr-toggle>
      </div>

      <div class="list-item" hidden="[[!syncPrefs.typedUrlsRegistered]]">
        <div id="historyCheckboxLabel">
          السجل
        </div>
        <!-- TypedUrls has a special on-change handler to deal with user
             events. -->
        <cr-toggle id="historyToggle" checked="{{syncPrefs.typedUrlsSynced}}" on-change="onTypedUrlsDataTypeChanged_" disabled="[[syncPrefs.syncAllDataTypes]]" aria-labelledby="historyCheckboxLabel">
        </cr-toggle>
      </div>

      <div class="list-item" hidden="[[!syncPrefs.preferencesRegistered]]">
        <div id="settingsCheckboxLabel">
          الإعدادات
        </div>
        <cr-toggle checked="{{syncPrefs.preferencesSynced}}" on-change="onSingleSyncDataTypeChanged_" disabled="[[syncPrefs.syncAllDataTypes]]" aria-labelledby="settingsCheckboxLabel">
        </cr-toggle>
      </div>

      <div class="list-item" hidden="[[!syncPrefs.themesRegistered]]">
        <div id="themesAndWallpapersCheckboxLabel">
          مظهر
        </div>
        <cr-toggle checked="{{syncPrefs.themesSynced}}" on-change="onSingleSyncDataTypeChanged_" disabled="[[syncPrefs.syncAllDataTypes]]" aria-labelledby="themesAndWallpapersCheckboxLabel">
        </cr-toggle>
      </div>

      <div class="list-item" hidden="[[!syncPrefs.readingListRegistered]]">
        <div id="readingListCheckboxLabel">
          قائمة القراءة
        </div>
        <cr-toggle checked="{{syncPrefs.readingListSynced}}" on-change="onSingleSyncDataTypeChanged_" disabled="[[syncPrefs.syncAllDataTypes]]" aria-labelledby="readingListCheckboxLabel">
        </cr-toggle>
      </div>

      <div class="list-item" hidden="[[!syncPrefs.tabsRegistered]]">
        <div id="openTabsCheckboxLabel">
          علامات التبويب المفتوحة
        </div>
        <cr-toggle checked="{{syncPrefs.tabsSynced}}" on-change="onSingleSyncDataTypeChanged_" disabled="[[syncPrefs.syncAllDataTypes]]" aria-labelledby="openTabsCheckboxLabel">
        </cr-toggle>
      </div>

      <div class="list-item" hidden="[[!syncPrefs.passwordsRegistered]]">
        <div id="passwordsCheckboxLabel">
          كلمات المرور
        </div>
        <cr-toggle checked="{{syncPrefs.passwordsSynced}}" on-change="onSingleSyncDataTypeChanged_" disabled="[[syncPrefs.syncAllDataTypes]]" aria-labelledby="passwordsCheckboxLabel">
        </cr-toggle>
      </div>

      <div class="list-item" hidden="[[!syncPrefs.autofillRegistered]]">
        <div id="autofillCheckboxLabel">
          العناوين وأرقام الهواتف والمزيد
        </div>
        <!-- Autofill has a special on-change handler to deal with
             Payments integration. -->
        <cr-toggle checked="{{syncPrefs.autofillSynced}}" on-change="onAutofillDataTypeChanged_" disabled="[[syncPrefs.syncAllDataTypes]]" aria-labelledby="autofillCheckboxLabel">
        </cr-toggle>
      </div>

      <div class="list-item" hidden="[[!syncPrefs.autofillRegistered]]">
        <!-- The Payments integration checkbox is a special case in many
             ways. It's visible only if autofill is registered. It's
             disabled and unchecked if autofill is unchecked.-->
        <div>
          ‏طرق الدفع والعناوين باستخدام Google Pay
        </div>
        <cr-toggle checked="{{syncPrefs.paymentsIntegrationEnabled}}" on-change="onSingleSyncDataTypeChanged_" disabled="[[shouldPaymentsCheckboxBeDisabled_(
                syncPrefs.syncAllDataTypes, syncPrefs.autofillSynced)]]" aria-label="‏طرق الدفع والعناوين باستخدام Google Pay">
        </cr-toggle>
      </div>



<!--_html_template_end_--></div>`,is:"settings-sync-controls",behaviors:[WebUIListenerBehavior],properties:{hidden:{type:Boolean,value:false,computed:"syncControlsHidden_("+"syncStatus.signedIn, syncStatus.disabled, syncStatus.hasError)",reflectToAttribute:true},syncPrefs:Object,syncStatus:{type:Object,observer:"syncStatusChanged_"}},browserProxy_:null,cachedSyncPrefs_:null,created(){this.browserProxy_=SyncBrowserProxyImpl.getInstance()},attached(){this.addWebUIListener("sync-prefs-changed",this.handleSyncPrefsChanged_.bind(this));const router=Router.getInstance();if(router.getCurrentRoute()===router.getRoutes().SYNC_ADVANCED){this.browserProxy_.didNavigateToSyncPage()}},handleSyncPrefsChanged_(syncPrefs){this.syncPrefs=syncPrefs;if(!this.syncPrefs.autofillRegistered||!this.syncPrefs.autofillSynced){this.set("syncPrefs.paymentsIntegrationEnabled",false)}},selectedSyncDataRadio_:function(){return this.syncPrefs.syncAllDataTypes?RadioButtonNames.SYNC_EVERYTHING:RadioButtonNames.CUSTOMIZE_SYNC},onSyncDataRadioSelectionChanged_:function(event){const syncAllDataTypes=event.detail.value===RadioButtonNames.SYNC_EVERYTHING;this.set("syncPrefs.syncAllDataTypes",syncAllDataTypes);this.handleSyncAllDataTypesChanged_(syncAllDataTypes)},onSyncAllDataTypesChanged_(event){this.handleSyncAllDataTypesChanged_(event.target.checked)},handleSyncAllDataTypesChanged_:function(syncAllDataTypes){if(syncAllDataTypes){this.set("syncPrefs.syncAllDataTypes",true);this.cachedSyncPrefs_={};for(const dataType of SyncPrefsIndividualDataTypes){this.cachedSyncPrefs_[dataType]=this.syncPrefs[dataType];this.set(["syncPrefs",dataType],true)}}else if(this.cachedSyncPrefs_){for(const dataType of SyncPrefsIndividualDataTypes){this.set(["syncPrefs",dataType],this.cachedSyncPrefs_[dataType])}}chrome.metricsPrivate.recordUserAction(syncAllDataTypes?"Sync_SyncEverything":"Sync_CustomizeSync");this.onSingleSyncDataTypeChanged_()},onSingleSyncDataTypeChanged_(){assert(this.syncPrefs);this.browserProxy_.setSyncDatatypes(this.syncPrefs)},onAutofillDataTypeChanged_(){this.set("syncPrefs.paymentsIntegrationEnabled",this.syncPrefs.autofillSynced);this.onSingleSyncDataTypeChanged_()},onTypedUrlsDataTypeChanged_(){this.onSingleSyncDataTypeChanged_()},shouldPaymentsCheckboxBeDisabled_(syncAllDataTypes,autofillSynced){return syncAllDataTypes||!autofillSynced},syncStatusChanged_(){const router=Router.getInstance();if(router.getCurrentRoute()===router.getRoutes().SYNC_ADVANCED&&this.syncControlsHidden_()){router.navigateTo(router.getRoutes().SYNC)}},syncControlsHidden_(){if(!this.syncStatus){return false}if(!this.syncStatus.signedIn||this.syncStatus.disabled){return true}return!!this.syncStatus.hasError&&this.syncStatus.statusAction!==StatusAction.ENTER_PASSPHRASE&&this.syncStatus.statusAction!==StatusAction.RETRIEVE_TRUSTED_VAULT_KEYS}});// Copyright 2020 The Chromium Authors. All rights reserved.
const RadioButtonNames$1={ENCRYPT_WITH_GOOGLE:"encrypt-with-google",ENCRYPT_WITH_PASSPHRASE:"encrypt-with-passphrase"};Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared" scope="settings-sync-encryption-options">#create-password-box {
  margin-bottom: 1em;
        
        margin-inline-start: var(--cr-section-indent-width);
}

#create-password-box .list-item {
  margin-bottom: var(--cr-form-field-bottom-spacing);
}

cr-input {
  --cr-input-width: var(--settings-input-max-width);
}

.passphrase-reset-icon {
  margin-inline-end: 8px;
}

</style>

    <template is="dom-if" if="[[!syncPrefs.passphraseRequired]]">
      <div id="encryptionRadioGroupContainer" class="list-frame">
        <cr-radio-group id="encryptionRadioGroup" selected="[[selectedEncryptionRadio_(syncPrefs)]]" on-selected-changed="onEncryptionRadioSelectionChanged_" disabled$="[[disableEncryptionOptions_]]">
          <cr-radio-button name="encrypt-with-google" class="list-item" aria-label="‏ترميز كلمات المرور المتزامنة باستخدام اسم المستخدم وكلمة المرور لحساب Google">
            ‏ترميز كلمات المرور المتزامنة باستخدام اسم المستخدم وكلمة المرور لحساب Google
          </cr-radio-button>
          <cr-radio-button name="encrypt-with-passphrase" class="list-item">
            <span hidden="[[!syncPrefs.fullEncryptionBody]]">
              [[syncPrefs.fullEncryptionBody]]
            </span>
            <span on-click="onLearnMoreClick_" hidden="[[syncPrefs.fullEncryptionBody]]">
              ‏ترميز البيانات المتزامنة باستخدام <a href="https://support.google.com/chrome/?p=settings_encryption" target="_blank">عبارة مرور المزامنة</a> الخاصة بك. لا يتضمّن ذلك طرق الدفع والعناوين من Google Pay.
            </span>
          </cr-radio-button>
        </cr-radio-group>
      </div>
    </template>

    <template is="dom-if" if="[[creatingNewPassphrase_]]" restamp="">
      <div class="list-frame">
        <div id="create-password-box">
          <div class="list-item">
            <span>‏لا يمكن لأحد قراءة بياناتك المشفرة سوى من لديه عبارة المرور التي تستخدمها. ولا يتم إرسال عبارة المرور إلى شركة Google أو تخزينها لديها. إذا نسيت عبارة المرور أو رغبت في تغيير هذا الإعداد، فسيلزمك <a href="https://www.google.com/settings/chrome/sync/?hl=ar" target="_blank">إعادة ضبط المزامنة</a>.</span>
          </div>
          <cr-input id="passphraseInput" type="password" value="{{passphrase_}}" placeholder="عبارة المرور" error-message="غير مسموح باستخدام عبارة مرور فارغة" on-keypress="onNewPassphraseInputKeypress_">
          </cr-input>
          <cr-input id="passphraseConfirmationInput" type="password" value="{{confirmation_}}" placeholder="تأكيد عبارة المرور" error-message="يجب إدخال عبارة المرور نفسها مرتين" on-keypress="onNewPassphraseInputKeypress_">
          </cr-input>
          <cr-button id="saveNewPassphrase" on-click="onSaveNewPassphraseClick_" class="action-button" disabled="[[!isSaveNewPassphraseEnabled_(
                            passphrase_, confirmation_)]]">
            حفظ
          </cr-button>
        </div>
      </div>
    </template>

<!--_html_template_end_-->`,is:"settings-sync-encryption-options",properties:{syncPrefs:{type:Object,notify:true},syncStatus:Object,creatingNewPassphrase_:{type:Boolean,value:false},passphrase_:{type:String,value:""},confirmation_:{type:String,value:""},disableEncryptionOptions_:{type:Boolean,computed:"computeDisableEncryptionOptions_("+"syncPrefs, syncStatus)",observer:"disableEncryptionOptionsChanged_"}},isSettingEncryptionPassphrase_:false,getEncryptionsRadioButtons(){return this.$$("#encryptionRadioGroup")},computeDisableEncryptionOptions_(){return!!(this.syncPrefs&&(this.syncPrefs.encryptAllData||!this.syncPrefs.encryptAllDataAllowed||this.syncPrefs.trustedVaultKeysRequired)||this.syncStatus&&this.syncStatus.supervisedUser)},disableEncryptionOptionsChanged_(){if(this.disableEncryptionOptions_){this.creatingNewPassphrase_=false}},isSaveNewPassphraseEnabled_(passphrase,confirmation){return passphrase!==""&&confirmation!==""},onNewPassphraseInputKeypress_(e){if(e.type==="keypress"&&e.key!=="Enter"){return}this.saveNewPassphrase_()},onSaveNewPassphraseClick_(){this.saveNewPassphrase_()},saveNewPassphrase_(){assert(this.creatingNewPassphrase_);chrome.metricsPrivate.recordUserAction("Sync_SaveNewPassphraseClicked");if(this.isSettingEncryptionPassphrase_){return}if(!this.validateCreatedPassphrases_()){return}this.isSettingEncryptionPassphrase_=true;SyncBrowserProxyImpl.getInstance().setEncryptionPassphrase(this.passphrase_).then((successfullySet=>{this.fire("passphrase-changed",{didChange:successfullySet});this.isSettingEncryptionPassphrase_=false}))},onEncryptionRadioSelectionChanged_(event){this.creatingNewPassphrase_=event.detail.value===RadioButtonNames$1.ENCRYPT_WITH_PASSPHRASE},selectedEncryptionRadio_(){return this.syncPrefs.encryptAllData||this.creatingNewPassphrase_?RadioButtonNames$1.ENCRYPT_WITH_PASSPHRASE:RadioButtonNames$1.ENCRYPT_WITH_GOOGLE},validateCreatedPassphrases_(){const emptyPassphrase=!this.passphrase_;const mismatchedPassphrase=this.passphrase_!==this.confirmation_;this.$$("#passphraseInput").invalid=emptyPassphrase;this.$$("#passphraseConfirmationInput").invalid=!emptyPassphrase&&mismatchedPassphrase;return!emptyPassphrase&&!mismatchedPassphrase},onLearnMoreClick_(event){if(event.target.tagName==="A"){event.stopPropagation()}}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-personalization-options">:host(.list-frame) settings-toggle-button {
  padding-inline-end: 0;
        padding-inline-start: 0;
}

:host(.list-frame) settings-toggle-button:first-of-type {
  border-top: none;
}

</style>

    <settings-toggle-button id="signinAllowedToggle" class="hr" disabled="[[syncFirstSetupInProgress_]]" pref="{{prefs.signin.allowed_on_next_startup}}" label="‏السماح بتسجيل الدخول إلى Chrome" sub-label="‏من خلال إيقاف هذا الإعداد، يمكنك تسجيل الدخول إلى &quot;مواقع Google&quot; مثل Gmail بدون الحاجة إلى تسجيل الدخول إلى Chrome" on-settings-boolean-control-change="onSigninAllowedChange_" no-set-pref="">
    </settings-toggle-button>
<!-- not chromeos -->
    <settings-toggle-button id="searchSuggestToggle" class="hr" hidden="[[!pageVisibility.searchPrediction]]" pref="{{prefs.search.suggest_enabled}}" label="‏الإكمال التلقائي لعناوين URL وعمليات البحث" sub-label="يُرسِل بعض ملفات تعريف الارتباط وعمليات البحث من شريط العناوين ومربّع البحث إلى محرِّك البحث التلقائي.">
    </settings-toggle-button>

<!-- chromeos -->

    <settings-toggle-button id="metricsReportingControl" class="hr" pref="[[metricsReportingPref_]]" label="‏المساعدة في تحسين ميزات Chrome وأدائه" sub-label="‏يُرسِل إحصاءات الاستخدام وتقارير الأعطال إلى Google تلقائيًا." no-set-pref="" on-settings-boolean-control-change="onMetricsReportingChange_">
      <template is="dom-if" if="[[showRestart_]]" restamp="">
        <cr-button on-click="onRestartTap_" id="restart" slot="more-actions">
          إعادة تشغيل
        </cr-button>
      </template>
    </settings-toggle-button>
<!-- not chromeos -->
<!-- _google_chrome -->
    <settings-toggle-button id="urlCollectionToggle" class="hr" pref="{{prefs.url_keyed_anonymized_data_collection.enabled}}" label="تحسين عمليات البحث والتصفُّح" sub-label="‏يتم إرسال عناوين URL للصفحات التي تزورها إلى Google.">
    </settings-toggle-button>

    <settings-toggle-button id="spellCheckControl" class="hr" pref="{{prefs.spellcheck.use_spelling_service}}" on-settings-boolean-control-change="onUseSpellingServiceToggle_" label="تدقيق إملائي مُحسّن" sub-label="‏لإصلاح الأخطاء الإملائية، يرسِل Chrome النص الذي تكتبه في المتصفّح إلى Google." hidden="[[!showSpellCheckControl_(prefs.spellcheck.dictionaries)]]">
    </settings-toggle-button>
<!-- _google_chrome -->
    <template is="dom-if" if="[[shouldShowDriveSuggest_(
        syncStatus, syncStatus.signedIn, syncStatus.statusAction)]]" restamp="">
      <settings-toggle-button id="driveSuggestControl" class="hr" pref="{{prefs.documentsuggest.enabled}}" label="‏إقتراحات بحث Google Drive" sub-label="‏سيصل Chrome إلى Drive لإنشاء الاقتراحات في شريط العناوين.">
      </settings-toggle-button>
    </template>

    <template is="dom-if" if="[[showSignoutDialog_]]" restamp="">
      <settings-signout-dialog sync-status="[[syncStatus]]" on-close="onSignoutDialogClosed_">
      </settings-signout-dialog>
    </template>


    <cr-toast id="toast">
      <div>‏لتطبيق التغييرات، يُرجى إعادة تشغيل Chrome</div>
      <cr-button on-click="onRestartTap_">إعادة تشغيل</cr-button>
    </cr-toast>

<!--_html_template_end_-->`,is:"settings-personalization-options",behaviors:[PrefsBehavior,WebUIListenerBehavior],properties:{prefs:{type:Object,notify:true},pageVisibility:Object,syncStatus:Object,metricsReportingPref_:{type:Object,value(){return{}}},showRestart_:Boolean,showSignoutDialog_:Boolean,syncFirstSetupInProgress_:{type:Boolean,value:false,computed:"computeSyncFirstSetupInProgress_(syncStatus)"}},browserProxy_:null,computeSyncFirstSetupInProgress_(){return!!this.syncStatus&&!!this.syncStatus.firstSetupInProgress},ready(){this.browserProxy_=PrivacyPageBrowserProxyImpl.getInstance();const setMetricsReportingPref=this.setMetricsReportingPref_.bind(this);this.addWebUIListener("metrics-reporting-change",setMetricsReportingPref);this.browserProxy_.getMetricsReporting().then(setMetricsReportingPref)},getSearchSuggestToggle(){return this.$$("#searchSuggestToggle")},getUrlCollectionToggle(){return this.$$("#urlCollectionToggle")},getDriveSuggestToggle(){return this.$$("#driveSuggestControl")},onMetricsReportingChange_(){const enabled=this.$.metricsReportingControl.checked;this.browserProxy_.setMetricsReportingEnabled(enabled)},setMetricsReportingPref_(metricsReporting){const hadPreviousPref=this.metricsReportingPref_.value!==undefined;const pref={key:"",type:chrome.settingsPrivate.PrefType.BOOLEAN,value:metricsReporting.enabled};if(metricsReporting.managed){pref.enforcement=chrome.settingsPrivate.Enforcement.ENFORCED;pref.controlledBy=chrome.settingsPrivate.ControlledBy.USER_POLICY}this.metricsReportingPref_=pref;if(metricsReporting.managed){this.showRestart_=false}else if(hadPreviousPref){this.showRestart_=true}},onUseSpellingServiceToggle_(event){if(event.target.checked){this.setPrefValue("browser.enable_spellchecking",true)}},showSpellCheckControl_(){return!!this.prefs.spellcheck&&this.prefs.spellcheck.dictionaries.value.length>0},shouldShowDriveSuggest_(){return loadTimeData.getBoolean("driveSuggestAvailable")&&!!this.syncStatus&&!!this.syncStatus.signedIn&&this.syncStatus.statusAction!==StatusAction.REAUTHENTICATE},onSigninAllowedChange_(){if(this.syncStatus.signedIn&&!this.$$("#signinAllowedToggle").checked){this.$$("#signinAllowedToggle").checked=true;this.showSignoutDialog_=true}else{this.$$("#signinAllowedToggle").sendPrefChange();this.$.toast.show()}},onSignoutDialogClosed_(){if(this.$$("settings-signout-dialog").wasConfirmed()){this.$$("#signinAllowedToggle").checked=false;this.$$("#signinAllowedToggle").sendPrefChange();this.$.toast.show()}this.showSignoutDialog_=false},onRestartTap_(e){e.stopPropagation();LifetimeBrowserProxyImpl.getInstance().restart()}});// Copyright 2015 The Chromium Authors. All rights reserved.
function getSyncRoutes(){const router=Router.getInstance();return router.getRoutes()}Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-sync-page">#sync-separator {
  border-bottom: var(--cr-separator-line);
}

#create-password-box {
  margin-inline-start: var(--cr-section-indent-width);
}

#create-password-box {
  margin-bottom: 1em;
}

#create-password-box .list-item {
  margin-bottom: var(--cr-form-field-bottom-spacing);
}

cr-input {
  --cr-input-width: var(--settings-input-max-width);
}

#existingPassphrase {
  border-bottom: var(--cr-separator-line);
        border-top: var(--cr-separator-line);
        
        padding-inline-start: var(--cr-section-padding);
}

#submitExistingPassphrase {
  margin-inline-start: 16px;
}

#passphraseRecoverHint {
  align-items: center;
}

#other-sync-items {
  padding-bottom: 8px;
}

.passphrase-reset-icon {
  margin-inline-end: 8px;
}

#disabled-by-admin-icon {
  text-align: center;
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

cr-link-row {
  padding-inline-start: 0;
        padding-inline-end: 8px;
}

</style>
    <template is="dom-if" if="[[shouldShowSyncAccountControl_(
        syncStatus.syncSystemEnabled)]]">
      <settings-sync-account-control embedded-in-subpage="" sync-status="[[syncStatus]]" prefs="{{prefs}}" promo-label-with-account="‏يمكنك مزامنة Chrome وتخصيصه على جميع أجهزتك." promo-label-with-no-account="‏يمكنك مزامنة Chrome وتخصيصه على جميع أجهزتك." on-sync-setup-done="onSyncSetupDone_">
      </settings-sync-account-control>
    </template>
    <div class="cr-row first" hidden="[[!syncDisabledByAdmin_]]">
      <iron-icon id="disabled-by-admin-icon" icon="cr20:domain"></iron-icon>
      <div class="flex cr-padded-text">
        تم إيقاف المزامنة من قِبل المشرف.
      </div>
    </div>

    <template is="dom-if" if="[[shouldShowExistingPassphraseBelowAccount_(
        syncPrefs.passphraseRequired)]]" on-dom-change="focusPassphraseInput_">
      <div id="existingPassphrase" class="list-frame">
        <div id="existingPassphraseTitle" class="list-item">
            <div class="start cr-padded-text">
              <div>خيارات التشفير</div>
              <div class="secondary" inner-h-t-m-l="[[syncPrefs.enterPassphraseBody]]">
              </div>
            </div>
        </div>
        <div id="existingPassphraseContainer" class="list-item">
          <cr-input id="existingPassphraseInput" type="password" value="{{existingPassphrase_}}" placeholder="عبارة المرور" error-message="عبارة المرور التي أدخلتها غير صحيحة" on-keypress="onSubmitExistingPassphraseTap_">
            <cr-button id="submitExistingPassphrase" slot="suffix" on-click="onSubmitExistingPassphraseTap_" class="action-button" disabled="[[!existingPassphrase_]]">
              إرسال
            </cr-button>
          </cr-input>
        </div>
        <div id="passphraseRecoverHint" class="list-item">
          <div class="cr-padded-text">إذا نسيت عبارة المرور أو رغبت في تغيير هذا الإعداد، يمكنك <a href="https://www.google.com/settings/chrome/sync/?hl=ar" target="_blank">إعادة ضبط المزامنة</a>.</div>
        </div>
      </div>
    </template>

    <div id="sync-separator" hidden="[[!syncSectionDisabled_]]"></div>

    <div id="sync-section" hidden="[[syncSectionDisabled_]]">
      <div class="cr-row first">
        <h2 class="cr-title-text">المزامنة</h2>
      </div>

      <div id="[[pages_.SPINNER]]" class="cr-row first cr-padded-text" hidden$="[[!isStatus_(pages_.SPINNER, pageStatus_)]]">
        يرجى الانتظار…
      </div>
      <div id="[[pages_.CONFIGURE]]" hidden$="[[!isStatus_(pages_.CONFIGURE, pageStatus_)]]">
        <div id="other-sync-items" class="list-frame">
          <cr-link-row id="sync-advanced-row" label="إدارة البيانات المتزامنة" role-description="زر صفحة فرعية" on-click="onSyncAdvancedClick_"></cr-link-row>

          <cr-link-row class="hr" label="التحكُّم في كيفية استخدامنا لسِجل التصفُّح الخاص بك لتخصيص البحث والإعلانات والمزيد" on-click="onActivityControlsClick_" external=""></cr-link-row>

          <cr-link-row id="syncDashboardLink" class="hr" label="مراجعة البيانات المتزامنة" on-click="onSyncDashboardLinkClick_" hidden="[[syncStatus.supervisedUser]]" external=""></cr-link-row>

          <cr-expand-button id="encryptionDescription" hidden="[[syncPrefs.passphraseRequired]]" expanded="{{encryptionExpanded_}}" class="hr">
            خيارات التشفير
            <div class="secondary">
              ‏لمزيد من الأمان، سيشفِّر Google Chrome بياناتك
              <div on-click="onResetSyncClick_" hidden="[[!syncPrefs.encryptAllData]]">
                <iron-icon icon="cr:info-outline" class="passphrase-reset-icon">
                </iron-icon>
                لتغيير هذا الإعداد، يمكنك <a href="https://www.google.com/settings/chrome/sync/?hl=ar" target="_blank">إعادة ضبط المزامنة</a> لإزالة عبارة مرور المزامنة.
              </div>
            </div>
          </cr-expand-button>

          <iron-collapse id="encryptionCollapse" opened="[[encryptionExpanded_]]">
            <settings-sync-encryption-options sync-status="[[syncStatus]]" sync-prefs="{{syncPrefs}}" on-passphrase-changed="onPassphraseChanged_">
            </settings-sync-encryption-options>
          </iron-collapse>

        </div>
      </div>
    </div>

    <div class="cr-row first">
      <h2 class="cr-title-text">
        ‏خدمات Google الأخرى
      </h2>
    </div>
    <settings-personalization-options class="list-frame" prefs="{{prefs}}" page-visibility="[[pageVisibility]]" sync-status="[[syncStatus]]">
    </settings-personalization-options>


    <template is="dom-if" if="[[showSetupCancelDialog_]]" restamp="">
      <cr-dialog id="setupCancelDialog" on-close="onSetupCancelDialogClose_" ignore-popstate="">
        <div slot="title">هل تريد إلغاء المزامنة؟</div>
        <div slot="body">يمكنك تفعيل المزامنة في أي وقت في الإعدادات.</div>
        <div slot="button-container">
          <cr-button class="cancel-button" on-click="onSetupCancelDialogBack_">
            رجوع
          </cr-button>
          <cr-button class="action-button" on-click="onSetupCancelDialogConfirm_">
            إلغاء المزامنة
          </cr-button>
        </div>
      </cr-dialog>
    </template>

<!--_html_template_end_-->`,is:"settings-sync-page",behaviors:[WebUIListenerBehavior,RouteObserverBehavior],properties:{prefs:{type:Object,notify:true},focusConfig:{type:Object,observer:"onFocusConfigChange_"},pages_:{type:Object,value:PageStatus,readOnly:true},pageStatus_:{type:String,value:PageStatus.CONFIGURE},pageVisibility:Object,syncPrefs:{type:Object},syncStatus:{type:Object},dataEncrypted_:{type:Boolean,computed:"computeDataEncrypted_(syncPrefs.encryptAllData)"},encryptionExpanded_:{type:Boolean,value:false},forceEncryptionExpanded:{type:Boolean,value:false},existingPassphrase_:{type:String,value:""},signedIn_:{type:Boolean,value:true,computed:"computeSignedIn_(syncStatus.signedIn)"},syncDisabledByAdmin_:{type:Boolean,value:false,computed:"computeSyncDisabledByAdmin_(syncStatus.managed)"},syncSectionDisabled_:{type:Boolean,value:false,computed:"computeSyncSectionDisabled_("+"syncStatus.signedIn, syncStatus.disabled, "+"syncStatus.hasError, syncStatus.statusAction, "+"syncPrefs.trustedVaultKeysRequired)"},showSetupCancelDialog_:{type:Boolean,value:false}},observers:["expandEncryptionIfNeeded_(dataEncrypted_, forceEncryptionExpanded)"],browserProxy_:null,beforeunloadCallback_:null,unloadCallback_:null,collapsibleSectionsInitialized_:false,didAbort_:true,setupCancelConfirmed_:false,created(){this.browserProxy_=SyncBrowserProxyImpl.getInstance()},attached(){this.addWebUIListener("page-status-changed",this.handlePageStatusChanged_.bind(this));this.addWebUIListener("sync-prefs-changed",this.handleSyncPrefsChanged_.bind(this));const router=Router.getInstance();if(router.getCurrentRoute()===getSyncRoutes().SYNC){this.onNavigateToPage_()}},detached(){const router=Router.getInstance();if(getSyncRoutes().SYNC.contains(router.getCurrentRoute())){this.onNavigateAwayFromPage_()}if(this.beforeunloadCallback_){window.removeEventListener("beforeunload",this.beforeunloadCallback_);this.beforeunloadCallback_=null}if(this.unloadCallback_){window.removeEventListener("unload",this.unloadCallback_);this.unloadCallback_=null}},getEncryptionOptions(){return this.$$("settings-sync-encryption-options")},getPersonalizationOptions(){return this.$$("settings-personalization-options")},computeSignedIn_(){return!!this.syncStatus.signedIn},computeSyncSectionDisabled_(){return this.syncStatus!==undefined&&(!this.syncStatus.signedIn||!!this.syncStatus.disabled||!!this.syncStatus.hasError&&this.syncStatus.statusAction!==StatusAction.ENTER_PASSPHRASE&&this.syncStatus.statusAction!==StatusAction.RETRIEVE_TRUSTED_VAULT_KEYS)},computeSyncDisabledByAdmin_(){return this.syncStatus!==undefined&&!!this.syncStatus.managed},onFocusConfigChange_(){const router=Router.getInstance();this.focusConfig.set(getSyncRoutes().SYNC_ADVANCED.path,(()=>{focusWithoutInk(assert(this.$$("#sync-advanced-row")))}))},onSetupCancelDialogBack_(){this.$$("#setupCancelDialog").cancel();chrome.metricsPrivate.recordUserAction("Signin_Signin_CancelCancelAdvancedSyncSettings")},onSetupCancelDialogConfirm_(){this.setupCancelConfirmed_=true;this.$$("#setupCancelDialog").close();const router=Router.getInstance();router.navigateTo(getSyncRoutes().BASIC);chrome.metricsPrivate.recordUserAction("Signin_Signin_ConfirmCancelAdvancedSyncSettings")},onSetupCancelDialogClose_(){this.showSetupCancelDialog_=false},currentRouteChanged(){const router=Router.getInstance();if(router.getCurrentRoute()===getSyncRoutes().SYNC){this.onNavigateToPage_();return}if(getSyncRoutes().SYNC.contains(router.getCurrentRoute())){return}const searchParams=Router.getInstance().getQueryParameters().get("search");if(searchParams){this.onNavigateAwayFromPage_();return}const userActionCancelsSetup=this.syncStatus&&this.syncStatus.firstSetupInProgress&&this.didAbort_;if(userActionCancelsSetup&&!this.setupCancelConfirmed_){chrome.metricsPrivate.recordUserAction("Signin_Signin_BackOnAdvancedSyncSettings");requestAnimationFrame((()=>{router.navigateTo(getSyncRoutes().SYNC);this.showSetupCancelDialog_=true;flush();this.$$("#setupCancelDialog").showModal()}));return}this.setupCancelConfirmed_=false;this.onNavigateAwayFromPage_()},isStatus_(expectedPageStatus){return expectedPageStatus===this.pageStatus_},onNavigateToPage_(){const router=Router.getInstance();assert(router.getCurrentRoute()===getSyncRoutes().SYNC);if(this.beforeunloadCallback_){return}this.collapsibleSectionsInitialized_=false;this.pageStatus_=PageStatus.SPINNER;this.browserProxy_.didNavigateToSyncPage();this.beforeunloadCallback_=event=>{if(this.syncStatus&&this.syncStatus.firstSetupInProgress){event.preventDefault();event.returnValue="";chrome.metricsPrivate.recordUserAction("Signin_Signin_AbortAdvancedSyncSettings")}};window.addEventListener("beforeunload",this.beforeunloadCallback_);this.unloadCallback_=this.onNavigateAwayFromPage_.bind(this);window.addEventListener("unload",this.unloadCallback_)},onNavigateAwayFromPage_(){if(!this.beforeunloadCallback_){return}this.pageStatus_=PageStatus.CONFIGURE;this.browserProxy_.didNavigateAwayFromSyncPage(this.didAbort_);window.removeEventListener("beforeunload",this.beforeunloadCallback_);this.beforeunloadCallback_=null;if(this.unloadCallback_){window.removeEventListener("unload",this.unloadCallback_);this.unloadCallback_=null}},handleSyncPrefsChanged_(syncPrefs){this.syncPrefs=syncPrefs;this.pageStatus_=PageStatus.CONFIGURE;if(this.syncPrefs.encryptAllData||!this.syncPrefs.encryptAllDataAllowed||this.syncStatus&&this.syncStatus.supervisedUser){this.creatingNewPassphrase_=false}},onActivityControlsClick_(){chrome.metricsPrivate.recordUserAction("Sync_OpenActivityControlsPage");this.browserProxy_.openActivityControlsUrl();window.open(loadTimeData.getString("activityControlsUrl"))},onSyncDashboardLinkClick_(){window.open(loadTimeData.getString("syncDashboardUrl"))},computeDataEncrypted_(){return!!this.syncPrefs&&this.syncPrefs.encryptAllData},expandEncryptionIfNeeded_(){if(this.forceEncryptionExpanded){this.forceEncryptionExpanded=false;this.encryptionExpanded_=true;return}this.encryptionExpanded_=this.dataEncrypted_},onResetSyncClick_(event){if(event.target.tagName==="A"){event.stopPropagation()}},onSubmitExistingPassphraseTap_(e){if(e.type==="keypress"&&e.key!=="Enter"){return}this.browserProxy_.setDecryptionPassphrase(this.existingPassphrase_).then((sucessfullySet=>this.handlePageStatusChanged_(sucessfullySet?PageStatus.DONE:PageStatus.PASSPHRASE_FAILED)));this.existingPassphrase_=""},onPassphraseChanged_(e){this.handlePageStatusChanged_(e.detail.didChange?PageStatus.DONE:PageStatus.PASSPHRASE_FAILED)},handlePageStatusChanged_(pageStatus){const router=Router.getInstance();switch(pageStatus){case PageStatus.SPINNER:case PageStatus.CONFIGURE:this.pageStatus_=pageStatus;return;case PageStatus.DONE:if(router.getCurrentRoute()===getSyncRoutes().SYNC){router.navigateTo(getSyncRoutes().PEOPLE)}return;case PageStatus.PASSPHRASE_FAILED:if(this.pageStatus_===this.pages_.CONFIGURE&&this.syncPrefs&&this.syncPrefs.passphraseRequired){const passphraseInput=this.$$("#existingPassphraseInput");passphraseInput.invalid=true;passphraseInput.focusInput()}return}assertNotReached()},onLearnMoreTap_(event){if(event.target.tagName==="A"){event.stopPropagation()}},shouldShowSyncAccountControl_(){return this.syncStatus!==undefined&&!!this.syncStatus.syncSystemEnabled&&loadTimeData.getBoolean("signinAllowed")},shouldShowExistingPassphraseBelowAccount_(){return this.syncPrefs!==undefined&&!!this.syncPrefs.passphraseRequired},onSyncAdvancedClick_(){const router=Router.getInstance();router.navigateTo(getSyncRoutes().SYNC_ADVANCED)},onSyncSetupDone_(e){if(e.detail){this.didAbort_=false;chrome.metricsPrivate.recordUserAction("Signin_Signin_ConfirmAdvancedSyncSettings")}else{this.setupCancelConfirmed_=true;chrome.metricsPrivate.recordUserAction("Signin_Signin_CancelAdvancedSyncSettings")}const router=Router.getInstance();router.navigateTo(getSyncRoutes().BASIC)},focusPassphraseInput_(){const passphraseInput=this.$$("#existingPassphraseInput");const router=Router.getInstance();if(passphraseInput&&router.getCurrentRoute()===getSyncRoutes().SYNC){passphraseInput.focus()}}});// Copyright 2019 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared" scope="settings-captions">.cr-row-with-template {
  padding: 0;
}

#liveCaptionToggleButton {
  width: 100%;
}

.preview-box {
  all: initial;
        align-items: center;
        background-image:
          url(chrome://theme/IDR_ACCESSIBILITY_CAPTIONS_PREVIEW_BACKGROUND);
        background-position: center;
        background-size: cover;
        display: flex;
        justify-content: center;
        margin: var(--cr-section-padding);
        margin-inline-start: var(--cr-section-indent-padding);
        min-height: 112px;
        padding: 20px;
        text-align: center;
}

</style>
    <template is="dom-if" if="[[enableLiveCaption_]]">
      <div class="cr-row cr-row-with-template first">
        <settings-toggle-button id="liveCaptionToggleButton" pref="{{prefs.accessibility.captions.live_caption_enabled}}" on-change="onA11yLiveCaptionChange_" label="النسخ النصي التلقائي" sub-label="[[enableLiveCaptionSubtitle_]]">
        </settings-toggle-button>
      </div>
    </template>
    <div class="cr-row">
      <h2 class="start">الإعدادات المفضّلة للشرح</h2>
    </div>
    <div class="cr-row first">
      <div class="start">يمكنك تخصيص حجم الشرح ونمطه للتطبيقات والمواقع الإلكترونية التي تتيح استخدام هذا الإعداد.</div>
    </div>
    <div class="preview-box">
      <span style="
          font-size:[[prefs.accessibility.captions.text_size.value]];
          font-family:[[getFontFamily_(
              prefs.accessibility.captions.text_font.value)]];
          background-color: [[computeBackgroundColor_(
              prefs.accessibility.captions.background_opacity.value,
              prefs.accessibility.captions.background_color.value)]];
          color: [[computeTextColor_(
              prefs.accessibility.captions.text_opacity.value,
              prefs.accessibility.captions.text_color.value)]];
          text-shadow: [[prefs.accessibility.captions.text_shadow.value]];
          padding: [[computePadding_(
              prefs.accessibility.captions.text_size.value)]]">
        أبجد هوز حطي كلمن سعفص قرشت ثخذ ضظغ
      </span>
    </div>
    <div class="list-frame">
      <div class="list-item underbar first">
        <div class="start cr-padded-text" aria-hidden="true">
          حجم النص (ينطبق هذا الإعداد أيضًا على ميزة &quot;النسخ النصي التلقائي&quot;)
        </div>
        <settings-dropdown-menu id="captionsTextSize" label="حجم النص (ينطبق هذا الإعداد أيضًا على ميزة &quot;النسخ النصي التلقائي&quot;)" pref="{{prefs.accessibility.captions.text_size}}" menu-options="[[textSizeOptions_]]">
        </settings-dropdown-menu>
      </div>
      <div class="list-item underbar">
        <div class="start cr-padded-text" aria-hidden="true">
          خط النص
        </div>
        <settings-dropdown-menu id="captionsTextFont" label="خط النص" pref="{{prefs.accessibility.captions.text_font}}" menu-options="[[textFontOptions_]]">
        </settings-dropdown-menu>
      </div>
      <div class="list-item underbar">
        <div class="start cr-padded-text" aria-hidden="true">
          لون النص
        </div>
        <settings-dropdown-menu id="captionsTextColor" label="لون النص" pref="{{prefs.accessibility.captions.text_color}}" menu-options="[[colorOptions_]]">
        </settings-dropdown-menu>
      </div>
      <div class="list-item underbar">
        <div class="start cr-padded-text" aria-hidden="true">
          درجة تعتيم النص
        </div>
        <settings-dropdown-menu id="captionsTextOpacity" label="درجة تعتيم النص" pref="{{prefs.accessibility.captions.text_opacity}}" menu-options="[[textOpacityOptions_]]">
        </settings-dropdown-menu>
      </div>
      <div class="list-item underbar">
        <div class="start cr-padded-text" aria-hidden="true">
          ظل النص
        </div>
        <settings-dropdown-menu id="captionsTextShadow" label="ظل النص" pref="{{prefs.accessibility.captions.text_shadow}}" menu-options="[[textShadowOptions_]]">
        </settings-dropdown-menu>
      </div>
      <div class="list-item underbar">
        <div class="start cr-padded-text" aria-hidden="true">
          لون الخلفية
        </div>
        <settings-dropdown-menu id="captionsBackgroundColor" label="لون الخلفية" pref="{{prefs.accessibility.captions.background_color}}" menu-options="[[colorOptions_]]">
        </settings-dropdown-menu>
      </div>
      <div class="list-item">
        <div class="start cr-padded-text" aria-hidden="true">
          درجة تعتيم الخلفية
        </div>
        <settings-dropdown-menu id="captionsBackgroundOpacity" label="درجة تعتيم الخلفية" pref="{{prefs.accessibility.captions.background_opacity}}" menu-options="[[backgroundOpacityOptions_]]">
        </settings-dropdown-menu>
      </div>
    </div>
<!--_html_template_end_-->`,is:"settings-captions",behaviors:[I18nBehavior,WebUIListenerBehavior,PrefsBehavior],properties:{prefs:{type:Object,notify:true},backgroundOpacityOptions_:{readOnly:true,type:Array,value(){return[{value:100,name:loadTimeData.getString("captionsOpacityOpaque")},{value:50,name:loadTimeData.getString("captionsOpacitySemiTransparent")},{value:0,name:loadTimeData.getString("captionsOpacityTransparent")}]}},colorOptions_:{readOnly:true,type:Array,value(){return[{value:"",name:loadTimeData.getString("captionsDefaultSetting")},{value:"0,0,0",name:loadTimeData.getString("captionsColorBlack")},{value:"255,255,255",name:loadTimeData.getString("captionsColorWhite")},{value:"255,0,0",name:loadTimeData.getString("captionsColorRed")},{value:"0,255,0",name:loadTimeData.getString("captionsColorGreen")},{value:"0,0,255",name:loadTimeData.getString("captionsColorBlue")},{value:"255,255,0",name:loadTimeData.getString("captionsColorYellow")},{value:"0,255,255",name:loadTimeData.getString("captionsColorCyan")},{value:"255,0,255",name:loadTimeData.getString("captionsColorMagenta")}]}},textFontOptions_:Object,textOpacityOptions_:{readOnly:true,type:Array,value(){return[{value:100,name:loadTimeData.getString("captionsOpacityOpaque")},{value:50,name:loadTimeData.getString("captionsOpacitySemiTransparent")},{value:10,name:loadTimeData.getString("captionsOpacityTransparent")}]}},textShadowOptions_:{readOnly:true,type:Array,value(){return[{value:"",name:loadTimeData.getString("captionsTextShadowNone")},{value:"-2px -2px 4px rgba(0, 0, 0, 0.5)",name:loadTimeData.getString("captionsTextShadowRaised")},{value:"2px 2px 4px rgba(0, 0, 0, 0.5)",name:loadTimeData.getString("captionsTextShadowDepressed")},{value:"-1px 0px 0px black, "+"0px -1px 0px black, 1px 0px 0px black, 0px  1px 0px black",name:loadTimeData.getString("captionsTextShadowUniform")},{value:"0px 0px 2px rgba(0, 0, 0, 0.5), 2px 2px 2px black",name:loadTimeData.getString("captionsTextShadowDropShadow")}]}},textSizeOptions_:{readOnly:true,type:Array,value(){return[{value:"25%",name:loadTimeData.getString("verySmall")},{value:"50%",name:loadTimeData.getString("small")},{value:"",name:loadTimeData.getString("medium")},{value:"150%",name:loadTimeData.getString("large")},{value:"200%",name:loadTimeData.getString("veryLarge")}]}},enableLiveCaption_:{type:Boolean,value:function(){return loadTimeData.getBoolean("enableLiveCaption")}},enableLiveCaptionSubtitle_:{type:String,value:loadTimeData.getString("captionsEnableLiveCaptionSubtitle")}},browserProxy_:null,created(){this.browserProxy_=FontsBrowserProxyImpl.getInstance()},ready(){this.browserProxy_.fetchFontsData().then(this.setFontsData_.bind(this));this.addWebUIListener("enable-live-caption-subtitle-changed",this.onEnableLiveCaptionSubtitleChanged_.bind(this));chrome.send("captionsSubpageReady")},setFontsData_(response){const fontMenuOptions=[{value:"",name:loadTimeData.getString("captionsDefaultSetting")}];for(const fontData of response.fontList){fontMenuOptions.push({value:fontData[0],name:fontData[1]})}this.textFontOptions_=fontMenuOptions},getFontFamily_(){const fontFamily=this.getPref("accessibility.captions.text_font").value;return fontFamily||"sans-serif"},computeBackgroundColor_(){const backgroundColor=this.formatRGAString_("accessibility.captions.background_color","accessibility.captions.background_opacity");return backgroundColor||"rgba(0, 0, 0, 0.8)"},computeTextColor_(){const textColor=this.formatRGAString_("accessibility.captions.text_color","accessibility.captions.text_opacity");return textColor||"rgba(255, 255, 255, 1)"},formatRGAString_(colorPreference,opacityPreference){const color=this.getPref(colorPreference).value;if(!color){return""}return"rgba("+color+","+parseInt(this.getPref(opacityPreference).value,10)/100+")"},computePadding_(size){if(size===""){return"1%"}return`${+size.slice(0,-1)/100}%`},onA11yLiveCaptionChange_(event){const a11yLiveCaptionOn=event.target.checked;chrome.metricsPrivate.recordBoolean("Accessibility.LiveCaption.EnableFromSettings",a11yLiveCaptionOn)},onEnableLiveCaptionSubtitleChanged_(enableLiveCaptionSubtitle){this.enableLiveCaptionSubtitle_=enableLiveCaptionSubtitle}});// Copyright 2019 The Chromium Authors. All rights reserved.
class CaptionsBrowserProxyImpl{openSystemCaptionsDialog(){chrome.send("openSystemCaptionsDialog")}}addSingletonGetter(CaptionsBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-a11y-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-a11y-page"></style>
    <settings-animated-pages id="pages" current-route="{{currentRoute}}" section="a11y" focus-config="[[focusConfig_]]">
      <div route-path="default">


        <template is="dom-if" if="[[captionSettingsOpensExternally_]]">
          <template is="dom-if" if="[[enableLiveCaption_]]">
            <settings-toggle-button class="hr" pref="{{prefs.accessibility.captions.live_caption_enabled}}" on-change="onA11yLiveCaptionChange_" label="النسخ النصي التلقائي" sub-label="[[enableLiveCaptionSubtitle_]]">
            </settings-toggle-button>
          </template>
          <cr-link-row id="captions" label="الإعدادات المفضّلة للشرح" sub-label="يمكنك تخصيص حجم الشرح ونمطه للتطبيقات والمواقع الإلكترونية التي تتيح استخدام هذا الإعداد." on-click="onCaptionsClick_" external$="[[captionSettingsOpensExternally_]]">
          </cr-link-row>
        </template>
        <template is="dom-if" if="[[!captionSettingsOpensExternally_]]">
          <cr-link-row id="captions" label="الترجمة والشرح" on-click="onCaptionsClick_" role-description="زر صفحة فرعية">
          </cr-link-row>
        </template>
        <settings-toggle-button class="hr" hidden$="[[!showFocusHighlightOption_]]" pref="{{prefs.settings.a11y.focus_highlight}}" on-setting-boolean-control-change="onFocusHighlightChange_" label="تحديد سريع للعنصر الذي تم التركيز عليه">
        </settings-toggle-button>
        <settings-toggle-button class="hr" pref="{{prefs.settings.a11y.caretbrowsing.enabled}}" on-change="onA11yCaretBrowsingChange_" label="التنقُّل بين الصفحات باستخدام مؤشر النص" sub-label="‏يمكنك استخدام الاختصار F7 لتفعيل ميزة &quot;التصفُّح النصي بالمؤشر&quot; أو إيقافها.">
        </settings-toggle-button>
        <settings-toggle-button class="hr" hidden$="[[!showAccessibilityLabelsSetting_]]" pref="{{prefs.settings.a11y.enable_accessibility_image_labels}}" on-change="onA11yImageLabelsChange_" label="‏الحصول على أوصاف الصور من Google" sub-label="‏في حال لم تتضمن صورة ما وصفًا مفيدًا، سيحاول Chrome توفير وصف لك. لإنشاء الأوصاف، سيتم إرسال الصور إلى Google.">
        </settings-toggle-button>

        <cr-link-row class="hr" label="إضافة ميزات إمكانية الوصول" on-click="onMoreFeaturesLinkClick_" sub-label="‏فتح سوق Chrome الإلكتروني" external="">
        </cr-link-row>
      </div>

      <template is="dom-if" route-path="/captions">
        <settings-subpage associated-control="[[$$('#captions')]]" page-title="الترجمة والشرح">
          <settings-captions prefs="{{prefs}}"></settings-captions>
        </settings-subpage>
      </template>

    </settings-animated-pages>
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior],properties:{currentRoute:{type:Object,notify:true},prefs:{type:Object,notify:true},enableLiveCaption_:{type:Boolean,value:function(){return loadTimeData.getBoolean("enableLiveCaption")}},enableLiveCaptionSubtitle_:{type:String,value:loadTimeData.getString("captionsEnableLiveCaptionSubtitle")},showFocusHighlightOption_:{type:Boolean,value:function(){return loadTimeData.getBoolean("showFocusHighlightOption")}},showAccessibilityLabelsSetting_:{type:Boolean,value:false},focusConfig_:{type:Object,value(){const map=new Map;if(routes.CAPTIONS){map.set(routes.CAPTIONS.path,"#captions")}return map}},captionSettingsOpensExternally_:{type:Boolean,value(){let opensExternally=false;opensExternally=loadTimeData.getBoolean("isWindows10OrNewer");return opensExternally}}},ready(){this.addWebUIListener("screen-reader-state-changed",this.onScreenReaderStateChanged_.bind(this));this.addWebUIListener("enable-live-caption-subtitle-changed",this.onEnableLiveCaptionSubtitleChanged_.bind(this));chrome.send("a11yPageReady");if(this.captionSettingsOpensExternally_){chrome.send("captionsSubpageReady")}},onScreenReaderStateChanged_(hasScreenReader){this.showAccessibilityLabelsSetting_=hasScreenReader&&loadTimeData.getBoolean("showExperimentalA11yLabels")},onA11yCaretBrowsingChange_(event){if(event.target.checked){chrome.metricsPrivate.recordUserAction("Accessibility.CaretBrowsing.EnableWithSettings")}else{chrome.metricsPrivate.recordUserAction("Accessibility.CaretBrowsing.DisableWithSettings")}},onA11yImageLabelsChange_(event){const a11yImageLabelsOn=event.target.checked;if(a11yImageLabelsOn){chrome.send("confirmA11yImageLabels")}},onA11yLiveCaptionChange_(event){const a11yLiveCaptionOn=event.target.checked;chrome.metricsPrivate.recordBoolean("Accessibility.LiveCaption.EnableFromSettings",a11yLiveCaptionOn)},onEnableLiveCaptionSubtitleChanged_(enableLiveCaptionSubtitle){this.enableLiveCaptionSubtitle_=enableLiveCaptionSubtitle},onFocusHighlightChange_(event){chrome.metricsPrivate.recordBoolean("Accessibility.FocusHighlight.ToggleEnabled",event.target.checked)},onMoreFeaturesLinkClick_(){window.open("https://chrome.google.com/webstore/category/collection/accessibility")},onCaptionsClick_(){if(this.captionSettingsOpensExternally_){CaptionsBrowserProxyImpl.getInstance().openSystemCaptionsDialog()}else{Router.getInstance().navigateTo(routes.CAPTIONS)}}});// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="controlled-button">:host {
  --justify-margin: 8px;
        align-items: center;
        display: flex;
}

:host([enforced_]) {
  pointer-events: none;
}

cr-policy-pref-indicator {
  pointer-events: all;
}

:host(:not([end-justified])) cr-policy-pref-indicator {
  margin-inline-start: var(--cr-controlled-by-spacing);
}

:host([end-justified]) cr-policy-pref-indicator {
  margin-inline-end: var(--cr-controlled-by-spacing);
        margin-inline-start: calc(
            var(--cr-controlled-by-spacing) - var(--justify-margin));
        order: -1;
}

</style>

    <cr-button class$="[[actionClass_]]" disabled="[[!buttonEnabled_(enforced_, disabled)]]">
      [[label]]
    </cr-button>

    <template is="dom-if" if="[[hasPrefPolicyIndicator(pref.*)]]" restamp="">
      <cr-policy-pref-indicator pref="[[pref]]" on-click="onIndicatorClick_" icon-aria-label="[[label]]">
      </cr-policy-pref-indicator>
    </template>

<!--_html_template_end_-->`,is:"controlled-button",behaviors:[CrPolicyPrefBehavior,PrefControlBehavior],properties:{endJustified:{type:Boolean,value:false,reflectToAttribute:true},label:String,disabled:{type:Boolean,value:false,reflectToAttribute:true},actionClass_:{type:String,value:""},enforced_:{type:Boolean,computed:"isPrefEnforced(pref.*)",reflectToAttribute:true}},attached(){if(this.classList.contains("action-button")){this.actionClass_="action-button"}},focus(){this.$$("cr-button").focus()},onIndicatorClick_(e){e.preventDefault();e.stopPropagation()},buttonEnabled_(enforced,disabled){return!enforced&&!disabled}});// Copyright 2017 The Chromium Authors. All rights reserved.
class DownloadsBrowserProxyImpl{initializeDownloads(){chrome.send("initializeDownloads")}selectDownloadLocation(){chrome.send("selectDownloadLocation")}resetAutoOpenFileTypes(){chrome.send("resetAutoOpenFileTypes")}}addSingletonGetter(DownloadsBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-downloads-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-downloads-page">#defaultDownloadPath {
  word-break: break-word;
}

</style>
    <div class="cr-row first">
      <div class="flex cr-padded-text">
        <div id="locationLabel" aria-hidden="true">الموقع</div>
        <div class="secondary" id="defaultDownloadPath" aria-hidden="true">

          [[prefs.download.default_directory.value]]


        </div>
      </div>
      <div class="separator"></div>
      <controlled-button id="changeDownloadsPath" label="تغيير" aria-labelledby="locationLabel defaultDownloadPath" on-click="selectDownloadLocation_" pref="[[prefs.download.default_directory]]" end-justified="">
      </controlled-button>
    </div>
    <settings-toggle-button class="hr" pref="{{prefs.download.prompt_for_download}}" label="السؤال عن مكان حفظ الملفّات قبل تنزيلها">
    </settings-toggle-button>
    <template is="dom-if" if="[[autoOpenDownloads_]]" restamp="">
      <div class="cr-row">
        <div class="flex">فتح أنواع معينة من الملفات تلقائيًا بعد التنزيل</div>
        <div class="separator"></div>
        <cr-button id="resetAutoOpenFileTypes" on-click="onClearAutoOpenFileTypesTap_">
          محو
        </cr-button>
      </div>
    </template>
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior,PrefsBehavior],properties:{prefs:{type:Object,notify:true},autoOpenDownloads_:{type:Boolean,value:false}},browserProxy_:null,created(){this.browserProxy_=DownloadsBrowserProxyImpl.getInstance()},ready(){this.addWebUIListener("auto-open-downloads-changed",(autoOpen=>{this.autoOpenDownloads_=autoOpen}));this.browserProxy_.initializeDownloads()},selectDownloadLocation_(){listenOnce(this,"transitionend",(()=>{this.browserProxy_.selectDownloadLocation()}))},onClearAutoOpenFileTypesTap_(){this.browserProxy_.resetAutoOpenFileTypes()}});// Copyright 2017 The Chromium Authors. All rights reserved.
class LanguagesBrowserProxy{setProspectiveUILanguage(languageCode){}getProspectiveUILanguage(){}getLanguageSettingsPrivate(){}}class LanguagesBrowserProxyImpl{setProspectiveUILanguage(languageCode){chrome.send("setProspectiveUILanguage",[languageCode])}getProspectiveUILanguage(){return sendWithPromise("getProspectiveUILanguage")}getLanguageSettingsPrivate(){return chrome.languageSettingsPrivate}}addSingletonGetter(LanguagesBrowserProxyImpl);// Copyright 2015 The Chromium Authors. All rights reserved.
const MoveType=chrome.languageSettingsPrivate.MoveType;const kLanguageCodeToTranslateCode={nb:"no",fil:"tl","zh-HK":"zh-TW","zh-MO":"zh-TW","zh-SG":"zh-CN"};const kTranslateLanguageSynonyms={he:"iw",jv:"jw"};const kArcImeLanguage="_arc_ime_language_";const preferredLanguagesPrefName=isChromeOS?"settings.language.preferred_languages":"intl.accept_languages";Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><!--_html_template_end_-->`,is:"settings-languages",behaviors:[PrefsBehavior],properties:{languages:{type:Object,notify:true,readOnly:true},languageHelper:{type:Object,notify:true,readOnly:true,value(){return this}},resolver_:{type:Object,value(){return new PromiseResolver}},supportedLanguageMap_:{type:Object,value(){return new Map}},enabledLanguageSet_:{type:Object,value(){return new Set}},originalProspectiveUILanguage_:String},observers:["prospectiveUILanguageChanged_(prefs.intl.app_locale.value, languages)","preferredLanguagesPrefChanged_("+"prefs."+preferredLanguagesPrefName+".value, languages)","spellCheckDictionariesPrefChanged_("+"prefs.spellcheck.dictionaries.value.*, "+"prefs.spellcheck.forced_dictionaries.value.*, "+"prefs.spellcheck.blocked_dictionaries.value.*, languages)","translateLanguagesPrefChanged_("+"prefs.translate_blocked_languages.value.*, languages)","updateRemovableLanguages_("+"prefs.intl.app_locale.value, languages.enabled)","updateRemovableLanguages_("+"prefs.translate_blocked_languages.value.*)","updateRemovableLanguages_("+"prefs.settings.language.preload_engines.value, "+"prefs.settings.language.enabled_extension_imes.value, "+"languages)"],boundOnInputMethodChanged_:null,boundOnSpellcheckDictionariesChanged_:null,browserProxy_:null,languageSettingsPrivate_:null,attached(){this.browserProxy_=LanguagesBrowserProxyImpl.getInstance();this.languageSettingsPrivate_=this.browserProxy_.getLanguageSettingsPrivate();const promises=[];promises[0]=CrSettingsPrefs.initialized;promises[1]=new Promise((resolve=>{this.languageSettingsPrivate_.getLanguageList(resolve)}));promises[2]=new Promise((resolve=>{this.languageSettingsPrivate_.getTranslateTargetLanguage(resolve)}));if(isChromeOS){promises[3]=new Promise((resolve=>{this.languageSettingsPrivate_.getInputMethodLists((function(lists){resolve(lists.componentExtensionImes.concat(lists.thirdPartyExtensionImes))}))}));promises[4]=new Promise((resolve=>{this.inputMethodPrivate_.getCurrentInputMethod(resolve)}))}if(isWindows||isChromeOS){promises.push(this.browserProxy_.getProspectiveUILanguage().then((prospectiveUILanguage=>{this.originalProspectiveUILanguage_=prospectiveUILanguage||window.navigator.language})))}Promise.all(promises).then((results=>{if(!this.isConnected){return}this.createModel_(results[1],results[2],results[3],results[4]);this.boundOnSpellcheckDictionariesChanged_=this.onSpellcheckDictionariesChanged_.bind(this);this.languageSettingsPrivate_.onSpellcheckDictionariesChanged.addListener(this.boundOnSpellcheckDictionariesChanged_);this.languageSettingsPrivate_.getSpellcheckDictionaryStatuses(this.boundOnSpellcheckDictionariesChanged_);this.resolver_.resolve()}));if(isChromeOS){this.boundOnInputMethodChanged_=this.onInputMethodChanged_.bind(this);this.inputMethodPrivate_.onChanged.addListener(assert(this.boundOnInputMethodChanged_));this.boundOnInputMethodAdded_=this.onInputMethodAdded_.bind(this);this.languageSettingsPrivate_.onInputMethodAdded.addListener(this.boundOnInputMethodAdded_);this.boundOnInputMethodRemoved_=this.onInputMethodRemoved_.bind(this);this.languageSettingsPrivate_.onInputMethodRemoved.addListener(this.boundOnInputMethodRemoved_)}},detached(){if(isChromeOS){this.inputMethodPrivate_.onChanged.removeListener(assert(this.boundOnInputMethodChanged_));this.boundOnInputMethodChanged_=null;this.languageSettingsPrivate_.onInputMethodAdded.removeListener(assert(this.boundOnInputMethodAdded_));this.boundOnInputMethodAdded_=null;this.languageSettingsPrivate_.onInputMethodRemoved.removeListener(assert(this.boundOnInputMethodRemoved_));this.boundOnInputMethodRemoved_=null}if(this.boundOnSpellcheckDictionariesChanged_){this.languageSettingsPrivate_.onSpellcheckDictionariesChanged.removeListener(this.boundOnSpellcheckDictionariesChanged_);this.boundOnSpellcheckDictionariesChanged_=null}},prospectiveUILanguageChanged_(prospectiveUILanguage){this.set("languages.prospectiveUILanguage",prospectiveUILanguage||this.originalProspectiveUILanguage_)},preferredLanguagesPrefChanged_(){if(this.prefs===undefined||this.languages===undefined){return}const enabledLanguageStates=this.getEnabledLanguageStates_(this.languages.translateTarget,this.languages.prospectiveUILanguage);this.enabledLanguageSet_.clear();for(let i=0;i<enabledLanguageStates.length;i++){this.enabledLanguageSet_.add(enabledLanguageStates[i].language.code)}this.set("languages.enabled",enabledLanguageStates);if(this.boundOnSpellcheckDictionariesChanged_){this.languageSettingsPrivate_.getSpellcheckDictionaryStatuses(this.boundOnSpellcheckDictionariesChanged_)}this.set("languages.forcedSpellCheckLanguages",this.getForcedSpellCheckLanguages_(this.languages.enabled));new Promise((resolve=>{this.languageSettingsPrivate_.getTranslateTargetLanguage(resolve)})).then((result=>{this.set("languages.translateTarget",result)}))},spellCheckDictionariesPrefChanged_(){if(this.prefs===undefined||this.languages===undefined){return}const spellCheckSet=this.makeSetFromArray_(this.getPref("spellcheck.dictionaries").value);const spellCheckForcedSet=this.makeSetFromArray_(this.getPref("spellcheck.forced_dictionaries").value);const spellCheckBlockedSet=this.makeSetFromArray_(this.getPref("spellcheck.blocked_dictionaries").value);for(let i=0;i<this.languages.enabled.length;i++){const languageState=this.languages.enabled[i];const isUser=spellCheckSet.has(languageState.language.code);const isForced=spellCheckForcedSet.has(languageState.language.code);const isBlocked=spellCheckBlockedSet.has(languageState.language.code);this.set(`languages.enabled.${i}.spellCheckEnabled`,isUser&&!isBlocked||isForced);this.set(`languages.enabled.${i}.isManaged`,isForced||isBlocked)}this.set("languages.forcedSpellCheckLanguages",this.getForcedSpellCheckLanguages_(this.languages.enabled))},getForcedSpellCheckLanguages_(enabledLanguages){const enabledSet=this.makeSetFromArray_(enabledLanguages.map((x=>x.language.code)));const spellCheckForcedDictionaries=this.getPref("spellcheck.forced_dictionaries").value;const forcedLanguages=[];for(let i=0;i<spellCheckForcedDictionaries.length;i++){const code=spellCheckForcedDictionaries[i];if(!enabledSet.has(code)&&this.supportedLanguageMap_.has(code)){forcedLanguages.push({language:this.supportedLanguageMap_.get(code),isManaged:true,spellCheckEnabled:true,downloadDictionaryFailureCount:0})}}return forcedLanguages},translateLanguagesPrefChanged_(){if(this.prefs===undefined||this.languages===undefined){return}const translateBlockedPref=this.getPref("translate_blocked_languages");const translateBlockedSet=this.makeSetFromArray_(translateBlockedPref.value);for(let i=0;i<this.languages.enabled.length;i++){const language=this.languages.enabled[i].language;const translateEnabled=this.isTranslateEnabled_(language.code,!!language.supportsTranslate,translateBlockedSet,this.languages.translateTarget,this.languages.prospectiveUILanguage);this.set("languages.enabled."+i+".translateEnabled",translateEnabled)}},createModel_(supportedLanguages,translateTarget,supportedInputMethods,currentInputMethodId){for(let i=0;i<supportedLanguages.length;i++){const language=supportedLanguages[i];language.supportsUI=!!language.supportsUI;language.supportsTranslate=!!language.supportsTranslate;language.supportsSpellcheck=!!language.supportsSpellcheck;language.isProhibitedLanguage=!!language.isProhibitedLanguage;this.supportedLanguageMap_.set(language.code,language)}let prospectiveUILanguage;if(isChromeOS||isWindows){prospectiveUILanguage=this.getPref("intl.app_locale").value||this.originalProspectiveUILanguage_}const enabledLanguageStates=this.getEnabledLanguageStates_(translateTarget,prospectiveUILanguage);for(let l=0;l<enabledLanguageStates.length;l++){this.enabledLanguageSet_.add(enabledLanguageStates[l].language.code)}const forcedSpellCheckLanguages=this.getForcedSpellCheckLanguages_(enabledLanguageStates);const model={supported:supportedLanguages,enabled:enabledLanguageStates,translateTarget:translateTarget,forcedSpellCheckLanguages:forcedSpellCheckLanguages};if(isChromeOS||isWindows){model.prospectiveUILanguage=prospectiveUILanguage}if(isChromeOS){if(supportedInputMethods){this.createInputMethodModel_(supportedInputMethods)}model.inputMethods={supported:supportedInputMethods,enabled:this.getEnabledInputMethods_(),currentId:currentInputMethodId}}this._setLanguages(model)},getEnabledLanguageStates_(translateTarget,prospectiveUILanguage){assert(CrSettingsPrefs.isInitialized);const pref=this.getPref(preferredLanguagesPrefName);const enabledLanguageCodes=pref.value.split(",");const spellCheckPref=this.getPref("spellcheck.dictionaries");const spellCheckForcedPref=this.getPref("spellcheck.forced_dictionaries");const spellCheckBlockedPref=this.getPref("spellcheck.blocked_dictionaries");const spellCheckSet=this.makeSetFromArray_(spellCheckPref.value.concat(spellCheckForcedPref.value));const spellCheckForcedSet=this.makeSetFromArray_(spellCheckForcedPref.value);const spellCheckBlockedSet=this.makeSetFromArray_(spellCheckBlockedPref.value);const translateBlockedPref=this.getPref("translate_blocked_languages");const translateBlockedSet=this.makeSetFromArray_(translateBlockedPref.value);const enabledLanguageStates=[];for(let i=0;i<enabledLanguageCodes.length;i++){const code=enabledLanguageCodes[i];const language=this.supportedLanguageMap_.get(code);if(!language){continue}const languageState={};languageState.language=language;languageState.spellCheckEnabled=spellCheckSet.has(code)&&!spellCheckBlockedSet.has(code)||spellCheckForcedSet.has(code);languageState.translateEnabled=this.isTranslateEnabled_(code,!!language.supportsTranslate,translateBlockedSet,translateTarget,prospectiveUILanguage);languageState.isManaged=spellCheckForcedSet.has(code)||spellCheckBlockedSet.has(code);languageState.downloadDictionaryFailureCount=0;enabledLanguageStates.push(languageState)}return enabledLanguageStates},isTranslateEnabled_(code,supportsTranslate,translateBlockedSet,translateTarget,prospectiveUILanguage){const translateCode=this.convertLanguageCodeForTranslate(code);return supportsTranslate&&!translateBlockedSet.has(translateCode)&&translateCode!==translateTarget&&(!prospectiveUILanguage||code!==prospectiveUILanguage)},onSpellcheckDictionariesChanged_(statuses){const statusMap=new Map;statuses.forEach((status=>{statusMap.set(status.languageCode,status)}));["enabled","forcedSpellCheckLanguages"].forEach((collectionName=>{this.languages[collectionName].forEach(((languageState,index)=>{const status=statusMap.get(languageState.language.code);if(!status){return}const previousStatus=languageState.downloadDictionaryStatus;const keyPrefix=`languages.${collectionName}.${index}`;this.set(`${keyPrefix}.downloadDictionaryStatus`,status);const failureCountKey=`${keyPrefix}.downloadDictionaryFailureCount`;if(status.downloadFailed&&!(previousStatus&&previousStatus.downloadFailed)){const failureCount=languageState.downloadDictionaryFailureCount+1;this.set(failureCountKey,failureCount)}else if(status.isReady&&!(previousStatus&&previousStatus.isReady)){this.set(failureCountKey,0)}}))}))},updateRemovableLanguages_(){if(this.prefs===undefined||this.languages===undefined){return}if(isChromeOS){this.updateEnabledInputMethods_()}for(let i=0;i<this.languages.enabled.length;i++){const languageState=this.languages.enabled[i];this.set("languages.enabled."+i+".removable",this.canDisableLanguage(languageState))}},makeSetFromArray_(list){return new Set(list)},whenReady(){return this.resolver_.promise},setProspectiveUILanguage(languageCode){this.browserProxy_.setProspectiveUILanguage(languageCode)},requiresRestart(){return this.originalProspectiveUILanguage_!==this.languages.prospectiveUILanguage},getArcImeLanguageCode(){return kArcImeLanguage},isLanguageCodeForArcIme(languageCode){return languageCode===kArcImeLanguage},isLanguageEnabled(languageCode){return this.enabledLanguageSet_.has(languageCode)},enableLanguage(languageCode){if(!CrSettingsPrefs.isInitialized){return}this.languageSettingsPrivate_.enableLanguage(languageCode)},disableLanguage(languageCode){if(!CrSettingsPrefs.isInitialized){return}this.deletePrefListItem("spellcheck.dictionaries",languageCode);if(isChromeOS&&!this.isChromeOSLanguageSettingsV2_()){const inputMethods=this.languageInputMethods_.get(languageCode)||[];for(const inputMethod of inputMethods){const supportsOtherEnabledLanguages=inputMethod.languageCodes.some((otherLanguageCode=>otherLanguageCode!==languageCode&&this.isLanguageEnabled(otherLanguageCode)));if(!supportsOtherEnabledLanguages){this.removeInputMethod(inputMethod.id)}}}this.languageSettingsPrivate_.disableLanguage(languageCode)},isChromeOSLanguageSettingsV2_(){if(!isChromeOS){return false}return loadTimeData.valueExists("enableLanguageSettingsV2")&&loadTimeData.getBoolean("enableLanguageSettingsV2")},isOnlyTranslateBlockedLanguage(languageState){return!languageState.translateEnabled&&this.languages.enabled.filter((lang=>!lang.translateEnabled)).length===1},canDisableLanguage(languageState){if(languageState.language.code===this.languages.prospectiveUILanguage&&!this.isChromeOSLanguageSettingsV2_()){return false}if(this.languages.enabled.length===1){return false}if(this.isOnlyTranslateBlockedLanguage(languageState)){return false}if(!isChromeOS){return true}if(this.isChromeOSLanguageSettingsV2_()){return true}const otherInputMethodsEnabled=this.languages.enabled.some((function(otherLanguageState){const otherLanguageCode=otherLanguageState.language.code;if(otherLanguageCode===languageState.language.code){return false}const inputMethods=this.languageInputMethods_.get(otherLanguageCode);return inputMethods&&inputMethods.some((function(inputMethod){return this.isComponentIme(inputMethod)&&this.supportedInputMethodMap_.get(inputMethod.id).enabled}),this)}),this);return otherInputMethodsEnabled},canEnableLanguage(language){return!(this.isLanguageEnabled(language.code)||language.isProhibitedLanguage||this.isLanguageCodeForArcIme(language.code))},moveLanguage(languageCode,upDirection){if(!CrSettingsPrefs.isInitialized){return}if(upDirection){this.languageSettingsPrivate_.moveLanguage(languageCode,MoveType.UP)}else{this.languageSettingsPrivate_.moveLanguage(languageCode,MoveType.DOWN)}},moveLanguageToFront(languageCode){if(!CrSettingsPrefs.isInitialized){return}this.languageSettingsPrivate_.moveLanguage(languageCode,MoveType.TOP)},enableTranslateLanguage(languageCode){this.languageSettingsPrivate_.setEnableTranslationForLanguage(languageCode,true)},disableTranslateLanguage(languageCode){this.languageSettingsPrivate_.setEnableTranslationForLanguage(languageCode,false)},toggleSpellCheck(languageCode,enable){if(!this.languages){return}if(enable){const spellCheckPref=this.getPref("spellcheck.dictionaries");this.appendPrefListItem("spellcheck.dictionaries",languageCode)}else{this.deletePrefListItem("spellcheck.dictionaries",languageCode)}},convertLanguageCodeForTranslate(languageCode){if(languageCode in kLanguageCodeToTranslateCode){return kLanguageCodeToTranslateCode[languageCode]}const main=languageCode.split("-")[0];if(main==="zh"){return languageCode}if(main in kTranslateLanguageSynonyms){return kTranslateLanguageSynonyms[main]}return main},getLanguageCodeWithoutRegion(languageCode){if(languageCode==="nb"||languageCode==="nn"){return"no"}if(languageCode==="iw"){return"he"}const result=languageCode.match(/^([^-]+)-?/);assert(result.length===2);return result[1]},getLanguage(languageCode){return this.supportedLanguageMap_.get(languageCode)||this.supportedLanguageMap_.get(this.getLanguageCodeWithoutRegion(languageCode))},retryDownloadDictionary(languageCode){this.languageSettingsPrivate_.retryDownloadDictionary(languageCode)}});// Copyright 2020 The Chromium Authors. All rights reserved.
const LanguageSettingsActionType={CLICK_ON_ADD_LANGUAGE:1,LANGUAGE_ADDED:2,LANGUAGE_REMOVED:3,DISABLE_TRANSLATE_GLOBALLY:4,ENABLE_TRANSLATE_GLOBALLY:5,DISABLE_TRANSLATE_FOR_SINGLE_LANGUAGE:6,ENABLE_TRANSLATE_FOR_SINGLE_LANGUAGE:7,LANGUAGE_LIST_REORDERED:8};class LanguageSettingsMetricsProxy{recordSettingsMetric(interaction){}}class LanguageSettingsMetricsProxyImpl{recordSettingsMetric(interaction){chrome.metricsPrivate.recordEnumerationValue("LanguageSettings.Actions",interaction,Object.keys(LanguageSettingsActionType).length)}}addSingletonGetter(LanguageSettingsMetricsProxyImpl);// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"settings-add-languages-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-add-languages-dialog">#dialog-title {
  align-items: center;
        display: flex;
}

#dialog-body {
  display: flex;
        flex-direction: column;
        height: 350px;
        overflow: auto;
        padding-inline-end: 0;
}

#dialog-title > span, iron-list {
  flex: 1;
}

.ripple-padding {
  padding-inline-start: 20px;
}

cr-checkbox::part(label-container) {
  white-space: nowrap;
}

</style>
    <cr-dialog id="dialog" close-text="إغلاق">
      <div id="dialog-title" slot="title">
        <span>إضافة اللغات</span>
        <cr-search-field label="البحث عن اللغات" id="search" on-search-changed="onSearchChanged_" on-keydown="onKeydown_" autofocus="">
        </cr-search-field>
      </div>
      <div id="dialog-body" slot="body" scrollable="">
        <iron-list class="ripple-padding" scroll-target="[[$$('[slot=body]')]]" items="[[getLanguages_(
                languages.supported, languages.enabled.*, filterValue_)]]">
          <template>
            <cr-checkbox class="list-item no-outline" checked="[[willAdd_(item.code)]]" tab-index="[[tabIndex]]" title$="[[item.nativeDisplayName]]" on-change="onLanguageCheckboxChange_">
              [[getDisplayText_(item)]]
            </cr-checkbox>
          </template>
        </iron-list>
      </div>
      <div slot="button-container">
        <cr-button class="cancel-button" on-click="onCancelButtonTap_">
          إلغاء
        </cr-button>
        <cr-button class="action-button" on-click="onActionButtonTap_" disabled="[[disableActionButton_]]">
          إضافة
        </cr-button>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[CrScrollableBehavior,FindShortcutBehavior],properties:{languages:{type:Object,notify:true},languageHelper:Object,languagesToAdd_:{type:Object,value(){return new Set}},disableActionButton_:{type:Boolean,value:true},filterValue_:{type:String,value:""}},attached(){this.$.dialog.showModal()},handleFindShortcut(modalContextOpen){const searchInput=this.$.search.getSearchInput();searchInput.scrollIntoViewIfNeeded();if(!this.searchInputHasFocus()){searchInput.focus()}return true},searchInputHasFocus(){return this.$.search.getSearchInput()===this.$.search.shadowRoot.activeElement},onSearchChanged_(e){this.filterValue_=e.detail},getLanguages_(){const filterValue=this.filterValue_?this.filterValue_.toLowerCase():null;return this.languages.supported.filter((language=>{if(!this.languageHelper.canEnableLanguage(language)){return false}if(filterValue===null){return true}return language.displayName.toLowerCase().includes(filterValue)||language.nativeDisplayName.toLowerCase().includes(filterValue)}))},getDisplayText_(language){let displayText=language.displayName;if(language.displayName!==language.nativeDisplayName){displayText+=" - "+language.nativeDisplayName}return displayText},willAdd_(languageCode){return this.languagesToAdd_.has(languageCode)},onLanguageCheckboxChange_(e){const language=e.model.item;if(e.target.checked){this.languagesToAdd_.add(language.code)}else{this.languagesToAdd_.delete(language.code)}this.disableActionButton_=!this.languagesToAdd_.size},onCancelButtonTap_(){this.$.dialog.close()},onActionButtonTap_(){this.$.dialog.close();this.languagesToAdd_.forEach((languageCode=>{this.languageHelper.enableLanguage(languageCode);LanguageSettingsMetricsProxyImpl.getInstance().recordSettingsMetric(LanguageSettingsActionType.LANGUAGE_ADDED)}))},onKeydown_(e){if(e.key==="Escape"&&!this.$.search.getValue().trim()){this.$.dialog.close()}else if(e.key!=="PageDown"&&e.key!=="PageUp"){this.$.search.scrollIntoViewIfNeeded()}}});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/Polymer({is:"iron-a11y-keys",behaviors:[IronA11yKeysBehavior],properties:{target:{type:Object,observer:"_targetChanged"},keys:{type:String,reflectToAttribute:true,observer:"_keysChanged"}},attached:function(){if(!this.target){this.target=this.parentNode}},_targetChanged:function(target){this.keyEventTarget=target},_keysChanged:function(){this.removeOwnKeyBindings();this.addOwnKeyBinding(this.keys,"_fireKeysPressed")},_fireKeysPressed:function(event){this.fire("keys-pressed",event.detail,{})}});// Copyright 2015 The Chromium Authors. All rights reserved.
const MAX_CUSTOM_DICTIONARY_WORD_BYTES=99;Polymer({is:"settings-edit-dictionary-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared" scope="settings-edit-dictionary-page">:host {
  display: flex;
        flex-direction: column;
}

#newWord {
  width: 100%;
        --cr-input-width: var(--settings-input-max-width);
}

#newWord::part(row-container) {
  justify-content: normal;
}

iron-list .word {
  flex: 1;
}

</style>
    <div class="cr-row first">
      <iron-a11y-keys id="keys" keys="enter esc" on-keys-pressed="onKeysPress_"></iron-a11y-keys>
      <cr-input id="newWord" value="{{newWordValue_}}" placeholder="إضافة كلمة جديدة" invalid="[[isWordInvalid_(newWordValue_, words_.*)]]" error-message="[[getErrorMessage_(newWordValue_, words_.*)]]" spellcheck="false">
        <cr-button on-click="onAddWordTap_" id="addWord" slot="suffix" disabled$="[[disableAddButton_(newWordValue_, words_.*)]]">
          إضافة كلمة
        </cr-button>
      </cr-input>
    </div>
    <div class="cr-row continuation">
      <h2>كلمات مخصصة</h2>
    </div>
    <div class="list-frame">
      <template is="dom-if" if="[[hasWords_]]">
        <iron-list id="list" items="[[words_]]" preserve-focus="" scroll-target="[[subpageScrollTarget]]" risk-selection="">
          <template>
            <div class="list-item">
              <div id$="word[[index]]" class="word text-elide">[[item]]</div>
              <cr-icon-button class="icon-clear" on-click="onRemoveWordTap_" tabindex$="[[tabIndex]]" title="حذف كلمة" aria-describedby$="word[[index]]">
              </cr-icon-button>
            </div>
          </template>
        </iron-list>
      </template>
      <div id="noWordsLabel" class="list-item" hidden$="[[hasWords_]]">
        ستظهر هنا الكلمات المُخصصة المحفوظة
      </div>
    </div>
<!--_html_template_end_-->`,behaviors:[GlobalScrollTargetBehavior],properties:{newWordValue_:{type:String,value:""},subpageRoute:{type:Object,value:routes.EDIT_DICTIONARY},words_:{type:Array,value(){return[]}},hasWords_:{type:Boolean,value:false}},languageSettingsPrivate_:null,ready(){this.languageSettingsPrivate_=LanguagesBrowserProxyImpl.getInstance().getLanguageSettingsPrivate();this.languageSettingsPrivate_.getSpellcheckWords((words=>{this.hasWords_=words.length>0;this.words_=words}));this.languageSettingsPrivate_.onCustomDictionaryChanged.addListener(this.onCustomDictionaryChanged_.bind(this));this.$.keys.target=this.$.newWord},addWordFromInput_(){const word=this.getTrimmedNewWord_();this.newWordValue_="";if(word){this.languageSettingsPrivate_.addSpellcheckWord(word)}},disableAddButton_(){return this.getTrimmedNewWord_().length===0||this.isWordInvalid_()},getErrorMessage_(){if(this.newWordIsTooLong_()){return loadTimeData.getString("addDictionaryWordLengthError")}if(this.newWordAlreadyAdded_()){return loadTimeData.getString("addDictionaryWordDuplicateError")}return""},getTrimmedNewWord_(){return this.newWordValue_.trim()},isWordInvalid_(){return this.newWordAlreadyAdded_()||this.newWordIsTooLong_()},newWordAlreadyAdded_(){return this.words_.includes(this.getTrimmedNewWord_())},newWordIsTooLong_(){return this.getTrimmedNewWord_().length>MAX_CUSTOM_DICTIONARY_WORD_BYTES},onAddWordTap_(e){this.addWordFromInput_();this.$.newWord.focus()},onCustomDictionaryChanged_(added,removed){const wasEmpty=this.words_.length===0;for(const word of removed){this.arrayDelete("words_",word)}if(this.words_.length===0&&added.length===0&&!wasEmpty){this.hasWords_=false}if(wasEmpty&&added.length>0){this.hasWords_=true}for(const word of added){if(!this.words_.includes(word)){this.unshift("words_",word)}}if(wasEmpty&&this.words_.length>0){flush();this.$$("#list").notifyResize()}},onKeysPress_(e){if(e.detail.key==="enter"&&!this.disableAddButton_()){this.addWordFromInput_()}else if(e.detail.key==="esc"){e.detail.keyboardEvent.target.value=""}},onRemoveWordTap_(e){this.languageSettingsPrivate_.removeSpellcheckWord(e.model.item)}});// Copyright 2015 The Chromium Authors. All rights reserved.
const kMenuCloseDelay=100;const LANGUAGE_SETTING_IS_SHOWN_UMA_NAME="Translate.LanguageSettingsIsShown";Polymer({is:"settings-languages-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared action-link iron-flex" scope="settings-languages-page">#languagesCollapse .list-item.selected {
  min-height: var(--settings-row-two-line-min-height);
}

.explain-selected {
  color: var(--google-green-refresh-700);
        font-weight: initial;
}

@media (prefers-color-scheme: dark) {
.explain-selected {
  color: var(--google-green-refresh-300);
}

}

cr-action-menu.complex .dropdown-item {
  min-height: 36px;
}

cr-action-menu:not(.complex) hr {
  display: none;
}

cr-action-menu.complex hr {
  border: none;
        
        border-top: var(--cr-separator-line);
        margin: 6px 0 0 0;
}

cr-checkbox.dropdown-item {
  --cr-action-menu-disabled-item-opacity: 0.38;
        margin-inline-start: 0;
}

.icon-external {
  margin-inline-end: 0;
}

#uiLanguageItem:focus, #offerTranslations:focus {
  background-color: transparent;
}

#uiLanguageItem span {
  line-height: 20px;
}

#uiLanguageItem cr-policy-indicator {
  float: right;
        margin-inline-start: 20px;
}

.name-with-error-list {
  padding: 14px 0;
}

.name-with-error-list div {
  color: var(--google-red-500);
        margin-top: 8px;
}

@media (prefers-color-scheme: dark) {
.name-with-error-list div {
  color: var(--settings-error-color);
}

}

iron-icon[icon='cr:error'] {
  --iron-icon-fill-color: var(--settings-error-color);
        height: var(--cr-icon-size);
        margin-inline-end: 8px;
        width: var(--cr-icon-size);
}

.name-with-error-list[disabled] {
  pointer-events: none;
}

iron-icon.policy {
  margin-inline-start: 10px;
}

cr-policy-pref-indicator {
  margin-inline-end: var(--settings-controlled-by-spacing);
}

.spell-check-radio-group {
  padding-block-end: var(--cr-section-vertical-padding);
}

.spell-check-radio-button {
  --cr-radio-button-label-spacing: calc(
            var(--cr-section-indent-width) - var(--cr-radio-button-size));
}

.spell-check-radio-button.enhanced {
  align-items: start;
        
        --cr-radio-button-disc-margin-block-start: calc(
            (1.5em - var(--cr-radio-button-size)) / 2);
}

.enhanced-spellcheck-description {
  padding-inline-end: 150px;
}

.spell-check-languages .list-item:last-of-type {
  border-bottom: var(--cr-separator-line);
}

div.list-item.non-target .target-info {
  display: none;
}

div.list-item.target ~ div.list-item.target .target-info {
  display: none;
}

#restartButton {
  margin-inline-start: var(--settings-controlled-by-spacing);
}

.external-wrapper {
  display: flex;
}

</style>
    <settings-languages languages="{{languages}}" prefs="{{prefs}}" language-helper="{{languageHelper}}">
    </settings-languages>
    <settings-animated-pages id="pages" section="languages" focus-config="[[focusConfig_]]">
      <div route-path="default">
 <!-- chromeos -->
 <!-- chromeos -->
          <cr-expand-button alt="عرض خيارات اللغة" class="cr-row first" expanded="{{languagesOpened_}}">
            <div>اللغة</div>

            <div class="secondary">
              [[getProspectiveUILanguageName_(languages.prospectiveUILanguage)]]
            </div>

          </cr-expand-button>
          <iron-collapse id="languagesCollapse" opened="[[languagesOpened_]]">
            <div class="cr-row continuation" hidden="[[isHelpTextHidden_(languages.enabled.*)]]">
              <div class="cr-padded-text">
                <span>ترتيب اللغات حسب تفضيلك</span>

              </div>
            </div>
            <div class="list-frame vertical-list">
              <template is="dom-repeat" items="[[languages.enabled]]">
                <div class$="list-item [[getLanguageItemClass_(
                    item.language.code, language.prospectiveUILanguage)]]
                    [[isTranslationTarget_(item.language.code,
                    languages.translateTarget)]]">
                  <div class="start cr-padded-text">
                    <div title="[[item.language.nativeDisplayName]]">
                      [[item.language.displayName]]
                    </div>
                    <div class="target-info secondary">
                      يتم استخدام هذه اللغة عند ترجمة الصفحات
                    </div>

                    <div class="explain-selected" hidden="[[!isProspectiveUILanguage_(
                            item.language.code,
                            languages.prospectiveUILanguage)]]">
                      ‏يتم استخدام هذه اللغة لعرض واجهة مستخدم Google Chrome
                    </div>
 <!-- chromeos or is_win -->
                  </div>

                  <template is="dom-if" if="[[isRestartRequired_(
                      item.language.code, languages.prospectiveUILanguage)]]" restamp="">
                    <cr-button id="restartButton" on-click="onRestartTap_">
                      إعادة تشغيل
                    </cr-button>
                  </template>
 <!-- chromeos or is_win -->
                  <cr-icon-button class="icon-more-vert" title="مزيد من الإجراءات" id="more-[[item.language.code]]" on-click="onDotsTap_"></cr-icon-button>
                </div>
              </template>
              <div class="list-item">
                <a is="action-link" class="list-button" id="addLanguages" disabled="[[!canEnableSomeSupportedLanguage_(languages)]]" on-click="onAddLanguagesTap_">
                  إضافة اللغات
                </a>
              </div>
            </div>
            <settings-toggle-button id="offerTranslateOtherLanguages" pref="{{prefs.translate.enabled}}" label="عرض ترجمة الصفحات المكتوبة بلغة غير لغتك" on-settings-boolean-control-change="onTranslateToggleChange_">
            </settings-toggle-button>
          </iron-collapse>
          <settings-toggle-button id="enableSpellcheckingToggle" class="hr" label="التدقيق الإملائي" sub-label="[[getSpellCheckSubLabel_(spellCheckLanguages_)]]" pref="{{prefs.browser.enable_spellchecking}}" disabled="[[!spellCheckLanguages_.length]]">
          </settings-toggle-button>

          <iron-collapse id="spellCheckCollapse" opened="[[prefs.browser.enable_spellchecking.value]]">

            <div class="cr-row continuation spell-check-radio-group">
              <settings-radio-group class="flex" pref="{{prefs.spellcheck.use_spelling_service}}">
                <controlled-radio-button class="spell-check-radio-button" id="spellingServiceDisable" label="التدقيق الإملائي الأساسي" name="false" pref="[[prefs.spellcheck.use_spelling_service]]">
                </controlled-radio-button>
                <controlled-radio-button class="spell-check-radio-button enhanced" id="spellingServiceEnable" label="تدقيق إملائي مُحسّن" name="true" pref="[[prefs.spellcheck.use_spelling_service]]">
                  <div class="secondary enhanced-spellcheck-description">
                    ‏يُستخدَم المدقق الإملائي نفسه الذي يتم استخدامه في &quot;بحث Google&quot;. يتم إرسال النص الذي تكتبه في المتصفِّح إلى Google.
                  </div>
                </controlled-radio-button>
              </settings-radio-group>
            </div>
 <!-- _google_chrome -->

            <div id="spellCheckLanguagesList" hidden="[[hideSpellCheckLanguages_]]">
              <div class="cr-row continuation">
                استخدام التدقيق الإملائي للّغة
              </div>
              <div class="list-frame vertical-list spell-check-languages">
                <template is="dom-repeat" items="[[spellCheckLanguages_]]">
                  <div class="list-item">
                    <div class="start name-with-error-list" on-click="onSpellCheckNameClick_" actionable="" disabled$="[[isSpellCheckNameClickDisabled_(item,
                            item.*)]]">
                      [[item.language.displayName]]
                      <div hidden="[[!errorsGreaterThan_(
                          item.downloadDictionaryFailureCount, 0)]]">
                        <iron-icon icon="cr:error"></iron-icon>
                        تعذّر تنزيل قاموس التدقيق الإملائي.
                      </div>
                      <div hidden="[[!errorsGreaterThan_(
                          item.downloadDictionaryFailureCount, 1)]]">
                        ‏يُرجى التحقق مع مشرف الشبكة للتأكد من عدم حظر الجدار الناري للتنزيلات من خوادم Google.
                      </div>
                    </div>
                    <cr-button on-click="onRetryDictionaryDownloadClick_" hidden="[[!errorsGreaterThan_(
                            item.downloadDictionaryFailureCount, 0)]]">
                      إعادة المحاولة
                    </cr-button>
                    <template is="dom-if" if="[[!item.isManaged]]">
                      <cr-toggle on-change="onSpellCheckLanguageChange_" disabled="[[!item.language.supportsSpellcheck]]" checked="[[item.spellCheckEnabled]]" aria-label$="[[item.language.displayName]]" hidden="[[errorsGreaterThan_(
                              item.downloadDictionaryFailureCount, 0)]]">
                      </cr-toggle>
                    </template>
                    <template is="dom-if" if="[[item.isManaged]]">
                      <cr-policy-pref-indicator pref="[[getIndicatorPrefForManagedSpellcheckLanguage_(
                              item.spellCheckEnabled)]]" hidden="[[errorsGreaterThan_(
                              item.downloadDictionaryFailureCount, 0)]]">
                      </cr-policy-pref-indicator>
                      <cr-toggle disabled="true" checked="[[item.spellCheckEnabled]]" aria-label$="[[item.language.displayName]]" hidden="[[errorsGreaterThan_(
                              item.downloadDictionaryFailureCount, 0)]]">
                      </cr-toggle>
                    </template>
                  </div>
                </template>
              </div>
            </div>
            <cr-link-row on-click="onEditDictionaryTap_" id="spellCheckSubpageTrigger" label="تخصيص التدقيق الإملائي" role-description="زر صفحة فرعية">
            </cr-link-row>
 <!-- not is_macosx -->
          </iron-collapse>
 <!-- _google_chrome or not is_macosx -->
          <cr-lazy-render id="menu">
            <template>
              <cr-action-menu role-description="قائمة" on-close="onCloseMenu_" class$="[[getMenuClass_(prefs.translate.enabled.value)]]">

                <cr-checkbox id="uiLanguageItem" class="dropdown-item" checked="[[isProspectiveUILanguage_(
                        detailLanguage_.language.code,
                        languages.prospectiveUILanguage)]]" on-change="onUILanguageChange_" disabled="[[disableUILanguageCheckbox_(
                        detailLanguage_, languages.prospectiveUILanguage)]]">
                  <span>‏عرض Google Chrome بهذه اللغة</span>
                  <iron-icon class="policy" icon="cr20:domain" hidden$="[[
                      !detailLanguage_.language.isProhibitedLanguage]]">
                  </iron-icon>
                </cr-checkbox>
 <!-- chromeos or is_win -->
                <cr-checkbox id="offerTranslations" class="dropdown-item" checked="[[detailLanguage_.translateEnabled]]" on-change="onTranslateCheckboxChange_" hidden="[[!prefs.translate.enabled.value]]" disabled="[[disableTranslateCheckbox_(
                        detailLanguage_, languages.translateTarget)]]">
                  عرض ترجمة الصفحات المكتوبة بهذه اللغة
                </cr-checkbox>
                <hr hidden="[[!shouldShowDialogSeparator_(
                    languages.enabled.*)]]">
                <button class="dropdown-item" role="menuitem" on-click="onMoveToTopTap_" hidden="[[isNthLanguage_(
                        0, detailLanguage_, languages.enabled.*)]]">
                  نقل إلى الأعلى
                </button>
                <button class="dropdown-item" role="menuitem" on-click="onMoveUpTap_" hidden="[[!showMoveUp_(detailLanguage_,
                        languages.enabled.*)]]">
                  الانتقال إلى الأعلى
                </button>
                <button class="dropdown-item" role="menuitem" on-click="onMoveDownTap_" hidden="[[!showMoveDown_(
                        detailLanguage_, languages.enabled.*)]]">
                  الانتقال إلى الأسفل
                </button>
                <button class="dropdown-item" role="menuitem" on-click="onRemoveLanguageTap_" hidden="[[!detailLanguage_.removable]]">
                  إزالة
                </button>
              </cr-action-menu>
            </template>
          </cr-lazy-render>
 <!-- chromeos -->
      </div>

      <template is="dom-if" route-path="/editDictionary" no-search="[[!prefs.browser.enable_spellchecking.value]]">
        <settings-subpage associated-control="[[$$('#spellCheckSubpageTrigger')]]" page-title="إدارة التدقيق الإملائي" no-search$="[[!prefs.browser.enable_spellchecking.value]]">
          <settings-edit-dictionary-page></settings-edit-dictionary-page>
        </settings-subpage>
      </template>

    </settings-animated-pages>
    <template is="dom-if" if="[[showAddLanguagesDialog_]]" restamp="">
      <settings-add-languages-dialog languages="{{languages}}" language-helper="[[languageHelper]]" on-close="onAddLanguagesDialogClose_">
      </settings-add-languages-dialog>
    </template>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,PrefsBehavior],properties:{prefs:{type:Object,notify:true},languages:{type:Object,notify:true},languageHelper:Object,spellCheckLanguages_:{type:Array,value(){return[]}},detailLanguage_:Object,hideSpellCheckLanguages_:{type:Boolean,value:false},languagesOpened_:{type:Boolean,observer:"onLanguagesOpenedChanged_"},showAddLanguagesDialog_:Boolean,focusConfig_:{type:Object,value(){const map=new Map;if(routes.EDIT_DICTIONARY){map.set(routes.EDIT_DICTIONARY.path,"#spellCheckSubpageTrigger")}return map}}},languageSettingsMetricsProxy_:null,created(){this.languageSettingsMetricsProxy_=LanguageSettingsMetricsProxyImpl.getInstance()},observers:["updateSpellcheckLanguages_(languages.enabled.*, "+"languages.forcedSpellCheckLanguages.*)","updateSpellcheckEnabled_(prefs.browser.enable_spellchecking.*)"],isChangeInProgress_:false,errorsGreaterThan_(downloadDictionaryFailureCount,threshold){return downloadDictionaryFailureCount>threshold},onAddLanguagesTap_(e){e.preventDefault();this.languageSettingsMetricsProxy_.recordSettingsMetric(LanguageSettingsActionType.CLICK_ON_ADD_LANGUAGE);this.showAddLanguagesDialog_=true},onAddLanguagesDialogClose_(){this.showAddLanguagesDialog_=false;focusWithoutInk(assert(this.$$("#addLanguages")))},canEnableSomeSupportedLanguage_(languages){return languages===undefined||languages.supported.some((language=>this.languageHelper.canEnableLanguage(language)))},shouldShowDialogSeparator_(){return this.languages!==undefined&&this.languages.enabled.length>1},isNthLanguage_(n){if(this.languages===undefined||this.detailLanguage_===undefined){return false}if(n>=this.languages.enabled.length){return false}const compareLanguage=assert(this.languages.enabled[n]);return this.detailLanguage_.language===compareLanguage.language},showMoveUp_(){return!this.isNthLanguage_(0)&&!this.isNthLanguage_(1)},showMoveDown_(){return this.languages!==undefined&&!this.isNthLanguage_(this.languages.enabled.length-1)},isHelpTextHidden_(change){return this.languages!==undefined&&this.languages.enabled.length<=1},isTranslationTarget_(languageCode,translateTarget){if(this.languageHelper.convertLanguageCodeForTranslate(languageCode)===translateTarget){return"target"}else{return"non-target"}},onTranslateToggleChange_(e){this.languageSettingsMetricsProxy_.recordSettingsMetric(e.target.checked?LanguageSettingsActionType.ENABLE_TRANSLATE_GLOBALLY:LanguageSettingsActionType.DISABLE_TRANSLATE_GLOBALLY)},isSecondaryUser_(){return isChromeOS&&loadTimeData.getBoolean("isSecondaryUser")},isRestartRequired_(languageCode,prospectiveUILanguage){return prospectiveUILanguage===languageCode&&this.languageHelper.requiresRestart()},onCloseMenu_(){if(!this.isChangeInProgress_){return}flush();this.isChangeInProgress_=false;const restartButton=this.$$("#restartButton");if(!restartButton){return}focusWithoutInk(restartButton)},disableUILanguageCheckbox_(languageState,prospectiveUILanguage){if(this.detailLanguage_===undefined){return true}if(this.isSecondaryUser_()){return true}if(!languageState.language.supportsUI){return true}if(languageState.language.code===prospectiveUILanguage){return true}if(languageState.language.isProhibitedLanguage){return true}return false},onUILanguageChange_(e){assert(e.target.checked);this.isChangeInProgress_=true;this.languageHelper.setProspectiveUILanguage(this.detailLanguage_.language.code);this.languageHelper.moveLanguageToFront(this.detailLanguage_.language.code);this.closeMenuSoon_()},isProspectiveUILanguage_(languageCode,prospectiveUILanguage){return languageCode===prospectiveUILanguage},getProspectiveUILanguageName_(prospectiveUILanguage){return this.languageHelper.getLanguage(prospectiveUILanguage).displayName},onRestartTap_(){LifetimeBrowserProxyImpl.getInstance().restart()},disableTranslateCheckbox_(languageState,targetLanguageCode){if(languageState===undefined||languageState.language===undefined||!languageState.language.supportsTranslate){return true}if(this.languageHelper.isOnlyTranslateBlockedLanguage(languageState)){return true}return this.languageHelper.convertLanguageCodeForTranslate(languageState.language.code)===targetLanguageCode},onTranslateCheckboxChange_(e){if(e.target.checked){this.languageHelper.enableTranslateLanguage(this.detailLanguage_.language.code);this.languageSettingsMetricsProxy_.recordSettingsMetric(LanguageSettingsActionType.ENABLE_TRANSLATE_FOR_SINGLE_LANGUAGE)}else{this.languageHelper.disableTranslateLanguage(this.detailLanguage_.language.code);this.languageSettingsMetricsProxy_.recordSettingsMetric(LanguageSettingsActionType.DISABLE_TRANSLATE_FOR_SINGLE_LANGUAGE)}this.closeMenuSoon_()},getMenuClass_(translateEnabled){if(translateEnabled||isChromeOS||isWindows){return"complex"}return""},onMoveToTopTap_(){this.$$("#menu").get().close();this.languageHelper.moveLanguageToFront(this.detailLanguage_.language.code);this.languageSettingsMetricsProxy_.recordSettingsMetric(LanguageSettingsActionType.LANGUAGE_LIST_REORDERED)},onMoveUpTap_(){this.$$("#menu").get().close();this.languageHelper.moveLanguage(this.detailLanguage_.language.code,true);this.languageSettingsMetricsProxy_.recordSettingsMetric(LanguageSettingsActionType.LANGUAGE_LIST_REORDERED)},onMoveDownTap_(){this.$$("#menu").get().close();this.languageHelper.moveLanguage(this.detailLanguage_.language.code,false);this.languageSettingsMetricsProxy_.recordSettingsMetric(LanguageSettingsActionType.LANGUAGE_LIST_REORDERED)},onRemoveLanguageTap_(){this.$$("#menu").get().close();this.languageHelper.disableLanguage(this.detailLanguage_.language.code);this.languageSettingsMetricsProxy_.recordSettingsMetric(LanguageSettingsActionType.LANGUAGE_REMOVED)},getIndicatorPrefForManagedSpellcheckLanguage_(isEnabled){return isEnabled?this.get("spellcheck.forced_dictionaries",this.prefs):this.get("spellcheck.blocked_dictionaries",this.prefs)},getSpellCheckLanguages_(){const supportedSpellcheckLanguages=this.languages.enabled.filter((item=>item.language.supportsSpellcheck));const supportedSpellcheckLanguagesSet=new Set(supportedSpellcheckLanguages.map((x=>x.language.code)));this.languages.forcedSpellCheckLanguages.forEach((forcedLanguage=>{if(!supportedSpellcheckLanguagesSet.has(forcedLanguage.language.code)){supportedSpellcheckLanguages.push(forcedLanguage)}}));return supportedSpellcheckLanguages},updateSpellcheckLanguages_(){if(this.languages===undefined){return}this.set("spellCheckLanguages_",this.getSpellCheckLanguages_());for(let i=0;i<this.spellCheckLanguages_.length;i++){this.notifyPath(`spellCheckLanguages_.${i}.isManaged`);this.notifyPath(`spellCheckLanguages_.${i}.spellCheckEnabled`);this.notifyPath(`spellCheckLanguages_.${i}.downloadDictionaryFailureCount`)}if(this.spellCheckLanguages_.length===0){this.setPrefValue("browser.enable_spellchecking",false)}if(this.spellCheckLanguages_.length===1){const singleLanguage=this.spellCheckLanguages_[0];this.hideSpellCheckLanguages_=!singleLanguage.isManaged&&singleLanguage.downloadDictionaryFailureCount===0}else{this.hideSpellCheckLanguages_=false}},updateSpellcheckEnabled_(){if(this.prefs===undefined){return}if(this.spellCheckLanguages_.length===1){this.languageHelper.toggleSpellCheck(this.spellCheckLanguages_[0].language.code,!!this.getPref("browser.enable_spellchecking").value)}},onEditDictionaryTap_(){Router.getInstance().navigateTo(routes.EDIT_DICTIONARY)},onSpellCheckLanguageChange_(e){const item=e.model.item;if(!item.language.supportsSpellcheck){return}this.languageHelper.toggleSpellCheck(item.language.code,!item.spellCheckEnabled)},onRetryDictionaryDownloadClick_(e){assert(this.errorsGreaterThan_(e.model.item.downloadDictionaryFailureCount,0));this.languageHelper.retryDownloadDictionary(e.model.item.language.code)},onSpellCheckNameClick_(e){assert(!this.isSpellCheckNameClickDisabled_(e.model.item));this.onSpellCheckLanguageChange_(e)},isSpellCheckNameClickDisabled_(item){return item.isManaged||!item.language.supportsSpellcheck||item.downloadDictionaryFailureCount>0},getLanguageItemClass_(languageCode,prospectiveUILanguage){if((isChromeOS||isWindows)&&languageCode===prospectiveUILanguage){return"selected"}return""},getSpellCheckSubLabel_(){if(this.spellCheckLanguages_.length===0){return this.i18n("spellCheckDisabledReason")}return undefined},onDotsTap_(e){this.detailLanguage_=Object.assign({},e.model.item);let menu=this.$$("#menu").getIfExists();if(!menu){menu=this.$$("#menu").get()}menu.showAt(e.target)},onLanguagesOpenedChanged_(newVal,oldVal){if(!oldVal&&newVal){chrome.send("metricsHandler:recordBooleanHistogram",[LANGUAGE_SETTING_IS_SHOWN_UMA_NAME,true])}},closeMenuSoon_(){const menu=this.$$("#menu").get();setTimeout((function(){if(menu.open){menu.close()}}),kMenuCloseDelay)},toggleExpandButton_(e){const expandButtonTag="CR-EXPAND-BUTTON";if(e.target.tagName===expandButtonTag){return}if(!e.currentTarget.hasAttribute("actionable")){return}const expandButton=e.currentTarget.querySelector(expandButtonTag);assert(expandButton);expandButton.expanded=!expandButton.expanded;focusWithoutInk(expandButton)}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-reset-profile-dialog",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared action-link" scope="settings-reset-profile-dialog">paper-spinner-lite {
  margin: 0 8px;
}

#dialog-body {
  padding-bottom: 2px;
}

</style>
    <cr-dialog id="dialog" close-text="إغلاق" ignore-popstate="" ignore-enter-key="">
      <div slot="title">
        [[getPageTitle_(isTriggered_, triggeredResetToolName_)]]
      </div>
      <div id="dialog-body" slot="body">
        <span inner-h-t-m-l="
          [[getExplanationText_(isTriggered_, triggeredResetToolName_)]]">
        </span>
        <span>
          <a href="https://support.google.com/chrome/?p=ui_reset_settings" target="_blank">
            مزيد من المعلومات
          </a>
        </span>
      </div>
      <div slot="button-container">
        <paper-spinner-lite id="resetSpinner" active="[[clearingInProgress_]]">
        </paper-spinner-lite>
        <cr-button class="cancel-button" on-click="onCancelTap_" id="cancel" disabled="[[clearingInProgress_]]">
          إلغاء
        </cr-button>
        <cr-button class="action-button" on-click="onResetTap_" id="reset" disabled="[[clearingInProgress_]]">
          إعادة ضبط الإعدادات
        </cr-button>
      </div>
      <div slot="footer">
        <cr-checkbox id="sendSettings" checked="">
          ‏يمكنك المساعدة في تحسين Chrome بالإبلاغ عن <a is="action-link" target="_blank">الإعدادات الحالية</a></cr-checkbox>
      </div>
    </cr-dialog>
<!--_html_template_end_-->`,behaviors:[WebUIListenerBehavior,I18nBehavior],properties:{isTriggered_:{type:Boolean,value:false},triggeredResetToolName_:{type:String,value:""},resetRequestOrigin_:String,clearingInProgress_:{type:Boolean,value:false}},browserProxy_:null,getExplanationText_(){if(this.isTriggered_){return loadTimeData.getStringF("triggeredResetPageExplanation",this.triggeredResetToolName_)}if(loadTimeData.getBoolean("showExplanationWithBulletPoints")){return this.i18nAdvanced("resetPageExplanationBulletPoints",{substitutions:[],tags:["LINE_BREAKS","LINE_BREAK"]})}return loadTimeData.getStringF("resetPageExplanation")},getPageTitle_(){if(this.isTriggered_){return loadTimeData.getStringF("triggeredResetPageTitle",this.triggeredResetToolName_)}return loadTimeData.getStringF("resetDialogTitle")},ready(){this.browserProxy_=ResetBrowserProxyImpl.getInstance();this.addEventListener("cancel",(()=>{this.browserProxy_.onHideResetProfileDialog()}));this.$$("cr-checkbox a").addEventListener("click",this.onShowReportedSettingsTap_.bind(this))},showDialog_(){if(!this.$.dialog.open){this.$.dialog.showModal()}this.browserProxy_.onShowResetProfileDialog()},show(){this.isTriggered_=Router.getInstance().getCurrentRoute()===routes.TRIGGERED_RESET_DIALOG;if(this.isTriggered_){this.browserProxy_.getTriggeredResetToolName().then((name=>{this.resetRequestOrigin_="triggeredreset";this.triggeredResetToolName_=name;this.showDialog_()}))}else{const origin=window.location.hash.slice(1).toLowerCase()==="cct"?"cct":Router.getInstance().getQueryParameters().get("origin");this.resetRequestOrigin_=origin||"";this.showDialog_()}},onCancelTap_(){this.cancel()},cancel(){if(this.$.dialog.open){this.$.dialog.cancel()}},onResetTap_(){this.clearingInProgress_=true;this.browserProxy_.performResetProfileSettings(this.$.sendSettings.checked,this.resetRequestOrigin_).then((()=>{this.clearingInProgress_=false;if(this.$.dialog.open){this.$.dialog.close()}this.fire("reset-done")}))},onShowReportedSettingsTap_(e){this.browserProxy_.showReportedSettings();e.stopPropagation()}});// Copyright 2017 The Chromium Authors. All rights reserved.
const CHROME_CLEANUP_DEFAULT_ITEMS_TO_SHOW=4;Polymer({is:"items-to-remove-list",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="items-to-remove-list">:host {
  display: block;
        margin: 0;
        padding: 0 var(--cr-section-padding);
        word-break: break-all;
}

#more-items-link {
  color: var(--cr-link-color);
        cursor: pointer;
}

#remaining-list :first-child {
  margin-top: -1em;
}

.highlight-suffix {
  font-weight: bold;
}

</style>
    <div id="title" class="secondary">[[title]]</div>
    <ul class="secondary">
      <template is="dom-repeat" items="[[initialItems_]]">
        <li class="visible-item">
          <span>[[item.text]]</span><!--
       --><span class="highlight-suffix" hidden="[[!hasHighlightSuffix_(item)]]"><!--
         -->[[item.highlightSuffix]]
          </span>
        </li>
      </template>
      <li id="more-items-link" hidden="[[expanded_]]" on-click="expandList_">
        [[moreItemsLinkText_]]
      </li>
    </ul>
    <!-- Remaining items are kept in a separate <ul> element so that screen
         readers don't get confused when the list is expanded. If new items are
         simply added to the first <ul> element, the first new item (which will
         replace the "N more" link), will be skipped by the reader. As a
         consequence, visual impaired users will only have a chance to inspect
         that item if they move up on the list, which can't be considered an
         expected action. -->
    <ul id="remaining-list" hidden="[[!expanded_]]" class="secondary">
      <template is="dom-repeat" items="[[remainingItems_]]">
        <li class$="[[remainingItemsClass_(expanded_)]]">
          <span>[[item.text]]</span><!--
       --><span class="highlight-suffix" hidden="[[!hasHighlightSuffix_(item)]]"><!--
         -->[[item.highlightSuffix]]
          </span>
        </li>
      </template>
    </ul>
<!--_html_template_end_-->`,properties:{title:{type:String,value:""},itemsToShow:{type:Array,observer:"updateVisibleState_"},expanded_:{type:Boolean,value:false},initialItems_:Array,remainingItems_:Array,moreItemsLinkText_:{type:String,value:""}},expandList_(){this.expanded_=true;this.moreItemsLinkText_=""},updateVisibleState_(itemsToShow){this.expanded_=itemsToShow.length<=CHROME_CLEANUP_DEFAULT_ITEMS_TO_SHOW;if(this.expanded_){this.initialItems_=itemsToShow;this.remainingItems_=[];this.moreItemsLinkText_="";return}this.initialItems_=itemsToShow.slice(0,CHROME_CLEANUP_DEFAULT_ITEMS_TO_SHOW-1);this.remainingItems_=itemsToShow.slice(CHROME_CLEANUP_DEFAULT_ITEMS_TO_SHOW-1);const browserProxy=ChromeCleanupProxyImpl.getInstance();browserProxy.getMoreItemsPluralString(this.remainingItems_.length).then((linkText=>{this.moreItemsLinkText_=linkText}))},remainingItemsClass_(expanded){return expanded?"visible-item":"hidden-item"},hasHighlightSuffix_(item){return item.highlightSuffix!==null}});// Copyright 2015 The Chromium Authors. All rights reserved.
const ChromeCleanupIdleReason={INITIAL:"initial",REPORTER_FOUND_NOTHING:"reporter_found_nothing",REPORTER_FAILED:"reporter_failed",SCANNING_FOUND_NOTHING:"scanning_found_nothing",SCANNING_FAILED:"scanning_failed",CONNECTION_LOST:"connection_lost",USER_DECLINED_CLEANUP:"user_declined_cleanup",CLEANING_FAILED:"cleaning_failed",CLEANING_SUCCEEDED:"cleaning_succeeded",CLEANER_DOWNLOAD_FAILED:"cleaner_download_failed"};const ChromeCleanerCardState={SCANNING_OFFERED:"scanning_offered",SCANNING:"scanning",CLEANUP_OFFERED:"cleanup_offered",CLEANING:"cleaning",REBOOT_REQUIRED:"reboot_required",SCANNING_FOUND_NOTHING:"scanning_found_nothing",SCANNING_FAILED:"scanning_failed",CLEANUP_SUCCEEDED:"cleanup_succeeded",CLEANING_FAILED:"cleanup_failed",CLEANER_DOWNLOAD_FAILED:"cleaner_download_failed"};const ChromeCleanupCardFlags={NONE:0,SHOW_LOGS_PERMISSIONS:1<<0,WAITING_FOR_RESULT:1<<1,SHOW_ITEMS_TO_REMOVE:1<<2,SHOW_NOTIFICATION_PERMISSION:1<<3};const ChromeCleanupOngoingAction={NONE:0,SCANNING:1,CLEANING:2};Polymer({is:"settings-chrome-cleanup-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-chrome-cleanup-page">#status-title {
  font-weight: 500;
}

#waiting-spinner {
  flex-shrink: 0;
        height: 2.0em;
        width: 2.0em;
}

#powered-by-logo > svg {
  height: 22px;
}

</style>
    <div class="cr-row first">
      <div class="flex">
        <div id="status-title" role="status" inner-h-t-m-l="[[title_]]"></div>
        <div hidden="[[!showExplanation_]]">
          <span class="secondary">[[explanation_]]</span>
        </div>
      </div>
      <paper-spinner-lite id="waiting-spinner" hidden="[[!isWaitingForResult_]]" active="[[isWaitingForResult_]]">
      </paper-spinner-lite>
      <template is="dom-if" if="[[showActionButton_]]">
        <cr-policy-pref-indicator pref="[[prefs.software_reporter.enabled]]">
        </cr-policy-pref-indicator>
        <div class="separator"></div>
        <cr-button id="action-button" class="action-button" disabled$="[[!cleanupEnabled_]]" on-click="proceed_">
          [[actionButtonLabel_]]
        </cr-button>
      </template>
    </div>
    <div class="cr-row continuation">
      <settings-checkbox hidden="[[!showLogsPermission_]]" id="chromeCleanupLogsUploadControl" sub-label="‏إبلاغ Google بالتفاصيل حول البرامج الضارّة وإعدادات النظام والعمليات التي تم العثور عليها على جهاز الكمبيوتر أثناء إزالة البرامج غير المرغوب فيها." pref="{{prefs.software_reporter.reporting}}" disabled$="[[!cleanupEnabled_]]">
      </settings-checkbox>
    </div>
    <div class="cr-row continuation">
      <settings-checkbox hidden="[[!showNotificationPermission_]]" id="chromeCleanupShowNotificationControl" pref="{{notificationEnabledPref_}}" sub-label="‏إبلاغي عند انتهاء Chrome من البحث عن البرامج الضارَّة" disabled$="[[!cleanupEnabled_]]">
      </settings-checkbox>
    </div>
    <cr-expand-button alt="[[showItemsLinkLabel_]]" class="cr-row" expanded="{{itemsToRemoveSectionExpanded_}}" hidden="[[!showItemsToRemove_]]" id="show-items-button">
      [[showItemsLinkLabel_]]
    </cr-expand-button>
    <iron-collapse id="iron-collapse-items" opened="[[itemsToRemoveSectionExpanded_]]">
      <items-to-remove-list id="files-to-remove-list" hidden="[[!hasFilesToShow_]]" title="الملفات والبرامج التي تم وضعها في وحدة العزل:" items-to-show="[[
              getListEntriesFromFilePaths_(scannerResults_.files)]]">
      </items-to-remove-list>
      <items-to-remove-list id="registry-keys-list" hidden="[[!hasRegistryKeysToShow_]]" title="إدخالات قاعدة بيانات المسجّلين التي ستتم إزالتها أو تغييرها:" items-to-show="[[
              getListEntriesFromStrings_(scannerResults_.registryKeys)]]">
      </items-to-remove-list>
      <items-to-remove-list id="extensions-list" hidden="[[!hasExtensionsToShow_]]" title="الإضافات التي ستتم إزالتها:" items-to-show="[[
              getListEntriesFromStrings_(scannerResults_.extensions)]]">
      </items-to-remove-list>
      <div class="cr-row continuation">
        <div class="secondary">
          ‏ستتم أيضًا إزالة العناصر غير المدرجة هنا إذا لزم الأمر. يمكنك الاطلاع على مزيد من المعلومات عن <a href="https://www.google.ca/chrome/browser/privacy/whitepaper.html#unwantedsoftware">الحماية من البرامج غير المرغوب فيها</a> في المستند التقني لخصوصية Chrome.
        </div>
      </div>
      <div id="powered-by" class="cr-row continuation" hidden="[[!isPoweredByPartner_]]">
        تم التشغيل من قبل <span id='powered-by-logo'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 58.1 23.6" role="img" aria-labelled-by="chrome_cleanup_powered_by_company_title">
  <title id="chrome_cleanup_powered_by_company_title">ESET</title>
  <style type="text/css">.st0{fill:#0096A1;}</style>
  <path class="st0" d="M19.8,13.9c-0.5,0-1.1,0-1.1-0.8h-2.1c0,1.4,0.7,1.9,2,2c0.4,0,0.8,0,1.3,0c1.8,0,3.3-0.3,3.3-2.2s-1-1.9-3.3-2c-1.1,0-1.2-0.3-1.2-0.6s0-0.6,1.2-0.6c0.4,0,0.9,0,0.9,0.6h2v-0.2c0-1.6-1.7-1.6-2.9-1.6c-1.9,0-3.3,0-3.3,2.1c0,1.3,0.5,1.9,3.3,1.9c0.3,0,0.6,0,0.9,0.1c0.2,0.1,0.3,0.3,0.3,0.6C21,13.8,20.8,13.9,19.8,13.9z"/>
  <path class="st0" d="M29.2,9.8c-0.9,0-1.1,0.3-1.1,1.2h2.3v0C30.4,10,30,9.8,29.2,9.8z"/>
  <path class="st0" d="M8.6,11.8c0,2.4,0.6,3.3,3.3,3.3c0.8,0.1,1.6,0,2.4-0.3c0.6-0.4,1-1.1,0.9-1.8h-2.1c0,0.7-0.5,0.8-1.2,0.8c-1,0-1.1-0.4-1.1-1.6l0,0h4.4v-0.4c0-2.7-0.7-3.3-3.2-3.3C9.2,8.5,8.6,9.3,8.6,11.8z M11.8,9.9C12.6,9.9,13,10,13,11l0,0h-2.3C10.8,10.2,10.9,9.9,11.8,9.9z"/>
  <path class="st0" d="M41.7,7.2c-0.9-1.5-2.6-2.3-4.3-2.3H9.8C8,4.8,6.4,5.7,5.5,7.2c-0.7,1.5-1,3.1-0.9,4.7c-0.1,1.6,0.2,3.2,0.9,4.7C6.4,18,8,18.9,9.8,18.8h27.5c1.8,0,3.4-0.8,4.3-2.3c0.7-1.5,1-3.1,0.9-4.7C42.6,10.2,42.3,8.6,41.7,7.2z M24.3,17.6H10.1c-1.1,0-2.2-0.5-3.1-1.2c-1.1-1.1-1.3-2.9-1.3-4.5S6,8.4,7.1,7.3C7.9,6.5,9,6.1,10.1,6.1h14.2V17.6z M32.5,12.1h-4.4v0.1c0,1.2,0.2,1.6,1.2,1.6c0.7,0,1.2-0.1,1.2-0.8h2c0.1,0.7-0.3,1.4-0.9,1.8c-0.7,0.3-1.5,0.4-2.3,0.4c-2.6,0-3.2-0.9-3.2-3.3s0.6-3.3,3.2-3.3c2.5,0,3.2,0.7,3.2,3.3L32.5,12.1z M39,10h-1.5v5.1h-2.1V10h-1.5V8.5H39L39,10z"/>
  <path class="st0" d="M49.9,9.5c0.3-0.1,0.5-0.3,0.7-0.5c0.2-0.2,0.3-0.5,0.3-0.8c0-0.2,0-0.4-0.1-0.6c-0.1-0.2-0.3-0.3-0.4-0.4c-0.2-0.1-0.4-0.2-0.5-0.2c-0.2,0-0.5,0-0.7,0h-1.4v4.3h0.9V9.8h0.7l1.3,1.6h1.1L49.9,9.5z M49.8,8.6c-0.1,0.1-0.1,0.2-0.2,0.2C49.5,8.9,49.3,9,49.2,9c-0.2,0-0.4,0-0.5,0h-0.3V7.8h0.4h0.4c0.1,0,0.2,0,0.4,0.1c0.1,0,0.2,0.1,0.2,0.2c0,0.1,0.1,0.2,0.1,0.3C49.8,8.4,49.8,8.5,49.8,8.6z"/>
  <path class="st0" d="M52.2,6.2c-1.7-1.8-4.6-1.8-6.3,0c0,0,0,0,0,0c-0.9,0.8-1.3,2-1.3,3.2c0,1.2,0.5,2.3,1.3,3.2c1.8,1.8,4.6,1.8,6.3,0c0,0,0,0,0,0c0.9-0.8,1.3-2,1.3-3.2C53.6,8.1,53.1,7,52.2,6.2z M51.8,12.2c-1.5,1.5-3.9,1.6-5.5,0.1c0,0,0,0-0.1-0.1c-0.8-0.7-1.2-1.8-1.2-2.8c0-1,0.4-2,1.2-2.8C47.8,5,50.2,5,51.8,6.5c0,0,0,0,0.1,0.1C52.6,7.3,53,8.3,53,9.3C53,10.4,52.6,11.4,51.8,12.2L51.8,12.2z"/>
</svg>
</span>
      </div>
    </iron-collapse>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{prefs:{type:Object,notify:true},title_:{type:String,value:""},explanation_:{type:String,value:""},isWaitingForResult_:{type:Boolean,value:""},showActionButton_:{type:Boolean,value:false},cleanupEnabled_:{type:Boolean,value:true},actionButtonLabel_:{type:String,value:""},showExplanation_:{type:Boolean,computed:"computeShowExplanation_(explanation_)"},showLogsPermission_:{type:Boolean,value:false},showNotificationPermission_:{type:Boolean,value:false},showItemsToRemove_:{type:Boolean,value:false},itemsToRemoveSectionExpanded_:{type:Boolean,value:false,observer:"itemsToRemoveSectionExpandedChanged_"},showItemsLinkLabel_:{type:String,value:""},showingAllFiles_:{type:Boolean,value:false},scannerResults_:{type:Array,value(){return{files:[],registryKeys:[],extensions:[]}}},hasFilesToShow_:{type:Boolean,computed:"computeHasFilesToShow_(scannerResults_)"},hasRegistryKeysToShow_:{type:Boolean,computed:"computeHasRegistryKeysToShow_(scannerResults_)"},hasExtensionsToShow_:{type:Boolean,computed:"computeHasExtensionsToShow_(scannerResults_)"},logsUploadPref_:{type:Object,value(){return{}}},isPoweredByPartner_:{type:Boolean,value:false},notificationEnabledPref_:{type:Object,value(){return{type:chrome.settingsPrivate.PrefType.BOOLEAN,value:false}}}},emptyChromeCleanerScannerResults_:{files:[],registryKeys:[],extensions:[]},browserProxy_:null,doAction_:null,cardStateToComponentsMap_:null,ongoingAction_:ChromeCleanupOngoingAction.NONE,renderScanOfferedByDefault_:true,attached(){this.browserProxy_=ChromeCleanupProxyImpl.getInstance();this.cardStateToComponentsMap_=this.buildCardStateToComponentsMap_();this.addWebUIListener("chrome-cleanup-on-idle",this.onIdle_.bind(this));this.addWebUIListener("chrome-cleanup-on-scanning",this.onScanning_.bind(this));this.addWebUIListener("chrome-cleanup-on-reporter-running",this.onScanning_.bind(this));this.addWebUIListener("chrome-cleanup-on-infected",this.onInfected_.bind(this));this.addWebUIListener("chrome-cleanup-on-cleaning",this.onCleaning_.bind(this));this.addWebUIListener("chrome-cleanup-on-reboot-required",this.onRebootRequired_.bind(this));this.addWebUIListener("chrome-cleanup-enabled-change",this.onCleanupEnabledChange_.bind(this));this.browserProxy_.registerChromeCleanerObserver()},proceed_(){this.doAction_()},itemsToRemoveSectionExpandedChanged_(newVal,oldVal){if(!oldVal&&newVal){this.browserProxy_.notifyShowDetails(this.itemsToRemoveSectionExpanded_)}},computeShowExplanation_(explanation){return explanation!==""},computeHasFilesToShow_(scannerResults){return scannerResults.files.length>0},computeHasRegistryKeysToShow_(scannerResults){return scannerResults.registryKeys.length>0},computeHasExtensionsToShow_(scannerResults){return scannerResults.extensions.length>0},onIdle_(idleReason){this.ongoingAction_=ChromeCleanupOngoingAction.NONE;this.scannerResults_=this.emptyChromeCleanerScannerResults_;if(this.renderScanOfferedByDefault_){idleReason=ChromeCleanupIdleReason.INITIAL}switch(idleReason){case ChromeCleanupIdleReason.INITIAL:this.renderCleanupCard_(ChromeCleanerCardState.SCANNING_OFFERED);break;case ChromeCleanupIdleReason.SCANNING_FOUND_NOTHING:case ChromeCleanupIdleReason.REPORTER_FOUND_NOTHING:this.renderCleanupCard_(ChromeCleanerCardState.SCANNING_FOUND_NOTHING);break;case ChromeCleanupIdleReason.SCANNING_FAILED:case ChromeCleanupIdleReason.REPORTER_FAILED:this.renderCleanupCard_(ChromeCleanerCardState.SCANNING_FAILED);break;case ChromeCleanupIdleReason.CONNECTION_LOST:if(this.ongoingAction_===ChromeCleanupOngoingAction.SCANNING){this.renderCleanupCard_(ChromeCleanerCardState.SCANNING_FAILED)}else{assert(this.ongoingAction_===ChromeCleanupOngoingAction.CLEANING);this.renderCleanupCard_(ChromeCleanerCardState.CLEANING_FAILED)}break;case ChromeCleanupIdleReason.CLEANING_FAILED:case ChromeCleanupIdleReason.USER_DECLINED_CLEANUP:this.renderCleanupCard_(ChromeCleanerCardState.CLEANING_FAILED);break;case ChromeCleanupIdleReason.CLEANING_SUCCEEDED:this.renderCleanupCard_(ChromeCleanerCardState.CLEANUP_SUCCEEDED);break;case ChromeCleanupIdleReason.CLEANER_DOWNLOAD_FAILED:this.renderCleanupCard_(ChromeCleanerCardState.CLEANER_DOWNLOAD_FAILED);break;default:assert(false,`Unknown idle reason: ${idleReason}`)}},onScanning_(){this.ongoingAction_=ChromeCleanupOngoingAction.SCANNING;this.scannerResults_=this.emptyChromeCleanerScannerResults_;this.renderScanOfferedByDefault_=false;this.renderCleanupCard_(ChromeCleanerCardState.SCANNING)},onInfected_(isPoweredByPartner,scannerResults){this.isPoweredByPartner_=isPoweredByPartner;this.ongoingAction_=ChromeCleanupOngoingAction.NONE;this.renderScanOfferedByDefault_=false;this.scannerResults_=scannerResults;this.updateShowItemsLinklabel_();this.renderCleanupCard_(ChromeCleanerCardState.CLEANUP_OFFERED)},onCleaning_(isPoweredByPartner,scannerResults){this.isPoweredByPartner_=isPoweredByPartner;this.ongoingAction_=ChromeCleanupOngoingAction.CLEANING;this.renderScanOfferedByDefault_=false;this.scannerResults_=scannerResults;this.updateShowItemsLinklabel_();this.renderCleanupCard_(ChromeCleanerCardState.CLEANING)},onRebootRequired_(){this.ongoingAction_=ChromeCleanupOngoingAction.NONE;this.scannerResults_=this.emptyChromeCleanerScannerResults_;this.renderScanOfferedByDefault_=false;this.renderCleanupCard_(ChromeCleanerCardState.REBOOT_REQUIRED)},renderCleanupCard_(state){const components=this.cardStateToComponentsMap_.get(state);assert(components);this.title_=components.title||"";this.explanation_=components.explanation||"";this.updateActionButton_(components.actionButton);this.updateCardFlags_(components.flags)},updateActionButton_(actionButton){if(!actionButton){this.showActionButton_=false;this.actionButtonLabel_="";this.doAction_=null}else{this.showActionButton_=true;this.actionButtonLabel_=actionButton.label;this.doAction_=actionButton.doAction}},updateCardFlags_(flags){this.showLogsPermission_=(flags&ChromeCleanupCardFlags.SHOW_LOGS_PERMISSIONS)!==0;this.isWaitingForResult_=(flags&ChromeCleanupCardFlags.WAITING_FOR_RESULT)!==0;this.showItemsToRemove_=(flags&ChromeCleanupCardFlags.SHOW_ITEMS_TO_REMOVE)!==0;this.showNotificationPermission_=(flags&ChromeCleanupCardFlags.SHOW_NOTIFICATION_PERMISSION)!==0&&loadTimeData.valueExists("chromeCleanupScanCompletedNotificationEnabled")&&loadTimeData.getBoolean("chromeCleanupScanCompletedNotificationEnabled");if(!this.showExplanation_||!this.showItemsToRemove_){this.itemsToRemoveSectionExpanded_=false}},onCleanupEnabledChange_(enabled){this.cleanupEnabled_=enabled},startScanning_(){this.browserProxy_.startScanning(this.$.chromeCleanupLogsUploadControl.checked,this.$.chromeCleanupShowNotificationControl.checked)},startCleanup_(){this.browserProxy_.startCleanup(this.$.chromeCleanupLogsUploadControl.checked)},restartComputer_(){this.browserProxy_.restartComputer()},updateShowItemsLinklabel_(){const setShowItemsLabel=text=>this.showItemsLinkLabel_=text;this.browserProxy_.getItemsToRemovePluralString(this.scannerResults_.files.length+this.scannerResults_.registryKeys.length+this.scannerResults_.extensions.length).then(setShowItemsLabel)},buildCardStateToComponentsMap_(){const actionButtons={FIND:{label:this.i18n("chromeCleanupFindButtonLabel"),doAction:this.startScanning_.bind(this)},REMOVE:{label:this.i18n("chromeCleanupRemoveButtonLabel"),doAction:this.startCleanup_.bind(this)},RESTART_COMPUTER:{label:this.i18n("chromeCleanupRestartButtonLabel"),doAction:this.restartComputer_.bind(this)},TRY_SCAN_AGAIN:{label:this.i18n("chromeCleanupTitleTryAgainButtonLabel"),doAction:this.startScanning_.bind(this)}};return new Map([[ChromeCleanerCardState.CLEANUP_OFFERED,{title:this.i18n("chromeCleanupTitleRemove"),explanation:this.i18n("chromeCleanupExplanationRemove"),actionButton:actionButtons.REMOVE,flags:ChromeCleanupCardFlags.SHOW_LOGS_PERMISSIONS|ChromeCleanupCardFlags.SHOW_ITEMS_TO_REMOVE}],[ChromeCleanerCardState.CLEANING,{title:this.i18n("chromeCleanupTitleRemoving"),explanation:this.i18n("chromeCleanupExplanationRemoving"),actionButton:null,flags:ChromeCleanupCardFlags.WAITING_FOR_RESULT|ChromeCleanupCardFlags.SHOW_ITEMS_TO_REMOVE}],[ChromeCleanerCardState.REBOOT_REQUIRED,{title:this.i18n("chromeCleanupTitleRestart"),explanation:null,actionButton:actionButtons.RESTART_COMPUTER,flags:ChromeCleanupCardFlags.NONE}],[ChromeCleanerCardState.CLEANUP_SUCCEEDED,{title:this.i18nAdvanced("chromeCleanupTitleRemoved",{tags:["a"]}),explanation:null,actionButton:null,flags:ChromeCleanupCardFlags.NONE}],[ChromeCleanerCardState.CLEANING_FAILED,{title:this.i18n("chromeCleanupTitleErrorCantRemove"),explanation:this.i18n("chromeCleanupExplanationCleanupError"),actionButton:null,flags:ChromeCleanupCardFlags.NONE}],[ChromeCleanerCardState.SCANNING_OFFERED,{title:this.i18n("chromeCleanupTitleFindAndRemove"),explanation:this.i18n("chromeCleanupExplanationFindAndRemove"),actionButton:actionButtons.FIND,flags:ChromeCleanupCardFlags.SHOW_LOGS_PERMISSIONS|ChromeCleanupCardFlags.SHOW_NOTIFICATION_PERMISSION}],[ChromeCleanerCardState.SCANNING,{title:this.i18n("chromeCleanupTitleScanning"),explanation:null,actionButton:null,flags:ChromeCleanupCardFlags.WAITING_FOR_RESULT}],[ChromeCleanerCardState.SCANNING_FOUND_NOTHING,{title:this.i18n("chromeCleanupTitleNothingFound"),explanation:null,actionButton:null,flags:ChromeCleanupCardFlags.NONE}],[ChromeCleanerCardState.SCANNING_FAILED,{title:this.i18n("chromeCleanupTitleScanningFailed"),explanation:this.i18n("chromeCleanupExplanationScanError"),actionButton:null,flags:ChromeCleanupCardFlags.NONE}],[ChromeCleanerCardState.CLEANER_DOWNLOAD_FAILED,{title:this.i18n("chromeCleanupTitleCleanupUnavailable"),explanation:this.i18n("chromeCleanupExplanationCleanupUnavailable"),actionButton:actionButtons.TRY_SCAN_AGAIN,flags:ChromeCleanupCardFlags.NONE}]])},getListEntriesFromStrings_(list){return list.map((entry=>({text:entry,highlightSuffix:null})))},getListEntriesFromFilePaths_(paths){return paths.map((path=>({text:path.dirname,highlightSuffix:path.basename})))}});// Copyright 2018 The Chromium Authors. All rights reserved.
const ActionTypes={UNINSTALL:0,MORE_INFO:1,UPGRADE:2};let IncompatibleApplication;class IncompatibleApplicationsBrowserProxyImpl{requestIncompatibleApplicationsList(){return sendWithPromise("requestIncompatibleApplicationsList")}startApplicationUninstallation(applicationName){chrome.send("startApplicationUninstallation",[applicationName])}openURL(url){window.open(url)}getSubtitlePluralString(numApplications){return sendWithPromise("getSubtitlePluralString",numApplications)}getSubtitleNoAdminRightsPluralString(numApplications){return sendWithPromise("getSubtitleNoAdminRightsPluralString",numApplications)}getListTitlePluralString(numApplications){return sendWithPromise("getListTitlePluralString",numApplications)}}addSingletonGetter(IncompatibleApplicationsBrowserProxyImpl);// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({is:"incompatible-application-item",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="incompatible-application-item">:host {
  display: block;
}

</style>
    <div class="list-item">
      <div class="start">[[applicationName]]</div>
      <div class="separator"></div>
      <cr-button class="action-button" on-click="onActionTap_">
        [[getActionName_(actionType)]]
      </cr-button>
    </div>
<!--_html_template_end_-->`,behaviors:[I18nBehavior],properties:{applicationName:String,actionType:Number,actionUrl:String},browserProxy_:null,created(){this.browserProxy_=IncompatibleApplicationsBrowserProxyImpl.getInstance()},onActionTap_(){if(this.actionType===ActionTypes.UNINSTALL){this.browserProxy_.startApplicationUninstallation(this.applicationName)}else if(this.actionType===ActionTypes.MORE_INFO||this.actionType===ActionTypes.UPGRADE){this.browserProxy_.openURL(this.actionUrl)}else{assertNotReached()}},getActionName_(actionType){if(actionType===ActionTypes.UNINSTALL){return this.i18n("incompatibleApplicationsRemoveButton")}if(actionType===ActionTypes.MORE_INFO){return this.i18n("learnMore")}if(actionType===ActionTypes.UPGRADE){return this.i18n("incompatibleApplicationsUpdateButton")}assertNotReached()}});// Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({is:"settings-incompatible-applications-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-incompatible-applications-page">#is-done-section > iron-icon {
  --iron-icon-fill-color: var(--cr-checked-color);
}

</style>

    <div hidden$="[[!isDone_]]" id="is-done-section" class="cr-row first">
      <iron-icon icon="settings:check-circle"></iron-icon>
      <div class="flex no-min-width">
        انتهى الإجراء. لم يتم العثور على أي تطبيقات غير متوافقة.
      </div>
    </div>

    <template is="dom-if" if="[[!isDone_]]">
      <div class="cr-row first">
        <iron-icon icon="cr:security"></iron-icon>
        <div class="flex no-min-width">
          <div hidden$="[[!hasAdminRights_]]">
            [[subtitleText_]] 
          </div>
          <div hidden$="[[hasAdminRights_]]">
            [[subtitleNoAdminRightsText_]]
          </div>
        </div>
      </div>
      <div class="cr-row continuation">
        <h2 class="secondary">[[listTitleText_]]</h2>
      </div>
      <div id="incompatible-applications-list" class="list-frame vertical-list">
        <template is="dom-repeat" items="[[applications_]]" as="application">
          <incompatible-application-item hidden$="[[!hasAdminRights_]]" class="incompatible-application" application-name="[[application.name]]" action-type="[[application.type]]" action-url="[[application.url]]">
          </incompatible-application-item>
          <div hidden$="[[hasAdminRights_]]" class="list-item incompatible-application">
            [[application.name]]
          </div>
        </template>
      </div>
    </template>
<!--_html_template_end_-->`,behaviors:[I18nBehavior,WebUIListenerBehavior],properties:{hasAdminRights_:{type:Boolean,value(){return loadTimeData.getBoolean("hasAdminRights")}},applications_:Array,isDone_:{type:Boolean,computed:"computeIsDone_(applications_.*)"},subtitleText_:{type:String,value:""},subtitleNoAdminRightsText_:{type:String,value:""},listTitleText_:{type:String,value:""}},ready(){this.addWebUIListener("incompatible-application-removed",this.onIncompatibleApplicationRemoved_.bind(this));IncompatibleApplicationsBrowserProxyImpl.getInstance().requestIncompatibleApplicationsList().then((list=>{this.applications_=list;this.updatePluralStrings_()}))},computeIsDone_(){return this.applications_.length===0},onIncompatibleApplicationRemoved_(applicationName){const index=this.applications_.findIndex((function(application){return application.name===applicationName}));assert(index!==-1);this.splice("applications_",index,1)},updatePluralStrings_(){const browserProxy=IncompatibleApplicationsBrowserProxyImpl.getInstance();const numApplications=this.applications_.length;if(this.applications_.length===0){return}Promise.all([browserProxy.getSubtitlePluralString(numApplications),browserProxy.getSubtitleNoAdminRightsPluralString(numApplications),browserProxy.getListTitlePluralString(numApplications)]).then((strings=>{this.subtitleText_=strings[0];this.subtitleNoAdminRightsText_=strings[1];this.listTitleText_=strings[2]}))}});// Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({is:"settings-reset-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="settings-shared" scope="settings-reset-page"></style>
    <settings-animated-pages id="reset-pages" section="reset">
      <div route-path="default">
        <cr-link-row id="resetProfile" label="استعادة الإعدادات إلى الوضع التلقائي الأصلي" on-click="onShowResetProfileDialog_"></cr-link-row>
        <!-- Keep a single instance of reset-profile-dialog on purpose, to
          preserve state across show/hide operations. -->
        <cr-lazy-render id="resetProfileDialog">
          <template>
            <settings-reset-profile-dialog on-close="onResetProfileDialogClose_">
            </settings-reset-profile-dialog>
          </template>
        </cr-lazy-render>

        <cr-link-row class="hr" id="chromeCleanupSubpageTrigger" label="إزالة البرامج الضارة من جهاز الكمبيوتر" on-click="onChromeCleanupTap_" role-description="زر صفحة فرعية"></cr-link-row>
        <template is="dom-if" if="[[showIncompatibleApplications_]]" restamp="">
          <cr-link-row class="hr" id="incompatibleApplicationsSubpageTrigger" label="تحديث التطبيقات غير المتوافقة أو إزالتها" on-click="onIncompatibleApplicationsTap_" role-description="زر صفحة فرعية">
          </cr-link-row>
        </template>

      </div>

      <template is="dom-if" route-path="/cleanup">
        <settings-subpage id="chromeCleanupSubpage" associated-control="[[$$('#chromeCleanupSubpageTrigger')]]" page-title="إزالة البرامج الضارة من جهاز الكمبيوتر" learn-more-url="https://support.google.com/chrome/?p=chrome_cleanup_tool&amp;hl=ar">
          <settings-chrome-cleanup-page prefs="{{prefs}}">
          </settings-chrome-cleanup-page>
        </settings-subpage>
      </template>
      <template is="dom-if" if="[[showIncompatibleApplications_]]">
        <template is="dom-if" route-path="/incompatibleApplications">
          <settings-subpage id="incompatibleApplicationsSubpage" associated-control="[[$$('#incompatibleApplicationsSubpageTrigger')]]" page-title="تحديث التطبيقات غير المتوافقة أو إزالتها">
            <settings-incompatible-applications-page>
            </settings-incompatible-applications-page>
          </settings-subpage>
        </template>
      </template>

    </settings-animated-pages>
<!--_html_template_end_-->`,behaviors:[RouteObserverBehavior],properties:{prefs:Object,showIncompatibleApplications_:{type:Boolean,value(){return loadTimeData.getBoolean("showIncompatibleApplications")}}},currentRouteChanged(route){const lazyRender=this.$.resetProfileDialog;if(route===routes.TRIGGERED_RESET_DIALOG||route===routes.RESET_DIALOG){lazyRender.get().show()}else{const dialog=lazyRender.getIfExists();if(dialog){dialog.cancel()}}},onShowResetProfileDialog_(){Router.getInstance().navigateTo(routes.RESET_DIALOG,new URLSearchParams("origin=userclick"))},onResetProfileDialogClose_(){Router.getInstance().navigateToPreviousRoute();focusWithoutInk(assert(this.$.resetProfile))},onChromeCleanupTap_(){Router.getInstance().navigateTo(routes.CHROME_CLEANUP)},onIncompatibleApplicationsTap_(){Router.getInstance().navigateTo(routes.INCOMPATIBLE_APPLICATIONS)}});// Copyright 2016 The Chromium Authors. All rights reserved.
class SystemPageBrowserProxyImpl{showProxySettings(){chrome.send("showProxySettings")}wasHardwareAccelerationEnabledAtStartup(){return loadTimeData.getBoolean("hardwareAccelerationEnabledAtStartup")}}addSingletonGetter(SystemPageBrowserProxyImpl);// Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({is:"settings-system-page",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="settings-system-page"></style>

    <settings-toggle-button pref="{{prefs.background_mode.enabled}}" label="‏استمرار تشغيل تطبيقات الخلفية عند إغلاق Google Chrome">
    </settings-toggle-button>
    <div class="hr"></div>

    <settings-toggle-button id="hardwareAcceleration" pref="{{prefs.hardware_acceleration_mode.enabled}}" label="استخدام ميزة &quot;تسريع الأجهزة&quot; عند توفرها">
      <template is="dom-if" if="[[shouldShowRestart_(
          prefs.hardware_acceleration_mode.enabled.value)]]">
        <cr-button on-click="onRestartTap_" slot="more-actions">
          إعادة تشغيل
        </cr-button>
      </template>
    </settings-toggle-button>

    <div id="proxy" class="cr-row" on-click="onProxyTap_" actionable$="[[isProxyDefault_]]">
      <div class="flex cr-row-text" hidden$="[[!isProxyDefault_]]">
        فتح إعدادات الخادم الوكيل الخاصة بالكمبيوتر
      </div>
      <div class="flex cr-row-text" hidden$="[[!prefs.proxy.extensionId]]">
        يستخدم Chrome إعدادات الخادم الوكيل من إضافة.
      </div>
      <div class="flex cr-row-text" hidden$="[[!isProxyEnforcedByPolicy_]]">
        يستخدم Chrome إعدادات الخادم الوكيل من المشرف.
      </div>
      <cr-icon-button class="icon-external" hidden$="[[isProxyEnforcedByPolicy_]]" aria-label="فتح إعدادات الخادم الوكيل الخاصة بالكمبيوتر"></cr-icon-button>
      <template is="dom-if" if="[[isProxyEnforcedByPolicy_]]">
        <cr-policy-pref-indicator pref="[[prefs.proxy]]" icon-aria-label="فتح إعدادات الخادم الوكيل الخاصة بالكمبيوتر">
        </cr-policy-pref-indicator>
      </template>
    </div>
    <template is="dom-if" if="[[prefs.proxy.extensionId]]">
      <div class="cr-row continuation">
        <extension-controlled-indicator class="flex" extension-id="[[prefs.proxy.extensionId]]" extension-name="[[prefs.proxy.controlledByName]]" extension-can-be-disabled="[[prefs.proxy.extensionCanBeDisabled]]" on-extension-disable="onExtensionDisable_">
        </extension-controlled-indicator>
      </div>
    </template>
<!--_html_template_end_-->`,properties:{prefs:{type:Object,notify:true},isProxyEnforcedByPolicy_:{type:Boolean},isProxyDefault_:{type:Boolean}},observers:["observeProxyPrefChanged_(prefs.proxy.*)"],observeProxyPrefChanged_(){const pref=this.prefs.proxy;this.isProxyEnforcedByPolicy_=pref.enforcement===chrome.settingsPrivate.Enforcement.ENFORCED&&pref.controlledBy===chrome.settingsPrivate.ControlledBy.USER_POLICY;this.isProxyDefault_=!this.isProxyEnforcedByPolicy_&&!pref.extensionId},onExtensionDisable_(){this.fire("refresh-pref","proxy")},onProxyTap_(){if(this.isProxyDefault_){SystemPageBrowserProxyImpl.getInstance().showProxySettings()}},onRestartTap_(e){e.stopPropagation();LifetimeBrowserProxyImpl.getInstance().restart()},shouldShowRestart_(enabled){const proxy=SystemPageBrowserProxyImpl.getInstance();return enabled!==proxy.wasHardwareAccelerationEnabledAtStartup()}});// Copyright 2019 The Chromium Authors. All rights reserved.
let toastManagerInstance=null;function getToastManager(){return assert(toastManagerInstance)}function setInstance(instance){assert(!instance||!toastManagerInstance);toastManagerInstance=instance}Polymer({_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="cr-toast-manager">#content {
  display: flex;
        flex: 1;
}

.collapsible {
  overflow: hidden;
        text-overflow: ellipsis;
}

span {
  white-space: pre;
}

.elided-text {
  overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
}

</style>
    <cr-toast id="toast" duration="[[duration]]">
      <div id="content" class="elided-text"></div>
      <slot id="slotted"></slot>
    </cr-toast>
<!--_html_template_end_-->`,is:"cr-toast-manager",properties:{duration:{type:Number,value:0}},get isToastOpen(){return this.$.toast.open},get slottedHidden(){return this.$.slotted.hidden},attached(){setInstance(this)},detached(){setInstance(null)},show(label,hideSlotted=false){this.$.content.textContent=label;this.showInternal_(hideSlotted)},showForStringPieces(pieces,hideSlotted=false){const content=this.$.content;content.textContent="";pieces.forEach((function(p){if(p.value.length===0){return}const span=document.createElement("span");span.textContent=p.value;if(p.collapsible){span.classList.add("collapsible")}content.appendChild(span)}));this.showInternal_(hideSlotted)},showInternal_(hideSlotted){this.$.slotted.hidden=hideSlotted;this.$.toast.show()},hide(){this.$.toast.hide()}});// Copyright 2016 The Chromium Authors. All rights reserved.
let HandlerEntry;let ProtocolEntry;Polymer({is:"protocol-handlers",_template:html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style settings-shared iron-flex" scope="protocol-handlers">:host {
  display: block;
}

.column-header {
  margin-bottom: 15px;
        margin-inline-start: 20px;
        margin-top: 15px;
}

</style>
    <div class="cr-row first two-line">
      <div id="categoryLabel" class="flex" on-click="categoryLabelClicked_" actionable="">
        [[computeHandlersDescription_(categoryEnabled)]]
      </div>
      <cr-toggle id="toggle" checked="{{categoryEnabled}}" on-change="onToggleChange_" aria-labelledby="categoryLabel">
      </cr-toggle>
    </div>

    <template is="dom-repeat" items="[[protocols]]" as="protocol">
      <div class="column-header">[[protocol.protocol_display_name]]</div>

      <div class="list-frame menu-content vertical-list">
        <template is="dom-repeat" items="[[protocol.handlers]]">

          <div class="list-item">
            <site-favicon url="[[item.host]]"></site-favicon>
            <div class="middle">
              <div class="protocol-host">
                <span class="url-directionality">[[item.host]]</span>
              </div>
              <div class="secondary protocol-default" hidden$="[[!item.is_default]]">
                التلقائي
              </div>
            </div>

            <cr-icon-button class="icon-more-vert" on-click="showMenu_" title="مزيد من الإجراءات"></cr-icon-button>
          </div>
        </template>
      </div>
    </template>

    <cr-action-menu role-description="قائمة">
      <button class="dropdown-item" on-click="onDefaultClick_" id="defaultButton" hidden$="[[actionMenuModel_.is_default]]">
        الضبط على الإعداد التلقائي
      </button>
      <button class="dropdown-item" on-click="onRemoveClick_" id="removeButton">
        إزالة
      </button>
    </cr-action-menu>

    <template is="dom-if" if="[[ignoredProtocols.length]]">
      <div class="column-header">الحظر</div>
      <div class="list-frame menu-content vertical-list">
        <template is="dom-repeat" items="[[ignoredProtocols]]">
          <div class="list-item">
            <site-favicon url="[[item.host]]"></site-favicon>
            <div class="middle">
              <div class="protocol-host">
                <span class="url-directionality">[[item.host]]</span></div>
              <div class="secondary protocol-protocol">
                [[item.protocol_display_name]]
              </div>
            </div>
            <cr-icon-button class="icon-clear" id="removeIgnoredButton" on-click="onRemoveIgnored_" title="إزالة">
            </cr-icon-button>
          </div>
        </template>
      </div>
    </template>


<!--_html_template_end_-->`,behaviors:[SiteSettingsBehavior,WebUIListenerBehavior],properties:{categoryEnabled:Boolean,protocols:Array,actionMenuModel_:Object,toggleOffLabel:String,toggleOnLabel:String,ignoredProtocols:Array},ready(){this.addWebUIListener("setHandlersEnabled",this.setHandlersEnabled_.bind(this));this.addWebUIListener("setProtocolHandlers",this.setProtocolHandlers_.bind(this));this.addWebUIListener("setIgnoredProtocolHandlers",this.setIgnoredProtocolHandlers_.bind(this));this.browserProxy.observeProtocolHandlers()},categoryLabelClicked_(){this.$.toggle.click()},computeHandlersDescription_(){return this.categoryEnabled?this.toggleOnLabel:this.toggleOffLabel},setHandlersEnabled_(enabled){this.categoryEnabled=enabled},setProtocolHandlers_(protocols){this.protocols=protocols},setIgnoredProtocolHandlers_(ignoredProtocols){this.ignoredProtocols=ignoredProtocols},closeActionMenu_(){this.$$("cr-action-menu").close();this.actionMenuModel_=null},onToggleChange_(event){this.browserProxy.setProtocolHandlerDefault(this.categoryEnabled)},onDefaultClick_(){const item=this.actionMenuModel_;this.browserProxy.setProtocolDefault(item.protocol,item.spec);this.closeActionMenu_()},onRemoveClick_(){const item=this.actionMenuModel_;this.browserProxy.removeProtocolHandler(item.protocol,item.spec);this.closeActionMenu_()},onRemoveIgnored_(event){const item=event.model.item;this.browserProxy.removeProtocolHandler(item.protocol,item.spec)},showMenu_(event){this.actionMenuModel_=event.model.item;this.$$("cr-action-menu").showAt(event.target)}});export{AutofillManager,AutofillManagerImpl,BioEnrollDialogPage,CHROME_CLEANUP_DEFAULT_ITEMS_TO_SHOW,ChromeCleanupIdleReason,ClearBrowsingDataBrowserProxy,ClearBrowsingDataBrowserProxyImpl,CookieList,CountryDetailManagerImpl,CredentialManagementDialogPage,Ctap2Status,DownloadsBrowserProxyImpl,FontsBrowserProxy,FontsBrowserProxyImpl,HandlerEntry,ImportDataBrowserProxyImpl,ImportDataStatus,IncompatibleApplication,IncompatibleApplicationsBrowserProxyImpl,InstalledApp,LanguageSettingsActionType,LanguageSettingsMetricsProxy,LanguageSettingsMetricsProxyImpl,LanguagesBrowserProxy,LanguagesBrowserProxyImpl,LocalDataBrowserProxy,LocalDataBrowserProxyImpl,LocalDataItem,ManageProfileBrowserProxyImpl,PaymentsManager,PaymentsManagerImpl,ProfileShortcutStatus,ProtocolEntry,ResetDialogPage,SafeBrowsingSetting,SampleStatus,SecurityKeysBioEnrollProxyImpl,SecurityKeysCredentialBrowserProxyImpl,SecurityKeysPINBrowserProxyImpl,SecurityKeysResetBrowserProxyImpl,SetPINDialogPage,SystemPageBrowserProxyImpl,WebsiteUsageBrowserProxyImpl,cookieInfo,defaultSettingLabel,getToastManager,kMenuCloseDelay};