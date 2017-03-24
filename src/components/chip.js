'use strict';

import React from 'react';
import Chip from 'material-ui/Chip';
import { docInfoStyle, avatarStyle } from '../styles';
import Avatar from 'material-ui/Avatar';
import WorkIcon from 'material-ui/svg-icons/action/work';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ProductIcon from 'material-ui/svg-icons/action/settings';

const HeaderChip = (d, img) => d && (
  <Chip key={d} style={docInfoStyle}>
    <Avatar
      color={avatarStyle.color}
      backgroundColor={avatarStyle.backgroundColor}
      size={24}
      icon={img}
    />
    {d}
  </Chip>
);

export const DateChip = d => HeaderChip(d, <DateIcon />);
export const TypeChip = d => HeaderChip(d, <AssignmentIcon />);
export const CompanyChip = d => HeaderChip(d, <WorkIcon />);
export const ProductChip = d => HeaderChip(d, <ProductIcon />);
