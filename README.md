# RN-Todo-List
리액트 네이티브 실습

## 강의 듣기 전 구현해본 내용
* Todo CRUD (등록, 조회, 수정, 삭제)
* 첫 로딩 Splash 화면
* AsyncStorage 데이터 저장 (새로고침 유지)
* 수정 인풋에 auto focus

## 강의를 들으면서 새로 배운 점
* SafeAreaView
  * iOS에만 적용 (Android는 x)
  * 아이폰의 notch 디자인(상단에 가려지는 부분)을 피하기 위해 자체적 padding이 들어간 View
  * 가장 바깥 Container에 View 대신 사용
* StatusBar
  * expo와 react-native 두 군데서 모두 제공
  * 실습에서는 react-native의 것을 사용하여 StatusBar의 색상을 바꿈
  * 색상 관련 속성
    * `backgroundColor`: StatusBar의 배경색 변경
    * `barStyle`: StatusBar의 시간, 와이파이 등 글자색 변경 (default, light-content, dark-content 3가지)


## 트러블 슈팅
* TodoInput을 모듈화하는 과정 중 `missed semicolon` 에러가 발생했다.
  * 세미콜론이 miss된 곳을 도저히 찾을 수 없었고 vscode 세미콜론 setting도 해봤지만 소용 없었다.
  * 해결: css.ts에 ${theme.size60} 등의 import해온 style 코드를 넣으면 발생한다는 걸 알게 되어 '60px' 등으로 다시 수정했다.
