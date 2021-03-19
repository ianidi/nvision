import React from 'react'
import {matchSorter} from 'match-sorter'
import {usePopper} from 'react-popper'
import {useCombobox, useMultipleSelection} from 'downshift'
import {useDeepCompareEffect} from 'react-use'
import cc from 'classcat'

const fruits = [
  {value: 'apple', label: 'Apple'},
  {value: 'banana', label: 'Banana'},
  {value: 'mango', label: 'Mango'},
  {value: 'kiwi', label: 'Kiwi'},
]

function defaultOptionFilterFunc(items, inputValue) {
  return matchSorter(items, inputValue, {keys: ['value', 'label']})
}

function defaultItemRenderer(selected) {
  return selected.label
}

function CreateablePicker(props) {
  const {
    items,
    optionFilterFunc = defaultOptionFilterFunc,
    itemRenderer = defaultItemRenderer,
    placeholder,
    onCreateItem,
    selectedItems,
    ...downshiftProps
  } = props

  const [isCreating, setIsCreating] = React.useState(false)
  const [inputItems, setInputItems] = React.useState(items)
  const disclosureRef = React.useRef(null)
  const popoverRef = React.useRef(null)
  const {attributes, forceUpdate} = usePopper(
    disclosureRef.current,
    popoverRef.current,
    {
      placement: 'bottom-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    },
  )

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    activeIndex,
  } = useMultipleSelection({
    ...downshiftProps,
    selectedItems,
    stateReducer: (_, actionAndChanges) => {
      const {type, changes} = actionAndChanges
      switch (type) {
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          return {
            ...changes,
            activeIndex: null,
          }
        default:
          return changes
      }
    },
  })

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectItem,
    setHighlightedIndex,
    inputValue,
  } = useCombobox({
    selectedItem: null,
    items: inputItems,
    onInputValueChange: ({inputValue}) => {
      const filteredItems = optionFilterFunc(items, inputValue || '')

      if (isCreating && filteredItems.length > 0) {
        setIsCreating(false)
      }

      setInputItems(filteredItems)
    },
    stateReducer: (state, actionAndChanges) => {
      const {changes, type} = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue: '',
          }
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            isOpen: true,
            inputValue: '',
          }
        default:
          return changes
      }
    },
    onStateChange: ({type, selectedItem}) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            if (selectedItemValues.includes(selectedItem.value)) {
              removeSelectedItem(selectedItem)
            } else {
              if (onCreateItem && isCreating) {
                onCreateItem(selectedItem)
                setIsCreating(false)
                setInputItems(items)
              } else {
                addSelectedItem(selectedItem)
              }
            }

            selectItem(null)
          }
          break
        default:
          break
      }
    },
  })

  React.useEffect(() => {
    if (
      inputItems.length === 0 &&
      activeIndex === -1 &&
      inputValue.length > 0
    ) {
      setIsCreating(true)
      // @ts-ignore
      setInputItems([{label: `${inputValue}`, value: inputValue}])
      setHighlightedIndex(0)
    }
  }, [inputItems, setIsCreating, setHighlightedIndex, inputValue, activeIndex])

  useDeepCompareEffect(() => {
    setInputItems(items)
  }, [items])

  React.useEffect(() => {
    if (selectedItems && forceUpdate) {
      forceUpdate()
    }
  }, [selectedItems, forceUpdate])

  const selectedItemValues = selectedItems.map((item) => item.value)

  return (
    <React.Fragment>

    {selectedItems.map((selectedItem, index) => (
      <div
        key={`selected-item-${index}`}
        {...getSelectedItemProps({selectedItem, index})}
      >
        {selectedItem.label}
        <div
          onClick={(e) => {
            e.stopPropagation()
            removeSelectedItem(selectedItem)
          }}
        >
          x
        </div>
      </div>
    ))}


        <div {...getComboboxProps()}>
          <input
            {...getInputProps(
              getDropdownProps({
                placeholder,
                onClick: isOpen ? () => {} : openMenu,
                onFocus: isOpen ? () => {} : openMenu,
                ref: disclosureRef,
              }),
            )}
          />
        </div>
        <div
          {...attributes.popper}
          {...getMenuProps({ref: popoverRef})}
        >
          <div>
            {inputItems.map((item, index) => (
                <div
                  key={`${item.value}${index}`}
                  {...getItemProps({item, index})}
                >
                {itemRenderer(item)}
                      {selectedItemValues.includes(item.value) && (<div>✅</div>)}
                </div>
              ))}
          </div>
        </div>
    </React.Fragment>
  )
}

export const Filter = () => {
  const [pickerItems, setPickerItems] = React.useState(fruits)
  const [selectedItems, setSelectedItems] = React.useState([])

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item])
    setSelectedItems((curr) => [...curr, item])
  }

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems)
    }
  }

  return (
    <CreateablePicker
      placeholder="Type name of fruit"
      onCreateItem={handleCreateItem}
      items={pickerItems}
      selectedItems={selectedItems}
      onSelectedItemsChange={(changes) =>
        handleSelectedItemsChange(changes.selectedItems)
      }
    />
  )
}