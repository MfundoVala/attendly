import { COLORS, FONTS, ICONS, SHADOW } from "../constants"
import React, {useState} from 'react';
 
import {Modal, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
 
export default function AlertModal({
  displayMode,
  displayMsg,
  visibility,
  dismissAlert,
}) {
  return (
    <View>
      <Modal
        visible={visibility}
        animationType={'fade'}
        transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: COLORS.blueVariant,
              height: 200,
              width: '90%',
              borderWidth: 1,
              borderColor: COLORS.blueVariant,
              borderRadius: 7,
              elevation: 10,
              paddingHorizontal: 30,
            }}>
            <View style={{alignItems: 'center', margin: 10}}>
              {displayMode == 'success' ? (
                <>
                  <Ionicons
                    name="checkmark-done-circle"
                    color={'green'}
                    size={40}
                  />
                </>
              ) : (
                <>
                  <MaterialIcons name="cancel" color={'red'} size={50} />
                </>
              )}
              <Text style={{fontSize: 25, ...FONTS.h2_SemBold, textAlign: 'center', marginTop: 5}}>{displayMsg}</Text>
            </View>
 
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => dismissAlert(false)}
              style={{
                width: '45%',
                borderRadius: 0,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                backgroundColor: COLORS.primary,
                borderColor: '#ddd',
                borderBottomWidth: 0,
                borderTopLeftRadius: 25,
                bottom: 0,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', ...FONTS.h3_SemBold, margin: 15}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}