import { forwardRef, useCallback } from 'react';
import { ForwardedRef, KeyboardEvent, SyntheticEvent } from 'react';
import { Input, Wrap, WrapItem, WrapItemProps, WrapProps } from '@chakra-ui/react';
import { InputProps, TagProps, TagLabelProps, TagCloseButtonProps } from '@chakra-ui/react';

import { maybeCall } from './maybe';
import { MaybeFunc } from './maybe';
import ChakraTagInputTag from './Tag';

export default forwardRef(function ChakraTagInput({
  tags = [],
  onTagsChange,
  onTagAdd,
  onTagRemove,
  vertical = false,
  addKeys = ['Enter'],
  wrapProps,
  wrapItemProps,
  tagProps,
  tagLabelProps,
  tagCloseButtonProps,
  ...props
}) {
  const addTag = useCallback(
    (event) => {
      onTagAdd?.(event, tag);
      if (event.isDefaultPrevented()) return;

      onTagsChange?.(event, tags.concat([tag]));
    },
    [tags, onTagsChange, onTagAdd]
  );
  const removeTag = useCallback(
    (event) => {
      onTagRemove?.(event, index);
      if (event.isDefaultPrevented()) return;

      onTagsChange?.(event, [...tags.slice(0, index), ...tags.slice(index + 1)]);
    },
    [tags, onTagsChange, onTagRemove]
  );
  const handleRemoveTag = useCallback(
    (index) => (event) => {
      removeTag(event, index);
    },
    [removeTag]
  );
  const onKeyDown = props.onKeyDown;
  const handleKeyDown = useCallback(
    (event) => {
      onKeyDown?.(event);

      if (event.isDefaultPrevented()) return;
      if (event.isPropagationStopped()) return;

      const { currentTarget, key } = event;
      const { selectionStart, selectionEnd } = currentTarget;
      if (addKeys.indexOf(key) > -1 && currentTarget.value) {
        addTag(event, currentTarget.value);
        if (!event.isDefaultPrevented()) {
          currentTarget.value = '';
        }
        event.preventDefault();
      } else if (
        key === 'Backspace' &&
        tags.length > 0 &&
        selectionStart === 0 &&
        selectionEnd === 0
      ) {
        removeTag(event, tags.length - 1);
      }
    },
    [addKeys, tags.length, addTag, removeTag, onKeyDown]
  );

  return (
    <Wrap align="center" {...wrapProps}>
      {tags.map((tag, index) => (
        <WrapItem {...maybeCall(wrapItemProps, false, index)} key={index}>
          <ChakraTagInputTag
            onRemove={handleRemoveTag(index)}
            tagLabelProps={maybeCall(tagLabelProps, tag, index)}
            tagCloseButtonProps={maybeCall(tagCloseButtonProps, tag, index)}
            colorScheme={props.colorScheme}
            size={props.size}
            {...maybeCall(tagProps, tag, index)}>
            {tag}
          </ChakraTagInputTag>
        </WrapItem>
      ))}
      <WrapItem flexGrow={1} {...maybeCall(wrapItemProps, true, tags.length)}>
        <Input {...props} onKeyDown={handleKeyDown} ref={ref} />
      </WrapItem>
    </Wrap>
  );
});
