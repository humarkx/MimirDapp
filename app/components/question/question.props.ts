import { StyleProp, ViewProps, TextStyle } from "react-native"
import { TxKeyPath } from "../../i18n"

type Question = {
  question: string
  options: {
    value: string
    correct: boolean
    answers: number
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
