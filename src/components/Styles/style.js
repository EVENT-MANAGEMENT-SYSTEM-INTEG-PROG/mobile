import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({


  // SIDEBAR
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
  navItems: {
    flexDirection: 'row',
  },
  navItem: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
 
  drawerContent: {
    flex: 1,
    backgroundColor: 'black',
  },
  drawerHeader: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },

  drawerSeparator: {
    height: 1,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -45,
    marginBottom: 20,
  },

  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerItemText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 20,
  },
  logo: {
    width: 180, 
    resizeMode: 'contain', 
  },



  // NAV BAR STYLE

  
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'black',
      height: 60,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    iconContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    selectedContainer: {
      backgroundColor: '#FFC42B',
    },
    iconText: {
      marginTop: 4,
      fontSize: 12,
    },
    




    // my event


      menuButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
      },
      topSection: {
        alignItems: 'center',
        paddingTop: 50, // Adjust top padding to center content properly
      },
      addButton: {
        marginBottom: 20, // Adjust margin as needed
      },
      buttonGradient: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      eventInfo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white', // Background color changed to white
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
      },
      image: {
        width: 150,
        height: 150,
        borderRadius: 10, // Adjust border radius as needed
      },
      textContainer: {
        marginLeft: 10,
        flex: 1,
      },
      eventTitle: {
        color: 'black', // Text color changed to black
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
      },
      detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
      },
      icon: {
        marginRight: 5,
      },
      detailText: {
        color: 'black', // Text color changed to black
        fontSize: 14,
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10, // Adjust spacing between "MY EVENT" and the button
      },
      editButton: {
        marginTop: 30,
        paddingHorizontal: 15, // Adjusted paddingHorizontal for narrower button
      },
      scrollViewContent: {
        flexGrow: 1, // Ensure content takes up full height of ScrollView
        paddingBottom: 20, // Padding to prevent bottom content from being hidden
      },
});

export default styles;
