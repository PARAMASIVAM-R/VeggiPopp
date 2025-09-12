import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import GENERAL_IMAGE from '../../assets/images';
import fonts from '../../assets/fonts';
import responsive from '../../utils/responsive';

interface DatePickerInputProps {
  title: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  format?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  title,
  value,
  onChange,
  placeholder = 'Select date',
  //   format = 'DD-MM-YYYY',
}) => {
  const [open, setOpen] = useState(false);

  const formatDate = (date: Date | null): string => {
    if (!date) {
      return '';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}>
        <TextInput
          style={styles.input}
          value={value ? formatDate(value) : ''}
          placeholder={placeholder}
          editable={false}
        />
        <Image source={GENERAL_IMAGE.calendar_input} style={styles.calender} />
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={value || new Date()}
        maximumDate={new Date()}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: responsive.size(2.5, 0),
    marginTop: responsive.size(6.25, 4.7),
  },
  title: {
    fontSize: responsive.font(4.5, 3.375),
    fontWeight: '500',
    marginBottom: responsive.size(2, 1.5),
    color: '#151515',
    fontFamily: fonts.regular,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: responsive.size(0.5, 0.375),
    borderColor: '#00000026',
    borderRadius: responsive.size(2.5, 1.875),
    paddingHorizontal: responsive.size(3, 2.25),
    height: responsive.size(15, 8.5),
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  input: {
    fontSize: responsive.font(4, 3),
    color: '#000',
    fontWeight: '500',
    fontFamily: fonts.regular,
  },
  calender: {
    height: responsive.size(6.75, 4.5),
    width: responsive.size(6.75, 4.5),
    resizeMode: 'contain',
  },
});

export default DatePickerInput;
