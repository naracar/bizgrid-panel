import { css } from '@emotion/css';
import { Drawer, Icon, Tooltip, useTheme2 } from '@grafana/ui';
import React, { useEffect, useState } from 'react';

import { TEST_IDS } from '@/constants';

interface Props {
  value: string;
  config: any;
  bgColor?: string;
}

export const JsonCellRenderer: React.FC<Props> = ({ value, config, bgColor }) => {
  const theme = useTheme2();

  const [showErrorIcon, setShowErrorIcon] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [text, setText] = useState('');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const color = bgColor
    ? theme.colors.getContrastText(bgColor)
    : theme.colors.text.primary;

  useEffect(() => {
    try {
      setText(JSON.stringify(JSON.parse(value), null, 2));
      setShowErrorIcon(false);
    } catch (e) {
      setShowErrorIcon(true);
      setText(value);

      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  }, [value]);

  return (
    <>
      <div
        className={css`
          all: unset;
          display: block;
          width: 100%;
          position: relative;
        `}
      >
        {showErrorIcon && (
          <Tooltip content={errorMessage} {...TEST_IDS.jsonCellRenderer.error.apply()}>
            <Icon
              name="exclamation-triangle"
              size="sm"
              aria-label="JSON error"
            />
          </Tooltip>
        )}

        <div
          {...TEST_IDS.jsonCellRenderer.formattedText.apply()}
          className={css`
            all: unset;
            display: block;
            color: ${color};
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-word;
            line-height: 1.4;
            font-family: monospace;
          `}
        >
          {text}
        </div>

        {(config?.showInspector ?? true) && (
          <div
            onClick={() => setDrawerOpen(true)}
            {...TEST_IDS.jsonCellRenderer.buttonOpenDrawer.apply()}
            className={css`
              display: inline-flex;
              align-items: center;
              cursor: pointer;
              margin-top: 4px;
            `}
          >
            <Icon
              name="eye"
              aria-label="Open inspector"
              style={{ color: bgColor ? color : theme.colors.primary.text }}
            />
          </div>
        )}
      </div>

      {isDrawerOpen && (
        <Drawer title="Inspect value" onClose={() => setDrawerOpen(false)}>
          <pre
            className={css`
              color: ${theme.colors.text.primary};
              font-size: 13px;
              white-space: pre-wrap;
              word-break: break-word;
              font-family: monospace;
              line-height: 1.5;
              padding: 16px;
            `}
          >
            {text}
          </pre>
        </Drawer>
      )}
    </>
  );
};