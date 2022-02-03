import React from 'react';
import { get, isEmpty } from 'lodash';
import { FormGroup, MenuItem } from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';
import { useTranslation } from 'react-i18next';

export const escapeRegExpChars = (text: string) => {
	return text.replace(/([.*+?^=!:${}()|\\[\]\\/\\])/g, '\\$1');
};

export const highlightText = (text: string, query: string) => {
	let lastIndex = 0;
	const words = query
		.split(/\s+/)
		.filter((word) => word.length > 0)
		.map(escapeRegExpChars);
	if (words.length === 0) {
		return [text];
	}
	const regexp = new RegExp(words.join('|'), 'gi');
	const tokens: React.ReactNode[] = [];

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const match = regexp.exec(text);
		if (!match) {
			break;
		}
		const length = match[0].length;
		const before = text.slice(lastIndex, regexp.lastIndex - length);
		if (before.length > 0) {
			tokens.push(before);
		}
		lastIndex = regexp.lastIndex;
		tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
	}
	const rest = text.slice(lastIndex);
	if (rest.length > 0) {
		tokens.push(rest);
	}
	return tokens;
};

const SugestionSelectField = <T,>({
	disabled = false,
	isRequired = true,
	intent,
	helperText,
	label,
	name,
	items,
	onSelect,
	minimal = true,
	inputValueRenderer,
	touched,
	field,
	errors,
	itemPredicate,
	itemRenderer,
	selectedItem,
	initialContent = null,
}: any) => {
	const [t] = useTranslation();

	const isTouched = get(touched, field, false) ? true : false;
	const error = get(errors, field, false) || false;

	const fieldHelperText = !isEmpty(error) && isTouched ? error : helperText;
	const fieldIntent = !isEmpty(error) && isTouched ? 'danger' : intent;

	const FieldSuggest = Suggest.ofType<T>();

	return (
		<FormGroup
			disabled={disabled}
			helperText={fieldHelperText}
			intent={fieldIntent}
			label={label}
			labelFor={name}
			labelInfo={isRequired && `(${t('required')})`}
		>
			<FieldSuggest
				fill
				className="bp3-suggest-input"
				inputValueRenderer={inputValueRenderer}
				itemPredicate={itemPredicate}
				itemRenderer={itemRenderer}
				items={items}
				noResults={<MenuItem disabled={true} text={t('Sem resultados')} />}
				popoverProps={{ minimal }}
				onItemSelect={onSelect}
				selectedItem={selectedItem}
				initialContent={initialContent}
			/>
		</FormGroup>
	);
};

export default SugestionSelectField;
