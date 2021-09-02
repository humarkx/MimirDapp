import { StyleProp, ViewProps, TextStyle } from "react-native"
import { TxKeyPath } from "../../i18n"

type Question = {
  _id: string
  question: string
  text: string
  options: {
    text: string
    correct: boolean
    answers: number
    _id: string
  }[]
  answers: number
}

export interface QuestionProps extends ViewProps {
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * Children components.
   */
  data: Question

    /**
   * When pressing an Answer.
   */
  onPress: (number) => void

  /**
   * Answer result.
   */
  showResult: boolean

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>

}
