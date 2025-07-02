import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import PhoneInput, {
  ICountry,
  isValidPhoneNumber,
} from 'react-native-international-phone-number';
import {Controller, Control, FieldValues} from 'react-hook-form';

interface PhoneInputFieldProps {
  name: string;
  control: Control<FieldValues, any>;
  defaultValue?: string;
  onCountryChange?: (country: ICountry) => void;
  onFocus?: () => void; 
  onBlur?: () => void; 
}


const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  name,
  control,
  defaultValue = '+911234567890',
  onCountryChange,
   onFocus,
   onBlur,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(
    undefined,
  );

  const handleSelectedCountry = (country: ICountry) => {
    setSelectedCountry(country);
    onCountryChange?.(country);
  };


  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        validate: value =>
          selectedCountry
            ? isValidPhoneNumber(value, selectedCountry) ||
              'Invalid phone number'
            : 'Please select a country',
      }}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <PhoneInput
            value={value}
            defaultValue={defaultValue}
            onChangePhoneNumber={onChange}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </>
      )}
    />
  );
};

export default PhoneInputField;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});






/*
*******************************************************
const [isInputFocused, setIsInputFocused] = useState(false);

<PhoneInputField
  name="phoneNumber"
  control={control}
  defaultValue="+911234567890"
  onFocus={() => setIsInputFocused(true)}
  onBlur={() => setIsInputFocused(false)}
/>

{isInputFocused ? (
  <Text>Input is active</Text>
) : (
  <Text>Input is not active</Text>
)}
*******************************************************
import {useForm, FieldValues} from 'react-hook-form';
import PhoneInputField from '../../components/PhoneInputField';

---inside component
  const {control, handleSubmit} = useForm();
   const onSubmit = (data: FieldValues) => {
      Alert.alert('Submitted Phone Number', data.phoneNumber);
    };
--return
 onPress={handleSubmit(onSubmit)}

*******************************************************
*/
