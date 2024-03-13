# way 1

- 검색 결과가 있을 때에만 page-list를 보여준다.
- 페이지는 5개씩만 보여준다.
  - 처음과 마지막으로 바로 넘어갈 수 있게 해준다.

# way2

무한 스크롤 구현

# 근본적인 고민

- 하루 요청가능한 api 개수는 3만개
- 전체 데이터를 가져올 수 있는가?
  - 검색어를 넣어야하므로 전체를 가져올 수 있을지는 모른다.
  - 1주, 4주 등 특정 간격을 기반으로 상위 검색결과를 미리 가져와서 캐싱 해놓는다.
- 저장 방식도 덮어쓰기 보다는 이미 있던 데이터이면 바꾸지않고 새롭게 생긴 결과에 대해서만 반영한다.
- 검색 결과가 잘나오게 하기 위해서는 어떤식으로 저장해야하는가?