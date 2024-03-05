'use client'

import React, { useState } from 'react';
import { Radio, Space, Tabs } from 'antd';
import { Record, Bookmark } from "@/app/interfaces/bookmarks";
import Lists from "@/app/links/list";

const onTabClick = (activeKey: string, e: React.KeyboardEvent | React.MouseEvent) => {
  alert(activeKey)
}

export default function LeftTab({
  data
}: {
  data: Bookmark[]
}) {

  return (
    <div>
      <Tabs
        tabPosition='left'
        size="small"
        tabBarGutter={1}
        items={data.filter((bk) => !bk.title.startsWith('p_') && bk.children).map(bk => {
          return {
            label: `${bk.title}`,
            key: bk.title,
            children: tabContent(bk.children),
          };
        })}
      // onTabClick={onTabClick}
      />
    </div>
  );
};

function tabContent(list: Bookmark[]) {

  return (
    <>
      <Lists data={list} />
    </>
  );

}