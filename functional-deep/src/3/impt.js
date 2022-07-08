import * as _ from 'fxjs';
import * as L from 'fxjs/Lazy';

/**
 * 4. 아임포트 결제 누락 스케쥴러 만들기
 */

const Impt = {
    payments: {
        1: [
            { imp_id: 11, order_id: 1, amount: 15000 },
            { imp_id: 12, order_id: 2, amount: 25000 },
            { imp_id: 13, order_id: 3, amount: 10000 },
        ],
        2: [
            { imp_id: 14, order_id: 4, amount: 25000 },
            { imp_id: 15, order_id: 5, amount: 45000 },
            { imp_id: 16, order_id: 6, amount: 15000 },
        ],
        3: [
            { imp_id: 17, order_id: 7, amount: 20000 },
            { imp_id: 18, order_id: 8, amount: 30000 },
        ],
        4: [],
        5: [],
        //...
    },

    getPayments: (page) => {
        _.log(`http://..?page=${page}`);
        return _.delay(1000 * 3, Impt.payments[page]);
    },
    cancelPayment: (imp_id) => Promise.resolve(`${imp_id} : 취소완료`),
};

const DB = {
    getOrders: (ids) => _.delay(100, [{ id: 1 }, { id: 3 }, { id: 7 }]),
};

async function job() {
    // 결제된 결제 모듈측 payments 가져온다.
    // 페이지 단위로 가져오는데
    // 결제 데이터가 있을때까지 모두 가져와서 하나로 합친다.
    const payments = await _.go(
        L.range(1, Infinity),
        L.map(Impt.getPayments),
        L.takeUntil(({ length }) => length < 3),
        _.flat
        // L.takeWhile(({ length }) => length),
        // _.each(_.log)
    );

    _.log(payments);

    // 결제가 실제로 완료된 가맹점 측 주문서 id들을 뽑는다.
    const order_ids = await _.go(
        payments,
        _.map((p) => p.order_id),
        DB.getOrders,
        _.map(({ id }) => id)
    );

    // 결제 모듈의 payments와 가맹점의 주문서를 비교해서
    // 결제를 취소해야할 id들을 뽑아서
    // 결제취소 api를 실행
    await _.go(
        payments,
        L.reject((p) => order_ids.includes(p.order_id)),
        L.map((p) => p.imp_id),
        L.map(Impt.cancelPayment),
        _.each(_.log)
    );
}

// 5초에 한 번만 한다.
// 만일 job이 5초보다 더 걸리면, job이 끝날 때 까지
(function recursive() {
    Promise.all([_.delay(7000, undefined), job()]).then(recursive);
    // job().then(recursive);
})();
