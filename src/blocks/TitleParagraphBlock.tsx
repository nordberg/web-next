import * as React from 'react'
import styled from 'react-emotion'
import { TextPosition } from 'src/utils/textPosition'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
} from '../components/blockHelpers'
import {
  BaseBlockProps,
  ColorComponent,
  MarkdownHtmlComponent,
} from './BaseBlockProps'

const AlignableContentWrapper = styled(ContentWrapper)(
  ({ textPosition }: { textPosition: AltTextPosition }) => ({
    display: 'flex',
    flexDirection:
      textPosition === 'center' || textPosition === 'center-but-left'
        ? 'column'
        : 'row',
    justifyContent: textPosition === 'left' ? 'space-between' : 'center',
    alignItems: textPosition === 'center' ? 'center' : 'start',
    textAlign: textPosition === 'center' ? 'center' : 'left',
    maxWidth: textPosition === 'center-but-left' ? '50rem' : undefined,
    [MOBILE_BP_DOWN]: {
      flexDirection: 'column',
    },
  }),
)

type AltTextPosition = TextPosition | 'center-but-left'

const Title = styled('h2')(
  ({ textPosition }: { textPosition: AltTextPosition }) => ({
    fontSize: '3rem',
    marginRight: textPosition === 'left' ? 'auto' : 0,
    marginLeft: textPosition === 'right' ? 'auto' : 0,
    width: '100%',
    maxWidth: '50%',
    [MOBILE_BP_DOWN]: {
      maxWidth: '100%',
    },
  }),
)

const getParagraphMaxWidth = (textPosition: AltTextPosition) => {
  if (textPosition === 'left') {
    return '40%'
  }
  if (textPosition === 'center') {
    return '36rem'
  }
  if (textPosition === 'center-but-left') {
    return '50rem'
  }
  return 0
}

const Paragraph = styled('div')(
  ({ textPosition }: { textPosition: AltTextPosition }) => ({
    display: textPosition === 'right' ? 'none' : 'block',
    maxWidth: getParagraphMaxWidth(textPosition),
    width: '100%',
    fontSize: '1.25rem',
    [MOBILE_BP_DOWN]: {
      maxWidth: '100%',
      display: 'block',
      fontSize: '1rem',
    },
  }),
)

interface TitleParagraphBlockInterface extends BaseBlockProps {
  title: string
  text_position: AltTextPosition
  paragraph: MarkdownHtmlComponent
  color: ColorComponent
}

export const TitleParagraphBlock: React.FunctionComponent<
  TitleParagraphBlockInterface
> = ({ title, text_position, paragraph, color }) => {
  return (
    <SectionWrapper color={color && color.color}>
      <AlignableContentWrapper textPosition={text_position}>
        <Title textPosition={text_position}>{title}</Title>
        <Paragraph
          textPosition={text_position}
          dangerouslySetInnerHTML={{
            __html: paragraph.html,
          }}
        />
      </AlignableContentWrapper>
    </SectionWrapper>
  )
}
