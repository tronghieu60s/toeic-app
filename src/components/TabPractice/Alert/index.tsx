import React from 'react';
import { Image, Linking, StyleSheet } from 'react-native';
import tailwind from '~/tailwind';
import { ScrollView, Text } from '../../Themed';

export default function TabPracticeAlert(): JSX.Element {
  return (
    <ScrollView style={tailwind('p-3')}>
      <Text style={[styles.text, { marginTop: 0 }]}>TOEIC APP - 28/07/2021.</Text>
      <Text style={styles.text}>
        Chào các bạn! Cũng là gần 5 tháng từ khi mình phát hành ứng dụng đầu tiên đầu tiên, cho tới
        thời gian này mình cũng đã có hơn +500 người cài đặt ứng dụng, mà gỡ cài đặt cũng không ít.
      </Text>
      <Image
        style={tailwind('w-full h-16 mt-5')}
        source={{ uri: 'https://i.imgur.com/yDYspx6.png' }}
      />
      <Text style={styles.text}>
        Từ thời gian phát hành đầu tiên tới nay mình cũng bận khá nhiều việc, và hiện tại cũng vậy.
        Có thể ứng dụng này sẽ không được thêm chức năng mới trong thời gian tới.
      </Text>
      <Text style={styles.text}>
        Nhưng các bạn yên tâm, nếu có tìm thấy lỗi của từ vựng, bạn chứ nhấn nút báo lỗi hoặc gởi
        trực tiếp vào email
        {' '}
        <Text
          style={tailwind('text-blue-600')}
          onPress={() => {
            Linking.openURL('mailto:estudy.techapp@gmail.com');
          }}
        >
          estudy.techapp@gmail.com
        </Text>
        {' '}
        mình sẽ cố gắng chỉnh lại từ nhanh nhất có thể.
      </Text>
      <Text style={styles.text}>
        Đến đây thôi, chúc các bạn học tốt! À mình cũng hoàn thành hết lượng từ vựng trong ứng dụng
        rồi nhé. Ứng dụng này không có quảng cáo nhé, mục tiêu là chia sẻ phi lợi nhuận mà 😌.
      </Text>
      <Image
        style={tailwind('w-28 h-28 mt-5')}
        source={{ uri: 'https://i.imgur.com/wZj10pS.gif' }}
      />
      <Text style={styles.text}>tronghieu60s.</Text>
      <Text style={styles.text} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    ...tailwind('text-base leading-5 mt-5'),
  },
});
