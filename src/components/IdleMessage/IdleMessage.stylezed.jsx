import styled from 'styled-components';

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${p => p.theme.space[2]};
`;

export const MessageTitle = styled.h2`
  text-aling-center;
  margin-top: ${p => p.theme.space[4]}px;
  margin-bottom: ${p => p.theme.space[4]}px;
  font-family: ${p => p.theme.fonts.heading};
  font-size: ${p => p.theme.fontSizes.l};
  font-weight: ${p => p.theme.fontWeights.normal};
`;
