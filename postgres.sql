--
-- PostgreSQL database dump
--

\restrict GH4dbI61tVu9kdFoYYV9OOrPGc3J5eSfXdhFPdu0OAxkQdOHgxzU30f5kbw39h6

-- Dumped from database version 18.0 (Debian 18.0-1.pgdg13+3)
-- Dumped by pg_dump version 18.0 (Debian 18.0-1.pgdg13+3)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Difficulty; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public."Difficulty" AS ENUM (
    'EASY',
    'MEDIUM',
    'HARD'
);


ALTER TYPE public."Difficulty" OWNER TO myuser;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public."UserRole" OWNER TO myuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Playlist; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Playlist" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Playlist" OWNER TO myuser;

--
-- Name: Problem; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Problem" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    difficulty public."Difficulty" NOT NULL,
    tags text[],
    "userId" text NOT NULL,
    examples jsonb NOT NULL,
    constraints text NOT NULL,
    hints text,
    editorial text,
    testcases jsonb NOT NULL,
    "codeSnippets" jsonb NOT NULL,
    "referenceSolutions" jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Problem" OWNER TO myuser;

--
-- Name: ProblemInPlaylist; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."ProblemInPlaylist" (
    id text NOT NULL,
    "playListId" text NOT NULL,
    "problemId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ProblemInPlaylist" OWNER TO myuser;

--
-- Name: ProblemSolved; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."ProblemSolved" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "problemId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ProblemSolved" OWNER TO myuser;

--
-- Name: Submission; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Submission" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "problemId" text NOT NULL,
    "sourceCode" jsonb NOT NULL,
    language text NOT NULL,
    stdin text,
    stdout text,
    stderr text,
    "compileOutput" text,
    status text NOT NULL,
    memory text,
    "time" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Submission" OWNER TO myuser;

--
-- Name: TestCaseResult; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."TestCaseResult" (
    id text NOT NULL,
    "submissionId" text NOT NULL,
    "testCase" integer NOT NULL,
    passed boolean NOT NULL,
    stdout text,
    expected text NOT NULL,
    stderr text,
    status text NOT NULL,
    memory text,
    "time" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "compileOutput" text
);


ALTER TABLE public."TestCaseResult" OWNER TO myuser;

--
-- Name: User; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    image text,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO myuser;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO myuser;

--
-- Data for Name: Playlist; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Playlist" (id, name, description, "userId", "createdAt", "updatedAt") FROM stdin;
af5cd326-1b53-4985-bc3d-c32eb372afe2	CodeSnippet	asa	129e0853-0736-4472-a233-35b75c9f4d99	2025-11-22 12:07:17.166	2025-11-22 12:07:17.166
3955a6bb-a726-4eb1-ac40-42b169bf33dd	MyPlaylist	aoafaf	922dfd3d-1b97-4c6b-9c05-0629ea7cf412	2025-11-23 07:12:12.178	2025-11-23 07:12:12.178
\.


--
-- Data for Name: Problem; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Problem" (id, title, description, difficulty, tags, "userId", examples, constraints, hints, editorial, testcases, "codeSnippets", "referenceSolutions", "createdAt", "updatedAt") FROM stdin;
449e25ff-7e94-4ba7-99d9-cf50973533bb	Add Two Numbers	Given two numbers a and b add them up and return the outout	EASY	{math,operators,addition}	1daa8d3b-8800-4178-be6a-725a429cbbc8	{"PYTHON": {"input": "3 7", "output": "10", "explanation": "Adding 3 and 7 gives 10."}, "JAVASCRIPT": {"input": "-5 12", "output": "7", "explanation": "Adding -5 and 12 gives 7."}}	-10^9 ≤ a, b ≤ 10^9	\N	\N	[{"input": "100 200", "output": "300"}, {"input": "-500 -600", "output": "-1100"}, {"input": "0 0", "output": "0"}]	{"JAVA": "import java.util.Scanner;\\n\\npublic class Main {\\n    public static int addTwoNumbers(int a, int b) {\\n        // Write your code here\\n        // Return the sum of a and b\\n        return 0;\\n    }\\n\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        int a = sc.nextInt();\\n        int b = sc.nextInt();\\n        System.out.println(addTwoNumbers(a, b));\\n    }\\n}", "PYTHON": "def add_two_numbers(a, b):\\n    # Write your code here\\n    # Return the sum of a and b\\n    pass\\n\\nimport sys\\ninput_line = sys.stdin.read()\\na, b = map(int, input_line.split())\\nprint(add_two_numbers(a, b))", "JAVASCRIPT": "const readline = require('readline');\\n\\nfunction addTwoNumbers(a, b) {\\n    // Write your code here\\n    // Return the sum of a and b\\n}\\n\\nconst rl = readline.createInterface({\\n    input: process.stdin,\\n    output: process.stdout\\n});\\n\\nlet inputLines = [];\\n\\nrl.on('line', (line) => {\\n    inputLines = line.split(' ');\\n    rl.close();\\n}).on('close', () => {\\n    const a = parseInt(inputLines[0], 10);\\n    const b = parseInt(inputLines[1], 10);\\n    console.log(addTwoNumbers(a, b));\\n});"}	{"JAVA": "import java.util.Scanner;\\n\\npublic class Main {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        int a = sc.nextInt();\\n        int b = sc.nextInt();\\n        System.out.println(a + b);\\n    }\\n}", "PYTHON": "import sys\\ninput_line = sys.stdin.read()\\na, b = map(int, input_line.split())\\nprint(a + b)", "JAVASCRIPT": "const readline = require('readline');\\n\\nconst rl = readline.createInterface({\\n    input: process.stdin,\\n    output: process.stdout\\n});\\n\\nlet inputLines = [];\\n\\nrl.on('line', (line) => {\\n    inputLines = line.split(' ');\\n    rl.close();\\n}).on('close', () => {\\n    const a = parseInt(inputLines[0], 10);\\n    const b = parseInt(inputLines[1], 10);\\n    console.log(a + b);\\n});"}	2025-11-16 08:31:16.319	2025-11-16 08:31:16.319
12247cef-234a-4cf4-a0ab-e5eea086064a	Valid Palindrome	A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.	EASY	{String,"Two Pointers"}	129e0853-0736-4472-a233-35b75c9f4d99	{"JAVA": {"input": "s = \\"A man, a plan, a canal: Panama\\"", "output": "true", "explanation": "\\"amanaplanacanalpanama\\" is a palindrome."}, "PYTHON": {"input": "s = \\"A man, a plan, a canal: Panama\\"", "output": "true", "explanation": "\\"amanaplanacanalpanama\\" is a palindrome."}, "JAVASCRIPT": {"input": "s = \\"A man, a plan, a canal: Panama\\"", "output": "true", "explanation": "\\"amanaplanacanalpanama\\" is a palindrome."}}	1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.	\N	\N	[{"input": "A man, a plan, a canal: Panama", "output": "true"}, {"input": "race a car", "output": "false"}, {"input": " ", "output": "true"}]	{"JAVA": "import java.util.Scanner;\\n\\npublic class Main {\\n    public static String preprocess(String s) {\\n        return s.replaceAll(\\"[^a-zA-Z0-9]\\", \\"\\").toLowerCase();\\n    }\\n\\n    public static boolean isPalindrome(String s) {\\n       \\n    }\\n\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        String input = sc.nextLine();\\n\\n        boolean result = isPalindrome(input);\\n        System.out.println(result ? \\"true\\" : \\"false\\");\\n    }\\n}\\n", "PYTHON": "class Solution:\\n      def isPalindrome(self, s: str) -> bool:\\n          # Write your code here\\n          pass\\n  \\n  # Input parsing\\nif __name__ == \\"__main__\\":\\n      import sys\\n      # Read the input string\\n      s = sys.stdin.readline().strip()\\n      \\n      # Call solution\\n      sol = Solution()\\n      result = sol.isPalindrome(s)\\n      \\n      # Output result\\n      print(str(result).lower())  # Convert True/False to lowercase true/false", "JAVASCRIPT": "/**\\n   * @param {string} s\\n   * @return {boolean}\\n   */\\n  function isPalindrome(s) {\\n    // Write your code here\\n  }\\n  \\n  // Add readline for dynamic input handling\\n  const readline = require('readline');\\n  const rl = readline.createInterface({\\n    input: process.stdin,\\n    output: process.stdout,\\n    terminal: false\\n  });\\n  \\n  // Process input line\\n  rl.on('line', (line) => {\\n    // Call solution with the input string\\n    const result = isPalindrome(line);\\n    \\n    // Output the result\\n    console.log(result ? \\"true\\" : \\"false\\");\\n    rl.close();\\n  });"}	{"JAVA": "import java.util.Scanner;\\n\\npublic class Main {\\n    public static String preprocess(String s) {\\n        return s.replaceAll(\\"[^a-zA-Z0-9]\\", \\"\\").toLowerCase();\\n    }\\n\\n    public static boolean isPalindrome(String s) {\\n        s = preprocess(s);\\n        int left = 0, right = s.length() - 1;\\n\\n        while (left < right) {\\n            if (s.charAt(left) != s.charAt(right)) return false;\\n            left++;\\n            right--;\\n        }\\n\\n        return true;\\n    }\\n\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        String input = sc.nextLine();\\n\\n        boolean result = isPalindrome(input);\\n        System.out.println(result ? \\"true\\" : \\"false\\");\\n    }\\n}\\n", "PYTHON": "class Solution:\\r\\n      def isPalindrome(self, s: str) -> bool:\\r\\n          # Convert to lowercase and keep only alphanumeric characters\\r\\n          filtered_chars = [c.lower() for c in s if c.isalnum()]\\r\\n          \\r\\n          # Check if it's a palindrome\\r\\n          return filtered_chars == filtered_chars[::-1]\\r\\n  \\r\\n  # Input parsing\\r\\nif __name__ == \\"__main__\\":\\r\\n      import sys\\r\\n      # Read the input string\\r\\n      s = sys.stdin.readline().strip()\\r\\n      \\r\\n      # Call solution\\r\\n      sol = Solution()\\r\\n      result = sol.isPalindrome(s)\\r\\n      \\r\\n      # Output result\\r\\n      print(str(result).lower())  # Convert True/False to lowercase true/false", "JAVASCRIPT": "/**\\n   * @param {string} s\\n   * @return {boolean}\\n   */\\n  function isPalindrome(s) {\\n    // Convert to lowercase and remove non-alphanumeric characters\\n    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');\\n    \\n    // Check if it's a palindrome\\n    let left = 0;\\n    let right = s.length - 1;\\n    \\n    while (left < right) {\\n      if (s[left] !== s[right]) {\\n        return false;\\n      }\\n      left++;\\n      right--;\\n    }\\n    \\n    return true;\\n  }\\n  \\n  // Add readline for dynamic input handling\\n  const readline = require('readline');\\n  const rl = readline.createInterface({\\n    input: process.stdin,\\n    output: process.stdout,\\n    terminal: false\\n  });\\n  \\n  // Process input line\\n  rl.on('line', (line) => {\\n    // Call solution with the input string\\n    const result = isPalindrome(line);\\n    \\n    // Output the result\\n    console.log(result ? \\"true\\" : \\"false\\");\\n    rl.close();\\n  });"}	2025-11-20 15:28:20.291	2025-11-20 15:28:20.291
5ddc64ce-4ea8-478e-bebe-ab2974195971	Two Sum	Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.	EASY	{Array,"Hash Map"}	129e0853-0736-4472-a233-35b75c9f4d99	{"JAVA": {"input": "nums = [3, 3], target = 6", "output": "[0, 1]", "explanation": "nums[0] + nums[1] = 3 + 3 = 6"}, "PYTHON": {"input": "nums = [3, 2, 4], target = 6", "output": "[1, 2]", "explanation": "nums[1] + nums[2] = 2 + 4 = 6"}, "JAVASCRIPT": {"input": "nums = [2, 7, 11, 15], target = 9", "output": "[0, 1]", "explanation": "nums[0] + nums[1] = 2 + 7 = 9, so return [0, 1]."}}	2 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\n	\N	\N	[{"input": "4\\n2 7 11 15\\n9", "output": "0 1"}, {"input": "3\\n3 2 4\\n6", "output": "1 2"}, {"input": "2\\n3 3\\n6", "output": "0 1"}]	{"JAVA": "import java.util.*;\\n\\npublic class Main {\\n\\n    public static int[] twoSum(int[] nums, int target) {\\n        // Write your code here\\n        return new int[]{};\\n    }\\n\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n\\n        int n = Integer.parseInt(sc.nextLine());\\n        int[] nums = new int[n];\\n        String[] parts = sc.nextLine().split(\\" \\");\\n        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(parts[i]);\\n\\n        int target = Integer.parseInt(sc.nextLine());\\n\\n        int[] result = twoSum(nums, target);\\n        System.out.println(result[0] + \\" \\" + result[1]);\\n    }\\n}\\n", "PYTHON": "from typing import List\\n\\nclass Solution:\\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\\n        # Write your code here\\n        pass\\n\\nif __name__ == \\"__main__\\":\\n    import sys\\n    \\n    n = int(sys.stdin.readline().strip())\\n    nums = list(map(int, sys.stdin.readline().strip().split()))\\n    target = int(sys.stdin.readline().strip())\\n    \\n    sol = Solution()\\n    result = sol.twoSum(nums, target)\\n    print(*result)\\n", "JAVASCRIPT": "function twoSum(nums, target) {\\n  // Write your code here\\n}\\n\\n// Input parsing\\nconst readline = require('readline');\\nconst rl = readline.createInterface({ input: process.stdin });\\n\\nlet data = [];\\nrl.on('line', (line) => {\\n  data.push(line.trim());\\n  if (data.length === 3) {\\n    const n = parseInt(data[0]);\\n    const nums = data[1].split(\\" \\").map(Number);\\n    const target = parseInt(data[2]);\\n\\n    const result = twoSum(nums, target);\\n    console.log(result.join(\\" \\"));\\n    rl.close();\\n  }\\n});\\n"}	{"JAVA": "import java.util.*;\\r\\n\\r\\npublic class Main {\\r\\n\\r\\n    public static int[] twoSum(int[] nums, int target) {\\r\\n        HashMap<Integer, Integer> map = new HashMap<>();\\r\\n\\r\\n        for (int i = 0; i < nums.length; i++) {\\r\\n            int comp = target - nums[i];\\r\\n            if (map.containsKey(comp)) {\\r\\n                return new int[]{map.get(comp), i};\\r\\n            }\\r\\n            map.put(nums[i], i);\\r\\n        }\\r\\n        return new int[]{};\\r\\n    }\\r\\n\\r\\n    public static void main(String[] args) {\\r\\n        Scanner sc = new Scanner(System.in);\\r\\n\\r\\n        int n = Integer.parseInt(sc.nextLine());\\r\\n        int[] nums = new int[n];\\r\\n        String[] parts = sc.nextLine().split(\\" \\");\\r\\n        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(parts[i]);\\r\\n\\r\\n        int target = Integer.parseInt(sc.nextLine());\\r\\n\\r\\n        int[] result = twoSum(nums, target);\\r\\n        System.out.println(result[0] + \\" \\" + result[1]);\\r\\n    }\\r\\n}\\r\\n", "PYTHON": "from typing import List\\r\\n\\r\\nclass Solution:\\r\\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\\r\\n        hashmap = {}\\r\\n        for i, num in enumerate(nums):\\r\\n            comp = target - num\\r\\n            if comp in hashmap:\\r\\n                return [hashmap[comp], i]\\r\\n            hashmap[num] = i\\r\\n\\r\\nif __name__ == \\"__main__\\":\\r\\n    import sys\\r\\n    \\r\\n    n = int(sys.stdin.readline().strip())\\r\\n    nums = list(map(int, sys.stdin.readline().strip().split()))\\r\\n    target = int(sys.stdin.readline().strip())\\r\\n    \\r\\n    sol = Solution()\\r\\n    result = sol.twoSum(nums, target)\\r\\n    print(*result)\\r\\n", "JAVASCRIPT": "function twoSum(nums, target) {\\r\\n  const map = new Map();\\r\\n  \\r\\n  for (let i = 0; i < nums.length; i++) {\\r\\n    const comp = target - nums[i];\\r\\n    if (map.has(comp)) return [map.get(comp), i];\\r\\n    map.set(nums[i], i);\\r\\n  }\\r\\n}\\r\\n\\r\\n// Input parsing\\r\\nconst readline = require('readline');\\r\\nconst rl = readline.createInterface({ input: process.stdin });\\r\\n\\r\\nlet data = [];\\r\\nrl.on('line', (line) => {\\r\\n  data.push(line.trim());\\r\\n  if (data.length === 3) {\\r\\n    const n = parseInt(data[0]);\\r\\n    const nums = data[1].split(\\" \\").map(Number);\\r\\n    const target = parseInt(data[2]);\\r\\n\\r\\n    const result = twoSum(nums, target);\\r\\n    console.log(result.join(\\" \\"));\\r\\n    rl.close();\\r\\n  }\\r\\n});\\r\\n"}	2025-11-22 15:46:52.143	2025-11-22 15:46:52.143
\.


--
-- Data for Name: ProblemInPlaylist; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."ProblemInPlaylist" (id, "playListId", "problemId", "createdAt", "updatedAt") FROM stdin;
ced29033-28d2-46a0-a963-97accf28b341	af5cd326-1b53-4985-bc3d-c32eb372afe2	449e25ff-7e94-4ba7-99d9-cf50973533bb	2025-11-22 12:13:19.43	2025-11-22 12:13:19.43
7e9a9d7d-cb19-48db-8dbf-7baa1ef43de0	3955a6bb-a726-4eb1-ac40-42b169bf33dd	449e25ff-7e94-4ba7-99d9-cf50973533bb	2025-11-23 07:12:45.504	2025-11-23 07:12:45.504
\.


--
-- Data for Name: ProblemSolved; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."ProblemSolved" (id, "userId", "problemId", "createdAt", "updatedAt") FROM stdin;
9700104a-45b4-4be0-9d77-6642abf2b83a	1daa8d3b-8800-4178-be6a-725a429cbbc8	449e25ff-7e94-4ba7-99d9-cf50973533bb	2025-11-17 11:55:14.317	2025-11-17 11:55:14.317
6051be9f-cb38-4957-9205-85cf1d536c3f	129e0853-0736-4472-a233-35b75c9f4d99	449e25ff-7e94-4ba7-99d9-cf50973533bb	2025-11-21 16:05:34.518	2025-11-21 16:05:34.518
461103e6-cee3-4db4-aad8-add04281299a	922dfd3d-1b97-4c6b-9c05-0629ea7cf412	449e25ff-7e94-4ba7-99d9-cf50973533bb	2025-11-23 07:14:37.34	2025-11-23 07:14:37.34
\.


--
-- Data for Name: Submission; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Submission" (id, "userId", "problemId", "sourceCode", language, stdin, stdout, stderr, "compileOutput", status, memory, "time", "createdAt", "updatedAt") FROM stdin;
38672ab8-077f-48c1-9715-ed3f7c7bbe42	1daa8d3b-8800-4178-be6a-725a429cbbc8	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const fs = require('fs');\\n\\n// Reading input from stdin (using fs to read all input)\\nconst input = fs.readFileSync(0, 'utf-8').trim();\\nconst [a, b] = input.split(' ').map(Number);\\n\\nconsole.log(a + b);"	JavaScript	100 200\n-500 -600 \n0 0	["300","-1100","0"]	\N	\N	Accepted	["7380 KB","7440 KB","7604 KB"]	["0.024 s","0.024 s","0.024 s"]	2025-11-17 11:53:14.242	2025-11-17 11:53:14.242
8f7ca22c-419d-4124-a0af-3c8d488a8751	1daa8d3b-8800-4178-be6a-725a429cbbc8	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const fs = require('fs');\\n\\n// Reading input from stdin (using fs to read all input)\\nconst input = fs.readFileSync(0, 'utf-8').trim();\\nconst [a, b] = input.split(' ').map(Number);\\n\\nconsole.log(a + b);"	JavaScript	100 200\n-500 -600 \n0 0	["300","-1100","0"]	\N	\N	Accepted	["7104 KB","7448 KB","6956 KB"]	["0.024 s","0.024 s","0.024 s"]	2025-11-17 11:55:14.305	2025-11-17 11:55:14.305
7c7e7812-6c6b-4bb6-a1f9-4d7dd3a7596b	1daa8d3b-8800-4178-be6a-725a429cbbc8	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const fs = require('fs');\\n\\n// Reading input from stdin (using fs to read all input)\\nconst input = fs.readFileSync(0, 'utf-8').trim();\\nconst [a, b] = input.split(' ').map(Number);\\n\\nconsole.log(a + b);"	JavaScript	100 200\n-500 -600 \n0 0	["300","-1100","0"]	\N	\N	Accepted	["7080 KB","6832 KB","6936 KB"]	["0.025 s","0.024 s","0.024 s"]	2025-11-17 11:55:54.57	2025-11-17 11:55:54.57
b42c10d4-2586-49b1-9141-bd26a0a45282	1daa8d3b-8800-4178-be6a-725a429cbbc8	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const fs = require('fs');\\n\\n// Reading input from stdin (using fs to read all input)\\nconst input = fs.readFileSync(0, 'utf-8').trim();\\nconst [a, b] = input.split(' ').map(Number);\\n\\nconsole.log(a + b);"	JavaScript	100 200\n-500 -600 \n0 0	["300","-1100","0"]	\N	\N	Accepted	["7884 KB","7592 KB","7180 KB"]	["0.024 s","0.024 s","0.024 s"]	2025-11-17 11:58:42.829	2025-11-17 11:58:42.829
8d5e736a-d00f-45b4-afa5-5d99e7537e03	1daa8d3b-8800-4178-be6a-725a429cbbc8	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const fs = require('fs');\\n\\n// Reading input from stdin (using fs to read all input)\\nconst input = fs.readFileSync(0, 'utf-8').trim();\\nconst [a, b] = input.split(' ').map(Number);\\n\\nconsole.log(a + b);"	JavaScript	100 200\n-500 -600 \n0 0	["300","-1100","0"]	\N	\N	Accepted	["7492 KB","7156 KB","7436 KB"]	["0.025 s","0.025 s","0.024 s"]	2025-11-17 12:00:13.867	2025-11-17 12:00:13.867
9e1ac2bb-339d-403a-98a7-4a0987f043a5	129e0853-0736-4472-a233-35b75c9f4d99	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\r\\n\\r\\nfunction addTwoNumbers(a, b) {\\r\\n    // Write your code here\\r\\n    // Return the sum of a and b\\r\\n    return a+b;\\r\\n}\\r\\n\\r\\nconst rl = readline.createInterface({\\r\\n    input: process.stdin,\\r\\n    output: process.stdout\\r\\n});\\r\\n\\r\\nlet inputLines = [];\\r\\n\\r\\nrl.on('line', (line) => {\\r\\n    inputLines = line.split(' ');\\r\\n    rl.close();\\r\\n}).on('close', () => {\\r\\n    const a = parseInt(inputLines[0], 10);\\r\\n    const b = parseInt(inputLines[1], 10);\\r\\n    console.log(addTwoNumbers(a, b));\\r\\n});"	JavaScript	100 200\n-500 -600\n0 0	["300","-1100","0"]	\N	\N	Accepted	["7460 KB","7932 KB","7544 KB"]	["0.028 s","0.028 s","0.027 s"]	2025-11-21 16:05:34.453	2025-11-21 16:05:34.453
3711833d-8a3b-40fe-b1b4-cad20d7f884c	129e0853-0736-4472-a233-35b75c9f4d99	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\r\\n\\r\\nfunction addTwoNumbers(a, b) {\\r\\n    // Write your code here\\r\\n    // Return the sum of a and b\\r\\n    return a+b;\\r\\n}\\r\\n\\r\\nconst rl = readline.createInterface({\\r\\n    input: process.stdin,\\r\\n    output: process.stdout\\r\\n});\\r\\n\\r\\nlet inputLines = [];\\r\\n\\r\\nrl.on('line', (line) => {\\r\\n    inputLines = line.split(' ');\\r\\n    rl.close();\\r\\n}).on('close', () => {\\r\\n    const a = parseInt(inputLines[0], 10);\\r\\n    const b = parseInt(inputLines[1], 10);\\r\\n    console.log(addTwoNumbers(a, b));\\r\\n});"	JavaScript	100 200\n-500 -600\n0 0	["300","-1100","0"]	\N	\N	Accepted	["7444 KB","7764 KB","7956 KB"]	["0.026 s","0.026 s","0.027 s"]	2025-11-21 16:09:42.145	2025-11-21 16:09:42.145
8f667d4a-d484-4fdf-83df-b250947b3c34	129e0853-0736-4472-a233-35b75c9f4d99	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\r\\n\\r\\nfunction addTwoNumbers(a, b) {\\r\\n    // Write your code here\\r\\n    // Return the sum of a and b\\r\\n    return a+b;\\r\\n}\\r\\n\\r\\nconst rl = readline.createInterface({\\r\\n    input: process.stdin,\\r\\n    output: process.stdout\\r\\n});\\r\\n\\r\\nlet inputLines = [];\\r\\n\\r\\nrl.on('line', (line) => {\\r\\n    inputLines = line.split(' ');\\r\\n    rl.close();\\r\\n}).on('close', () => {\\r\\n    const a = parseInt(inputLines[0], 10);\\r\\n    const b = parseInt(inputLines[1], 10);\\r\\n    console.log(addTwoNumbers(a, b));\\r\\n});"	JavaScript	100 200\n-500 -600\n0 0	["300","-1100","0"]	\N	\N	Accepted	["7216 KB","7448 KB","7448 KB"]	["0.027 s","0.026 s","0.026 s"]	2025-11-21 17:39:45.783	2025-11-21 17:39:45.783
eb346546-143c-4e4d-b8ee-c6fdc0a2b2ba	129e0853-0736-4472-a233-35b75c9f4d99	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\r\\n\\r\\nfunction addTwoNumbers(a, b) {\\r\\n    // Write your code here\\r\\n    // Return the sum of a and b\\r\\n    return a+b;\\r\\n}\\r\\n\\r\\nconst rl = readline.createInterface({\\r\\n    input: process.stdin,\\r\\n    output: process.stdout\\r\\n});\\r\\n\\r\\nlet inputLines = [];\\r\\n\\r\\nrl.on('line', (line) => {\\r\\n    inputLines = line.split(' ');\\r\\n    rl.close();\\r\\n}).on('close', () => {\\r\\n    const a = parseInt(inputLines[0], 10);\\r\\n    const b = parseInt(inputLines[1], 10);\\r\\n    console.log(addTwoNumbers(a, b));\\r\\n});"	JavaScript	100 200\n-500 -600\n0 0	["300","-1100","0"]	\N	\N	Accepted	["7200 KB","7784 KB","8316 KB"]	["0.027 s","0.027 s","0.027 s"]	2025-11-21 17:42:17.642	2025-11-21 17:42:17.642
a1bc880a-2026-4584-8e7d-7a8e89fa3ec5	129e0853-0736-4472-a233-35b75c9f4d99	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\r\\n\\r\\nfunction addTwoNumbers(a, b) {\\r\\n    // Write your code here\\r\\n    // Return the sum of a and b\\r\\n    return a+b;\\r\\n}\\r\\n\\r\\nconst rl = readline.createInterface({\\r\\n    input: process.stdin,\\r\\n    output: process.stdout\\r\\n});\\r\\n\\r\\nlet inputLines = [];\\r\\n\\r\\nrl.on('line', (line) => {\\r\\n    inputLines = line.split(' ');\\r\\n    rl.close();\\r\\n}).on('close', () => {\\r\\n    const a = parseInt(inputLines[0], 10);\\r\\n    const b = parseInt(inputLines[1], 10);\\r\\n    console.log(addTwoNumbers(a, b));\\r\\n});"	JavaScript	100 200\n-500 -600\n0 0	["300","-1100","0"]	\N	\N	Accepted	["8188 KB","7620 KB","7772 KB"]	["0.027 s","0.027 s","0.027 s"]	2025-11-21 17:56:11.458	2025-11-21 17:56:11.458
0d72e51c-1bec-4a7c-be4d-3d72c219abb9	129e0853-0736-4472-a233-35b75c9f4d99	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\r\\n\\r\\nfunction addTwoNumbers(a, b) {\\r\\n    // Write your code here\\r\\n    // Return the sum of a and b\\r\\n    return a+b;\\r\\n}\\r\\n\\r\\nconst rl = readline.createInterface({\\r\\n    input: process.stdin,\\r\\n    output: process.stdout\\r\\n});\\r\\n\\r\\nlet inputLines = [];\\r\\n\\r\\nrl.on('line', (line) => {\\r\\n    inputLines = line.split(' ');\\r\\n    rl.close();\\r\\n}).on('close', () => {\\r\\n    const a = parseInt(inputLines[0], 10);\\r\\n    const b = parseInt(inputLines[1], 10);\\r\\n    console.log(addTwoNumbers(a, b));\\r\\n});"	JavaScript	100 200\n-500 -600\n0 0	["300","-1100","0"]	\N	\N	Accepted	["7468 KB","7480 KB","7456 KB"]	["0.027 s","0.027 s","0.027 s"]	2025-11-21 17:57:01.717	2025-11-21 17:57:01.717
3545bf7e-353a-4721-aa0b-c9f1608768b3	129e0853-0736-4472-a233-35b75c9f4d99	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\n\\nfunction addTwoNumbers(a, b) {\\n    // Write your code here\\n    // Return the sum of a and b\\n}\\n\\nconst rl = readline.createInterface({\\n    input: process.stdin,\\n    output: process.stdout\\n});\\n\\nlet inputLines = [];\\n\\nrl.on('line', (line) => {\\n    inputLines = line.split(' ');\\n    rl.close();\\n}).on('close', () => {\\n    const a = parseInt(inputLines[0], 10);\\n    const b = parseInt(inputLines[1], 10);\\n    console.log(addTwoNumbers(a, b));\\n});"	JavaScript	100 200\n-500 -600\n0 0	["undefined","undefined","undefined"]	\N	\N	Wrong Answer	["7568 KB","8024 KB","7680 KB"]	["0.026 s","0.027 s","0.027 s"]	2025-11-21 17:58:28.042	2025-11-21 17:58:28.042
9fb24317-b0c6-4f48-af3f-226899ebbaf0	129e0853-0736-4472-a233-35b75c9f4d99	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\n\\nfunction addTwoNumbers(a, b) {\\n    // Write your code here\\n    // Return the sum of a and b\\n    return a+b;\\n}\\n\\nconst rl = readline.createInterface({\\n    input: process.stdin,\\n    output: process.stdout\\n});\\n\\nlet inputLines = [];\\n\\nrl.on('line', (line) => {\\n    inputLines = line.split(' ');\\n    rl.close();\\n}).on('close', () => {\\n    const a = parseInt(inputLines[0], 10);\\n    const b = parseInt(inputLines[1], 10);\\n    console.log(addTwoNumbers(a, b));\\n});"	JavaScript	100 200\n-500 -600\n0 0	["300","-1100","0"]	\N	\N	Accepted	["7768 KB","8052 KB","7524 KB"]	["0.029 s","0.027 s","0.027 s"]	2025-11-21 17:59:28.872	2025-11-21 17:59:28.872
bb4ffe97-0a81-4518-a72b-02483f5a7220	129e0853-0736-4472-a233-35b75c9f4d99	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\r\\n\\r\\nfunction addTwoNumbers(a, b) {\\r\\n    // Write your code here\\r\\n    // Return the sum of a and b\\r\\n    return a+b;\\r\\n    \\r\\n}\\r\\n\\r\\nconst rl = readline.createInterface({\\r\\n    input: process.stdin,\\r\\n    output: process.stdout\\r\\n});\\r\\n\\r\\nlet inputLines = [];\\r\\n\\r\\nrl.on('line', (line) => {\\r\\n    inputLines = line.split(' ');\\r\\n    rl.close();\\r\\n}).on('close', () => {\\r\\n    const a = parseInt(inputLines[0], 10);\\r\\n    const b = parseInt(inputLines[1], 10);\\r\\n    console.log(addTwoNumbers(a, b));\\r\\n});"	JavaScript	100 200\n-500 -600\n0 0	["300","-1100","0"]	\N	\N	Accepted	["7208 KB","7796 KB","7520 KB"]	["0.027 s","0.027 s","0.027 s"]	2025-11-22 10:24:32.101	2025-11-22 10:24:32.101
b1604918-2a69-4787-86e3-12e43e465d9a	922dfd3d-1b97-4c6b-9c05-0629ea7cf412	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\r\\n\\r\\nfunction addTwoNumbers(a, b) {\\r\\n    // Write your code here\\r\\n    // Return the sum of a and b\\r\\n    return a+b;\\r\\n}\\r\\n\\r\\nconst rl = readline.createInterface({\\r\\n    input: process.stdin,\\r\\n    output: process.stdout\\r\\n});\\r\\n\\r\\nlet inputLines = [];\\r\\n\\r\\nrl.on('line', (line) => {\\r\\n    inputLines = line.split(' ');\\r\\n    rl.close();\\r\\n}).on('close', () => {\\r\\n    const a = parseInt(inputLines[0], 10);\\r\\n    const b = parseInt(inputLines[1], 10);\\r\\n    console.log(addTwoNumbers(a, b));\\r\\n});"	JavaScript	100 200\n-500 -600\n0 0	["300","-1100","0"]	\N	\N	Accepted	["7260 KB","7472 KB","7572 KB"]	["0.027 s","0.026 s","0.026 s"]	2025-11-23 07:14:37.326	2025-11-23 07:14:37.326
add37acf-29cf-4c2c-a211-b3eb99b1d377	922dfd3d-1b97-4c6b-9c05-0629ea7cf412	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\r\\n\\r\\nfunction addTwoNumbers(a, b) {\\r\\n    // Write your code here\\r\\n    // Return the sum of a and b\\r\\n    return a-b;\\r\\n}\\r\\n\\r\\nconst rl = readline.createInterface({\\r\\n    input: process.stdin,\\r\\n    output: process.stdout\\r\\n});\\r\\n\\r\\nlet inputLines = [];\\r\\n\\r\\nrl.on('line', (line) => {\\r\\n    inputLines = line.split(' ');\\r\\n    rl.close();\\r\\n}).on('close', () => {\\r\\n    const a = parseInt(inputLines[0], 10);\\r\\n    const b = parseInt(inputLines[1], 10);\\r\\n    console.log(addTwoNumbers(a, b));\\r\\n});"	JavaScript	100 200\n-500 -600\n0 0	["-100","100","0"]	\N	\N	Wrong Answer	["7388 KB","7496 KB","7136 KB"]	["0.028 s","0.028 s","0.028 s"]	2025-11-23 07:22:01.122	2025-11-23 07:22:01.122
7f003095-c2bf-45e1-a867-e1ed73a00137	129e0853-0736-4472-a233-35b75c9f4d99	449e25ff-7e94-4ba7-99d9-cf50973533bb	"const readline = require('readline');\\r\\n\\r\\nfunction addTwoNumbers(a, b) {\\r\\n    // Write your code here\\r\\n    // Return the sum of a and b\\r\\n    return a+b;\\r\\n}\\r\\n\\r\\nconst rl = readline.createInterface({\\r\\n    input: process.stdin,\\r\\n    output: process.stdout\\r\\n});\\r\\n\\r\\nlet inputLines = [];\\r\\n\\r\\nrl.on('line', (line) => {\\r\\n    inputLines = line.split(' ');\\r\\n    rl.close();\\r\\n}).on('close', () => {\\r\\n    const a = parseInt(inputLines[0], 10);\\r\\n    const b = parseInt(inputLines[1], 10);\\r\\n    console.log(addTwoNumbers(a, b));\\r\\n});"	JavaScript	100 200\n-500 -600\n0 0	["300","-1100","0"]	\N	\N	Accepted	["7580 KB","7168 KB","7468 KB"]	["0.028 s","0.028 s","0.028 s"]	2025-11-25 15:08:37.395	2025-11-25 15:08:37.395
\.


--
-- Data for Name: TestCaseResult; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."TestCaseResult" (id, "submissionId", "testCase", passed, stdout, expected, stderr, status, memory, "time", "createdAt", "updatedAt", "compileOutput") FROM stdin;
5a3fe93e-c541-44c1-b030-19334b06aa54	7c7e7812-6c6b-4bb6-a1f9-4d7dd3a7596b	1	t	300	300	\N	Accepted	7080 KB	0.025 s	2025-11-17 11:55:54.606	2025-11-17 11:55:54.606	\N
16e48a68-d1dc-42ad-b39f-c174dfeb8be4	7c7e7812-6c6b-4bb6-a1f9-4d7dd3a7596b	2	t	-1100	-1100	\N	Accepted	6832 KB	0.024 s	2025-11-17 11:55:54.606	2025-11-17 11:55:54.606	\N
f2fdd849-0702-498e-925b-b16d710c5d97	7c7e7812-6c6b-4bb6-a1f9-4d7dd3a7596b	3	t	0	0	\N	Accepted	6936 KB	0.024 s	2025-11-17 11:55:54.606	2025-11-17 11:55:54.606	\N
0b0ef825-b9d8-4aae-98cc-ce97ffb870e4	b42c10d4-2586-49b1-9141-bd26a0a45282	1	t	300	300	\N	Accepted	7884 KB	0.024 s	2025-11-17 11:58:42.871	2025-11-17 11:58:42.871	\N
1f8c2359-e644-43b0-b81f-5b1912d7fb2b	b42c10d4-2586-49b1-9141-bd26a0a45282	2	t	-1100	-1100	\N	Accepted	7592 KB	0.024 s	2025-11-17 11:58:42.871	2025-11-17 11:58:42.871	\N
cfe344bb-8c40-4679-ba07-4e86116ccc77	b42c10d4-2586-49b1-9141-bd26a0a45282	3	t	0	0	\N	Accepted	7180 KB	0.024 s	2025-11-17 11:58:42.871	2025-11-17 11:58:42.871	\N
8d18fadd-4f78-4345-8f5b-0f95831c0c23	8d5e736a-d00f-45b4-afa5-5d99e7537e03	1	t	300	300	\N	Accepted	7492 KB	0.025 s	2025-11-17 12:00:13.902	2025-11-17 12:00:13.902	\N
0f5b7d19-0001-412a-9802-6678536cbec0	8d5e736a-d00f-45b4-afa5-5d99e7537e03	2	t	-1100	-1100	\N	Accepted	7156 KB	0.025 s	2025-11-17 12:00:13.902	2025-11-17 12:00:13.902	\N
eb1b18da-b2bd-4877-9297-1d6249c62908	8d5e736a-d00f-45b4-afa5-5d99e7537e03	3	t	0	0	\N	Accepted	7436 KB	0.024 s	2025-11-17 12:00:13.902	2025-11-17 12:00:13.902	\N
82243721-bf94-4b3a-a2f9-798a43d1decb	9e1ac2bb-339d-403a-98a7-4a0987f043a5	1	t	300	300	\N	Accepted	7460 KB	0.028 s	2025-11-21 16:05:34.546	2025-11-21 16:05:34.546	\N
89de5aa0-16f0-4b55-8417-b717e7b314d6	9e1ac2bb-339d-403a-98a7-4a0987f043a5	2	t	-1100	-1100	\N	Accepted	7932 KB	0.028 s	2025-11-21 16:05:34.546	2025-11-21 16:05:34.546	\N
9abd4994-6a61-4f3c-81a0-588668334190	9e1ac2bb-339d-403a-98a7-4a0987f043a5	3	t	0	0	\N	Accepted	7544 KB	0.027 s	2025-11-21 16:05:34.546	2025-11-21 16:05:34.546	\N
5b4605a7-29ed-412b-941f-cc06f28e0ef0	3711833d-8a3b-40fe-b1b4-cad20d7f884c	1	t	300	300	\N	Accepted	7444 KB	0.026 s	2025-11-21 16:09:42.192	2025-11-21 16:09:42.192	\N
a9eed1c7-05a1-4c68-bfde-b7ebcae2aa1e	3711833d-8a3b-40fe-b1b4-cad20d7f884c	2	t	-1100	-1100	\N	Accepted	7764 KB	0.026 s	2025-11-21 16:09:42.192	2025-11-21 16:09:42.192	\N
c213601e-47a0-4197-b042-d69c61b69b5a	3711833d-8a3b-40fe-b1b4-cad20d7f884c	3	t	0	0	\N	Accepted	7956 KB	0.027 s	2025-11-21 16:09:42.192	2025-11-21 16:09:42.192	\N
235aac8a-9082-401c-801e-a9485b722b3d	8f667d4a-d484-4fdf-83df-b250947b3c34	1	t	300	300	\N	Accepted	7216 KB	0.027 s	2025-11-21 17:39:45.845	2025-11-21 17:39:45.845	\N
712f71f9-b2a8-4a78-8904-224271e85e50	8f667d4a-d484-4fdf-83df-b250947b3c34	2	t	-1100	-1100	\N	Accepted	7448 KB	0.026 s	2025-11-21 17:39:45.845	2025-11-21 17:39:45.845	\N
63698296-4b60-41d5-9b5e-d61fd4283962	8f667d4a-d484-4fdf-83df-b250947b3c34	3	t	0	0	\N	Accepted	7448 KB	0.026 s	2025-11-21 17:39:45.845	2025-11-21 17:39:45.845	\N
86b76dbb-ae6f-4808-a981-f4d0fa78dfa1	eb346546-143c-4e4d-b8ee-c6fdc0a2b2ba	1	t	300	300	\N	Accepted	7200 KB	0.027 s	2025-11-21 17:42:17.672	2025-11-21 17:42:17.672	\N
ec83ab01-c127-4617-8a45-b601a4880b10	eb346546-143c-4e4d-b8ee-c6fdc0a2b2ba	2	t	-1100	-1100	\N	Accepted	7784 KB	0.027 s	2025-11-21 17:42:17.672	2025-11-21 17:42:17.672	\N
2c0419a9-38f2-423b-bca3-2c5e632e02a8	eb346546-143c-4e4d-b8ee-c6fdc0a2b2ba	3	t	0	0	\N	Accepted	8316 KB	0.027 s	2025-11-21 17:42:17.672	2025-11-21 17:42:17.672	\N
7ba5343e-94f7-4e04-9527-ba3c6983dbbb	a1bc880a-2026-4584-8e7d-7a8e89fa3ec5	1	t	300	300	\N	Accepted	8188 KB	0.027 s	2025-11-21 17:56:11.492	2025-11-21 17:56:11.492	\N
2c69fc99-51af-4a39-b24f-7a4ee577714b	a1bc880a-2026-4584-8e7d-7a8e89fa3ec5	2	t	-1100	-1100	\N	Accepted	7620 KB	0.027 s	2025-11-21 17:56:11.492	2025-11-21 17:56:11.492	\N
4b30f36f-abb5-4e7e-bb38-bcf9a6ba6e23	a1bc880a-2026-4584-8e7d-7a8e89fa3ec5	3	t	0	0	\N	Accepted	7772 KB	0.027 s	2025-11-21 17:56:11.492	2025-11-21 17:56:11.492	\N
02f619a5-5b1d-493e-87e3-fc4e59a2991c	0d72e51c-1bec-4a7c-be4d-3d72c219abb9	1	t	300	300	\N	Accepted	7468 KB	0.027 s	2025-11-21 17:57:01.764	2025-11-21 17:57:01.764	\N
50b6de67-6639-4eb5-9075-df518d6c16d4	0d72e51c-1bec-4a7c-be4d-3d72c219abb9	2	t	-1100	-1100	\N	Accepted	7480 KB	0.027 s	2025-11-21 17:57:01.764	2025-11-21 17:57:01.764	\N
60c6079f-cda9-4e0a-bcf7-713bbc48f16c	0d72e51c-1bec-4a7c-be4d-3d72c219abb9	3	t	0	0	\N	Accepted	7456 KB	0.027 s	2025-11-21 17:57:01.764	2025-11-21 17:57:01.764	\N
2d19d5c4-9ad7-4643-b584-39152d337c7b	3545bf7e-353a-4721-aa0b-c9f1608768b3	1	f	undefined	300	\N	Accepted	7568 KB	0.026 s	2025-11-21 17:58:28.056	2025-11-21 17:58:28.056	\N
f6dc501d-a445-436a-b389-2a73268dbf8b	3545bf7e-353a-4721-aa0b-c9f1608768b3	2	f	undefined	-1100	\N	Accepted	8024 KB	0.027 s	2025-11-21 17:58:28.056	2025-11-21 17:58:28.056	\N
a4944aeb-094a-4076-8c8c-9e6499ddadc0	3545bf7e-353a-4721-aa0b-c9f1608768b3	3	f	undefined	0	\N	Accepted	7680 KB	0.027 s	2025-11-21 17:58:28.056	2025-11-21 17:58:28.056	\N
9bc71fd1-59fa-4d40-a3f8-6004a6f1ec53	9fb24317-b0c6-4f48-af3f-226899ebbaf0	1	t	300	300	\N	Accepted	7768 KB	0.029 s	2025-11-21 17:59:28.901	2025-11-21 17:59:28.901	\N
d7ee777c-b98d-4fda-af56-bff5eb95dcea	9fb24317-b0c6-4f48-af3f-226899ebbaf0	2	t	-1100	-1100	\N	Accepted	8052 KB	0.027 s	2025-11-21 17:59:28.901	2025-11-21 17:59:28.901	\N
1373e979-8d48-44bc-8369-5cafebf3c7b4	9fb24317-b0c6-4f48-af3f-226899ebbaf0	3	t	0	0	\N	Accepted	7524 KB	0.027 s	2025-11-21 17:59:28.901	2025-11-21 17:59:28.901	\N
a5d6454f-4a6b-4189-b941-fe360b611b6b	bb4ffe97-0a81-4518-a72b-02483f5a7220	1	t	300	300	\N	Accepted	7208 KB	0.027 s	2025-11-22 10:24:32.144	2025-11-22 10:24:32.144	\N
17937d82-614e-42e5-8265-6e29aea6402d	bb4ffe97-0a81-4518-a72b-02483f5a7220	2	t	-1100	-1100	\N	Accepted	7796 KB	0.027 s	2025-11-22 10:24:32.144	2025-11-22 10:24:32.144	\N
e27804c5-f638-4bee-a879-9c3187b0abc5	bb4ffe97-0a81-4518-a72b-02483f5a7220	3	t	0	0	\N	Accepted	7520 KB	0.027 s	2025-11-22 10:24:32.144	2025-11-22 10:24:32.144	\N
13d32fc4-0a10-4762-9303-5bebe6ac6de1	b1604918-2a69-4787-86e3-12e43e465d9a	1	t	300	300	\N	Accepted	7260 KB	0.027 s	2025-11-23 07:14:37.358	2025-11-23 07:14:37.358	\N
76cd171a-f94f-488b-abe8-22d590dbced7	b1604918-2a69-4787-86e3-12e43e465d9a	2	t	-1100	-1100	\N	Accepted	7472 KB	0.026 s	2025-11-23 07:14:37.358	2025-11-23 07:14:37.358	\N
c0f43f1c-d953-456b-a16b-ba37bdd77e1f	b1604918-2a69-4787-86e3-12e43e465d9a	3	t	0	0	\N	Accepted	7572 KB	0.026 s	2025-11-23 07:14:37.358	2025-11-23 07:14:37.358	\N
c2fe6f99-f867-4baf-9465-cd2b4702a168	add37acf-29cf-4c2c-a211-b3eb99b1d377	1	f	-100	300	\N	Accepted	7388 KB	0.028 s	2025-11-23 07:22:01.131	2025-11-23 07:22:01.131	\N
06130286-f1a2-42ce-8c4e-cd9e37500531	add37acf-29cf-4c2c-a211-b3eb99b1d377	2	f	100	-1100	\N	Accepted	7496 KB	0.028 s	2025-11-23 07:22:01.131	2025-11-23 07:22:01.131	\N
bde68756-0ab6-4ce2-898b-1b7f63303c24	add37acf-29cf-4c2c-a211-b3eb99b1d377	3	t	0	0	\N	Accepted	7136 KB	0.028 s	2025-11-23 07:22:01.131	2025-11-23 07:22:01.131	\N
14756e95-840f-4e35-b22b-1296beda0194	7f003095-c2bf-45e1-a867-e1ed73a00137	1	t	300	300	\N	Accepted	7580 KB	0.028 s	2025-11-25 15:08:37.445	2025-11-25 15:08:37.445	\N
ed6f6140-5930-4a9e-8435-5373a0da4041	7f003095-c2bf-45e1-a867-e1ed73a00137	2	t	-1100	-1100	\N	Accepted	7168 KB	0.028 s	2025-11-25 15:08:37.445	2025-11-25 15:08:37.445	\N
0a0f0d41-005f-488c-80d1-95ff3a0018ce	7f003095-c2bf-45e1-a867-e1ed73a00137	3	t	0	0	\N	Accepted	7468 KB	0.028 s	2025-11-25 15:08:37.445	2025-11-25 15:08:37.445	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."User" (id, name, email, image, role, password, "createdAt", "updatedAt") FROM stdin;
1daa8d3b-8800-4178-be6a-725a429cbbc8	Nicky	Santu@gmail.com	\N	ADMIN	$2b$10$w99WNwk9RxVgejsyfTHwcOP/UDFGz07qE7nBfIifqKPcclMgpefPu	2025-11-09 06:38:02.838	2025-11-09 07:34:22.541
bd319262-5e14-456d-9c55-19a1be737736	Iresh Kotabagi	22u1019@student.git.edu	\N	USER	$2b$10$jXknO4/1kh/N2VICDaBi/uEMFNlYRdeV1rtMsFIhAhZU3FeRpmm.S	2025-11-19 10:37:19.879	2025-11-19 10:37:19.879
129e0853-0736-4472-a233-35b75c9f4d99	Iresh Kotabagi	iresh2003@gmail.com	\N	ADMIN	$2b$10$V1DCtXOTTpgOrwzvxCXYce9BLx3JccU/xBxPhyTDZsPrly89Tq1Em	2025-11-19 11:42:12.647	2025-11-19 11:50:31.635
922dfd3d-1b97-4c6b-9c05-0629ea7cf412	Santrupt Manjaragi	santruptmanjaragi2003@gmail.com	\N	ADMIN	$2b$10$poN7mXFAn9K9eAPd9rwqXuAzRIbkOPrxi0wJZ4PGUyyvOg.vm/3mK	2025-11-23 07:10:51.674	2025-11-23 07:18:27.515
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3824ea52-bc8d-457a-9a37-6b18519dd023	db8baf0ca3321b165370b30500c563888b44c89a203a30020555147f0186e3ee	2025-11-09 06:32:33.854057+00	20250906090325_usermodel_added	\N	\N	2025-11-09 06:32:33.8307+00	1
b483575f-7b77-4481-aa77-11aa9bc84a5d	58d91356d7a2437442373f74183720fcb7aab5f3fd8b7bd0a77a11b96089cef4	2025-11-09 06:32:33.890008+00	20251102153029_problem_model_is_added	\N	\N	2025-11-09 06:32:33.859395+00	1
fe975089-234c-49f1-8f75-dfe06608a75c	7534cf742b058b9c7685565ef33071d7696e34deddbb314cf4a6023588905157	2025-11-14 15:14:21.844013+00	20251114151421_added_submission_testcases_problemsolved	\N	\N	2025-11-14 15:14:21.783174+00	1
a5b96dcf-3d15-4c4f-a7d6-d89a896c918d	78432f8fe7fd190fa60cdae86ff3ff9bf95de014a289964f69700050e991cdb2	2025-11-17 07:38:37.891598+00	20251117073837_rename_compile_output	\N	\N	2025-11-17 07:38:37.856792+00	1
97500be7-c83f-4bb0-9ada-f5227b1a0180	3b69b2eb55c6dd4f1130c58d8de98f8c5cf3bd06fe246ef5529bf6683144ff4a	2025-11-18 08:59:56.158828+00	20251118085956_playlist_schema_is_added	\N	\N	2025-11-18 08:59:56.088733+00	1
\.


--
-- Name: Playlist Playlist_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Playlist"
    ADD CONSTRAINT "Playlist_pkey" PRIMARY KEY (id);


--
-- Name: ProblemInPlaylist ProblemInPlaylist_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."ProblemInPlaylist"
    ADD CONSTRAINT "ProblemInPlaylist_pkey" PRIMARY KEY (id);


--
-- Name: ProblemSolved ProblemSolved_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."ProblemSolved"
    ADD CONSTRAINT "ProblemSolved_pkey" PRIMARY KEY (id);


--
-- Name: Problem Problem_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Problem"
    ADD CONSTRAINT "Problem_pkey" PRIMARY KEY (id);


--
-- Name: Submission Submission_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_pkey" PRIMARY KEY (id);


--
-- Name: TestCaseResult TestCaseResult_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."TestCaseResult"
    ADD CONSTRAINT "TestCaseResult_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Playlist_name_userId_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX "Playlist_name_userId_key" ON public."Playlist" USING btree (name, "userId");


--
-- Name: ProblemInPlaylist_playListId_problemId_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX "ProblemInPlaylist_playListId_problemId_key" ON public."ProblemInPlaylist" USING btree ("playListId", "problemId");


--
-- Name: ProblemSolved_userId_problemId_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX "ProblemSolved_userId_problemId_key" ON public."ProblemSolved" USING btree ("userId", "problemId");


--
-- Name: TestCaseResult_submissionId_idx; Type: INDEX; Schema: public; Owner: myuser
--

CREATE INDEX "TestCaseResult_submissionId_idx" ON public."TestCaseResult" USING btree ("submissionId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Playlist Playlist_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Playlist"
    ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProblemInPlaylist ProblemInPlaylist_playListId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."ProblemInPlaylist"
    ADD CONSTRAINT "ProblemInPlaylist_playListId_fkey" FOREIGN KEY ("playListId") REFERENCES public."Playlist"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProblemInPlaylist ProblemInPlaylist_problemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."ProblemInPlaylist"
    ADD CONSTRAINT "ProblemInPlaylist_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES public."Problem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProblemSolved ProblemSolved_problemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."ProblemSolved"
    ADD CONSTRAINT "ProblemSolved_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES public."Problem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProblemSolved ProblemSolved_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."ProblemSolved"
    ADD CONSTRAINT "ProblemSolved_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Problem Problem_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Problem"
    ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Submission Submission_problemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES public."Problem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Submission Submission_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TestCaseResult TestCaseResult_submissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."TestCaseResult"
    ADD CONSTRAINT "TestCaseResult_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES public."Submission"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict GH4dbI61tVu9kdFoYYV9OOrPGc3J5eSfXdhFPdu0OAxkQdOHgxzU30f5kbw39h6

