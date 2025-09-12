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

interface AppDatePickerProps {
  title?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  emptyIcon?: any;
  filledIcon?: any;
  width?: 'full' | 'half';
}

const AppDatePicker: React.FC<AppDatePickerProps> = ({
  title,
  value,
  onChange,
  placeholder = 'Select date',
  minDate,
  maxDate = new Date(),
  emptyIcon = GENERAL_IMAGE.calendar_input,
  filledIcon = GENERAL_IMAGE.calendar_filled,
  width = 'full',
}) => {
  const [open, setOpen] = useState(false);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={[styles.container, width === 'half' && styles.halfWidth]}>
      {title && <Text style={styles.title}>{title}</Text>}

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}>
        <TextInput
          style={styles.input}
          value={value ? formatDate(value) : ''}
          placeholder={placeholder}
          placeholderTextColor="#999"
          editable={false}
        />
        <Image
          source={value ? filledIcon : emptyIcon}
          style={styles.calendar}
        />
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={value || new Date()}
        minimumDate={minDate}
        maximumDate={maxDate}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: responsive.size(2.5, 1.5),
    marginTop: responsive.size(6.25, 4.5),
  },
  halfWidth: {
    width: '48%',
  },
  title: {
    fontSize: responsive.font(4.5, 3.4),
    fontWeight: '500',
    marginBottom: responsive.size(2, 1.5),
    color: '#151515',
    fontFamily: fonts.regular,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: responsive.size(0.5, 0.35),
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
    flex: 1,
  },
  calendar: {
    height: responsive.size(6.75, 4.5),
    width: responsive.size(6.75, 4.5),
    resizeMode: 'contain',
    marginLeft: responsive.size(2, 1.5),
  },
});

export default AppDatePicker;
