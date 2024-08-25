import React from 'react';

export function Card1({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className=" bg-white rounded-3xl shadow-xl p-4">
      <h1 className="text-xl  pb-2">{title}</h1>
      <p>{children}</p>
    </div>
  );
}
