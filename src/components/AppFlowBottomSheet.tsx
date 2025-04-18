import React, {forwardRef, useImperativeHandle, useRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

type AppFlowBottomSheetProps = {
  visible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  initialSnapPoint?: string;
  snapPoints?: string[];
};

export type AppFlowBottomSheetRef = {
  close: () => void;
  open: () => void;
};

const AppFlowBottomSheet = forwardRef<AppFlowBottomSheetRef, AppFlowBottomSheetProps>(
  ({visible, onClose, children, initialSnapPoint = '50%', snapPoints: propSnapPoints}, ref) => {
    // Default snap points with max 70% height
    const defaultSnapPoints = propSnapPoints || ['50%', '70%'];
    
    const bottomSheetRef = useRef<BottomSheet>(null);
    
    useImperativeHandle(ref, () => ({
      close: () => bottomSheetRef.current?.close(),
      open: () => bottomSheetRef.current?.expand(),
    }));

    useEffect(() => {
      if (visible) {
        bottomSheetRef.current?.expand();
      } else {
        bottomSheetRef.current?.close();
      }
    }, [visible]);

    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    );

    // Find the initial index based on initialSnapPoint
    const initialIndex = visible ? Math.max(0, defaultSnapPoints.indexOf(initialSnapPoint)) : -1;

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={initialIndex}
        snapPoints={defaultSnapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        handleIndicatorStyle={styles.indicator}
        onClose={onClose}
        style={styles.sheet}
        maxDynamicContentSize={0.7} // This ensures content never exceeds 70% of screen height
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  sheet: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: '#CCCCCC',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});

export default AppFlowBottomSheet;