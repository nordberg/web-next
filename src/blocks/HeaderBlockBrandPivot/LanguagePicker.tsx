import styled from '@emotion/styled'
import { MOBILE_BP_UP } from 'components/blockHelpers'
import React from 'react'
import { getCurrentMarket } from 'utils/CurrentLocale'
import { TABLET_BP_UP } from './mobile'

interface LanguagePickerProps {
  currentLanguage: string
}

const MenuListItem = styled.li`
  display: flex;
  position: relative;
  margin: 5.25rem 0 auto 0;
  padding-left: 1.5rem;
  order: -1;

  ${MOBILE_BP_UP} {
    padding-left: 2rem;
  }

  ${TABLET_BP_UP} {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 1.25rem;
    order: 0;
  }
`

const Lang = styled.a<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transition: opacity 150ms;

  &:hover {
    opacity: 1;
  }

  &:first-of-type {
    padding-right: calc(0.375rem + 1px);
  }

  &:last-of-type {
    padding-left: 0.375rem;
  }

  &:first-of-type:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: inline-flex;
    width: 1px;
    height: 0.875rem;
    background-color: currentColor;
  }
`

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  currentLanguage,
}) => {
  const market = getCurrentMarket(currentLanguage)
  const isLocaleActive = (locale: string) => locale === currentLanguage
  return (
    <MenuListItem>
      {market === 'no' && (
        <>
          <Lang active={isLocaleActive('no')} href="/no">
            No
          </Lang>
          <Lang active={isLocaleActive('no-en')} href="/no-en">
            En
          </Lang>
        </>
      )}
      {market === 'se' && (
        <>
          <Lang active={isLocaleActive('se')} href="/se">
            Sv
          </Lang>
          <Lang active={isLocaleActive('se-en')} href="/se-en">
            En
          </Lang>
        </>
      )}
    </MenuListItem>
  )
}
