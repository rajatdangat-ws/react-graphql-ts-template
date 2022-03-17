/**
 *
 * T
 *
 */

import React, { memo } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import If from '@components/If';
import { fonts } from '@themes/index';

interface StyledTextProps {
  marginBottom?: string;
  font?: () => FlattenSimpleInterpolation;
}

const StyledText = styled.p<StyledTextProps>`
  && {
    ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};
    ${(props) => props.font && props.font()};
  }
`;

type FontStyleType = keyof typeof fonts.style;

const getFontStyle = (type: FontStyleType) => fonts.style[type];

interface TProps {
  type?: FontStyleType;
  text?: string;
  id?: string;
  marginBottom?: string;
  values?: Record<string, React.ReactNode>;
}

export const T = ({ type, text, id, marginBottom, values, ...otherProps }: TProps) => (
  <StyledText data-testid="t" font={type && getFontStyle(type)} marginBottom={marginBottom} {...otherProps}>
    <If condition={id} otherwise={text}>
      <FormattedMessage id={id} values={values || {}} />
    </If>
  </StyledText>
);

T.propTypes = {
  id: PropTypes.string,
  marginBottom: PropTypes.number,
  values: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(fonts.style))
};

T.defaultProps = {
  values: {},
  type: 'standard'
};

const TextComponent = memo(T);
export default TextComponent;
