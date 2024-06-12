<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig } = useLayout();

const { isDarkTheme } = useLayout();

let documentStyle = getComputedStyle(document.documentElement);
let textColor = documentStyle.getPropertyValue('--text-color');
let textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
let surfaceBorder = documentStyle.getPropertyValue('--surface-border');

const products = ref(null);
const lineData = reactive({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});
const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
]);
const lineOptions = ref(null);
const productService = new ProductService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);


const barData = ref(null);
const barOptions = ref(null);

const setColorOptions = () => {
    documentStyle = getComputedStyle(document.documentElement);
    textColor = documentStyle.getPropertyValue('--text-color');
    textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    surfaceBorder = documentStyle.getPropertyValue('--surface-border');
};

const setChart = () => {
    barData.value = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                borderColor: documentStyle.getPropertyValue('--primary-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                borderColor: documentStyle.getPropertyValue('--primary-200'),
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    barOptions.value = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
};
watch(
    layoutConfig.theme,
    () => {
        setColorOptions();
        setChart();
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0 bg-red-50">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Atenciones</span>
                        <div class="text-900 font-medium text-xl">152</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-red-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">24 nuevos </span>
                <span class="text-500">desde la semana pasada</span>
            </div>
        </div>
        <!-- <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Ganancia</span>
                        <div class="text-900 font-medium text-xl">$2.100</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">%52+ </span>
                <span class="text-500">since last week</span>
            </div>
        </div> -->
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0 bg-blue-50">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Clientes</span>
                        <div class="text-900 font-medium text-xl">28441</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">520 </span>
                <span class="text-500">nuevos desde hace 3 dias</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Atendidas Hoy</span>
                        <div class="text-900 font-medium text-xl">4</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-comment text-purple-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">15 atendidas </span>
                <span class="text-500">el dia de ayer</span>
            </div>
        </div>

        <div class="col-12 xl:col-12">
            <!-- <div class="card">
                <h5>Sales Overview</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
            </div> -->

            <div class="card">
                <h5>Ventas por meses</h5>
                <Chart type="bar" :data="barData" :options="barOptions"></Chart>
            </div>

            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5>Notifications</h5>
                    <div>
                        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"
                            @click="$refs.menu1.toggle($event)"></Button>
                        <Menu ref="menu1" :popup="true" :model="items"></Menu>
                    </div>
                </div>

                <span class="block text-600 font-medium mb-3">TODAY</span>
                <ul class="p-0 mx-0 mt-0 mb-4 list-none">
                    <li class="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div
                            class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-dollar text-xl text-blue-500"></i>
                        </div>
                        <span class="text-900 line-height-3">Richard Jones
                            <span class="text-700">has purchased a blue t-shirt for <span
                                    class="text-blue-500">79$</span></span>
                        </span>
                    </li>
                    <li class="flex align-items-center py-2">
                        <div
                            class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-download text-xl text-orange-500"></i>
                        </div>
                        <span class="text-700 line-height-3">Your request for withdrawal of <span
                                class="text-blue-500 font-medium">2500$</span> has been initiated.</span>
                    </li>
                </ul>

                <span class="block text-600 font-medium mb-3">YESTERDAY</span>
                <ul class="p-0 m-0 list-none">
                    <li class="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div
                            class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-dollar text-xl text-blue-500"></i>
                        </div>
                        <span class="text-900 line-height-3">Keyser Wick
                            <span class="text-700">has purchased a black jacket for <span
                                    class="text-blue-500">59$</span></span>
                        </span>
                    </li>
                    <li class="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div
                            class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-question text-xl text-pink-500"></i>
                        </div>
                        <span class="text-900 line-height-3">Jane Davis
                            <span class="text-700">has posted a new questions about your product.</span>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="px-4 py-5 shadow-2 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3"
                style="border-radius: 1rem; background: linear-gradient(0deg, rgba(0, 123, 255, 0.5), rgba(0, 123, 255, 0.5)), linear-gradient(92.54deg, #1c80cf 47.88%, #ffffff 100.01%)">
                <div>
                    <div class="text-blue-100 font-medium text-xl mt-2 mb-3">TAKE THE NEXT STEP</div>
                    <div class="text-white font-medium text-5xl">Try PrimeBlocks</div>
                </div>
                <div class="mt-4 mr-auto md:mt-0 md:mr-0">
                    <a href="https://www.primefaces.org/primeblocks-vue"
                        class="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised"> Get
                        Started </a>
                </div>
            </div>
        </div>
    </div>
</template>
