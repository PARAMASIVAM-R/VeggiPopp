// utils/responsive.js
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Device type detection
export const deviceInfo = {
  width,
  height,
  isTablet: width >= 768,
  isSmallPhone: width < 350,
  isLargePhone: width > 400,
};

// Responsive scaling utilities
export const responsive = {
  /**
   * Scale size based on screen width percentage
   * @param {number} percentage - Percentage of screen width (0-100)
   * @returns {number} Scaled size
   */
  scale: (percentage: number): number => width * (percentage / 100),

  /**
   * Get responsive size with different values for phone/tablet
   * @param {number} phoneSize - Size percentage for phones
   * @param {number} tabletSize - Size percentage for tablets (optional)
   * @returns {number} Responsive size
   */
  size: (phoneSize: number, tabletSize?: number): number => {
    const tabletValue = tabletSize ?? phoneSize * 0.7;
    return deviceInfo.isTablet
      ? responsive.scale(tabletValue)
      : responsive.scale(phoneSize);
  },

  /**
   * Get responsive font size
   * @param {number} phoneSize - Font size percentage for phones
   * @param {number} tabletSize - Font size percentage for tablets (optional)
   * @returns {number} Responsive font size
   */
  font: (phoneSize: number, tabletSize?: number): number => {
    const tabletValue = tabletSize ?? phoneSize * 0.75;
    return deviceInfo.isTablet
      ? responsive.scale(tabletValue)
      : responsive.scale(phoneSize);
  },

  /**
   * Get responsive spacing (padding/margin)
   * @param {number} phoneSize - Spacing percentage for phones
   * @param {number} tabletSize - Spacing percentage for tablets (optional)
   * @returns {number} Responsive spacing
   */
  spacing: (phoneSize: number, tabletSize?: number): number => {
    const tabletValue = tabletSize ?? phoneSize * 0.8;
    return deviceInfo.isTablet
      ? responsive.scale(tabletValue)
      : responsive.scale(phoneSize);
  },

  /**
   * Get responsive border radius
   * @param {number} phoneSize - Border radius percentage for phones
   * @param {number} tabletSize - Border radius percentage for tablets (optional)
   * @returns {number} Responsive border radius
   */
  radius: (phoneSize: number, tabletSize?: number): number => {
    const tabletValue = tabletSize ?? phoneSize * 0.75;
    return deviceInfo.isTablet
      ? responsive.scale(tabletValue)
      : responsive.scale(phoneSize);
  },

  lineHeight: (phoneSize: number, tabletSize?: number): number => {
    const tabletValue = tabletSize ?? phoneSize * 0.8;
    return deviceInfo.isTablet
      ? responsive.scale(tabletValue)
      : responsive.scale(phoneSize);
  },

  /**
   * Create responsive style object
   * @param {object} baseStyle - Base styles
   * @param {object} tabletStyle - Tablet-specific styles (optional)
   * @returns {array|object} Style array or object
   */
  style: (baseStyle: any, tabletStyle?: any) => {
    return deviceInfo.isTablet && tabletStyle
      ? [baseStyle, tabletStyle]
      : baseStyle;
  },

  /**
   * Get responsive dimensions for icons/images
   * @param {number} phoneSize - Size percentage for phones
   * @param {number} tabletSize - Size percentage for tablets (optional)
   * @returns {object} Object with width and height
   */
  iconSize: (phoneSize: number, tabletSize?: number) => {
    const size = responsive.size(phoneSize, tabletSize);
    return {width: size, height: size};
  },

  /**
   * Get responsive minimum height
   * @param {number} phoneHeight - Height percentage for phones
   * @param {number} tabletHeight - Height percentage for tablets (optional)
   * @returns {number} Responsive minimum height
   */
  minHeight: (phoneHeight: number, tabletHeight?: number): number => {
    const tabletValue = tabletHeight ?? phoneHeight * 0.7;
    return deviceInfo.isTablet
      ? responsive.scale(tabletValue)
      : responsive.scale(phoneHeight);
  },
};

// Preset responsive values for common use cases
export const presets = {
  // Card dimensions
  cardPadding: responsive.spacing(3.5, 2.5),
  cardRadius: responsive.radius(4, 3),
  cardMinHeight: responsive.minHeight(18, 12),

  // Typography
  titleFont: responsive.font(3.8, 2.8),
  subtitleFont: responsive.font(3.2, 2.4),
  buttonFont: responsive.font(3.5, 3),
  smallFont: responsive.font(2, 1.4),

  // Spacing
  smallSpacing: responsive.spacing(1.5, 1),
  mediumSpacing: responsive.spacing(2.5, 2),
  largeSpacing: responsive.spacing(3.5, 2.5),

  // Icon sizes
  smallIcon: responsive.iconSize(4, 3.2),
  mediumIcon: responsive.iconSize(5.8, 4.2),
  largeIcon: responsive.iconSize(16, 12),

  // Button dimensions
  buttonMinWidth: responsive.size(22, 16),
  buttonMinHeight: responsive.size(8, 6),
  buttonRadius: responsive.radius(2.5, 2),
};

// Helper function to create responsive StyleSheet
export const createResponsiveStyles = (styleObject: any) => {
  const processedStyles: any = {};

  Object.keys(styleObject).forEach(key => {
    processedStyles[key] = styleObject[key];
  });

  return processedStyles;
};

export default responsive;
