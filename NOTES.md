# Ghi Chú Trong Khi Làm Việc Với Dự Án

## Build Lỗi

Chạy câu lệnh sau đây để reset keystore: ```expo build:android -c```

## Dọn dẹp cache của Expo

Chạy câu lệnh sau: ```expo r -c```

## Animation khi di chuyển giữa các màn hình

1. https://reactnavigation.org/docs/stack-navigator/#headerstyleinterpolators
2. https://reactnavigation.org/docs/stack-navigator/#cardstyleinterpolators

## Ẩn thanh TabBar ở các màn hình cụ thể

Giải pháp: https://stackoverflow.com/a/64042879/5288560

## Trượt các đối tượng như Slide

Giải pháp: https://youtu.be/rWwz9WO-hCo

```js
<ScrollView horizontal decelerationRate="fast" snapToInterval={Dimensions.get('window').width}>
  ...
</ScrollView>
```