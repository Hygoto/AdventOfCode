package Day15;

import java.io.File;
import java.util.Arrays;
import java.util.Scanner;

public class D15_2 {
    private static int size = 100;
    private static int[][] m = new int[size*5][size*5];
    private static int[][] n = new int[size*5][size*5];
    public static void main(String[] args) throws Exception {
        File input = new File("./src/Day15/input");
        Scanner i = new Scanner(input);
        String t;
        for (int s = 0; s < size; s++) {
            t = i.next();
            for (int w = 0; w < size; w++) {
                m[s][w] = Character.getNumericValue(t.charAt(w));
            }
        }
        i.close();
        for (int s = 0; s < 5; s++) {
            for (int w = 0; w < 5; w++) {
                if (s == 0 && w == 0) w++;
                for (int a = 0; a < size; a++) {
                    for (int d = 0; d < size; d++) {
                        if (s > 0 && w == 0) m[a+s*(size)][d+w*(size)] = m[a+(s-1)*(size)][d+(w+1)*(size)];
                        else if (m[a+s*(size)][d+(w-1)*(size)] != 9) m[a+(s)*(size)][d+w*(size)] = m[a+s*(size)][d+(w-1)*(size)]+1;
                        else m[a+s*(size)][d+w*(size)] = 1;
                    }
                }
            }
        }
        for (int s = 0; s < size*5; s++) {
            Arrays.fill(n[s], Integer.MAX_VALUE);
        }
        n[0][0] = 0;
        danger(0,0);
        System.out.println(n[size*5-1][size*5-1]);
    }
    static void danger(int a, int b) { 
        boolean[][] v = new boolean[size*5][size*5];
        int[] l = new int[3];
        while (!v[size*5-1][size*5-1]) {
            if (a+1 < size*5 && !v[a+1][b] && n[a][b] + m[a+1][b] < n[a+1][b]) {
                n[a+1][b] = n[a][b] + m[a+1][b];

            }
            if (b+1 < size*5 && !v[a][b+1] && n[a][b] + m[a][b+1] < n[a][b+1]) {
                n[a][b+1] = n[a][b] + m[a][b+1];
            }
            if (a-1 > -1 && !v[a-1][b] && n[a][b] + m[a-1][b] < n[a-1][b]) {
                n[a-1][b] = n[a][b] + m[a-1][b];
            }
            if (b-1 > -1 && !v[a][b-1] && n[a][b] + m[a][b-1] < n[a][b-1]) {
                n[a][b-1] = n[a][b] + m[a][b-1];
            }
            v[a][b] = true;
            l[0] = Integer.MAX_VALUE;
            for (int x = 0; x < size*5; x++) {
                for (int y = 0; y < size*5; y++) {
                    if (!v[x][y] && n[x][y] < l[0]) {
                        l[0] = n[x][y];
                        l[1] = x;
                        l[2] = y;
                    }
                }
            }
            a = l[1];
            b = l[2];
        }
    }
}
