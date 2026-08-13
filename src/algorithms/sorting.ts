export type SortAlgorithm =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick"
  | "heap";

export type SortStep = {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
};

export type SortResult = {
  steps: SortStep[];
  comparisons: number;
  swaps: number;
  accesses: number;
};

function createStep(
  array: number[],
  comparing: number[] = [],
  swapping: number[] = [],
  sorted: number[] = []
): SortStep {
  return {
    array: [...array],
    comparing,
    swapping,
    sorted: [...sorted],
  };
}

/* -------------------------------------------------------
   BUBBLE SORT
------------------------------------------------------- */

function bubbleSort(input: number[]): SortResult {
  const array = [...input];
  const steps: SortStep[] = [];

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  const sorted: number[] = [];

  for (let i = 0; i < array.length; i++) {
    let changed = false;

    for (let j = 0; j < array.length - i - 1; j++) {
      comparisons++;

      accesses += 2;

      steps.push(
        createStep(array, [j, j + 1], [], sorted)
      );

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [
          array[j + 1],
          array[j],
        ];

        swaps++;
        accesses += 2;
        changed = true;

        steps.push(
          createStep(
            array,
            [],
            [j, j + 1],
            sorted
          )
        );
      }
    }

    sorted.push(array.length - i - 1);

    steps.push(
      createStep(array, [], [], sorted)
    );

    if (!changed) break;
  }

  return {
    steps,
    comparisons,
    swaps,
    accesses,
  };
}

/* -------------------------------------------------------
   SELECTION SORT
------------------------------------------------------- */

function selectionSort(input: number[]): SortResult {
  const array = [...input];
  const steps: SortStep[] = [];

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  const sorted: number[] = [];

  for (let i = 0; i < array.length - 1; i++) {
    let min = i;

    for (let j = i + 1; j < array.length; j++) {
      comparisons++;
      accesses += 2;

      steps.push(
        createStep(array, [min, j], [], sorted)
      );

      if (array[j] < array[min]) {
        min = j;
      }
    }

    if (min !== i) {
      [array[i], array[min]] = [
        array[min],
        array[i],
      ];

      swaps++;
      accesses += 2;

      steps.push(
        createStep(
          array,
          [],
          [i, min],
          sorted
        )
      );
    }

    sorted.push(i);

    steps.push(
      createStep(array, [], [], sorted)
    );
  }

  sorted.push(array.length - 1);

  return {
    steps,
    comparisons,
    swaps,
    accesses,
  };
}

/* -------------------------------------------------------
   INSERTION SORT
------------------------------------------------------- */

function insertionSort(input: number[]): SortResult {
  const array = [...input];
  const steps: SortStep[] = [];

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  for (let i = 1; i < array.length; i++) {
    let j = i;

    while (j > 0) {
      comparisons++;
      accesses += 2;

      steps.push(
        createStep(array, [j - 1, j])
      );

      if (array[j - 1] <= array[j]) break;

      [array[j - 1], array[j]] = [
        array[j],
        array[j - 1],
      ];

      swaps++;
      accesses += 2;

      steps.push(
        createStep(
          array,
          [],
          [j - 1, j]
        )
      );

      j--;
    }
  }

  return {
    steps,
    comparisons,
    swaps,
    accesses,
  };
}

/* -------------------------------------------------------
   MERGE SORT
------------------------------------------------------- */

function mergeSort(input: number[]): SortResult {
  const array = [...input];
  const steps: SortStep[] = [];

  let comparisons = 0;
  const swaps = 0;
  let accesses = 0;

  function merge(
    left: number,
    middle: number,
    right: number
  ) {
    const leftPart = array.slice(
      left,
      middle + 1
    );

    const rightPart = array.slice(
      middle + 1,
      right + 1
    );

    let i = 0;
    let j = 0;
    let k = left;

    while (
      i < leftPart.length &&
      j < rightPart.length
    ) {
      comparisons++;
      accesses += 2;

      steps.push(
        createStep(array, [
          left + i,
          middle + 1 + j,
        ])
      );

      if (leftPart[i] <= rightPart[j]) {
        array[k] = leftPart[i];
        i++;
      } else {
        array[k] = rightPart[j];
        j++;
      }

      accesses++;

      steps.push(
        createStep(array, [], [k])
      );

      k++;
    }

    while (i < leftPart.length) {
      array[k] = leftPart[i];
      i++;
      k++;

      accesses++;

      steps.push(
        createStep(array, [], [k - 1])
      );
    }

    while (j < rightPart.length) {
      array[k] = rightPart[j];
      j++;
      k++;

      accesses++;

      steps.push(
        createStep(array, [], [k - 1])
      );
    }
  }

  function divide(left: number, right: number) {
    if (left >= right) return;

    const middle = Math.floor(
      (left + right) / 2
    );

    divide(left, middle);
    divide(middle + 1, right);

    merge(left, middle, right);
  }

  divide(0, array.length - 1);

  return {
    steps,
    comparisons,
    swaps,
    accesses,
  };
}

/* -------------------------------------------------------
   QUICK SORT
------------------------------------------------------- */

function quickSort(input: number[]): SortResult {
  const array = [...input];
  const steps: SortStep[] = [];

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  function partition(
    low: number,
    high: number
  ): number {
    const pivot = array[high];

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      accesses += 2;

      steps.push(
        createStep(array, [j, high])
      );

      if (array[j] < pivot) {
        i++;

        [array[i], array[j]] = [
          array[j],
          array[i],
        ];

        swaps++;
        accesses += 2;

        steps.push(
          createStep(
            array,
            [],
            [i, j]
          )
        );
      }
    }

    [array[i + 1], array[high]] = [
      array[high],
      array[i + 1],
    ];

    swaps++;
    accesses += 2;

    steps.push(
      createStep(
        array,
        [],
        [i + 1, high]
      )
    );

    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low >= high) return;

    const pivot = partition(low, high);

    sort(low, pivot - 1);
    sort(pivot + 1, high);
  }

  sort(0, array.length - 1);

  return {
    steps,
    comparisons,
    swaps,
    accesses,
  };
}

/* -------------------------------------------------------
   HEAP SORT
------------------------------------------------------- */

function heapSort(input: number[]): SortResult {
  const array = [...input];
  const steps: SortStep[] = [];

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  function heapify(
    size: number,
    root: number
  ) {
    let largest = root;

    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      comparisons++;
      accesses += 2;

      steps.push(
        createStep(array, [largest, left])
      );

      if (array[left] > array[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      comparisons++;
      accesses += 2;

      steps.push(
        createStep(array, [largest, right])
      );

      if (array[right] > array[largest]) {
        largest = right;
      }
    }

    if (largest !== root) {
      [array[root], array[largest]] = [
        array[largest],
        array[root],
      ];

      swaps++;
      accesses += 2;

      steps.push(
        createStep(
          array,
          [],
          [root, largest]
        )
      );

      heapify(size, largest);
    }
  }

  for (
    let i = Math.floor(array.length / 2) - 1;
    i >= 0;
    i--
  ) {
    heapify(array.length, i);
  }

  for (let i = array.length - 1; i > 0; i--) {
    [array[0], array[i]] = [
      array[i],
      array[0],
    ];

    swaps++;
    accesses += 2;

    steps.push(
      createStep(
        array,
        [],
        [0, i],
        [i]
      )
    );

    heapify(i, 0);
  }

  return {
    steps,
    comparisons,
    swaps,
    accesses,
  };
}

/* -------------------------------------------------------
   PUBLIC API
------------------------------------------------------- */

export function runSortingAlgorithm(
  algorithm: SortAlgorithm,
  array: number[]
): SortResult {
  switch (algorithm) {
    case "bubble":
      return bubbleSort(array);

    case "selection":
      return selectionSort(array);

    case "insertion":
      return insertionSort(array);

    case "merge":
      return mergeSort(array);

    case "quick":
      return quickSort(array);

    case "heap":
      return heapSort(array);

    default:
      return bubbleSort(array);
  }
}