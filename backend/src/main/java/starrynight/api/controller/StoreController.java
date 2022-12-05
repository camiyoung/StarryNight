package starrynight.api.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import starrynight.api.dto.store.OrderRequest;
import starrynight.api.dto.store.StoreResponse;
import starrynight.api.service.StoreService;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @ApiOperation(value = "가구 구매", notes = "가구를 구매한다.")
    @PostMapping(value = "/order")
    public ResponseEntity<OrderRequest> orderFurniture(@RequestBody @ApiParam(value = "구매 정보", required = true)  OrderRequest orderRequest) {
        storeService.orderFurniture(orderRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "상점 가구 조회", notes = "상점에 판매되는 가구를 조회한다.", response = StoreResponse.class)
    @GetMapping("/id/{id}/category/{category}/page/{page}")
    public ResponseEntity<StoreResponse> showItems(@ApiParam(value = "아이디", required = true) @PathVariable Long id, @ApiParam(value = "카테고리", required = true) @PathVariable Long category, @ApiParam(value = "페이지", required = true) @PathVariable int page) {
        StoreResponse response = storeService.showItems(id, category, page);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

}
