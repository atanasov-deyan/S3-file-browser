import React from 'react';

interface IIconProps {
  name: string;
}

export const Icon = ({ name }: IIconProps) => (
  <span className={`icon-${name}`}/>
);
