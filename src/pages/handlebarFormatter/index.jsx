import React, { memo, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.less";
import * as monaco from "monaco-editor";
import './format'
const defaultCode = `
---
collection_products:
  limit: 0
---
{{!-- 不需要商品数据只需要分类数据 所以设置为0 提高响应速度 --}}
{{ combine_asset_tag 'stage/collection-list/index.css' inline=true }}
<!-- stage/collection-list/index.js -->
{{ combine_asset_tag 
  'theme-shared/utils/sectionsLoad/index.js'
  'stage/collection-list/index.js' 
  type="text/javascript" 
  defer=true
}}

{{ assign 'blocks' (product_blocks_order_translate section 'blocks' 'block_order') }}
{{ assign 'title' section.settings.title }}
{{!-- {{assign 'real_product_img_width' (divide 1420 col)}} --}}
{{ assign 'goodsBlockLength' (length blocks) }}
{{!-- 分类图片比例 --}}
{{ assign 'imageRatio' section.settings.collection_image_ratio }}
{{ assign 'color_scheme' section.settings.color_scheme }}
{{ assign 'slice_in_pc' section.settings.slice_in_pc }}
{{ assign 'slice_in_mobile' section.settings.slice_in_mobile }}

{{ assign 'pc_cols' section.settings.pc_cols }}
{{ assign 'mobile_cols' section.settings.m_cols }}
{{ assign 'limitWidthClass' '' }}

{{ snippet 'section-padding-creator' sectionId=section.id paddingTop=section.settings.padding_top paddingBottom=section.settings.padding_bottom }}
<script type="text/json" id="collectionList-data-{{ section.id }}">{{{ stringify section.settings }}}</script>
<div class="color-scheme-{{ color_scheme }} section-gap" 
     data-section-type="collection-list" 
     data-section-id="{{ section.id }}"
     data-grid-horizontal-space="{{ theme.settings.grid_horizontal_space }}"
>
  <div class="__sl-custom-track-stage-colletionlist colletionlist container {{ limitWidthStyle }} {{#if (isTruthy slice_in_mobile)}}slice_in_mobile{{/if}}">
    <h2 class="section-title colletionlist__title title4 text-center">{{ title }}</h2>
    {{#or (isFalsey slice_in_mobile) (isFalsey slice_in_pc)}}  <div class="colletionlist__slide-container {{#if (isTruthy slice_in_mobile)}}d-none{{else}}d-block{{/if}} {{#if (isTruthy slice_in_pc)}}d-md-none{{else}}d-md-block{{/if}}">
      <div class="colletionlist__cagetegory row row-cols-md-{{ pc_cols }} row-cols-{{ mobile_cols }}">
        {{#each blocks}}{{ assign 'sortationData' (get settings.category_id ../all_collections) }}
          {{#if (boolean (boolean settings.title '===' undefined) '||' (boolean settings.title '===' ''))}}
            {{#if (isFalsey settings.category_id)}}{{ assign 'showTitle' 'Example Collection' }}{{else}}
              {{ assign 'showTitle' (get 'title' sortationData) }}
            {{/if}}
          {{else}}
            {{ assign 'showTitle' settings.title }}
          {{/if}}

          {{ snippet 'product/commons/collection-item' sortationData=sortationData title=showTitle imageRatio=../imageRatio bgDisplayPosition=settings.image_display_area titleColor='inherit' }}
        {{/each}}
      </div>
    </div>    
    {{/or}} 
    
    {{#or slice_in_mobile slice_in_pc}} 
      <div class="colletionlist__swiper {{#if (isFalsey slice_in_mobile)}}d-none{{else}}d-block{{/if}} {{#if (isFalsey slice_in_pc)}}d-md-none{{else}}d-md-block{{/if}}">
        {{!-- swiper 挂载点 --}}
        <div class="colletionlist-swiper-{{ section.id }} colletionlist__swiper-box" >
          <div class="swiper-wrapper container g-md-0">        
            {{#each blocks}}
              {{ assign 'sortationData' (get settings.category_id ../all_collections) }}
              {{#if (boolean (boolean settings.title '===' undefined) '||' (boolean settings.title '===' ''))}}
                {{#if (isFalsey settings.category_id)}}
                  {{ assign 'showTitle' 'Example Collection' }}
                {{else}}
                  {{ assign 'showTitle' (get 'title' sortationData) }}
                {{/if}}
              {{else}}
                {{ assign 'showTitle' settings.title }}
              {{/if}}              
              <div class="collection-item-slide swiper-slide d-none d-md-block">
                {{ snippet 'product/commons/collection-item' sortationData=sortationData title=showTitle imageRatio=../imageRatio bgDisplayPosition=settings.image_display_area titleColor='inherit' }}
              </div>    
              <div class="collection-item-slide swiper-slide d-block d-md-none">
                {{ snippet 'product/commons/collection-item' sortationData=sortationData title=showTitle imageRatio=../imageRatio bgDisplayPosition=settings.image_display_area titleColor='inherit' }}
              </div>                 
            {{/each}}
          </div>      
        </div>
        <div id="swiper-button-prev-{{ section.id }}" class="colletionlist__arrow colletionlist__arrow--left d-none d-md-flex">
          {{ snippet 'icons/icon_strong_arrow_r' class='mobile-nav__icon' }}
        </div>
        <div id="swiper-button-next-{{ section.id }}" class="colletionlist__arrow colletionlist__arrow--right d-none d-md-flex">
          {{ snippet 'icons/icon_strong_arrow_r' class='mobile-nav__icon' }}
        </div>
      </div>
    {{/or}}
      
    {{#if (isTruthy section.settings.button_text)}}
      <div class="collection-list-more-btn">
        <a class="btn btn-primary"
          href="/collections-all">
          {{ section.settings.button_text }}
        </a>
      </div>
    {{/if}}
  </div>
</div>


{{#schema}}
{
  "name": "t:sections.collection-list.name",
  "presets": [
    {
      "category": "t:sections.collection-list.presets.presets__0.category",
      "name": "t:sections.collection-list.presets.presets__0.name"
    }
  ],
  "max_blocks": 15,
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "t:sections.collection-list.settings.title.label"
    },
    {
      "id": "collection_image_ratio",
      "type": "select",
      "label": "t:sections.collection-list.settings.collection_image_ratio.label",
      "default": "100"
    },
    {
      "type": "select",
      "id": "color_scheme",
      "label": "t:sections.collection-list.settings.color_scheme.label",
      "default": "none",
      "options": []
    }
  ],
  "blocks": [
    {
      "type": "collection",
      "icon": "normal",
      "name": "t:sections.collection-list.blocks.collection.name",
      "settings": [
        {
          "type": "collection_picker",
          "id": "category_id",
          "label": "t:sections.collection-list.blocks.collection.settings.category_id.label"
        }
      ]
    }
  ]
}
{{/schema}}
`;

const CodeEditor = memo(() => {
  const editorCountainerRef = useRef(null);
  let editorRef = useRef(null);
  useEffect(() => {
    if (editorCountainerRef.current) {
      editorRef.current = monaco.editor.create(editorCountainerRef.current, {
        value: defaultCode,
        language: "handlebars",
        formatOnPaste: true,
      });
    }
    return () => {
      editorRef.current.dispose();
    };
  }, [editorCountainerRef]);

  return (
    <div
      className={styles.format}
      onKeyDown={(e) => {
        const keyCode = event.keyCode || event.which || event.charCode;
        const keyCombination = event.ctrlKey;
        if (keyCode === 83 && keyCombination) {
          console.log("format");
          editorRef.current.trigger("editor", "editor.action.formatDocument");
        }
      }}
    >
      <div className={styles.header}>Handlebar格式化</div>
      <div className={styles.editor} ref={editorCountainerRef}></div>
    </div>
  );
});

export default CodeEditor;
