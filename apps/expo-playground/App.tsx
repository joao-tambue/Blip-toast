import React from 'react';
import { StyleSheet, View, Button, SafeAreaView, StatusBar } from 'react-native';
import toast, { ToastContainer } from 'blip-toast';

export default function App() {
  const showToast = () => {
    toast('Hello from Blip Toast!', {
      description: 'This is a default toast notification',
    });
  };

  const showSuccessToast = () => {
    toast.success('Success!', {
      description: 'Your action was completed successfully',
    });
  };

  const showErrorToast = () => {
    toast.error('Error!', {
      description: 'Something went wrong',
    });
  };

  const showWarningToast = () => {
    toast.warning('Warning!', {
      description: 'Please be careful with this action',
    });
  };

  const showInfoToast = () => {
    toast.info('Info', {
      description: 'Here is some useful information',
    });
  };

  const showDismissibleToast = () => {
    toast('Swipe to dismiss', {
      description: 'This toast can be swiped away',
      dismissible: true,
      duration: 6000,
    });
  };

  const showActionToast = () => {
    toast('Action Toast', {
      description: 'This toast has an action button',
      action: {
        label: 'Undo',
        onPress: () => {
          toast.success('Action performed!');
        },
      },
    });
  };

  const showLoadingToast = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2500)),
      {
        loading: 'Loading data...',
        success: 'Data loaded successfully!',
        error: 'Failed to load data',
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Button title="Default Toast" onPress={showToast} />
        <Button title="Success Toast" onPress={showSuccessToast} />
        <Button title="Error Toast" onPress={showErrorToast} />
        <Button title="Warning Toast" onPress={showWarningToast} />
        <Button title="Info Toast" onPress={showInfoToast} />
        <Button title="Dismissible Toast" onPress={showDismissibleToast} />
        <Button title="Action Toast" onPress={showActionToast} />
        <Button title="Loading Toast" onPress={showLoadingToast} />
        <Button
          title="Dismiss All"
          onPress={() => toast.dismissAll()}
          color="#ef4444"
        />
      </View>
      <ToastContainer position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
    padding: 20,
  },
});
