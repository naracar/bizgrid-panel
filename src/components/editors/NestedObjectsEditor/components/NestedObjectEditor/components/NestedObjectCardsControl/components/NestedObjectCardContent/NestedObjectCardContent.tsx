import { InterpolateFunction } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import dompurify from 'dompurify';
import MarkdownIt from 'markdown-it';
import React from 'react';

import { TEST_IDS } from '@/constants';

import { getStyles } from './NestedObjectCardContent.styles';

/**
 * Properties
 */
interface Props {
  /**
   * Text
   *
   * @type {string}
   */
  text: string;

  /**
   * Replace Variables
   *
   * @type {InterpolateFunction}
   */
  replaceVariables: InterpolateFunction;
}

/**
 * Markdown it
 */
const md = new MarkdownIt({
  html: true,
});

/**
 * Test Ids
 */
const testIds = TEST_IDS.nestedObjectCardContent;

/**
 * Nested Object Card Content
 */
export const NestedObjectCardContent: React.FC<Props> = ({ text, replaceVariables }) => {
  const styles = useStyles2(getStyles);
  return (
    <div
      {...testIds.root.apply()}
      className={styles.root}
      dangerouslySetInnerHTML={{
        __html: dompurify.sanitize(
          md.render(replaceVariables(text)),
          // eslint-disable-next-line @typescript-eslint/naming-convention
          { ADD_ATTR: ['target', 'onmouseover', 'onmouseout'] }
        ),
      }} 
    />
  );
};
