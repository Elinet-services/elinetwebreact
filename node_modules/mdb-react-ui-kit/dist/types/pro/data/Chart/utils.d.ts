/// <reference types="react" />
declare const getChart: (type: string) => (<TData = number[], TLabel = unknown>(props: Omit<import("react-chartjs-2").ChartProps<"bar", TData, TLabel>, "type"> & {
    ref?: import("react-chartjs-2/dist/types").ForwardedRef<import("react-chartjs-2/dist/types").ChartJSOrUndefined<"bar", TData, TLabel>> | undefined;
}) => JSX.Element) | (<TData_1 = (number | import("chart.js").ScatterDataPoint | null)[], TLabel_1 = unknown>(props: Omit<import("react-chartjs-2").ChartProps<"line", TData_1, TLabel_1>, "type"> & {
    ref?: import("react-chartjs-2/dist/types").ForwardedRef<import("react-chartjs-2/dist/types").ChartJSOrUndefined<"line", TData_1, TLabel_1>> | undefined;
}) => JSX.Element) | (<TData_2 = number[], TLabel_2 = unknown>(props: Omit<import("react-chartjs-2").ChartProps<"pie", TData_2, TLabel_2>, "type"> & {
    ref?: import("react-chartjs-2/dist/types").ForwardedRef<import("react-chartjs-2/dist/types").ChartJSOrUndefined<"pie", TData_2, TLabel_2>> | undefined;
}) => JSX.Element) | (<TData_3 = number[], TLabel_3 = unknown>(props: Omit<import("react-chartjs-2").ChartProps<"doughnut", TData_3, TLabel_3>, "type"> & {
    ref?: import("react-chartjs-2/dist/types").ForwardedRef<import("react-chartjs-2/dist/types").ChartJSOrUndefined<"doughnut", TData_3, TLabel_3>> | undefined;
}) => JSX.Element) | (<TData_4 = number[], TLabel_4 = unknown>(props: Omit<import("react-chartjs-2").ChartProps<"polarArea", TData_4, TLabel_4>, "type"> & {
    ref?: import("react-chartjs-2/dist/types").ForwardedRef<import("react-chartjs-2/dist/types").ChartJSOrUndefined<"polarArea", TData_4, TLabel_4>> | undefined;
}) => JSX.Element) | (<TData_5 = (number | null)[], TLabel_5 = unknown>(props: Omit<import("react-chartjs-2").ChartProps<"radar", TData_5, TLabel_5>, "type"> & {
    ref?: import("react-chartjs-2/dist/types").ForwardedRef<import("react-chartjs-2/dist/types").ChartJSOrUndefined<"radar", TData_5, TLabel_5>> | undefined;
}) => JSX.Element) | (<TData_6 = import("chart.js").BubbleDataPoint[], TLabel_6 = unknown>(props: Omit<import("react-chartjs-2").ChartProps<"bubble", TData_6, TLabel_6>, "type"> & {
    ref?: import("react-chartjs-2/dist/types").ForwardedRef<import("react-chartjs-2/dist/types").ChartJSOrUndefined<"bubble", TData_6, TLabel_6>> | undefined;
}) => JSX.Element) | (<TData_7 = (number | import("chart.js").ScatterDataPoint | null)[], TLabel_7 = unknown>(props: Omit<import("react-chartjs-2").ChartProps<"scatter", TData_7, TLabel_7>, "type"> & {
    ref?: import("react-chartjs-2/dist/types").ForwardedRef<import("react-chartjs-2/dist/types").ChartJSOrUndefined<"scatter", TData_7, TLabel_7>> | undefined;
}) => JSX.Element);
declare const setupOptions: (options: any, type: any, defaultOptions: any) => any;
declare const chartsDefaultOptions: {
    line: {
        elements: {
            line: {
                backgroundColor: string;
                borderColor: string;
                borderWidth: number;
                tension: number;
            };
            point: {
                borderColor: string;
                backgroundColor: string;
            };
        };
        responsive: boolean;
        plugins: {
            tooltip: {
                intersect: boolean;
                mode: string;
            };
            legend: {
                display: boolean;
            };
        };
        scales: {
            x: {
                stacked: boolean;
                grid: {
                    display: boolean;
                    drawBorder: boolean;
                };
                ticks: {
                    color: string;
                };
            };
            y: {
                stacked: boolean;
                grid: {
                    borderDash: number[];
                    drawBorder: boolean;
                    tickBorderDash: number[];
                    tickBorderDashOffset: number[];
                };
                ticks: {
                    color: string;
                };
            };
        };
    };
    bar: {
        elements: {
            line: {
                backgroundColor: string;
            };
            bar: {
                backgroundColor: string;
            };
        };
        responsive: boolean;
        plugins: {
            tooltip: {
                intersect: boolean;
                mode: string;
            };
            legend: {
                display: boolean;
            };
        };
        scales: {
            x: {
                stacked: boolean;
                grid: {
                    display: boolean;
                    drawBorder: boolean;
                };
                ticks: {
                    color: string;
                };
            };
            y: {
                stacked: boolean;
                grid: {
                    borderDash: number[];
                    drawBorder: boolean;
                    color: (context: any) => any;
                    tickBorderDash: number[];
                    tickBorderDashOffset: number[];
                };
                ticks: {
                    color: string;
                };
            };
        };
    };
    pie: {
        elements: {
            arc: {
                backgroundColor: string;
            };
        };
        responsive: boolean;
        plugins: {
            legend: {
                display: boolean;
            };
        };
    };
    doughnut: {
        elements: {
            arc: {
                backgroundColor: string;
            };
        };
        responsive: boolean;
        plugins: {
            legend: {
                display: boolean;
            };
        };
    };
    polarArea: {
        elements: {
            arc: {
                backgroundColor: string;
            };
        };
        responsive: boolean;
        plugins: {
            legend: {
                display: boolean;
            };
        };
    };
    radar: {
        elements: {
            line: {
                backgroundColor: string;
                borderColor: string;
                borderWidth: number;
            };
            point: {
                borderColor: string;
                backgroundColor: string;
            };
        };
        responsive: boolean;
        plugins: {
            legend: {
                display: boolean;
            };
        };
    };
    scatter: {
        elements: {
            line: {
                backgroundColor: string;
                borderColor: string;
                borderWidth: number;
                tension: number;
            };
            point: {
                borderColor: string;
                backgroundColor: string;
            };
        };
        responsive: boolean;
        plugins: {
            tooltip: {
                intersect: boolean;
                mode: string;
            };
            legend: {
                display: boolean;
            };
        };
        datasets: {
            borderColor: string;
        };
        scales: {
            x: {
                stacked: boolean;
                grid: {
                    display: boolean;
                    drawBorder: boolean;
                };
                ticks: {
                    color: string;
                };
            };
            y: {
                stacked: boolean;
                grid: {
                    borderDash: number[];
                    drawBorder: boolean;
                    tickBorderDash: number[];
                    tickBorderDashOffset: number[];
                };
                ticks: {
                    color: string;
                };
            };
        };
    };
    bubble: {
        elements: {
            point: {
                borderColor: string;
                backgroundColor: string;
            };
        };
        responsive: boolean;
        plugins: {
            legend: {
                display: boolean;
            };
        };
        scales: {
            x: {
                grid: {
                    display: boolean;
                    drawBorder: boolean;
                };
                ticks: {
                    color: string;
                };
            };
            y: {
                grid: {
                    borderDash: number[];
                    drawBorder: boolean;
                    tickBorderDash: number[];
                    tickBorderDashOffset: number[];
                };
                ticks: {
                    color: string;
                };
            };
        };
    };
};
export { chartsDefaultOptions, setupOptions, getChart };
