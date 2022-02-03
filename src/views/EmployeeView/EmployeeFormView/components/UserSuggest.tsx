import { MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer } from '@blueprintjs/select';
import SuggestionSelectField, {
	highlightText,
} from '../../../../components/SuggestionSelectField';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface IUseruggested {
	id: string;
	name: string;
}

const UserSuggest = ({ items = [], onChange = () => {}, label }: any) => {
	const [t] = useTranslation();
	const [selectedItem, setSelectedItem] = useState();

	const renderInputValue = (item: IUseruggested) => item.name;

	const handleValueChange = (item: IUseruggested) => {
		onChange(item);
		setSelectedItem(item as any);
	};

	const filterItem: ItemPredicate<IUseruggested> = (
		query: string,
		item: IUseruggested,
		_index: any,
		exactMatch: any
	) => {
		const normalizedTitle = item.name.toLowerCase();
		const normalizedQuery = query.toLowerCase();

		if (exactMatch) {
			return normalizedTitle === normalizedQuery;
		} else {
			return `${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
		}
	};

	const renderItem: ItemRenderer<IUseruggested> = (
		item: IUseruggested,
		{ handleClick, modifiers, query }: any
	) => {
		if (!modifiers.matchesPredicate) {
			return null;
		}

		const text = `${item.name}`;

		return (
			<MenuItem
				active={modifiers.active}
				disabled={modifiers.disabled}
				label={item.name.toString()}
				key={item.name}
				onClick={handleClick}
				text={highlightText(text, query)}
			/>
		);
	};

	return (
		<SuggestionSelectField
			itemPredicate={filterItem}
			itemRenderer={renderItem}
			inputValueRenderer={renderInputValue}
			onSelect={handleValueChange}
			items={items}
			name="learnersList"
			label={label}
			isRequired
			selectedItem={selectedItem}
		/>
	);
};

export default UserSuggest;
