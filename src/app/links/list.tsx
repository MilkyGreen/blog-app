import React, { useState } from 'react';
import { Avatar, List } from 'antd';
import {Record,Bookmark} from "@/app/interfaces/bookmarks";


export default function Lists({data}:{data:Bookmark[]}) {
  return (
    <>
      <List
        dataSource={data.reverse()}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<a href={item.url} target="_blank">{item.title}</a>}
              description={item.url}
            />
          </List.Item>
        )}
      />
    </>
  );
};