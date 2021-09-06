import React, { useState, ChangeEvent, RefObject, useRef } from 'react'
import {
  object as YObject,
  number as YNumber,
  string as YString,
  SchemaOf,
  array as YArray,
  mixed
} from 'yup'
import { BaseProps, Spacing } from '../types/components'
import { classNames, debounce } from '../../utils'
import './Tags.scss'
import { ReactElement } from 'hoist-non-react-statics/node_modules/@types/react'

export type TagType = {
  id?: number
  text: string
  value: number | string
}
const tagSchema: SchemaOf<TagType> = YObject({
  id: YNumber(),
  text: YString().defined(),
  value: mixed().oneOf([YString().defined(), YNumber().defined()])
}).defined()

export type TagsType = Array<TagType>

const tagsSchema: SchemaOf<TagsType> = YArray().of(tagSchema)

export type TagsProps = BaseProps & {
  padding?: Spacing
  edit?: boolean
  tags?: TagsType
}

const defaultProps = {
  padding: Spacing.Small,
  edit: false,
  tags: []
}

function Tags(props: TagsProps): ReactElement {
  const { className, style, edit } = props
  const node: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const [tags, setTags] = useState<TagsType | undefined>(props.tags || [])
  const [newTag, setNewTag] = useState<string>('')

  const classes = classNames(['tags', className], { edit })

  const _addTag = (tag: string) => {
    const val = tag.toLowerCase()
    const tagValues = tags?.map((v) => v.value.toString().toLowerCase())

    if (tagValues?.indexOf(val) !== -1) {
      setNewTag('')
      return
    }
    const t = [...(tags || [])]
    t.push({ text: tag, value: tag })
    setNewTag('')
    setTags(t)
  }

  const handleRemoveClick = (value: string | number) => {
    const t = tags?.filter((v) => v.value !== value)
    setTags(t)
  }

  const handleInputBlur = (e: any) => {
    if (!newTag) {
      return
    }
    _addTag(newTag)
  }
  const handleInputKeyDown = (e: any) => {
    const ENTER = 'Enter'
    if (e.key === ENTER && newTag) {
      _addTag(newTag)
    }
  }

  const _handleNewTagChanged = (v: string) => {
    const value = (v || '').replace(/[^\w$\-#, ]+/g, '')
    if (value.indexOf(',') !== -1) {
      const newValue: string = value
        .split(',')
        .filter((v) => !!v)
        .join('')
      _addTag(newValue)
    } else {
      setNewTag(value)
    }
  }
  const handleNewTagChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const func = debounce(_handleNewTagChanged, 50)
    func(e.target.value)
  }

  return (
    <div className={classes} ref={node} style={style}>
      {tags?.map((v, i) => {
        return (
          <>
            <div key={v.value} className="tag">
              {v.text}
              {edit && (
                <button
                  className="close"
                  onClick={(e) => {
                    handleRemoveClick(v.value)
                  }}
                >
                  x
                </button>
              )}
            </div>
          </>
        )
      })}
      {edit && (
        <input
          type="text"
          value={newTag}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          onChange={handleNewTagChanged}
        />
      )}
    </div>
  )
}

Tags.defaultProps = defaultProps

export default Tags
