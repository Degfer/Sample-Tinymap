function init(){
    let myMap = new ymaps.Map('map', {
        center: [51.4, 128.1],
        zoom: 1,
        controls: ['routePanelControl']
    });

    let control = myMap.controls.get('routePanelControl');

    // Задание состояния для панели маршрутизации.
    control.routePanel.state.set({
        // Адрес начальной точки.
        from: 'Амурская область, Свободный Орджоникидзе 73',
        // Адрес конечной точки.
        to: 'Амурская область, Свободный, Орджоникидзе 53'
    });
}

function changeLocation(locationFrom, locationTo) {
    document.getElementById('map').innerHTML = ``;

    let myMap = new ymaps.Map('map', {
        center: [51.4, 128.1],
        zoom: 1,
        controls: ['routePanelControl']
    });

    let control = myMap.controls.get('routePanelControl');

    // Задание состояния для панели маршрутизации.
    control.routePanel.state.set({
        // Адрес начальной точки.
        from: locationFrom,
        // Адрес конечной точки.
        to: locationTo
    });

}