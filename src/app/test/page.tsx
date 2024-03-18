'use client';

import { Button } from '@/components/ui/button';
import Nav from '@/app/test/nav';

export default function MyComponent() {
  return (
    <div className='mt-10 ml-10 flex'>
      <div className='pb-10'>
        <Nav />
      </div>
      <div className='ml-30 pl-5 flex-1 flex-col'>
        <p>fefe</p>
        <p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p><p>fefe</p>
        <Button className='ml-2' variant="outline" size="default">
          Click me
        </Button>
        <Button variant="outline" size="lg" onClick={() => alert("!")}>
          Click me
        </Button>
      </div>

    </div>
  );
}