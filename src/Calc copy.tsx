<View style={ customStyle.box }>
  <View style={ customStyle.row }>
  <Text>
    Toggle theme
  </Text>
  <Switch
    onValueChange={
      this.toggleTheme
    }
    value={ this.state.darkTheme }
    tintColor='#DEDEDE'
  />
  </View>
  <Title>
    Sign up to our newsletter!
  </Title>
  <Paragraph>
    Get a monthly dose of fresh React Native Paper news straight to your mailbox. Just sign up to our newsletter and enjoy!
  </Paragraph>
  <TextInput
    style={{ marginTop: 15 }}
    label='Outlined input'
    mode='outlined'
  />
  <TextInput
    style={{ marginTop: 15 }}
    label='Flat input'
    mode='flat'
  />
  <Button
    style={{ marginTop: 15 }}
    icon="send"
    mode="contained"
    onPress={ this.toggleSnack }
  >
    Sign me up
  </Button>
</View>
<Snackbar
  visible={ this.state.showSnack }
  onDismiss={ this.toggleSnack }
  action={{
    label: 'Dismiss',
    onPress: () => {
      // Do side magic
    },
  }}
  duration={
    Snackbar.DURATION_LONG
  }
>
  Hey there! I'm a Snackbar.
</Snackbar>